# CCS PRO Chain — Context Handoff

**Last Updated:** 2026-03-04
**Status:** Policy PRO + Strategy PRO + 3 track branch specs complete. State PRO architecture next.

---

## Pipeline Flowchart

> Source image: `C:\Users\FrankDalton\Desktop\Pro 90 master\steps.png`

```
         ┌─────────────────────────────────┐
         │           Claims AI             │
         │ Onboarding · File Contact ·     │
         │   File Depart · Photos          │
         └───────────────┬─────────────────┘
                         ▼
              ┌─────────────────────┐
              │     Policy PRO      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │     Scope PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │     Estimating      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Claims Strategy PRO │
              └──┬────────┬─────┬──┘
                 ▼        ▼     ▼
         ┌───────────┐ ┌─────┐ ┌────────────┐
         │Denial PRO │ │ NEW │ │ Loss Below │
         │           │ │Claim│ │    PRO     │
         └─────┬─────┘ │ PRO │ └──────┬─────┘
               │       └──┬──┘        │
               └──────────┼───────────┘
                          ▼
              ┌─────────────────────┐
              │   State PRO         │
              │   (orchestrator)    │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ UnDisputed Funds PRO│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │      SPOL PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    15 Day PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │  Formal Demand PRO  │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    30 Day PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    45 Day PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    Peer Review      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    60 Day PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    75 Day PRO       │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    Peer Review      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │    90 Day PRO       │
              └─────────────────────┘
```

**18 steps total.** Strategy PRO branches into 3 paths (only 1 executes per claim), then merges back at State PRO. State PRO loads state-specific legal/regulatory data, then all downstream PROs pull from confirmed state data. Two Peer Reviews at 45-day and 75-day marks.

---

## What This Is

Interactive HTML viewer for the complete CCS claims workflow. Shows all 17 PRO steps in one collapsible chain document. Each PRO section carries forward all prior PRO data, so downstream steps have full context.

**Design Philosophy:**
- HTML viewer = working view (collapsible, fast, browser-based)
- .docx export = file of record (formal upload to carriers/systems)
- JSON = single source of truth (one data file → both outputs)

---

## Project Status

### ✅ Complete
- **styles.css** — Full design system with CCS navy theme, all PRO color variants, responsive grid
- **chain.js** — Toggle/expand/collapse logic, auto-opens complete+active sections on load
- **index.html** — Full Armstrong chain hardcoded (Policy PRO + Scope PRO complete, Estimating active, rest pending)
- **data/armstrong.json** — Structured claim data matching the JSON schema
- **README.md** — Project documentation
- **prompts/policy-pro.md** — Policy PRO operational logic. Two intake inputs: (1) EagleView/Hover roof report (optional), (2) policy document or carrier letter (determines format). Format A = full policy review with all sections. Format B = limited info report when only a denial letter, carrier letter, or partial doc is available — extracts what it can, flags everything missing, stamps "Limited Info Report" on every page. Property research via county appraiser sites. Endorsements categorized as critical/warning/standard. Agentic Notes section. Hands off to Scope PRO.
- **prompts/strategy-pro.md** — Strategy PRO operational logic (skill). Rewritten from old GPT prompt — all GPT junk stripped. Core principle: one decision backed by documented facts. 7-step process: confirm inputs, calculate gap, apply decision matrix, identify leverage points, income protection timeline, peer review, estimate revision. Emoji track labels (🔴 Denial, 🔵 New Claim, 🟣 Loss Below). Mandatory client communication email template (homeowner + referral source). Expanded critical actions with checkbox format. Florida default timeline with specific milestones. Build the Report Document section (docx-js). References upstream data, never reprints.
- **prompts/strategy-pro-schema.md** — Strategy PRO chain JSON schema. Defines `pros.strategy` structure: carrierPosition, gapAnalysis, routing, leveragePoints, peerReview, estimateRevision, reserveAdjustment, criticalActions, incomeProtection, agenticNotes, handoff. Full field reference table. Documents how downstream PROs read from this schema.
- **prompts/denial-pro.md** — Denial PRO operational logic. Mr. Hyde / Dr. Jekyll framework: present carrier's argument fully, then destroy it with one focused rebuttal. Evidence checklists by denial type. Mis-cite edge case: document quietly, build rebuttal against correct section, surface at the right moment (peer review decision). All denials require mandatory peer review within 24hr.
- **prompts/loss-below-pro.md** — Loss Below PRO operational logic. Core argument: pre-loss condition restoration, NOT matching. Scope Reasonableness Test with 4 roofing failure points (discontinued materials, salvage reality, repair cascading, functional condition). Four-bucket gap analysis. Separate O&P and depreciation sections.
- **prompts/new-claim-pro.md** — New Claim PRO operational logic. Forward Pressure Framework: every carrier status has an active next move, passive waiting is never acceptable. Mandatory homeowner field prep. Anticipated carrier response scenarios (A/B/C) to pre-position for track shifts. Undisputed funds demand at every opportunity.

