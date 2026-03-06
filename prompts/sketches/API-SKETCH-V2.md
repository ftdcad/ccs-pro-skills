# CCS PRO Chain — API Route Concept Sketch (V2)
**Original Author:** Frank Dalton, CEO — Coastal Claims Services
**V2 Updated:** March 6, 2026
**Status:** Concept / Pre-Implementation
**For:** Claude Code sessions + Backend Developer (Taha)

## What Changed in V2
V2 adds six items missing from the original sketch:
1. Pipeline enforcement — prerequisite chain + branch gating
2. Server-side context assembly — server builds context, not the client
3. Model map — which Claude model for each PRO + token limits
4. Report generation routes — .docx download endpoints
5. Cost tracking — token usage logging
6. Auth & spend cap — portal integration + API cost controls

---

## Purpose

This document describes the intended API architecture for integrating Anthropic's Claude AI into the CCS PRO Chain application. The current `server.js` is a display-only engine — it reads pre-populated JSON files and renders the PRO Chain UI. This sketch defines the routes and logic needed to make each PRO step AI-powered and self-executing from within the portal.

---

## Current State (What Exists)

```
GET  /              → Dashboard (reads claims/*.json, renders HTML)
GET  /claim/:id     → PRO Chain view for a specific claim
```

Claims are stored as flat JSON files in `/claims/`. Each file contains:
- `claim` — insured, carrier, property, policy details
- `meta` — claim number, last name
- `pros` — object keyed by PRO step (policy, scope, strategy, etc.) with status + structured data

**No Anthropic API calls exist yet.** AI output is currently populated manually.

---

## Target State (What We're Building)

An adjuster logs into the CCS Portal, opens a claim, and clicks a PRO step (e.g., Policy PRO). They upload a document (e.g., the declarations page PDF). The system runs the appropriate skill prompt against that document using the Anthropic API, parses the structured response, saves it to the claim JSON, and updates the UI — all without leaving the portal.

The server enforces pipeline order, builds context from prior completed steps automatically, selects the right Claude model for each PRO, logs token costs, and generates downloadable Word reports.

---

## New Routes Required

### 1. Create a New Claim
```
POST /api/claim/new
```
**Body:**
```json
{
  "insured": "Dale Armstrong",
  "address": "836 E 20th Ave, New Smyrna Beach FL 32168",
  "carrier": "Frontline / First Protective Ins. Co.",
  "policyNumber": "7756322514",
  "claimNumber": "01-000125628",
  "dateOfLoss": "10/10/2024 — Hurricane Milton",
  "policyType": "Dwelling Fire (DP 00 03)",
  "fileStatus": "CTG — Supplemental"
}
```
**What it does:**
Creates a new `claims/{claimId}.json` file with all PRO steps initialized to `status: "pending"`. Redirects to `/claim/{claimId}`.

---

### 2. Run a PRO Step (Core AI Route)
```
POST /api/claim/:id/run/:proKey
```
**Example:** `POST /api/claim/armstrong/run/policy`

**Body:** `multipart/form-data`
```
file        → uploaded document (PDF, image, or text)
proKey      → which PRO to run (policy, scope, strategy, denial, etc.)
```

Note: V1 included a `context` param where the client would pass prior PRO outputs. **That's removed.** The server builds context automatically — see "Server-Side Context Assembly" below. The client just uploads the file and says which PRO to run. Less room for error, less work for the frontend.

**What it does (step by step):**

1. **Check pipeline prerequisites** *(new in V2)*
   Before doing anything, verify that all upstream PROs are `status: "complete"`. If not, return 400 with a clear error. See "Pipeline Enforcement" section below.

2. **Load the skill prompt**
   Reads `/prompts/{proKey}/SKILL.md` (the skill instruction file for that PRO step)

3. **Build context from prior PRO outputs** *(new in V2)*
   The server reads the claim JSON and automatically assembles the relevant prior PRO outputs for this step. No client involvement. See "Server-Side Context Assembly" below.

4. **Select model and token limit** *(new in V2)*
   Look up the correct Claude model and max_tokens for this proKey from the Model Map. Extraction tools get Sonnet (fast, cheap). Strategy tools get Opus (deep reasoning).

