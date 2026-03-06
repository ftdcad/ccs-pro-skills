# 15-Day Cycle — CCS Claims AI Pipeline

## What This Is
Rebuilding the CCS claims processing AI pipeline. Originally built as 13+ custom GPTs on ChatGPT (GPT-4.0). GPT model upgrades broke them. Rebuilding with Claude API using a **context engineering** approach — one orchestrator MD + individual skill files per PRO step. Delivered through the existing Coastal AI portal page (portal.coastalclaims.net/coastal-ai).

## The Pipeline (UPDATED Mar 4, 2026)

Full 90-day lifecycle. Steps marked with * are placeholders (no prompt/rules yet).

| # | Step | Day Range | Skill Status | Folder |
|---|------|-----------|--------------|--------|
| 0 | Claims AI (Intake) | Day 0 | GAP — no doc | — |
| 1 | Policy PRO | Day 1-3 | **DONE** — merged skill spec | 01-policy-pro/ |
| 2 | Scope PRO | Day 1-4 | **DONE** — extracted from .skill ZIP | 02-scope-pro/ |
| — | Estimating | Day 2-4 | HUMAN STEP — no AI | — |
| 3 | Strategy PRO | Day 2-3 | **DONE** — patched with client email template | 03-strategy-pro/ |
| 4a | Denial PRO | Post-Strategy (branch) | **DONE** — imported from Pro 90 master | 04-denial-pro/ |
| 4b | New Claim PRO | Post-Strategy (branch) | **DONE** — imported from Pro 90 master | 05-new-claim-pro/ |
| 4c | Loss Below PRO | Post-Strategy (branch) | **DONE** — patched with ITELL + visual continuity rules | 06-loss-below-pro/ |
| — | **State PRO** | Post-branch (orchestrator) | **DONE** — skill spec + DOI reference | prompts/support/state-pro/state-pro.md |
| 5 | UnDisputed Funds PRO | Day 4-5 | **DONE** — full patched spec saved | 07-undisputed-funds-pro/ |
| 6 | SPOL PRO | Day 4-5 | **DONE** — with insured email template | 08-spol-pro/ |
| 7 | 15 Day PRO | Day 5-6 | GAP — folder empty | 09-15-day-pro/ |
| 8 | Formal Demand PRO | Day 5-10 | GAP — folder empty | 10-formal-demand-pro/ |
| 9 | 30 Day PRO | Day 16-28 | GAP — folder empty | 11-30-day-pro/ |
| 10 | 45 Day PRO* | Day 30-45 | GAP — placeholder | — |
| — | Peer Review* | ~Day 45 | HUMAN CHECKPOINT | — |
| 11 | 60 Day PRO* | Day 46-60 | GAP — placeholder | — |
| 12 | 75 Day PRO* | Day 61-75 | GAP — placeholder | — |
| — | Peer Review* | ~Day 75 | HUMAN CHECKPOINT | — |
| 13 | 90 Day PRO* | Day 76-90 | GAP — placeholder | — |

**Pipeline flow:** Policy PRO -> Scope PRO -> Estimating (human) -> Strategy PRO -> (Denial / New Claim / Loss Below) -> **State PRO** (orchestrator) -> Undisputed Funds -> SPOL -> 15 Day -> Formal Demand -> 30 Day -> 45 Day -> Peer Review -> 60 Day -> 75 Day -> Peer Review -> 90 Day

**Branching after Strategy PRO:** Strategy PRO reads all prior reports + the estimate, asks questions, and determines which path the claim takes — Denial, New Claim, or Loss Below. All three paths converge at **State PRO**, which confirms state-specific statutes and deadlines before any correspondence is generated.

**End state at 90 days:** Claim is either resolved, in full litigation, or in alternative dispute resolution (ADR).

### Conditional / Position-Independent Tools

These are NOT numbered pipeline steps. They fire on demand when triggered by specific events, regardless of where the claim currently sits in the chain.

| Tool | Trigger | Folder |
|------|---------|--------|
| **RFI Pro** | Carrier sends a Request for Information (RFI). Also triggers on Reservation of Rights (ROR) letters — RFIs are frequently embedded inside ROR language. | prompts/support/rfi-pro/ |
| **State PRO** | Called by any downstream PRO before correspondence. Position-independent orchestrator. | prompts/support/state-pro/ |

**RFI Pro — Critical Notes:**
- When an RFI arrives, it becomes the MOST URGENT thing on the file — jumps to front of queue regardless of current pipeline position
- RFIs are frequently hidden inside Reservation of Rights (ROR) letters. The carrier sends one letter that is simultaneously an ROR AND an RFI. Adjusters see "Reservation of Rights" and think coverage fight — they miss the document requests buried on page 3. The insured never responds. Claim gets denied not on coverage but on cooperation.
- **Dual-route rule for ROR letters:** If an RFI is found inside an ROR, flag both: route the ROR to Strategy Pro for coverage position analysis AND run RFI Pro on the embedded requests simultaneously. Two separate responses to the same letter.

