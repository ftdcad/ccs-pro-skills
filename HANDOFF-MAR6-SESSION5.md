# HANDOFF — CCS Pro Skills — Mar 6, 2026 (Session 5)

## READ THIS FIRST

### What Happened Sessions 4 & 5

**Session 4** (previous Claude instance — changes in code, NOT committed):
1. Enhanced `POLICY_PRO_SYSTEM_PROMPT` in server.js — replaced stripped-down JSON extractor with full skill spec (6-step extraction process, agentic notes, supplemental doc handling, mandatory checks, better endorsement classification)
2. Switched Policy PRO model from Sonnet to Opus (`PRO_MODEL_MAP.policy = 'claude-opus-4-6'`) — quality gap was too big
3. Added supplemental upload: completed PRO steps show "Add Supplemental Documents" dropzone. Server combines old + new files, re-runs the PRO
4. Added "Re-run Analysis" button on completed steps — one click re-processes existing files with latest model/prompt
5. Added "Delete Claim" button (red, in toolbar) with confirmation dialog
6. Fixed drag-and-drop bug: proKey resolving to `"dropzone"` instead of `null` for main upload form
7. Updated chain.js: all upload forms + dropzones handled via querySelectorAll, processing overlay takes title/detail params
8. Added CSS for supplemental upload, re-run button, delete button

**Session 4 ended badly** — server wasn't restarted after code changes, Claude tried PowerShell restart, broke things. Frank saw white page on claims.

**Session 5** (this session — bug fix):
1. Found root cause: `claimId` variable used on lines 1042/1046 but declared on line 1052 in `renderChainPage()`. Session 4 added `claimId` as a parameter to `renderBranchRow()` and `renderSection()` but left the variable declaration below the code that uses it.
2. Moved `const claimId = m.claimNumber...` above the chain HTML builder loop, removed duplicate declaration lower down.
3. Server running again at http://localhost:3000 — both homepage and claim pages return 200.

### Files Modified (Sessions 4 + 5 combined)
| File | Changes |
|------|---------|
| `server.js` | Enhanced POLICY_PRO_SYSTEM_PROMPT (~100 lines), switched model to Opus, added `renderSupplementalUpload()`, added `renderBranchRow/renderSection/renderActiveSection` claimId param, re-run route (`POST /claim/:id/rerun/:proKey`), delete route (`DELETE /claim/:id`), delete button in toolbar, **fixed claimId declaration order** |
| `public/chain.js` | Generalized for multiple upload forms/dropzones, added `rerunPro()`, added `deleteClaim()`, fixed proKey logic in drop handler, `showProcessingOverlay()` takes title/detail params |
| `public/styles.css` | Added `.supplemental-upload`, `.rerun-row`, `.btn-rerun`, `.btn-delete` styles |

### New Claim Files (untracked)
| File | What |
|------|------|
| `claims/4693Q539R.json` | Jaroma / State Farm / VA — test claim from Session 4 (Policy Pro ran on Sonnet) |
| `claims/A00007316737.json` | Unknown — created during testing |

---

## What Needs to Happen Next Session

### Priority 1: Test Opus Quality on Policy Pro
The whole point of Session 4 was improving Policy Pro output quality. The Opus switch + enhanced prompt are in but UNTESTED — the server was broken before Frank could re-run. Use the Re-run Analysis button on an existing claim or create a new one.

### Priority 2: Fix Multi-File Drag-and-Drop
Frank reported: dropping policy first, then dragging EagleView second — second file overwrites first instead of adding to it. The file input replaces on each drop rather than accumulating. Options:
- Make dropzone accumulate files across multiple drops
- Add separate labeled drop zones ("Policy Document" + "EagleView / Supplemental")

### Priority 3: Write Remaining Skill Specs
Still empty: `09-15-day-pro/`, `10-formal-demand-pro/`, `11-30-day-pro/`, plus 45/60/75/90 Day intervals. Design work — no BINGO needed.

### Priority 4: Armstrong JSON Data Gap (45% missing)
Policy Pro schema defines 50+ fields but armstrong.json only has 24 data points. Needs real PDF re-run. BINGO required.

---

## Key Files
- **App**: `server.js` (Express server + renderers + Claude API + all routes)
- **Frontend JS**: `public/chain.js` (toggle, upload, drag-drop, re-run, delete)
- **Frontend CSS**: `public/styles.css`
- **Claim data**: `claims/*.json`
- **Skill specs**: `prompts/XX-name/name.md`
- **Schemas**: `prompts/XX-name/name-schema.md`
- **API sketches**: `prompts/sketches/API-SKETCH-*.md`

## How to Run
```
cd C:\Users\FrankDalton\myProjects\ccs-pro-skills
node server.js
```
Open http://localhost:3000

## Model Map (current in server.js)
| PRO | Model | Reason |
|-----|-------|--------|
| Policy | claude-opus-4-6 | Extraction + strategic analysis — Sonnet quality gap too big |
| Scope | claude-sonnet-4-5-20250929 | Extraction only |
| Strategy | claude-opus-4-6 | Strategy |
| Denial | claude-opus-4-6 | Strategy |
| New Claim | claude-opus-4-6 | Strategy |
| Loss Below | claude-opus-4-6 | Strategy |
| Undisputed | claude-opus-4-6 | Strategy |

## Rules
- **BINGO rule**: Frank says BINGO before code changes
- **Communication tone**: Know the law, never cite it
- **Frank is NOT a programmer** — plain English, restart servers for him
- **Git**: Push to ftdcad/ccs-pro-skills on master