5. **Call Anthropic API**
   ```javascript
   POST https://api.anthropic.com/v1/messages
   model: MODEL_MAP[proKey].model
   max_tokens: MODEL_MAP[proKey].maxTokens
   system: [skill prompt content from SKILL.md]
   messages: [
     {
       role: "user",
       content: [
         ...contextMessages,  // prior PRO outputs assembled by server
         { type: "document", source: { type: "base64", ... } },  // uploaded file
         { type: "text", text: "Run the full PRO analysis. Return structured JSON only." }
       ]
     }
   ]
   ```

6. **Parse the response**
   Each skill prompt instructs Claude to return structured JSON matching the existing PRO data schema (flags, handoff, measurements, etc.). Parse and validate the response.

7. **Log token usage** *(new in V2)*
   Read the `usage` object from the Anthropic API response and write it into the PRO output's `_meta` field. Update the claim-level `_costSummary`. See "Cost Tracking" below.

8. **Update the claim JSON**
   Write the parsed output into `claims/{id}.json` under `pros.{proKey}`:
   ```json
   {
     "status": "complete",
     "subtitle": "AI-generated summary line",
     "flags": [...],
     "handoff": { "to": "Scope PRO", "content": "..." },
     "_meta": { "model": "...", "inputTokens": ..., "outputTokens": ..., ... },
     ...proSpecificFields
   }
   ```

9. **Return updated section HTML** *(or redirect)*
   Either return the rendered HTML for that section (for AJAX partial refresh) or redirect to `/claim/{id}` for a full page reload.

---

## Pipeline Enforcement

The `/api/claim/:id/run/:proKey` route must enforce the prerequisite chain.
Before executing any PRO, the server checks that all required upstream PROs
are `status: "complete"`.

### Prerequisite Map
| proKey | Requires |
|--------|----------|
| policy | (none — first step) |
| scope | policy |
| strategy | policy + scope + estimating |
| denial | strategy (routing.assignedTrack === "denial") |
| newClaim | strategy (routing.assignedTrack === "newClaim") |
| lossBelow | strategy (routing.assignedTrack === "lossBelow") |
| statePro | strategy |
| undisputed | strategy + (denial OR newClaim OR lossBelow) |
| spol | undisputed |
| day15 | spol |
| formalDemand | day15 |
| day30 | formalDemand |

### Branch Gating
After Strategy PRO completes, the `routing.assignedTrack` field determines
which branch PRO is available. The server reads `pros.strategy.routing.assignedTrack`
and only allows the matching proKey:
- `"denial"` → denial only
- `"newClaim"` → newClaim only
- `"lossBelow"` → lossBelow only

If an adjuster tries to run the wrong branch PRO, return 400:
```json
{ "error": "Pipeline violation", "message": "This claim is on the denial track. Cannot run New Claim PRO." }
```

### Estimating Step
Estimating is a human step (Xactimate) — there's no AI call. The adjuster marks it complete via Route 3 (manual override) before Strategy PRO unlocks.

---

## Server-Side Context Assembly

When a PRO step runs, it often needs to see the outputs from earlier steps. In V1, the client was responsible for sending this context. That's error-prone — the client shouldn't have to know which PROs feed into which.

**V2 rule:** The server builds context automatically. The client sends nothing except the file and the proKey.

### Context Map
```javascript
// Server builds context automatically — client never sends it
function buildContext(claimData, proKey) {
  const contextMap = {
    policy:     [],
    scope:      ['policy'],
    strategy:   ['policy', 'scope'],
    denial:     ['policy', 'strategy'],
    newClaim:   ['policy', 'strategy'],
    lossBelow:  ['policy', 'strategy'],
    statePro:   ['strategy'],
    undisputed: ['policy', 'strategy'],
    spol:       ['policy', 'strategy'],
    day15:      ['policy', 'strategy', 'spol'],
    formalDemand: ['policy', 'strategy', 'day15'],
    day30:      ['policy', 'strategy', 'formalDemand'],
  };
  const required = contextMap[proKey] || [];
  return required
    .filter(key => claimData.pros[key]?.status === 'complete')
    .map(key => ({ proKey: key, data: claimData.pros[key] }));
}
```

