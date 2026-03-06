# HANDOFF — CCS Pro Skills — Mar 6, 2026 (Session 3)

## READ THIS FIRST

### What Happened This Session
1. Saved Frank's API route concept sketch verbatim to `prompts/sketches/API-SKETCH-PRO-CHAIN.md`
2. Wrote JSON output schemas for all 9 remaining PRO skills (Policy, Scope, Denial, New Claim, Loss Below, Undisputed Funds, SPOL, State, RFI) — Strategy PRO already had one
3. Created API Sketch V2 (`prompts/sketches/API-SKETCH-V2.md`) with 6 gap fixes integrated
4. All work is design docs only — zero application code modified this session
5. Prior session's uncommitted UI changes (95vw width + 2-column grids) also committed

### Files Created This Session (11 total)
| File | What It Is |
|------|-----------|
| `prompts/sketches/API-SKETCH-PRO-CHAIN.md` | Frank's original API concept sketch — verbatim reference for Taha |
| `prompts/sketches/API-SKETCH-V2.md` | Enhanced sketch with pipeline enforcement, server-side context, model map, .docx routes, cost tracking, auth/spend cap |
| `prompts/01-policy-pro/policy-pro-schema.md` | 13 sections, 50+ fields. Armstrong data. Expanded with carrier, deductibles, exclusions, legal, agentic notes |
| `prompts/02-scope-pro/scope-pro-schema.md` | 10 sections, 27 fields. Armstrong data from existing JSON |
| `prompts/04-denial-pro/denial-pro-schema.md` | Mr. Hyde / Dr. Jekyll structure. 27 fields. Armstrong denial scenario |
| `prompts/05-new-claim-pro/new-claim-pro-schema.md` | Forward pressure framework. 27 fields. Scenario B anticipated |
| `prompts/06-loss-below-pro/loss-below-pro-schema.md` | 4-bucket gap analysis + scope reasonableness test. 35 fields. ITELL rejection baked in |
| `prompts/07-undisputed-funds-pro/undisputed-funds-pro-schema.md` | Two-doc output. Manager review checklist. Prompt payment clock |
| `prompts/08-spol-pro/spol-pro-schema.md` | Form fill with 85% completion. 15-day deadline tracking |
| `prompts/support/state-pro/state-pro-schema.md` | FL example. CRN pre-suit, prompt payment clocks, detection flags |
| `prompts/support/rfi-pro/rfi-pro-schema.md` | Array pattern (multiple RFIs per claim). ROR dual-route. 5-item FL example |

### Schema Coverage — Complete
Every completed PRO now has a schema:
| PRO | Schema | Status |
|-----|--------|--------|
| Policy PRO | policy-pro-schema.md | NEW |
| Scope PRO | scope-pro-schema.md | NEW |
| Strategy PRO | strategy-pro-schema.md | Already existed |
| Denial PRO | denial-pro-schema.md | NEW |
| New Claim PRO | new-claim-pro-schema.md | NEW |
| Loss Below PRO | loss-below-pro-schema.md | NEW |
| Undisputed Funds PRO | undisputed-funds-pro-schema.md | NEW |
| SPOL PRO | spol-pro-schema.md | NEW |
| State PRO | state-pro-schema.md | NEW |
| RFI PRO | rfi-pro-schema.md | NEW |

### API Sketch V2 — 6 Gap Fixes
| Gap | What V2 Adds |
|-----|-------------|
| Pipeline enforcement | Prerequisite map + branch gating after Strategy PRO |
| Server-side context | Server builds context automatically — client never sends it |
| Model map | Sonnet for extraction (Policy, Scope, SPOL, State, RFI), Opus for strategy (Strategy, Denial, New Claim, Loss Below, Undisputed) |
| .docx routes | GET /api/claim/:id/report/:proKey and /report/full |
| Cost tracking | _meta per PRO + _costSummary per claim |
| Auth + spend cap | Portal JWT, $500/week hard cap, superadmin override |

---

## What Needs to Happen Next Session

### Priority 1: Fix the Armstrong JSON Data Gap (45% missing)
The chain viewer only captures 24 of 91 data points from the Policy Pro docx report. The policy-pro-schema.md now defines the FULL schema (13 sections, 50+ fields). Next step:
1. Run Policy Pro skill against real Armstrong 68-page PDF
2. Compare output to Frank's docx report from Claude Desktop
3. Update `claims/armstrong.json` to match the full schema
4. Update server.js renderers for new sections

**This requires BINGO** — it's code changes to armstrong.json and server.js.

### Priority 2: Write Remaining Skill Specs
3 empty folders still need skill specs:
- `09-15-day-pro/` — 15 Day PRO
- `10-formal-demand-pro/` — Formal Demand PRO
- `11-30-day-pro/` — 30 Day PRO

Plus 45/60/75/90 Day interval specs (not yet stubbed).

**This does NOT require BINGO** — it's design/spec work.

### Priority 3: Write Schemas for New Skills
Once 15 Day, Formal Demand, and 30 Day specs are written, they each need a schema file following the same pattern.

---

## Key Files
- **App**: `server.js` (Express server + all renderers)
- **Claim data**: `claims/armstrong.json`
- **Skill specs**: `prompts/XX-name/name.md`
- **Schemas**: `prompts/XX-name/name-schema.md`
- **API sketches**: `prompts/sketches/API-SKETCH-PRO-CHAIN.md` (original) + `API-SKETCH-V2.md` (enhanced)
- **Original Policy Pro docx**: `C:\Users\FrankDalton\Desktop\Policy_Review_Armstrong_2026-03-05.docx`
- **Full gap analysis**: `C:\Users\FrankDalton\.claude\plans\golden-hugging-karp.md`

## How to Run the App
```
cd C:\Users\FrankDalton\myProjects\ccs-pro-skills
node server.js
```
Open http://localhost:3000

## Rules
- **BINGO rule**: Frank says BINGO before code changes
- **Communication tone**: Know the law, never cite it
- **Frank is NOT a programmer** — plain English
- **The docx report is the gold standard** — the chain viewer must match it
- **Git**: Pushed to ftdcad/ccs-pro-skills on master
