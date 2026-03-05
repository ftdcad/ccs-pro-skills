# HANDOFF — CCS Pro Skills — Mar 5, 2026

## READ THIS FIRST — Next Session

### What This System Is
ONE system, ONE repo. The skill specs (what Claude reads) AND the chain viewer (what the adjuster sees) are the SAME project. Not two repos.

- **Repo**: ftdcad/ccs-pro-skills (GitHub, make private)
- **Local**: C:\Users\FrankDalton\myProjects\ccs-pro-skills
- **Chain viewer HTML**: C:\Users\FrankDalton\Desktop\ccs-pro-chain (needs to be merged INTO ccs-pro-skills)

### The Architecture (Option B — decided Mar 4)
- **JSON = source of truth** — one JSON file per claim (e.g., `data/armstrong.json`)
- **HTML = working view** — interactive page with collapsible chevron sections, generated from JSON. This is what adjusters use day-to-day.
- **.docx = file of record** — formal upload to carriers. Generated from the same JSON.
- **Skill specs (.md files)** — what Claude reads to know HOW to do each PRO step
- **`generate.js`** — NOT BUILT YET. Template engine: reads JSON, outputs HTML. This is the critical missing piece.

### What Exists Today

#### Skill Specs (in `prompts/` folder, all .md)
| # | Skill | Status | File |
|---|-------|--------|------|
| 01 | Policy PRO | DONE | prompts/01-policy-pro/policy-pro.md |
| 02 | Scope PRO | DONE | prompts/02-scope-pro/scope-pro.md |
| 03 | Strategy PRO | DONE (spec) | prompts/03-strategy-pro/strategy-pro.md + strategy-pro-schema.md |
| 04 | Denial PRO | DONE | prompts/04-denial-pro/denial-pro.md |
| 05 | New Claim PRO | DONE | prompts/05-new-claim-pro/new-claim-pro.md |
| 06 | Loss Below PRO | DONE | prompts/06-loss-below-pro/loss-below-pro.md |
| 07 | Undisputed Funds PRO | DONE | prompts/07-undisputed-funds-pro/undisputed-funds-pro.md |
| 08 | SPOL PRO | DONE | prompts/08-spol-pro/spol-pro.md |
| 09 | 15 Day PRO | GAP | empty folder |
| 10 | Formal Demand PRO | GAP | empty folder |
| 11 | 30 Day PRO | GAP | empty folder |
| -- | State PRO (support) | DONE | prompts/support/state-pro/state-pro.md |
| -- | RFI Pro (support) | DONE | prompts/support/rfi-pro/rfi-pro.md |

#### Chain Viewer (on Desktop — needs to move into this repo)
- `index.html` — 555 lines, Armstrong claim hardcoded. Policy PRO + Scope PRO have real data. Estimating = "In Progress". Everything else = pending placeholder.
- `styles.css` — 459 lines. Full CCS design system. Navy theme. PRO color variants. Status pills. Flag cards.
- `chain.js` — 26 lines. Toggle/expand/collapse. Auto-opens complete + active sections.
- `data/armstrong.json` — 193 lines. Structured claim data.
- `data/state-reference/` — 14 files (13 states + matching chart)
- `CONTEXT.md` — 449 lines. Full architecture doc. Read this for all design decisions.

#### Updated .skill Files (from Mar 4 Cowork session)
Check Downloads folder for:
- `scope-pro-updated.skill` — rebuilt collaboratively with Armstrong. Has: waste factors (hip 15%, gable 10%), chalk annotation rules, gutter scan, 4-line ceiling protocol, drywall/plaster question, CCS severity scale, common mistakes, PA escalation triggers, Policy Pro Override (carrier refusal bypass), peril-based Agentic Notes (decided but not fully rewritten yet)
- `policy-pro-updated.skill` — EUO section removed, Agentic Notes added, Format A (full) / Format B (limited)
- Frank still needs to upload these to Claude settings (delete old, re-upload new)

### What Needs Building (Priority Order)