The assembled context gets prepended to the Anthropic API call as structured text — Claude sees the prior analysis as background before processing the new document. This is the "memory" system: explicit context, not stateful sessions.

---

## Model Map

Each PRO uses the right Claude model for the task. Extraction tools use
Sonnet (fast, cheap). Strategy/analysis tools use Opus (deep reasoning).

| proKey | Model | max_tokens | Reasoning |
|--------|-------|-----------|-----------|
| policy | claude-sonnet-4-5-20250929 | 8192 | Extraction — high volume, fast |
| scope | claude-sonnet-4-5-20250929 | 8192 | Extraction — photo analysis |
| strategy | claude-opus-4-6 | 8192 | Strategic reasoning + routing |
| denial | claude-opus-4-6 | 8192 | Rebuttal analysis — nuance critical |
| newClaim | claude-opus-4-6 | 6144 | Forward pressure strategy |
| lossBelow | claude-opus-4-6 | 8192 | Scope reasonableness — nuance critical |
| statePro | claude-sonnet-4-5-20250929 | 4096 | Statute lookup — extraction |
| undisputed | claude-opus-4-6 | 8192 | Demand strategy — two documents |
| spol | claude-sonnet-4-5-20250929 | 4096 | Form fill — extraction |
| rfiPro | claude-sonnet-4-5-20250929 | 4096 | RFI item extraction |

**Implementation:**
```javascript
const MODEL_MAP = {
  policy:     { model: 'claude-sonnet-4-5-20250929', maxTokens: 8192 },
  scope:      { model: 'claude-sonnet-4-5-20250929', maxTokens: 8192 },
  strategy:   { model: 'claude-opus-4-6',            maxTokens: 8192 },
  denial:     { model: 'claude-opus-4-6',            maxTokens: 8192 },
  newClaim:   { model: 'claude-opus-4-6',            maxTokens: 6144 },
  lossBelow:  { model: 'claude-opus-4-6',            maxTokens: 8192 },
  statePro:   { model: 'claude-sonnet-4-5-20250929', maxTokens: 4096 },
  undisputed: { model: 'claude-opus-4-6',            maxTokens: 8192 },
  spol:       { model: 'claude-sonnet-4-5-20250929', maxTokens: 4096 },
  rfiPro:     { model: 'claude-sonnet-4-5-20250929', maxTokens: 4096 },
};
```

**Note on RFI Pro:** RFI Pro is a conditional tool — it fires on demand, not in pipeline order. It uses Sonnet because it's extracting a list of requested items from a letter, not doing strategic analysis. The strategic response to the RFI is handled by the adjuster with guidance from the RFI Pro output.

---

### 3. Mark a Step as Complete (Manual Override)
```
POST /api/claim/:id/status/:proKey
```
**Body:** `{ "status": "complete" | "active" | "pending" }`

For steps like Estimating (Xactimate) that are done outside the system — the adjuster manually marks them complete after uploading the estimate to the carrier.

---

### 4. Save a Note / Flag to a PRO Step
```
POST /api/claim/:id/note/:proKey
```
**Body:** `{ "content": "Note text", "variant": "warn" | "info" | "critical" }`

Allows adjusters to add flags or notes to any PRO step without re-running the AI.

---

### 5. Get Claim JSON (for frontend use)
```
GET /api/claim/:id/data
```
Returns the raw `claims/{id}.json` for frontend JavaScript to consume.

---

### 6. Download Individual PRO Report
```
GET /api/claim/:id/report/:proKey
```
Returns a `.docx` file for a single completed PRO step. If the step is not `status: "complete"`, return 400.

The report structure is defined by each PRO's schema — the same JSON fields that populate the UI card also populate the Word document. Flags become highlighted callouts, handoff becomes a "Next Steps" section, etc.

---

