# HANDOFF — CCS Pro Skills — Mar 5, 2026 (Session 2)

## READ THIS FIRST

### What Happened This Session
1. Built a Node.js/Express app (localhost:3000) that reads claim JSON files from `/claims/` and renders them as interactive PRO Chain pages
2. Dashboard at GET /, chain view at GET /claim/:id
3. Armstrong test claim rendering with Policy PRO, Scope PRO, Estimating, Strategy PRO all populated
4. Pushed to GitHub: ftdcad/ccs-pro-skills (commit c8d300b)
5. Widened UI from 900px to 95vw
6. Changed info grids from 4-column to 2-column for document-style reading
7. **Then discovered the chain viewer is missing ~45% of the original Policy Pro report data**

### The Big Problem We Found
Frank ran the Policy Pro skill in Claude Desktop against the real Armstrong policy (68-page PDF). The resulting docx report has **91 data points**. The chain viewer's JSON only captures **24 of them fully**. 41 are completely missing. 13 have factual errors.

### Gap Analysis Summary

**Entire sections MISSING from chain viewer:**
- Insurance Carrier / Agent (agent name, location, phone, premium, premium breakdown)
- Exclusions / Gaps / Limitations (5 coverage gaps, 4 limitations, 5 exclusions = 15 items)
- Legal / Statutory Info (Statute of Limitations, OFAC Advisory)
- Agentic Notes (5 detailed analytical paragraphs)

**Partially missing from existing sections:**
- Deductibles: only 2 of 5 (missing Fungi $50, Water Backup $86, Premises Liability $52)
- Coverage Totals: only 4 of 10 (missing sublimits, combined total $329,623)
- Underwriting: missing Protection Class, Secondary Water Resistance, Opening Protection, County Appraiser URL, "Seasonal" occupancy designation
- Endorsements: 15 listed vs 20 in report

**13 Data accuracy errors between docx and JSON:**
- 1st Mortgagee: "NewRez LLC" (docx) vs "PNWBX LLC" (JSON)
- 2nd Mortgage loan#: digits transposed
- HELOC: "USAA" (docx) vs "USA" (JSON), labeled "HELOC" vs "Additional Interest"
- DL 24 11: "Non-Owner Occupied" (docx) vs "Owner Occupied" (JSON) — OPPOSITE
- DL 24 16: "Home Day Care Business" (docx) vs "Non-Owner Occupied Dwellings" (JSON) — DIFFERENT ENDORSEMENT
- Several form number mismatches
- ZIP code: 32169-3508 vs 32168

### What Needs to Happen Next Session

**Step 1: Run Policy Pro skill against the real policy**
Frank has the 68-page Armstrong policy PDF. The next Claude Code session should run the Policy Pro skill (at `prompts/01-policy-pro/policy-pro.md`) against that PDF and produce a full report. Compare the output to Frank's docx report from Claude Desktop. See if Claude Code gets the same data or different data. This determines which source is correct.

**Step 2: Fix the JSON schema**
Once we know the correct data, expand `pros.policy` in armstrong.json to include ALL sections from the report:
- carrier (agent, premium)
- deductibles (all 5, separate section)
- coverageTotals (all 10 lines + combined)
- underwriting (add protection class, water resistance, opening protection, appraiser URL)
- exclusionsGapsLimitations (gaps[], limitations[], exclusions[])
- legalStatutory (SOL, appraisal, OFAC)
- agenticNotes (array of {title, content})
- reviewMeta (reviewer, sourcePages)

**Step 3: Add renderers for new sections in server.js**

**Step 4: Fix the document-read layout**
Frank wants it to read like a document (top-to-bottom, section by section) not a dashboard (dense grids). The 2-column grid change was a start but more work needed.

### Key Files
- **App**: `C:\Users\FrankDalton\myProjects\ccs-pro-skills\server.js` (Express server + all renderers)
- **Claim data**: `C:\Users\FrankDalton\myProjects\ccs-pro-skills\claims\armstrong.json`
- **CSS**: `C:\Users\FrankDalton\myProjects\ccs-pro-skills\public\styles.css`
- **Policy Pro skill**: `C:\Users\FrankDalton\myProjects\ccs-pro-skills\prompts\01-policy-pro\policy-pro.md`
- **Original report (docx)**: `C:\Users\FrankDalton\Desktop\Policy_Review_Armstrong_2026-03-05.docx`
- **Full gap analysis**: `C:\Users\FrankDalton\.claude\plans\golden-hugging-karp.md`
- **Original chain viewer (Desktop)**: `C:\Users\FrankDalton\Desktop\ccs-pro-chain\` (still there, not deleted)

### How to Run the App
```
cd C:\Users\FrankDalton\myProjects\ccs-pro-skills
node server.js
```
Open http://localhost:3000 — dashboard shows Armstrong. Click to see chain.

### Rules
- **BINGO rule**: Frank says BINGO before code changes
- **Communication tone**: Know the law, never cite it
- **Frank is NOT a programmer** — plain English
- **The docx report is the gold standard** — the chain viewer must match it
- **Git**: Pushed to ftdcad/ccs-pro-skills, commit c8d300b on master

### Architecture Decision (This Session)
This is NOT just a viewer — it's the beginning of a case management system. Each claim is its own JSON file. Different staff members touch different PRO steps:
- Intake staff → Policy PRO, Scope PRO
- Estimators → Estimating (future Estimator PRO)
- Adjusters → Strategy PRO and downstream

The chain is the workflow guardrails. Adjusters follow it step by step. The JSON accumulates data as each PRO runs. The viewer shows where the claim stands.

Future layers: Claude API integration (skills execute and write to JSON), CRM iframe embedding, role-based access, notifications.
