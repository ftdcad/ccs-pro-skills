# RESUME HERE — CCS Pro Skills

**Last updated:** 2026-03-06 (Session 4)

---

## WHERE WE ARE

### Skill Specs — Pipeline Coverage
```
Policy -> Scope -> Strategy -> Denial/NewClaim/LossBelow -> Undisputed -> SPOL -> [15 DAY] -> Formal Demand -> 30 Day -> 45/60/75/90 Day
  DONE     DONE     DONE              DONE                    DONE        DONE    <<<NEXT>>>      EMPTY          EMPTY       NOT STUBBED
```

Support tools (fire on demand): State PRO = DONE, RFI/ROR Pro = DONE (renamed from rfi-pro this session)

Each completed PRO has TWO files: skill spec (`name.md`) + schema (`name-schema.md`). All 10 done.

### Chain Viewer App — NOW the real tool (not just a viewer)
Decision made this session: **the chain viewer IS the application**. It will accept uploads, run PROs via Claude API, generate reports, and advance claims through the pipeline.

**Built this session:**
- **+ New Claim button** on dashboard
- **New Claim form** (`/new`) with **Paste from ClaimWizard** auto-fill — paste raw CW text, fields populate automatically
- **Upload prompt** on claim view — detects current step, shows "NEXT STEP: Policy PRO — Upload the insurance policy", drag-and-drop upload zone
- **File upload route** — saves to `uploads/[claimId]/`, marks PRO step as active
- **multer** added as dependency for file handling

### What's NOT built yet (Phase 2)
- Claude API integration — upload goes to Claude, PRO runs, JSON comes back
- .docx report generation from PRO output
- Chain auto-advancement after PRO completes
- PDF-to-image Vision pipeline for scanned policies

---

## NEXT SESSION PRIORITIES

1. **Write 15 Day PRO skill spec** — `prompts/09-15-day-pro/` is empty. Design work, no BINGO needed.
2. **Write Formal Demand PRO skill spec** — `prompts/10-formal-demand-pro/` is empty.
3. **Write 30 Day PRO skill spec** — `prompts/11-30-day-pro/` is empty.
4. **Stub 45/60/75/90 Day PRO folders** — not created yet.
5. **Claude API integration** (Phase 2) — BINGO required. Wire uploads to Claude, get structured JSON back.

---

## KEY FILES

| What | Where |
|------|-------|
| Server (Express + all renderers) | `server.js` |
| Styles | `public/styles.css` |
| Client JS | `public/chain.js` |
| Claim data | `claims/*.json` |
| Skill specs | `prompts/XX-name/name.md` |
| Schemas | `prompts/XX-name/name-schema.md` |
| RFI/ROR Pro (renamed) | `prompts/support/rfi-ror-pro/` |
| API design | `prompts/sketches/API-SKETCH-V2.md` |
| Flowchart | `pro-chain-flowchart.html` |
| Full project context | `CONTEXT.md` |

## RULES
- **BINGO** before code changes. Spec/design is free.
- **Communication tone**: Know the law, never cite it in carrier letters.
- **Armstrong data** = test case only, not hardcoded.
- **Push to git** before ending every session.