### 7. Download Full Chain Report
```
GET /api/claim/:id/report/full
```
Returns a cumulative `.docx` with all completed PRO sections — the full claim file. This is the "one growing document" from the context engineering architecture. Sections appear in pipeline order, skipping any PRO steps that are still pending.

**Implementation:** Use `docx-js` (or similar) to build Word documents server-side from the structured JSON. Each PRO's schema defines what goes in the report. Header includes claim details (insured, carrier, claim number, DOL). Each section gets a page break separator.

This replaces the old workflow where the adjuster had to manually copy the report from Claude Desktop into a Word doc. Now they click "Download Report" and it's done.

---

## Cost Tracking

Every Anthropic API call returns token usage in the response. Log this into the claim JSON so we can track spend per claim and per PRO step.

### Per-PRO Metadata
Add to each PRO output when it completes:
```json
"_meta": {
  "model": "claude-opus-4-6",
  "inputTokens": 12450,
  "outputTokens": 3200,
  "cacheReadTokens": 8000,
  "cacheWriteTokens": 4450,
  "estimatedCost": "$0.42",
  "executedAt": "2026-03-06T14:30:00Z"
}
```

### Claim-Level Aggregate
Add to the root of the claim JSON, updated after each PRO run:
```json
"_costSummary": {
  "totalCalls": 4,
  "totalInputTokens": 45000,
  "totalOutputTokens": 12000,
  "totalEstimatedCost": "$1.84"
}
```

### Why This Matters
A typical claim might run 8-12 PRO steps. At Opus pricing, a complex claim could cost $5-15 in API calls. We need to see this per-claim so we can:
- Spot runaway costs (a re-run loop, an oversized document)
- Budget accurately as claim volume scales
- Justify the spend against adjuster time savings

The cost estimate is calculated server-side using the published Anthropic pricing at the time of the call. It doesn't need to be exact to the penny — ballpark is fine for monitoring.

---

## API Key Handling

The Anthropic API key must **never** be hardcoded in `server.js`.

**Correct approach:**
```javascript
// In server.js
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// In .env file (never committed to git)
ANTHROPIC_API_KEY=sk-ant-...
```

When this moves to the CCS Portal (portal.coastalclaims.net), the key is stored as an environment variable in the hosting environment — not in any file.

---

## Skill Prompt → JSON Schema Relationship

Each PRO skill in `/prompts/` must be updated to include explicit JSON output instructions. Example tail section to add to every SKILL.md:

```
## Output Format

Return ONLY valid JSON. No preamble, no markdown fences. Structure:

{
  "status": "complete",
  "subtitle": "One-line summary for the UI subtitle field",
  "flags": [
    { "variant": "warn|critical|info", "content": "Flag text" }
  ],
  "handoff": {
    "to": "Name of next PRO step",
    "content": "What the next PRO needs to know"
  },
  // ...PRO-specific fields (see individual skill schemas)
}
```

---

## Context Passing Between PRO Steps

This is the core of the "memory" system Frank described. Rather than stateful sessions, context is explicit — each PRO step that needs prior outputs receives them as part of its prompt.

**V2 update:** The context chain below is now enforced server-side via the `buildContext()` function. The client never assembles or sends context — it just hits the run endpoint with a file. The server reads the claim JSON, pulls the completed upstream PROs, and feeds them to Claude automatically.

**Context chain:**

| PRO Step | Receives Context From |
|---|---|
| Policy PRO | Nothing (first step) |
| Scope PRO | Policy PRO output |
| Strategy PRO | Policy PRO + Scope PRO output |
| Denial PRO | Strategy PRO + Policy PRO output |
| New Claim PRO | Strategy PRO + Policy PRO output |
| Loss Below PRO | Strategy PRO + Policy PRO output |
| State PRO | Strategy PRO output (knows the track) |
| Undisputed Funds PRO | Policy PRO + Strategy PRO output |
| SPOL PRO | Policy PRO + Strategy PRO output |
| 15/30/45/60/75/90 Day PROs | Strategy PRO + all prior correspondence |

The UI "Next Step" indicator is derived from the `handoff.to` field in the last completed PRO's JSON — not hardcoded logic.

---

