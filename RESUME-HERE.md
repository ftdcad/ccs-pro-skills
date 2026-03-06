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

## NEXT SESSION PRIORITIES — FROM FRANK (DO THESE FIRST)

### 1. EagleView supplemental upload is broken
Frank uploaded the policy, got the report, then realized he had the EagleView roof report too. He went to add it but the system didn't know what to do — it just said "uploading" and nothing happened. **The system has no logic for supplemental uploads to an already-completed PRO step.** Need to handle: "Policy PRO is already complete, but user is adding an EagleView — re-run Policy PRO with the new document added to the original."

### 2. Property underwriting is BAD — needs web search
The skill spec says to do web searches for county appraiser data (year built, sq footage, roof year, sales history, permits). But the Claude API call has NO web search tool. Claude is guessing at fields like occupancy ("owner occupied" when it probably isn't). The underwriting section came back weak — Frank says he could have found more info himself. **Need to either: (a) add web search tool use to the API call, or (b) do a separate property research step before/after the extraction.**

### 3. Report organization needs rework
Frank isn't happy with the section order and layout. Needs rearranging — specifics TBD when reviewing the actual output next session. The data is there but the presentation needs polish.

### 4. Overall: "Not a great report but it's working"
The plumbing works. The API call succeeds. Data comes back. But the output quality needs significant refinement before this is production-ready. Focus on making Policy PRO excellent before wiring up more PROs.

---

## LOWER PRIORITY (after above is fixed)
- Polish loading overlay (staged messages instead of raw seconds)
- Wire Scope PRO upload → Claude
- Write remaining skill specs (15 Day, Formal Demand, 30 Day, 45/60/75/90 Day)
- Update Armstrong data to match new schema field names

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