1. **Merge Desktop ccs-pro-chain INTO ccs-pro-skills repo** — one project, one place
2. **Build `generate.js`** — template engine: reads armstrong.json → outputs full HTML matching index.html structure
3. **Strategy PRO rewrite** — old GPT version reviewed Mar 4, routing logic solid, needs proper skill file with Agentic Notes (routing sanity check: does the route match the flags?)
4. **Scope PRO Agentic Notes rewrite** — change from cross-reference to peril-based QC checklists (hail, wind, hurricane, water)
5. **Remaining skill specs** — 15 Day, Formal Demand, 30 Day, 45/60/75/90 Day
6. **Armstrong carrier letter integration** — Frontline in investigation mode, SPOL deadline ~Oct 1 2025, occupancy conflict being probed

### Mar 5 Session Summary
- Explored 3 folders (ccs-pro-chain in myProjects, 15-day-cycle, Pro 90 master)
- Renamed 15-day-cycle → ccs-pro-skills
- Pushed to GitHub: ftdcad/ccs-pro-skills (8 commits)
- Moved strategy-pro-schema.md into prompts/03-strategy-pro/
- Archived Pro 90 master → Archived Files/Pro-90-master.zip, then deleted folder
- Deleted stale duplicate prompts from ccs-pro-chain copy in myProjects
- Created .gitconfig (Git Credential Manager handles auth)
- Found Desktop copy of ccs-pro-chain is the WORKING copy (browser loads from there)
- Recovered full Mar 4 Cowork session context (Frank pasted conversation)

### Mar 4 Cowork Session Summary (claude.ai — separate conversation)
Massive build session. Key decisions:
- **Option B chosen**: HTML viewer with chevron collapse/expand as working view, .docx as formal carrier upload
- **Scope Pro skill built from scratch** using Armstrong as live test — multiple iterations with Frank correcting mistakes (satellite dish hallucination, missed gutters, wrong pipe jack count, pitch rounding)
- **Policy Pro updated** — EUO removed, Agentic Notes added
- **Chain viewer built** — Armstrong claim, collapsible sections, status pills, handoff boxes, connector lines
- **Strategy PRO old GPT reviewed** — routing logic good, needs rewrite as skill file
- **Estimating guidelines ingested** — from CCS PDF, extracted decision triggers only (waste factors, ceiling texture rules, natural breaks, O&P rules, steep charges)
- **CCS Severity SOP ingested** — replaced generic 1-5 scale with actual CCS definitions

### Key Rules (ALWAYS)
- **BINGO rule**: Frank says BINGO before any code changes. Design talk is free, building is gated.
- **Communication tone (ALL PROs)**: Know the law, never cite it. No statute numbers in carrier correspondence.
- **Scope = work order**: No damage = not in the report.
- **Cumulative report pattern**: Each step reprints all prior sections + appends new. The report IS the state machine.
- **Frank is NOT a programmer** — explain in plain English.
- **Evidence only**: Never fabricate. If it's not in a photo, it goes "Not Accessed" or "Not Visible."

### Armstrong Test Claim
- Insured: Dale Armstrong
- Property: 836 E 20th Ave, New Smyrna Beach, FL 32168
- Carrier: Frontline / First Protective Ins. Co.
- Policy #: 7756322514 | Claim #: 01-000125628
- DOL: 10/10/2024 — Hurricane Milton
- Policy Type: Dwelling Fire (DP 00 03)
- Key flags: Occupancy conflict (tenant occupied + non-owner exclusion), calendar year hurricane deductible ($5,382), 18-year-old roof, Frontline probing occupancy in carrier letter

### File Locations
- Skill specs: C:\Users\FrankDalton\myProjects\ccs-pro-skills\prompts\
- Chain viewer: C:\Users\FrankDalton\Desktop\ccs-pro-chain\
- State reference data: C:\Users\FrankDalton\myProjects\ccs-pro-skills\data\state-reference\
- Archived scratch pad: C:\Users\FrankDalton\myProjects\Archived Files\Pro-90-master.zip
- CCS estimating guidelines: uploaded in Cowork session only (re-upload if needed)
- CCS severity SOP: uploaded in Cowork session only (re-upload if needed)
- Armstrong carrier letter: uploaded in Cowork session only (re-upload if needed)