### ✅ Recently Completed
- **State reference data extraction (Mar 4)** — 14 Merlin PDFs processed by Claude Code parallel agents. 13 state files + MATCHING-CHART.md written to `data/state-reference/`. All files confirmed on disk. Some fields flagged "web search required" — mostly carrier-side deadlines and pre-suit notice. Matching data in separate chart covers all 50 states.
- **Claude Code is primary builder for State PRO** — Claude Desktop can't hold all the Merlin PDFs. Claude Code extracted the data and will write the State PRO skill spec.

### ⏳ Next Steps
1. **Verify state reference files** — Check all 13 state .md files + MATCHING-CHART.md landed correctly. Fill web-search gaps for missing fields.
2. **Write State PRO skill spec** — Hybrid architecture: reads hardcoded state data for known states, web search for unknown states. Conversational orchestrator. Communication tone rule: know the law, never cite it.
3. **Build `generate.js`** — Template engine that takes JSON → generates HTML
4. **Update scope-pro skill** — Output JSON format instead of standalone .docx
5. **Test full chain** — Run through a complete claim from Policy PRO → 90 Day PRO
6. **Add .docx export** — Convert HTML → .docx for formal file uploads
7. **Write downstream PRO specs** — Undisputed Funds, SPOL, 15 Day, Formal Demand, etc.

---

## File Structure

```
ccs-pro-chain/
├── index.html          # Armstrong chain (working example)
├── styles.css          # Design system (don't touch variables)
├── chain.js            # Toggle logic
├── data/
│   ├── armstrong.json  # Armstrong claim data
│   └── state-reference/  # Merlin Law Group extractions (10 fields per state)
│       ├── FL.md, TX.md, GA.md, SC.md, LA.md, IL.md  # Priority states
│       ├── AZ.md, CA.md, CO.md, NC.md, NJ.md, NY.md, PA.md  # Additional states
│       └── MATCHING-CHART.md  # 50-state matching regulation reference
├── prompts/
│   ├── policy-pro.md          # Policy PRO — policy review & report generation (Format A full / Format B limited)
│   ├── strategy-pro.md        # Strategy PRO operational logic (skill — source of truth)
│   ├── strategy-pro-schema.md # Strategy PRO chain JSON schema (pros.strategy)
│   ├── denial-pro.md          # Denial PRO — coverage denial fighter (Mr. Hyde / Dr. Jekyll)
│   ├── loss-below-pro.md      # Loss Below PRO — underpayment analyzer (pre-loss condition restoration)
│   └── new-claim-pro.md       # New Claim PRO — early positioning & forward pressure
├── README.md           # User-facing docs
└── CONTEXT.md          # This file (dev handoff)
```

---

## How It Works

### Data Flow
1. **Policy PRO skill** → outputs JSON with policy analysis
2. **Scope PRO skill** → reads Policy PRO JSON, appends scope, outputs combined JSON
3. **Estimating** → reads combined JSON, appends estimate, outputs updated JSON
4. **Strategy PRO** → reads everything upstream + carrier position, assigns track, branches to Denial/NEW/Loss Below
5. **Denial / NEW Claim / Loss Below PRO** → executes track-specific analysis (only 1 runs per claim)
6. **State PRO** → conversational orchestrator — adjuster uploads track reports, confirms state, AI researches current state law agenetically and loads state-specific compliance data into chain
7. **Undisputed Funds → SPOL → 15 Day → Formal Demand → ...** → all downstream PROs now pull from confirmed state data for deadlines, obligations, and leverage points