## Architecture Decision: Context Engineering (Feb 23, 2026)

### What we decided
**Context engineering** over prompt engineering. This is THE foundational decision.

### What that means
- **Orchestrator MD file** — thin traffic cop. Knows the pipeline order, reads uploaded reports to detect current step, routes to the right skill, enforces the reprint rule. Built LAST after all skills are refined.
- **Individual skill files** — one per PRO step. Each skill has its own rules, role, report template, and input requirements. Cleaned up from existing GPT prompts.
- **Cumulative report pattern** — each step reprints ALL prior report sections verbatim, then appends its new section at the bottom. One growing document per claim.
- **The report IS the state machine** — no database, no session tracking. The uploaded document tells Claude exactly where the claim is in the 90-day lifecycle.

### How it works (adjuster experience)
1. Adjuster starts a conversation
2. Orchestrator MD says "upload your AI report"
3. Claude reads the report, scans the section headers, identifies the last completed step
4. Claude selects the next skill in the pipeline, loads those rules
5. Claude may ask clarifying questions (e.g., Strategy PRO determines denial/new claim/loss below)
6. Claude generates the new section
7. Claude reprints all prior sections + new section as one cumulative Word doc
8. Adjuster downloads, saves to ClaimWizard AI Reports folder
9. Next time they come back, they upload the latest report and repeat

### Why context engineering wins
- GPTs were islands — Strategy Pro had to re-interpret Policy Pro's output cold, with no shared vocabulary or logic
- Context engineering means Claude wrote the prior sections under the same rule set — it understands its own flags and findings
- The cumulative report eliminates the "upload 6 separate files" problem
- Each skill can use the right model (Sonnet for extraction, Opus for strategy)
- Skills are independent but connected through the report chain

### Build order
1. Design conversations — nail down each step (IN PROGRESS)
2. Clean up each PRO tool prompt into a skill file (10 DONE as of Mar 4 — 8 linear + 2 support)
3. Build the orchestrator MD LAST (depends on knowing all final steps)

## How GPTs Worked (Reference)

### GPT Structure (what we're migrating from)
- **Instructions** = system prompt defining behavior (3-8K tokens each)
- **Knowledge files** = report templates uploaded as .docx (RAG-style retrieval)
- **Conversation starters** = prompts like "Enter the DOL, Claim #, Roof Report, Policy or Letter"
- Each GPT was standalone — no awareness of other tools

### What broke
- Built on GPT-4.0, worked great for ~6 months
- OpenAI model upgrades (5.2) changed behavior — same prompts, worse output
- Custom GPTs stopped following instructions reliably

