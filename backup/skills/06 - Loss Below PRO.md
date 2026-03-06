---
name: loss-below-pro
description: >
  Coastal Claims Services (CCS) Loss Below Pro™ — underpayment and below-deductible
  analysis tool. Use this skill whenever a carrier has acknowledged coverage but paid
  or estimated below CCS's scope, OR determined the loss falls below the deductible
  without issuing a formal denial. Routed here from Strategy Pro on the Loss Below track.
  Triggers: 'loss below', 'below deductible', 'underpaid', 'carrier low-balled',
  'supplement', 'carrier estimate low', 'below pro', 'loss below pro', 'partial repair
  wont work', 'scope fight'. Produces a CCS-branded .docx Loss Below Analysis Report.
---

# CCS Loss Below Pro™ — Underpayment Analyzer & Replacement Cost Strategist

## Overview

Analyzes the carrier's limited scope or below-deductible determination against CCS's
position and builds the replacement cost / pre-loss condition restoration argument
that forces scope expansion.

**Three Inputs:**
1. **Carrier's Letter or EOB** (required — their below-deductible determination or limited payment)
2. **Carrier's Estimate** (required — their scope of work and pricing)
3. **Loss Photos** (required — damage documentation)

**Chain context (pull from prior PRO reports):**
- Strategy Pro report — net dispute amount and leverage points already calculated
- Scope Pro Report + Xactimate Estimate — CCS full claimed position
- Policy Pro report — deductible type, ACV endorsements, RCV provisions

**Output:** A CCS-branded .docx Loss Below Analysis Report with scope reasonableness
analysis, replacement cost argument, matching analysis, gap breakdown, and next actions.

**Next step after this PRO:** State PRO — statutes and deadlines must be confirmed
before any supplement or correspondence is generated.

---

## CCS FIRM RULES — Non-Negotiable on Every Loss Below File

**ITELL:** Coastal Claims Services does not use, endorse, or cooperate with ITELL under
any circumstances. Reject any attempt by the carrier to involve ITELL or similar
third-party engineering vendors. Do not engage with ITELL reports or reference them
as valid. Flag any ITELL involvement immediately to the PA.

**No Visual Continuity Arguments:** Never argue visual continuity or appearance matching.
Scope is determined by functionality, material availability, and system integrity — not
appearance. Matching is only relevant when it proves repair is unreasonable. The argument
is always: "repair is not viable" — not "it won't look the same."

---

## CORE PRINCIPLE — Replacement Cost Means Pre-Loss Condition

**The carrier's scope is only acceptable if it can actually restore the property to
pre-loss condition. If it cannot, the policy requires more.**

- This is not a fight about dollars — it is a fight about whether partial repair
  can fulfill the policy's promise to restore
- The replacement cost policy argument is the foundation of every Loss Below response
- Matching is secondary — pre-loss condition restoration is primary
- If NO coverage was extended at all, route back to Strategy PRO for Denial assignment

---

## ROUTING CHECK — Run Before Any Analysis

> **Did the carrier extend ANY coverage to ANY claimed item — even partial payment?**

- **YES** → Loss Below track confirmed. Proceed.
- **NO** → Stop. Route back to Strategy PRO for Denial assignment.

---

## Step 1 — Confirm the Deductible Math

```
CCS Estimate (RCV):                    $__________
Applicable Deductible:                 $__________
CCS Net Above Deductible:              $__________

Carrier Estimate (RCV):                $__________
Carrier Net Above Deductible:          $__________
```

If CCS net is positive but carrier net is zero or negative — the below-deductible
determination is a scope problem, not a deductible problem. Prove the correct scope
value; the deductible argument resolves itself.

Confirm deductible type from Policy Pro. Percentage deductibles — calculate actual
dollar amount. If carrier applied wrong deductible type — flag as separate leverage point.

---

## Step 2 — The Scope Reasonableness Test

> **Can the carrier's proposed scope actually restore the property to pre-loss condition?**

Apply this test to each major disputed component.

### For Roofing (most common Loss Below scenario):

The roof was in functional, weather-tight condition prior to loss. Test the carrier's
partial repair scope against four specific failure points:

**1. Discontinued materials**
Roofing materials age, fade, and are frequently discontinued. Matching replacement
shingles to existing shingles from years prior is often impossible. Salvage yards
cannot guarantee quantity, color consistency, or style — using salvage puts the
insured in a worse position than pre-loss, not an equal one.

**2. Salvage material reality**
Even if salvage is available, material of the same age as the existing roof carries
the same age-related degradation. Installing aged salvage does not restore — it continues
the decline.

**3. Repair cascading effect**
Every shingle removed for repair means the existing fastener holes cannot be reused.
New fasteners must penetrate new locations in the waterproofing membrane. Each repair
area creates new penetration points — a partial repair creates a domino effect of
new leak potential across every repaired section.

**4. Functional condition**
The roof's pre-loss condition was functional: weather-tight, no active leaks. Partial
repair of an aged roof cannot guarantee return to that functional standard. The repaired
sections will not perform at the same level as the undamaged sections around them.

**The winning argument:**
"This is not a matching argument. Partial repair fails because the roof's age and
condition make restoration to pre-loss functional condition impossible through repair.
The replacement cost policy requires restoration to pre-loss condition. Partial repair
cannot achieve that. Replacement is therefore required under the policy."

**Do not lead with matching. Lead with pre-loss condition restoration.
Carriers have rehearsed responses to matching. They have weaker responses to
pre-loss condition restoration.**

### For Other Components:
Same reasonableness test — can the carrier's proposed scope restore to pre-loss
condition? If not, document specifically why, tied to this file's photos and facts.

---

## Step 3 — Line-by-Line Gap Analysis

**Bucket 1 — Items carrier missed entirely**
Not in their estimate. Strongest supplement items — no carrier position yet.

**Bucket 2 — Items carrier underpriced**
Wrong quantity, wrong unit, wrong line item selection, missing steep/high charge,
missing O&P, wrong material grade.

**Bucket 3 — Items carrier improperly depreciated**
Labor depreciated? Non-depreciable items depreciated? ACV endorsement misapplied?

**Bucket 4 — Items not yet submitted**
Pending supplements — second structure, HVAC, interior, code upgrades.
Not gap items yet. Note separately.

---

## Step 4 — O&P Analysis

O&P is owed when a general contractor is required to manage the work.
Carriers routinely omit it without justification.

- Did carrier include O&P?
- Does scope require GC coordination?
- Did carrier provide written reason for exclusion?

If owed: 10% overhead + 10% profit on applicable line items (not compounded).
Flag as primary supplement item with dollar amount calculated.

---

## Step 5 — Depreciation Recovery Analysis

```
Total RCV (CCS estimate):                  $__________
Total ACV paid:                            $__________
Total recoverable depreciation:            $__________
Depreciation withheld by carrier:          $__________
Disputed depreciation (incorrectly applied): $__________
```

Flag: labor depreciation, non-depreciable items depreciated, percentage caps exceeded,
ACV endorsement applied outside its scope.

---

## Step 6 — Carrier Dialogue Framework

File-specific what-they-say / what-CCS-says pairs based on the actual carrier position.

**Standard positions:**

**Carrier:** "We only cover direct damage — partial repair is sufficient."
**CCS:** "This is a replacement cost policy. When partial repair cannot restore to
pre-loss condition due to the roof's age and condition, replacement cost coverage
requires replacement. Partial repair of this roof does not achieve pre-loss condition."

**Carrier mentions salvage materials:**
**CCS:** "Salvage of equivalent age carries equivalent degradation. Installing salvage
does not restore — it replicates the decline. The policy requires restoration to
pre-loss condition, not continuation of it."

**Carrier says damage is cosmetic only:**
**CCS:** "The damage affects the roof's ability to perform its intended function —
weather exclusion. That is functional damage. Cosmetic exclusions do not apply to
functional impairment."

Add file-specific pairs based on the actual language in the carrier's letter.

---

## Step 7 — PA Action Plan

1. **Estimate status** — confirm no revisions pending before any submission.
2. **Supplement preparation** — Bucket 1 and 2 items ready now vs. needing verification.
3. **Pre-loss condition documentation** — obtain evidence of pre-storm functional
   condition: prior inspections, permits, real estate photos, Google Street View history.
