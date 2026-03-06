# RESUME HERE — CCS Pro Skills

**Last updated:** 2026-03-06 (Session 5)

---

## WHERE WE ARE

### Claude API Integration — LIVE AND WORKING
Policy PRO is wired to the Claude API. Upload a policy PDF, click "Upload & Run Policy PRO", and Claude Sonnet 4.5 reads the full document and returns structured JSON that renders in the chain viewer.

**First real test:** Ammerman CCOP.pdf — 110K input tokens, 8.6K output tokens. Report came back successfully.

### Skill Specs — Pipeline Coverage
```
Policy -> Scope -> Strategy -> Denial/NewClaim/LossBelow -> Undisputed -> SPOL -> 15 DAY -> Formal Demand -> 30 Day -> 45/60/75/90 Day
  DONE     DONE     DONE              DONE                    DONE        DONE    EMPTY       EMPTY          EMPTY       NOT STUBBED
```

Support tools: State PRO = DONE, RFI/ROR Pro = DONE

### What Was Built This Session (Session 5)
1. **Claude API integration** — `runPolicyPro()` in server.js sends uploaded PDFs to Claude Sonnet 4.5 with the Policy PRO system prompt, gets structured JSON back, saves to claim file
2. **Loading overlay** — when you click Upload & Run, a full-screen overlay shows with a spinner and second counter while Claude processes
3. **Full Policy PRO renderer** — updated `renderPolicyBody()` handles the complete schema: coverage limits, carrier info, underwriting, mortgagees, flags, endorsements, exclusions/gaps/limitations, legal/statutory (full quoted text), agentic notes, review meta, and handoff
4. **Error handling** — if the API call fails, the claim shows an error state with the message instead of a blank card
5. **Async upload route** — form submits via fetch (JS intercept), server processes, returns JSON, client redirects
6. **dotenv** added for API key management — key lives in `.env` (gitignored)
7. **Model map** defined — Sonnet for extraction PROs, Opus for strategy PROs (only Policy PRO wired so far)

### Chain Viewer App — Full Claim Workflow
- Dashboard at `/` — lists all claims with progress bars
- **+ New Claim** button → form with "Paste from ClaimWizard" auto-fill
- Claim view shows the full PRO chain with upload prompts for the next step
- Upload → Claude API → structured JSON → rendered card (Policy PRO only so far)

---

## NEXT SESSION PRIORITIES

1. **Review the Ammerman Policy PRO output** — Frank has the report loaded in the browser. Check data quality, compare to what a human PA would extract. Fix any rendering issues.
2. **Polish the loading overlay** — staged messages instead of raw seconds (Reading document → Extracting data → Building report). Cosmetic only.
3. **Wire Scope PRO** — same pattern as Policy PRO but with the Scope PRO prompt. Upload photos/inspection notes → Claude → structured JSON.
4. **Write remaining skill specs** — 15 Day, Formal Demand, 30 Day, 45/60/75/90 Day folders are empty. Design work, no BINGO needed.
5. **Backwards compatibility** — the Armstrong claim uses old field names (coverage.A vs coverage.coverageA). Renderer handles both, but Armstrong data could be updated to match the new schema.

---

## KEY FILES

| What | Where |
|------|-------|
| Server (Express + API + renderers) | `server.js` |
| Styles | `public/styles.css` |
| Client JS (toggle + upload + overlay) | `public/chain.js` |
| Claim data | `claims/*.json` |
| Uploaded files | `uploads/[claimId]/` (gitignored) |
| Skill specs | `prompts/XX-name/name.md` |
| Schemas | `prompts/XX-name/name-schema.md` |
| API key | `.env` (gitignored — NEVER commit) |
| API design | `prompts/sketches/API-SKETCH-V2.md` |
| Full project context | `CONTEXT.md` |

## ARCHITECTURE

```
Browser → Express server (server.js)
  ├── GET /              → Dashboard (list claims)
  ├── GET /new           → New claim form (ClaimWizard paste)
  ├── POST /new          → Create claim JSON
  ├── GET /claim/:id     → Render chain view (server-side HTML)
  └── POST /claim/:id/upload/:proKey
        ├── multer saves file to uploads/
        ├── If proKey=policy → runPolicyPro() → Claude API → JSON
        ├── Save to claims/*.json
        └── Return JSON (fetch) or redirect (form)
```

## RULES
- **BINGO** before code changes. Spec/design talk is free.
- **Communication tone**: Know the law, never cite it in carrier letters.
- **.env** contains the API key — NEVER commit it.
- **Push to git** before ending every session.
