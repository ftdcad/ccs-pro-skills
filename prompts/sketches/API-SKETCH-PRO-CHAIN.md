# CCS PRO Chain — API Route Concept Sketch
**Author:** Frank Dalton, CEO — Coastal Claims Services
**Date:** March 6, 2026
**Status:** Concept / Pre-Implementation
**For:** Claude Code sessions + Backend Developer (Taha)

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
context     → optional: JSON string of prior completed PRO outputs to pass as context
```

**What it does (step by step):**

1. **Load the skill prompt**
   Reads `/prompts/{proKey}/SKILL.md` (the skill instruction file for that PRO step)

2. **Load prior claim context** *(optional but important)*
   If `context` is provided, prepend completed PRO outputs as background. Example: when running Strategy PRO, pass Policy PRO and Scope PRO outputs so the AI has full file context.

3. **Call Anthropic API**
   ```javascript
   POST https://api.anthropic.com/v1/messages
   model: "claude-opus-4-6"  // or sonnet depending on PRO complexity
   max_tokens: 4096
   system: [skill prompt content from SKILL.md]
   messages: [
     {
       role: "user",
       content: [
         { type: "document", source: { type: "base64", ... } },  // uploaded file
         { type: "text", text: "Run the full PRO analysis. Return structured JSON only." }
       ]
     }
   ]
   ```

4. **Parse the response**
   Each skill prompt instructs Claude to return structured JSON matching the existing PRO data schema (flags, handoff, measurements, etc.). Parse and validate the response.

5. **Update the claim JSON**
   Write the parsed output into `claims/{id}.json` under `pros.{proKey}`:
   ```json
   {
     "status": "complete",
     "subtitle": "AI-generated summary line",
     "flags": [...],
     "handoff": { "to": "Scope PRO", "content": "..." },
     ...proSpecificFields
   }
   ```

6. **Return updated section HTML** *(or redirect)*
   Either return the rendered HTML for that section (for AJAX partial refresh) or redirect to `/claim/{id}` for a full page reload.

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

**Suggested context chain:**

| PRO Step | Receives Context From |
|---|---|
| Policy PRO | Nothing (first step) |
| Scope PRO | Policy PRO output |
| Strategy PRO | Policy PRO + Scope PRO output |
| Denial PRO | Strategy PRO + Policy PRO output |
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

---

## File This In

Save this document to: `/prompts/sketches/API-SKETCH-PRO-CHAIN.md`

This sketch should be updated whenever the API design changes, so Claude Code and Taha always have the same reference point.

---

*End of sketch. This is a concept document — implementation details may evolve.*
