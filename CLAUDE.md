# 15-Day Cycle — CCS Claims AI Pipeline

## READ FIRST
Open `CONTEXT.md` for full project state, session log, and what's not done yet.

## What This Is
Rebuilding CCS's claims processing AI pipeline. Originally custom GPTs on ChatGPT (GPT-4.0). GPT model upgrades broke them. Rebuilding with Claude API, delivered through the existing Coastal AI portal page.

## Key Facts
- **Frontend**: Already built — portal.coastalclaims.net/coastal-ai (Talaha manages portal, DO NOT MODIFY portal code)
- **Backend**: Claude API (decided Feb 23 after head-to-head test — Claude quality >> GPT)
- **Users**: Field adjusters, non-technical. Upload doc, get report. That's it.
- **PDF handling**: Insurance policies are scanned image-based PDFs. Need PDF->image->Claude Vision pipeline.
- **Model strategy**: Sonnet for extraction (Policy Pro, Scope Pro, SPOL). Opus for strategy (Denial Pro, Strategy Pro, Loss Below).
- **Source prompts**: `C:\Users\FrankDalton\Desktop\desk\01_AI_Prompts_CCS_Pro\`
- **Communication tone**: Know the law, never cite it. No statute numbers in carrier correspondence. Internal docs can cite freely.
- **BINGO rule**: Frank says BINGO before any code changes. Design talk is free, building is gated.

## Pipeline Flow (Updated Mar 4)
Policy PRO -> Scope PRO -> Estimating (human) -> Strategy PRO -> (Denial / New Claim / Loss Below) -> **State PRO** -> Undisputed Funds -> SPOL -> 15 Day -> Formal Demand -> 30/45/60/75/90 Day + Peer Reviews

## Skill Spec Status (as of Mar 4, 2026)

### Linear Chain Steps
| Skill | Status | File |
|-------|--------|------|
| Policy PRO | DONE | prompts/01-policy-pro/policy-pro.md |
| Scope PRO | DONE | prompts/02-scope-pro/scope-pro.md |
| Strategy PRO | DONE | prompts/03-strategy-pro/strategy-pro.md |
| Denial PRO | DONE | prompts/04-denial-pro/denial-pro.md |
| New Claim PRO | DONE | prompts/05-new-claim-pro/new-claim-pro.md |
| Loss Below PRO | DONE | prompts/06-loss-below-pro/loss-below-pro.md |
| Undisputed Funds PRO | DONE | prompts/07-undisputed-funds-pro/undisputed-funds-pro.md |
| SPOL PRO | DONE | prompts/08-spol-pro/spol-pro.md |
| 15 Day PRO | GAP | 09-15-day-pro/ (empty) |
| Formal Demand PRO | GAP | 10-formal-demand-pro/ (empty) |
| 30 Day PRO | GAP | 11-30-day-pro/ (empty) |

### Conditional / Position-Independent (support/ folder)
| Skill | Status | Trigger | File |
|-------|--------|---------|------|
| State PRO | DONE | Called before any correspondence | prompts/support/state-pro/state-pro.md |
| RFI Pro | DONE | Carrier RFI letter OR ROR letter with embedded RFI | prompts/support/rfi-pro/rfi-pro.md |

**RFI Pro critical rule:** RFIs are frequently hidden inside Reservation of Rights (ROR) letters. Any ROR upload must be scanned for embedded RFIs. If found: dual-route — ROR to Strategy Pro for coverage + RFI Pro for document requests. Two responses to one letter.

## State PRO Architecture
- Hybrid: Layer 1 = hardcoded core facts (TX production-ready, FL/GA/SC/LA/IL pending). Layer 2 = web search fallback for all other states.
- DOI Reference Index for all 50 states appended to state-pro.md
- Merlin Law Group state guide extractions in data/state-reference/
- Portal integration stubs (routes to compliance hub eventually)

## Build Approach
- Context engineering: orchestrator MD + individual skill files
- Cumulative report pattern — each step reprints all prior sections + appends new
- The report IS the state machine — no database, no session tracking
- Use GSD framework with parallel agents for independent work
- Skills first, orchestrator LAST

## Current Status (Mar 4, 2026)
- 10 skill specs written and saved (8 linear + 2 conditional/support)
- State reference data extracted from Merlin guides (13 states + matching chart)
- Git commits made this session
- NEXT: 15 Day Pro, Formal Demand, 30 Day, then remaining day-interval specs