### HTML Generation (Not Built Yet)
```javascript
// Pseudocode for generate.js
const claimData = require('./data/armstrong.json');
const html = renderTemplate(claimData);
fs.writeFileSync('CCS_Chain_01-000125628_Armstrong.html', html);
```

### JSON Schema (Established)
```json
{
  "meta": { "claimNumber", "lastName", "generatedDate" },
  "claim": { "insured", "address", "carrier", "policyNumber", ... },
  "pros": {
    "policy": { "status", "coverage", "underwriting", "flags", "handoff", ... },
    "scope": { "status", "measurements", "roofExterior", "interior", "severity", "handoff", ... },
    "estimating": { "status", "content", ... },
    "strategy": { "status", "carrierPosition", "gapAnalysis", "routing", "leveragePoints", ... },
    "denial": { "status", ... },       // only 1 of these 3
    "newClaim": { "status", ... },      // executes per claim
    "lossBelow": { "status", ... },     // based on strategy routing
    "state": { "status", "jurisdiction", "deadlines", "compliance", ... },
    "undisputed": { "status", ... },
    "spol": { "status", ... },
    ...
  }
}
```

---

## Key Design Decisions

### 1. Claim Identity Strip
Prints once at the top. Never repeats. All PRO sections below just reference it.

**What it contains:**
- Insured name, property address
- Carrier, policy #, claim #
- Date of loss, policy type, file status

This eliminates redundancy — you don't see "Dale Armstrong, 836 E 20th Ave" in every PRO section.

### 2. Collapsible PRO Sections
- Click header to toggle open/closed
- Chevron rotates 180° when open
- `data-status` attribute: `complete`, `active`, `pending`
- Auto-opens `complete` and `active` on page load
- Placeholder sections (pending) don't toggle

### 3. PRO Color Themes
Each PRO type has distinct background + badge color:
- **Policy PRO** → Navy blue (`#1a2e4a`)
- **Scope PRO** → Teal (`#1a3040`)
- **Estimating** → Gold (`#2d2a1a`)
- **Strategy PRO** → Purple (`#2a1a3a`)
- **Denial/NEW/Loss Below** → Red/Blue/Orange (strategy branches)
- **Day PROs** → Darker navy
- **Peer Review** → Purple-gray

### 4. Strategy PRO Branches
After Strategy PRO, the chain splits into 3 parallel branches:
- **Denial PRO** (carrier denies, appeal path)
- **NEW Claim PRO** (no carrier response yet, establishing CCS position early)
- **Loss Below PRO** (carrier underpaid or below deductible, no formal denial)

Only ONE branch executes per claim. HTML shows all 3 as `pending` until Strategy PRO decides.

### 5. State PRO (Hybrid Architecture — Hardcoded Core + Web Search)
After the track branch merges, State PRO loads state-specific legal/regulatory data before the downstream time-based PROs begin. But it does more than load — it learns.

**Architecture decision (Mar 4, 2026): HYBRID approach.**

**Layer 1 — Hardcoded core facts** for top volume states (FL, TX, GA, SC, LA, IL + others).
Source: Merlin Law Group state guides + verified statutes. 10 fields per state, cited, verified
by Frank once. These are the high-stakes facts where being wrong costs money (missed deadlines,
forfeited fees). Lives in `data/state-reference/` as structured files.

**Layer 2 — Web search** for everything else. Any state not hardcoded, or any question outside
the 10 core fields, the skill searches DOI + statute and returns the answer with the source URL.
Flagged as "web-sourced — verify before acting." PA must confirm before relying on web results
for hard deadlines.

**The 10 core fields per state:**
1. Notice of Loss deadline
2. Proof of Loss deadline + carrier form-furnishing obligation
3. Pre-suit notice requirement + cure window (FL = CRN 60 days, TX = 542A 90 days, SC = none)
4. Carrier acknowledgment deadline
5. Carrier investigation/payment deadline
6. SOL — breach of contract
7. SOL — bad faith
8. Appraisal — enforceable, binding, time to invoke
9. EUO — condition precedent or not
10. Matching regulation — yes/no + citation

**Build process:** Frank feeds Merlin Law Group PDFs (one per state) to Claude Code. Claude Code
extracts the 10 fields into structured state reference files. State PRO skill reads from these.