4. **Depreciation demand** — if recoverable depreciation withheld and repairs are
   underway or complete, prepare depreciation release demand separately from supplement.
5. **O&P demand** — if owed and omitted, prepare O&P position statement.
6. **Peer review** — required if CCS estimate is $100K+, coverage dispute embedded
   in gap, or new adjuster on file.
7. **State PRO** — before any supplement or correspondence is submitted, proceed to
   State PRO to confirm statutes, supplement requirements, and carrier response deadlines.

---

## Build the Report Document

Read /mnt/skills/public/docx/SKILL.md before writing any code.
Use docx npm package. US Letter, 1-inch margins, Arial, navy #1B3A6B headers.
Do NOT re-print Policy Pro, Scope Pro, or Strategy Pro content. Reference those documents.

---

## Document Structure

**Title:** [Claim #] | [Insured Name] | Loss Below Pro™
Prepared by CCS Loss Below Pro™ | [Date]

### WHAT THEY DID
What they paid, what they limited, their exact stated reason.

### DEDUCTIBLE MATH
Full calculation. Whether below-deductible determination holds up.

### SCOPE REASONABLENESS TEST
Pre-loss condition restoration analysis. File-specific — not boilerplate.

### LINE-BY-LINE GAP ANALYSIS
Four-bucket table.

### O&P ANALYSIS
Owed or not. Dollar amount.

### DEPRECIATION RECOVERY ANALYSIS
Totals, disputed amounts, flags.

### CARRIER DIALOGUE FRAMEWORK
File-specific what-they-say / what-CCS-says.

### CRITICAL ACTIONS
Numbered from Step 7. Peer review is Item 1 if triggered.

### NEXT STEP
Proceed to State PRO. Documents to bring listed.

### AGENTIC NOTES

Loaded brief for State PRO and all downstream correspondence PROs.

Check and include if applicable:
- Pre-loss condition evidence gaps — what is missing and time-sensitive
- Carrier scope anomalies — quantities that don't match measurements, uninspected components
- Matching argument availability — secondary to pre-loss condition; note if available
- RCV policy language — quote the specific provision supporting pre-loss restoration
- Supplement timing strategy — comprehensive vs. piecemeal; note if Bucket 4 item warrants waiting
- Bad faith indicators — grossly inadequate estimate, no investigation, systematic O&P exclusion
- Appraisal clause availability — if gap is large and negotiations will be protracted
- Policy Pro cross-flags — ACV endorsements, matching exclusions, depreciation provisions

If nothing notable: "No additional observations."

---

## Output Rules

- Every report is a .docx file. No exceptions.
- Scope Reasonableness Test must be file-specific — never generic boilerplate.
- Pre-loss condition argument leads. Matching is secondary.
- Deductible math shown explicitly.
- O&P and depreciation addressed separately.
- Next Step directs to State PRO only.
- No correspondence or letter templates — that is downstream.

---

## File Naming

LossBelow_[ClaimNumber]_[InsuredLastName]_[Date].docx

---

## Edge Cases

- **No carrier estimate yet, just a letter** — document what the letter says, flag that
  no estimate was received, add obtaining written estimate as first Critical Action.
- **Multiple prior supplements submitted** — build gap from most recent carrier position.
  Summarize submission history.
- **Wrong deductible type applied** — flag as primary leverage point separate from scope fight.
- **Wrong Xactimate line items in carrier estimate** — document specific discrepancy.
  Line item selection errors are often the largest single gap source.
- **Recoverable depreciation withheld and repairs complete** — depreciation release demand
  is separate from supplement. Flag as immediate action.
- **Cosmetic exclusion invoked within a Loss Below** — pull exact endorsement language
  from Policy Pro. Test against functional damage documented in scope.

---

## What This Skill Does NOT Do

- Does not draft supplement letters, demand letters, or correspondence (downstream)
- Does not build Xactimate estimates — that is estimating
- Does not make coverage determinations
- Does not replace peer review — it triggers it
- Does not research state-specific requirements — that is State PRO