## What Taha Needs to Know (Backend Integration Notes)

1. **This app is currently a standalone Node.js server** running at `localhost:3000`. The portal integration will need to either embed this as a service or migrate the routes into the portal's existing backend.

2. **Claims are flat JSON files** right now. For production, these should move to a database table (PostgreSQL recommended) with the same schema. The JSON structure is already well-defined and stable.

3. **File uploads** — the `/api/claim/:id/run/:proKey` route needs `multipart/form-data` handling (use `multer` for Node.js). Files should be held in memory for the API call and not persisted to disk unless there's a specific reason.

4. **The Anthropic API key** goes in environment variables on the server — never client-side, never in git.

5. **The skill prompts** in `/prompts/` are the "brain" of the system. These are proprietary CCS IP and should be treated accordingly in any deployment (not public-facing, not logged).

6. **CORS** — if the portal frontend calls these routes from a different domain, CORS headers will need to be configured to allow `portal.coastalclaims.net`.

7. **Pipeline enforcement is server-side** *(new in V2)* — the prerequisite map and branch gating logic live on the server. The frontend can grey out buttons for locked steps, but the real gate is the 400 response from the server if prerequisites aren't met. Don't trust the client.

8. **Context assembly is server-side** *(new in V2)* — the frontend never sends context. It sends a file and a proKey, and the server does the rest. This keeps the frontend simple and prevents context assembly bugs.

9. **Model selection is server-side** *(new in V2)* — the MODEL_MAP lives on the server. The frontend doesn't know or care which Claude model runs. If we swap models later (e.g., a new Sonnet version), it's a one-line config change on the backend.

10. **Report generation** *(new in V2)* — two download endpoints (individual PRO report + full chain report). Use `docx-js` or similar to build Word documents from the structured JSON. Reports are generated on demand, not pre-built.

---

## Auth & Spend Controls

### Portal Integration
The CCS Portal already handles authentication (JWT + roles: user/manager/superadmin). The PRO Chain API inherits portal auth — no separate login. The portal passes the JWT in the Authorization header. PRO Chain validates it against the portal's auth endpoint.

Tab-level access: The portal's "Coastal AI" page controls who sees the PRO Chain. Role assignment is managed by Taha in the portal — not in PRO Chain code.

### API Spend Cap
Hard limit: **$500/week** across all claims, all users. Tracked via `_costSummary` aggregation across all claims for the current week.

When the cap is hit:
- Return 429: `{ "error": "Weekly API budget exceeded", "resetDate": "2026-03-10T00:00:00Z" }`
- Notify manager via portal notification system
- Allow manual override by superadmin (e.g., a high-priority claim that can't wait)

This prevents a runaway loop or misuse from burning through the API budget. The $500/week figure is a starting point — adjust based on actual usage patterns after launch.

### Spend Visibility
Superadmins should be able to see a simple dashboard: total spend this week, spend by claim, spend by PRO step type. This can be built from the `_costSummary` data already in the claim JSONs — no separate analytics system needed at launch.

---

## Route Summary (V2)

| # | Method | Route | Purpose |
|---|--------|-------|---------|
| 1 | POST | `/api/claim/new` | Create a new claim |
| 2 | POST | `/api/claim/:id/run/:proKey` | Run a PRO step (core AI route) |
| 3 | POST | `/api/claim/:id/status/:proKey` | Manual status override |
| 4 | POST | `/api/claim/:id/note/:proKey` | Add note/flag to a step |
| 5 | GET | `/api/claim/:id/data` | Get claim JSON |
| 6 | GET | `/api/claim/:id/report/:proKey` | Download individual PRO report (.docx) |
| 7 | GET | `/api/claim/:id/report/full` | Download full chain report (.docx) |

---

## File This In

Save this document to: `/prompts/sketches/API-SKETCH-V2.md`

The original V1 sketch remains at `/prompts/sketches/API-SKETCH-PRO-CHAIN.md` for reference.

This sketch should be updated whenever the API design changes, so Claude Code and Taha always have the same reference point.

---

*End of V2 sketch. This is a concept document — implementation details may evolve.*