## Source Documents
- Original GPT prompts: `C:\Users\FrankDalton\Desktop\desk\01_AI_Prompts_CCS_Pro\` (~40 files, many duplicates/drafts)
- Master list: `AI_PROMPTS_MASTER_LIST.md` in that folder
- Master document: `CCS_AI_PROMPT_MASTER_DOCUMENT.docx` in that folder
- Reference screenshots: `reference-screenshots/` in project root

## Key Reference Screenshots
| File | Shows |
|------|-------|
| portal-coastal-ai-page.png | Current portal UI — grid of AI tool cards |
| claimwizard-ai-reports-folder.png | ClaimWizard file structure — AI Reports folder where reports get saved |
| chatgpt-custom-gpts-sidebar.png | All original custom GPTs in ChatGPT sidebar |
| gpt-policy-pro-config.png | GPT config page — instructions + knowledge files + model selection |
| pipeline-flowchart.png | Original 15-step flowchart |
| full-pipeline-90-day.png | Full 90-day pipeline with 45/60/75/90 day steps + peer reviews |

## Decisions MADE (Feb 23, 2026)
1. **AI Backend**: Claude API — dramatically better quality than GPT
2. **Approach**: Context engineering — orchestrator MD + individual skill files
3. **Frontend**: Already built — Coastal AI page in employee portal (Talaha manages, DO NOT MODIFY)
4. **Users**: Field adjusters (non-technical, singular user-case like doctor/patient — one claim, one adjuster, one step at a time)
5. **Model strategy**: Sonnet for extraction tools (Policy Pro, Scope Pro, SPOL Pro). Opus for strategic tools (Denial Pro, Strategy Pro, Loss Below Pro).
6. **PDF handling**: Policies are scanned image-based PDFs. Need PDF→image→Claude Vision pipeline.
7. **Output format**: Word (.docx) reports
8. **Pipeline enforcement**: Forced order — orchestrator detects current step from uploaded report, won't skip ahead
9. **Report pattern**: Cumulative — full reprint of all prior sections + new section at bottom. One growing document per claim.
10. **Report storage**: Adjusters save reports to ClaimWizard → AI Reports folder
11. **Build order**: Skills first, orchestrator last
12. **Steps are FLUID** — pipeline chart will evolve during design sessions

## Head-to-Head Test Results (Policy Pro — Armstrong Dec Page)
| Metric | GPT 5.2 (Custom GPT) | Claude Desktop (Opus) |
|--------|----------------------|----------------------|
| Speed | ~4 seconds | ~2-3 minutes |
| Basic extraction | Good | Good |
| Property research | None | Web lookup — found sq ft, lot size, beds/baths, last sale, Redfin estimate |
| Endorsements | Not listed | Every form number with plain-English explanations |
| Exclusions/Gaps | Not analyzed | Full checklist (matching, cosmetic, ACV, screen, sinkhole, etc.) |
| Strategic flags | None | 10 agentic notes (DP-3 vs HO-3, seasonal/tenant conflict, low Coverage C, no L&O on 1985 property, existing damage exclusion warning) |
| Verdict | Data extraction only | **Data + strategy + flags** — significantly more useful |

**Test doc**: Armstrong Dec Page (68 pages, all scanned images)

## Session Log
- **Feb 23, 2026 (Session 1)**: Project started. Read all 40 files from AI Prompts folder. Mapped every file to its PRO step. Identified 3 gaps (Claims AI intake, Formal Demand PRO, 30 Day PRO). Set up folder structure. Ran head-to-head Policy Pro test (GPT vs Claude). Decision: Claude API.
- **Feb 23, 2026 (Session 2 — GSD Init)**: Deep design conversation. Established context engineering approach (not prompt engineering). Defined cumulative report pattern, orchestrator + skills architecture, build order (skills first, orchestrator last). Updated pipeline to full 90-day lifecycle (17 steps including 45/60/75/90 Day PRO + 2 peer review checkpoints). Saved all reference screenshots. Steps are still fluid — chart will evolve. Next: start working through each step, cleaning up prompts into skills.
- **Mar 4, 2026 (Session 3 — Skill File Consolidation)**: Major session. Consolidated all skill specs into canonical project structure. Started with 7 from multiple sources (conversation drafts, Desktop Pro 90 master folder, .skill ZIP archives). Then added Undisputed Funds Pro (with communication templates — 2 emails + 1 attached letter), SPOL Pro (with insured email template), and RFI Pro (conditional/position-independent, ROR detection rule). State PRO hybrid architecture decided. DOI Reference Index for all 50 states. Merlin Law Group state guides extracted. 10 total skill specs on disk (8 linear chain + 2 support). 6 git commits made. See details below.

## Mar 4 Session Details

### Files Written This Session
| File | Source | Notes |
|------|--------|-------|
| `prompts/01-policy-pro/policy-pro.md` | MERGED: Desktop `Policy_PRO updated.md` + Local `policy-pro-skill.md` | Desktop had YAML/branding/agentic notes. Local had security section + inline report templates. Old `policy-pro-skill.md` deleted. |
| `prompts/02-scope-pro/scope-pro.md` | Extracted from Desktop `scope-pro-updated.skill` (ZIP archive) | .skill file was binary ZIP, not text. Extracted via Python zipfile. |
| `prompts/03-strategy-pro/strategy-pro.md` | Desktop flat file + existing skill version | Patched with client email template that was missing from skill version |
| `prompts/04-denial-pro/denial-pro.md` | Imported from Desktop `Pro 90 master/denial pro/Denial_PRO.md` | Was completely missing from project |
| `prompts/05-new-claim-pro/new-claim-pro.md` | Imported from Desktop `Pro 90 master/New Claim Pro/New_Claim_PRO.md` | Was completely missing from project |
| `prompts/06-loss-below-pro/loss-below-pro.md` | Desktop flat file + existing skill version | Patched with ITELL rejection rule + No Visual Continuity rule |
| `prompts/support/state-pro/state-pro.md` | Conversation draft from Frank | Full skill spec + DOI Reference Index appended. TX production-ready, others web search fallback. |
| `data/state-reference/STATE-DOI-REFERENCE.md` | Conversation draft from Frank | All 50 states + DC — DOI websites, PA licensing status, high-priority states |
| `data/state-reference/TX/` | Created empty | Placeholder for TX JSON files |
| `prompts/07-undisputed-funds-pro/undisputed-funds-pro.md` | Conversation draft from Frank (3 revisions) | Two-doc workflow (Strategic Analysis + Demand Letter). Communication templates: 2 emails + 1 attached letter. Citation tone fix, 10-day default, cumulative report rule, protective language checklist. |
| `prompts/08-spol-pro/spol-pro.md` | Conversation draft from Frank (2 revisions) | Sworn proof of loss prep. [NOT PROVIDED] pattern for missing data. 24hr delivery rule. Insured email with hot potato framing. |
| `prompts/support/rfi-pro/rfi-pro.md` | Conversation draft from Frank | Conditional/position-independent. ROR detection rule (scan every ROR for embedded RFIs). Dual-route: ROR to Strategy Pro + RFI Pro simultaneously. Escalation flags for 2nd/3rd requests. |

### State PRO Architecture (Decided Mar 4, updated Mar 6)
- **SHARED SERVICE — NOT just a pipeline step.** Each state sub-agent is a comprehensive knowledge base — everything about adjusting in that state. Different portal consumers query different slices:
  - **State PRO** (PRO chain) queries the **claims handling** slice: deadlines, SOL, carrier obligations, appraisal rules, matching regs
  - **Compliance tab** queries the **licensing/bonding** slice: adjuster licensing, business licensing, bonds, CE requirements
  - **Future portal features** query their own slices as needed
  - The State PRO orchestrator is scoped — it ONLY touches claims handling data, even though the full state sub-agent knows everything about that state
  - The flowchart shows states on a side panel for this reason — they're shared infrastructure, not owned by the chain
  - The PRO chain replaces the current Coastal AI tab (independent GPTs). The state sub-agents also power the Compliance tab.
- **Hybrid model**: Layer 1 = hardcoded core facts for top states. Layer 2 = web search for all others, flagged "verify before acting."
- **Top 6 states** (CCS priority): FL, TX, GA, SC, LA, IL
- **TX is production-ready** in skill spec — full carrier obligations, PA compliance, TWIA detection, 542A fee trap, suit bar risk
- **10 fields per state**: notice of loss, proof of loss, pre-suit notice + cure window, carrier ack deadline, carrier investigation deadline, SOL breach, SOL bad faith, appraisal rules, EUO rules, matching reg
- **Merlin Law Group guides**: 14 PDFs extracted to data/state-reference/ — 13 state files + 1 matching chart. Some fields flagged "web search required."
- **Portal integration**: State PRO feeds into portal.coastalclaims.net/compliance (798 rules, 50 states). Interface stubs in skill spec. Same state data will serve Compliance tab, CRM functions, and any portal feature that needs state-specific rules.

### Communication Tone Rule (ALL PROs)
Know the law, never cite it. No statute numbers or case law in correspondence sent to carriers. "It's my understanding I should hear a response in no greater than 10 days" — NOT "Per Statute 627.70131(5)(a)..." PAs are not lawyers. Carriers will use legal citations against you. Internal docs (like State PRO reports) can cite freely.

### Undisputed Funds Pro — DONE
- Full patched spec saved to `prompts/07-undisputed-funds-pro/undisputed-funds-pro.md`
- **Patches applied**: (1) citation tone fix — statutes in Document 1 (internal) only, never in the letter, (2) cumulative report rule for Document 1, (3) 10-day default response window, (4) carrier-paid-to-date verification question instead of asking adjuster to calculate, (5) validate.py flagged as build dependency (not blocking)

### Desktop Pro 90 Master Folder
- Located at `C:\Users\FrankDalton\Desktop\Pro 90 master`
- Contains all skill specs + ~10 duplicate files (copy artifacts ending in `0`, `o`, `2`, `22`, `l`)
- All needed files imported to project — duplicates flagged for cleanup but NOT deleted

### What's NOT Done Yet
1. **TX JSON files** — `TX_carrier_obligations.json` and `TX_pa_compliance.json` referenced by state-pro.md but not created (data exists inline in the .md)
2. **Duplicate DOI Reference** — exists as both standalone `data/state-reference/STATE-DOI-REFERENCE.md` AND appended to `prompts/support/state-pro/state-pro.md` (intentionally — skill = behavior, data file = lookup table)
3. **Empty prompt folders**: 00-universal-core-rules/, 09-15-day-pro/, 10-formal-demand-pro/, 11-30-day-pro/
4. **Desktop Pro 90 master cleanup** — ~10 duplicate files not deleted
5. **State reference web search gaps** — some Merlin extraction fields flagged "web search required" across state files
6. **Remaining skill specs**: 15 Day Pro, Formal Demand Pro, 30 Day Pro, and 45/60/75/90 Day interval specs