**Key design decisions (unchanged):**
- **Conversational, not silent.** The adjuster uploads track reports and tells State PRO what state they're in. The AI works through state-specific issues WITH the adjuster. This is intentional — adjusters need to learn their states, not become dependent on the tool doing it for them.
- **Visible in chain viewer.** State PRO has its own section showing what state framework was loaded and key compliance data. The adjuster sees exactly what legal framework is being applied to their file.
- **Self-updating state knowledge.** When the system sees a claim through to resolution, the outcome feeds back into the state knowledge. Which arguments worked? Which leverage points did the carrier respond to? Next time a claim comes in from that state, State PRO starts smarter.
- **Flags what doesn't exist.** If a state has no matching statute, no pre-suit notice, etc. — State PRO explicitly says so. "No statute — policy language controls." The absence of a rule is as important as its presence.

**What State PRO loads into the chain (at minimum):**
- The 10 core fields above
- Interest rates on late payments
- Attorney fee provisions
- DOI complaint process
- **CCS outcome history for this state** (what worked, what didn't — built over time)

**Reference documents:**
- Merlin Law Group state guides (PDF, one per state — primary source for Layer 1)
- MWL Matching Chart (Jan 2022) — baseline for matching regs across all 50 states
- Kentucky adjusting rules doc — example of state-specific adjusting content (matching reg, bad faith)

**Web search sources for Layer 2 (and to fill Layer 1 gaps):**
- **State DOI websites** — primary source for carrier-side regulatory deadlines (ack, investigation, payment). Each state DOI publishes their unfair claims practices rules.
- **Justia U.S. Law (law.justia.com)** — free legal reference index. Organizes every state's statutes by title/chapter with clean navigation. URL pattern: `law.justia.com/codes/[state]/` → navigate to insurance title → unfair claims practices / prompt payment chapters. Strong for first-party insurance statutes, case law, and regulatory citations.
- **State legislature websites** — for current statute text when Merlin guide citations need verification or are outdated.

**Layer 1 gap pattern:** Merlin guides are strong on appraisal, SOL, proof of loss, EUO. Weak on carrier-side regulatory deadlines (ack/investigation/payment) and pre-suit notice requirements. Matching is covered separately by MATCHING-CHART.md. State PRO skill should cross-reference the matching chart automatically and use web search for the carrier deadline gaps.

### 6. Communication Tone Rule (MANDATORY — ALL PROs)

**Know the law, never cite it.**

CCS adjusters are public adjusters, not attorneys. Every PRO in the chain can understand and apply state law internally — setting deadlines, flagging violations, building strategy. But adjuster-facing correspondence templates must NEVER cite statute numbers or case law.

**Correct:** "It's my understanding I should hear a response in no greater than 10 days."
**Wrong:** "Per Florida Statute 627.70131(5)(a), you are required to respond within 10 days."

The first is an informed businessperson who knows their rights. The second is a PA pretending to be a lawyer — carriers will use it against you, and it's potentially unauthorized practice of law.

This rule applies to: client emails, carrier letters, demand templates, SPOL language, and any other correspondence generated by any PRO in the chain.

### 7. Handoff Boxes
Every completed PRO ends with a handoff box:
```
Hands off to → [Next PRO]
[Summary of what's being passed forward]
```
This makes the chain transparent — you can see exactly what each step contributed.

---

## Integration with scope-pro Skill

### Current State
- **scope-pro skill** outputs a standalone .docx Scope of Loss document
- Does NOT chain with Policy PRO data
- Does NOT output JSON

### Required Changes
1. **Accept Policy PRO JSON as input** — uploaded alongside photos/EagleView
2. **Reprint Policy PRO findings verbatim** in output
3. **Append Scope PRO analysis** after Policy PRO section
4. **Output combined JSON** (Policy PRO + Scope PRO) in the schema format above
5. **Generate HTML viewer** from JSON using `generate.js` (to be built)
6. **Export .docx** from HTML when needed (formal file upload)

### Workflow After Integration
```
User: "I need a scope done"
Claude: "Upload Policy Pro report + photos + EagleView"
User: [uploads files]
Claude: [reads Policy Pro JSON, analyzes photos, builds scope]
Claude: [outputs armstrong.json with both Policy PRO + Scope PRO data]
Claude: [generates armstrong.html from JSON]
Claude: "Scope complete. [Opens HTML viewer]. Download .docx for carrier upload."
```

---

## Armstrong Example (What's Built)

### Policy PRO — Complete
- Coverage limits (A/B/C/D, deductibles, loss settlement)
- Underwriting snapshot (year built, roof age, occupancy)
- Mortgagees (3 listed)
- **Critical flags:**
  - 🚨 Occupancy conflict (Tenant Occupied + "No Coverage for Non-Owner Occupied" endorsement)
  - 🚨 Calendar year hurricane deductible (confirm prior 2024 claims)
  - ⚠ Existing damage exclusion (18-year-old roof)
- Endorsements list (15 total, color-coded by risk)
- Missing items checklist (5 items)
- Handoff to Scope PRO

### Scope PRO — Complete
- Roof measurements (23.42 SQ net → 26.93 SQ with 15% hip waste)
- Roof/exterior scope table (6 line items: shingles, ridge vent, turtle vent, 4 pipe jacks, electric mast boot, gutters)
- Interior ensuing loss (2 rooms: Bedroom 3, Master Bedroom — water staining, 4 line items each)
- Severity assessment (Severity 2 — Light/Moderate, Habitable)
- Flags (functional damage confirmed, above deductible, PA review required)
- Notes (back porch metal roof present/no damage, 75 photos analyzed, no screen enclosure, no floor damage)
- Handoff to Estimating

### Estimating — In Progress
- Placeholder: "Xactimate estimate in progress — RCV/ACV totals will populate here when complete."

### All Other PROs — Pending
- Strategy PRO (spec complete — see prompts/), Denial PRO, NEW Claim PRO, Loss Below PRO, **State PRO (orchestrator)**, UnDisputed Funds PRO, SPOL PRO, 15 Day PRO, Formal Demand PRO, 30 Day PRO, 45 Day PRO, Peer Review, 60 Day PRO, 75 Day PRO, Peer Review, 90 Day PRO

---

## Next Session TODO

### High Priority
1. **Build `generate.js`** — Take `data/armstrong.json` → output full HTML file
2. **Test HTML viewer** — Open `index.html`, verify all sections work, check mobile view
3. **Update scope-pro skill** — Accept Policy PRO JSON input, output combined JSON

### Medium Priority
4. **Add .docx export** — Convert HTML → .docx for carrier uploads (use `docx` npm package or similar)
5. **Build other PRO skills** — Estimating PRO, Strategy PRO, etc. (one at a time)
6. **Test full chain** — Run a complete claim end-to-end

### Low Priority
7. **Add search/filter** — Jump to section, search within chain
8. **Add timestamps** — Track when each PRO completed
9. **Add version tracking** — Show revision history
10. **Portal integration** — Embed HTML viewer in CCS portal (guest house model)

---

## Technical Notes

### CSS Variables (Don't Change)
```css
--bg:           #0f1117  /* Page background */
--ccs-navy:     #1B3A6B  /* CCS brand color */
--accent-blue:  #60a5fa  /* Primary accent */
--accent-yellow:#fcd34d  /* Highlights */
```

### Auto-Open Logic
```javascript
// chain.js lines 20-25
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pro-section[data-status="complete"]')
    .forEach(s => s.classList.add('open'));
  document.querySelectorAll('.pro-section[data-status="active"]')
    .forEach(s => s.classList.add('open'));
});
```

### Status Pill Colors
- `status-complete` → Green (`#064e3b`)
- `status-active` → Yellow (`#4a3a0f`)
- `status-pending` → Gray (`#1f2937`)

---

## Open Questions

1. **When does .docx export happen?** On demand? Automatic when chain completes?
2. ~~**How does Strategy PRO decide which branch?**~~ ANSWERED: Adjuster selects claim status (new_claim / denial_issued / below_deductible). AI validates consistency but does not override. See `prompts/strategy-pro.md`.
3. **Who runs Estimating PRO?** Human in Xactimate or AI with Xactimate API?
4. **Portal integration timing?** Now or wait until full chain is tested?
5. **Power BI export?** Does the JSON need to feed into Power BI dashboards?

---

## Quick Start (Next Session)

```bash
cd C:\Users\FrankDalton\myProjects\ccs-pro-chain
start index.html  # View the Armstrong example
```

Read this CONTEXT.md, then pick a task from the TODO list above. Start with `generate.js` if you want to make the system fully functional.

---

**End of handoff. Good luck!**
