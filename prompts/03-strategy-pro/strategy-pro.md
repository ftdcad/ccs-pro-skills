---
name: strategy-pro
description: >
  Coastal Claims Services (CCS) Strategy Pro™ — claims strategy analysis and track assignment tool.
  Use this skill whenever a user uploads a Policy Pro report, Scope Pro report, and carrier position
  document and is ready to determine the dispute path. Triggers: 'strategy', 'strategy pro',
  'claims strategy', 'what track', 'which track', 'denial track', 'loss below', 'new claim track',
  'carrier position', 'carrier came back', 'which way do we go', 'what do we do next', or any
  request to analyze a carrier response and assign a dispute path. Produces a CCS-branded .docx
  Claims Strategy Report. This skill is MANDATORY before routing to any downstream PRO track.
---

# CCS Strategy Pro™ — Claims Strategy Analyzer & Track Assignment

## Overview

Takes the completed Policy Pro and Scope Pro reports plus the carrier's current position and produces
a track assignment with a first-action plan.

**Three Inputs → One Strategic Decision:**
1. **Policy Pro Report** (required — coverage, deductibles, endorsements, legal provisions)
2. **Scope Pro Report + Estimate** (required — CCS full claimed RCV, line items, total)
4. **Carrier Position** (required — denial letter, EOB/EOS, partial payment, verbal confirmation)

**Output:** A CCS-branded `.docx` Claims Strategy Report that assigns one of three tracks and
delivers the first executable action items specific to that track.

---

## CORE PRINCIPLE — Strategy = One Decision, Clearly Documented

**Strategy Pro does not produce opinions. It produces a track assignment backed by documented facts.**

- Every finding comes from the three input documents — never from assumption
- The gap between CCS estimate and carrier position is the single most important number in this report
- The correct track is determined by facts, not preference — if the numbers say Loss Below, it's Loss Below
- First action items must be executable — specific, assigned, deadlined
- Do NOT draft correspondence in this document — that belongs to the downstream track PRO
- Do NOT repeat policy basics, claim header data, or coverage details that already live in the Policy Pro
  report — reference them, don't copy them. The chain carries that data.

---

## The Three Tracks

### 🔴 DENIAL PRO
**Trigger:** Carrier has issued a written denial of the claim — full or partial coverage denial.

The carrier has taken a formal coverage position. They are saying the loss is not covered,
not storm-related, excluded under an endorsement, or otherwise outside the policy. This is
the most adversarial track and requires the most documentation-intensive response.

**Common denial grounds to identify:**
- No covered peril (hail/wind not confirmed for date of loss)
- Pre-existing damage or maintenance exclusion invoked
- Cosmetic damage exclusion applied
- Late notice of loss
- Vacancy or occupancy issue
- Cause of loss exclusion (earth movement, flood, etc.)
- ACV roof endorsement reducing payment to zero after depreciation
- Prior damage not repaired (prior loss exclusion)

**Peer review:** Mandatory on all denial track assignments. Must be submitted to CRM within 24 hours.

---

### 🔵 NEW CLAIM PRO
**Trigger:** Carrier has acknowledged the claim but has NOT yet issued a payment or denial. OR
claim was onboarded with CCS before any carrier response.

The claim is active and moving through the carrier's process. CCS is establishing its position
early — before or concurrent with the carrier's adjuster inspection — to influence the initial
settlement direction.

**Common scenarios:**
- Claim just submitted; carrier inspection not yet scheduled
- Carrier acknowledged receipt; adjuster assignment pending
- First inspection completed; carrier estimate not yet received
- Carrier issued an ACV payment only — depreciation withheld, no formal denial issued

**Key strategic priority:** Get ahead of the carrier's adjuster. Submit CCS scope early.
Set the negotiation baseline before the carrier sets theirs.

---

### 🟣 LOSS BELOW PRO
**Trigger:** Carrier has issued a payment or estimate that is below CCS's Scope/Estimate by a
meaningful gap, AND the carrier has NOT issued a formal coverage denial.

The carrier acknowledges coverage but has undervalued the loss. The gap between CCS estimate
and carrier position is the dispute.

**Two sub-scenarios:**
- **Below Deductible:** Carrier's payment or estimate is at or below the applicable deductible —
  effectively a zero-payment outcome without a formal denial. Treat as Loss Below, not Denial.
- **Underpaid:** Carrier paid something, but CCS estimate exceeds carrier estimate by more than
  the threshold (see Decision Matrix below).

---

## Step 1 — Confirm Inputs

Before any analysis, confirm all three inputs are present:

- [ ] Policy Pro Report received
- [ ] Scope Pro Report received
- [ ] Xactimate Estimate received (raw estimating output — not a PRO report)
- [ ] Carrier position received (letter, EOB, verbal confirmation — note source if verbal)

If the carrier position is verbal only, note in the report:
> ⚠️ **Carrier position received verbally.** Written confirmation pending. Track assignment
> based on verbal status — update when written confirmation received.

If any input is missing, stop and request it. Do not proceed with incomplete inputs.

---

## Step 2 — Calculate the Gap

The gap is the core number. Calculate it before anything else.

```
CCS Estimate (RCV):           $__________
Carrier Position (RCV):       $__________
Gross Gap:                    $__________
Applicable Deductible:        $__________
Net Dispute Amount:           $__________  (Gap minus deductible)
```

**If carrier has issued no estimate yet:** Gap = CCS full RCV minus deductible. Note as "Projected Gap."

**If carrier estimate exists:** Pull their total from the EOB/EOS. Calculate line by line if scope
allows — note the top 3-5 items driving the gap.

---

## Step 3 — Apply the Decision Matrix

Use this matrix to assign the track. No exceptions without documented reasoning.

| Carrier Position | Gap vs. Deductible | Assigned Track |
|---|---|---|
| Formal written denial (full or partial coverage) | Any | 🔴 Denial PRO |
| No response yet / acknowledged only | Any | 🔵 New Claim PRO |
| ACV payment issued, no denial | Any | 🔵 New Claim PRO |
| Paid or estimated below deductible (no denial) | Gap ≤ $0 net | 🟣 Loss Below PRO |
| Paid or estimated — underpaid | Gap > $0 net | 🟣 Loss Below PRO |

**Override rule:** If the carrier's denial letter also contains a partial payment, the track is
🔴 Denial PRO — the payment does not convert a denial to a Loss Below situation.

---

## Step 4 — Identify Key Leverage Points

For each track, identify the top 2-4 leverage points from the file. These are the facts, policy
provisions, or evidence gaps that most favor CCS's position. Pull them from Policy Pro and
Scope Pro — do not fabricate.

**For Denial PRO — leverage points to look for:**
- Policy language that contradicts the denial grounds
- Storm data (date of loss vs. denial claim of no covered peril)
- Endorsement language that was misapplied
- Photos or scope items that directly rebut the denial basis
- PA statutory rights triggered by the denial (appraisal, suit)

**For New Claim PRO — leverage points to look for:**
- Coverage limits that support full replacement value
- Endorsements that protect RCV (no ACV rider, no matching exclusion)
- Roof age and condition relative to any ACV exposure
- Policy provisions that require carrier to inspect within X days
- Any prior supplement history or related claim on this property

**For Loss Below PRO — leverage points to look for:**
- Specific line items the carrier missed entirely vs. underpriced
- O&P: was it included? CCS is almost always entitled to it
- Depreciation: was it applied per line item or as a lump sum? Was labor depreciated?
- Matching: did carrier scope only damaged sections vs. CCS full replacement?
- Supplements not yet submitted (second structure, HVAC, interior, etc.)

---

## Step 5 — Income Protection Timeline

This section is mandatory in every report. The PA fee is only collectible if statutory deadlines
are met. Document the compliance markers specific to this file.

Pull the date of loss and state from Policy Pro. Apply the correct state's timeline.

### Florida Timeline (default — adjust for other states):
| Milestone | Deadline | Status |
|---|---|---|
| Claim filed with carrier | Day 0 | ✅ / ⬜ |
| Carrier acknowledgment (14 days) | DOL + 14 | ✅ / ⬜ |
| Carrier inspection completed | Confirm date | ✅ / ⬜ |
| Carrier decision (90 days from notice) | DOL + 90 | ✅ / ⬜ |
| SPOL / Formal demand window | Per track | ⬜ |
| Suit limitation (per policy) | Per Policy Pro | ⬜ |
| CCS PA contract in file | Confirm | ✅ / ⬜ |

**Flag any milestone already passed or within 30 days.**

> ⚠️ **INCOME PROTECTION NOTE:** PA fee is not collectible if the claim lapses without proper
> documentation of CCS's involvement and timely filing. Flag any compliance risk to the PA
> immediately — do not bury it in the report.

---

## Step 6 — Peer Review Determination

| Condition | Peer Review Required? | Deadline |
|---|---|---|
| Denial track | ✅ Mandatory | Within 24 hours |
| Claim value $100K+ (CCS estimate) | ✅ Mandatory | Within 48 hours |
| Complex coverage dispute | ✅ Mandatory | Within 48 hours |
| New adjuster on file | ✅ Recommended | Within 48 hours |
| Standard Loss Below / New Claim | ⬜ Not required | — |

If peer review is required, state it clearly at the top of the Critical Actions section.
Do not bury it.

---

## Step 7 — Estimate Revision Assessment

> The Xactimate estimate is a raw document from the estimating department — not a PRO-formatted report. Treat it as the pricing output for the Scope Pro work order.

Before routing to the next PRO, assess whether the estimate needs to go back to estimating.

Ask:
1. Does the estimate reflect all items in the Scope Pro report?
2. Are there line items in the scope that were not priced?
3. Were O&P applied correctly?
4. Did the carrier's response reveal items that were missed in the original scope?

**If revision needed:** Note specific items to be corrected. Do NOT route to the next track
until the estimate is clean. A bad estimate handed to the carrier is harder to supplement later.

**If estimate is clean:** State clearly: "Estimate reviewed — no revisions required. Ready to proceed."

---

## Build the Report Document

Read `/mnt/skills/public/docx/SKILL.md` before writing any code.

Use `docx` npm package. US Letter, 1-inch margins, Arial font, navy `#1B3A6B` section headers.

**Do NOT repeat data that lives in Policy Pro or Scope Pro.** Reference those documents by name.
This report is the strategic layer — not a consolidation of everything above it.

---

## Document Structure

### Title
`[Claim #] | [Insured Name] | Strategy Pro™`
`Prepared by CCS Strategy Pro™ | [Date]`

---

### 🎯 TRACK ASSIGNMENT

Single most prominent element in the report. Bold, large, unmistakable.

```
ASSIGNED TRACK: [🔴 DENIAL PRO / 🔵 NEW CLAIM PRO / 🟣 LOSS BELOW PRO]

Routing Command: Proceed to [CCS Denial PRO / CCS New Claim PRO / CCS Loss Below PRO]

Reasoning: [2-4 sentences — what carrier did, what the gap is, why this track]
```

---

### 📊 GAP ANALYSIS

Two-column table:
| | Amount |
|---|---|
| CCS Estimate (RCV) | $X,XXX.XX |
| Carrier Position (RCV) | $X,XXX.XX |
| Gross Gap | $X,XXX.XX |
| Applicable Deductible | $X,XXX.XX |
| **Net Dispute Amount** | **$X,XXX.XX** |

If carrier position is a denial (no dollar amount), note:
> "Carrier issued a coverage denial. Dispute amount = full CCS estimate ($X,XXX.XX) minus applicable deductible ($X,XXX.XX) = net $X,XXX.XX."

---

### 🔑 KEY LEVERAGE POINTS

Bullet list — 2-4 items maximum. Source each to a document.
Example format:
- **[Point]** — Source: Policy Pro / Scope Pro / Carrier letter

---

### ⚠️ CRITICAL ACTIONS — IMMEDIATE PRIORITIES

Numbered, actionable, assigned. No vague steps.

```
□ [If peer review required] PEER REVIEW: Submit PR Request to CRM within [24/48] hours.
  Include: claim details, carrier communications, adjuster's assessment of strengths/weaknesses.

□ ESTIMATE STATUS: [Clean — proceed / Needs revision — return to estimating. Items: X, Y, Z]

□ CLIENT COMMUNICATION: Email client and referral source confirming file cleared estimating.
  Attach estimate. Subject: "Update on your claim — [address]"

□ HOMEOWNER FIELD PREP: Advise homeowner that carrier inspector has no financial authority.
  CCS will not be present during carrier inspection. Do not interfere — their haste benefits us.

□ RESERVE UPDATE: [If estimate differs from initial reserve] Update reserves in CRM.
  Document reason for change.

□ TRACK-SPECIFIC ACTION: [First specific action for assigned track]
  [e.g., For Denial: Obtain storm verification data for date of loss]
  [e.g., For New Claim: Submit CCS scope to carrier — do not wait for their inspection]
  [e.g., For Loss Below: Pull carrier's EOB line by line. Identify top 5 missed items]
```

---

### 📅 INCOME PROTECTION TIMELINE

Table from Step 5. Flag any risks in bold red text.

---

### 📧 RECOMMENDED CLIENT COMMUNICATION

Send this email to both the **homeowner** and the **referral source** immediately
after the Strategy report is complete. Do not wait. This is a service touch point —
it keeps the client informed and the referral source warm.

**To:** [Homeowner email] | [Referral source email]
**Subject:** [Claim #] – [Property Address] | File Update

---

Great news — your file has cleared our estimating department. I'm currently reviewing
the estimate and will be in touch shortly with next steps.

If you have any questions in the meantime, don't hesitate to reach out.

[PA Name]
Coastal Claims Services

---

**This email is mandatory on every Strategy PRO report. No exceptions.**
It confirms the file is moving and prevents the most common client complaint
in public adjusting: "nobody told me what was happening."

### 🔄 WORKFLOW HANDOFF

```
Strategy Analysis Complete.

NEXT STEP: Proceed to [CCS Denial PRO / CCS New Claim PRO / CCS Loss Below PRO]

Upload to next PRO:
  - This Strategy Pro report
  - Xactimate estimate (raw estimating output)
  - Carrier position document (denial letter / EOB / verbal confirmation note)
```

---

### 🤖 AGENTIC NOTES

Every report includes this section. Same rules as Policy Pro and Scope Pro.

**Observation-only flags for the PA.** Not strategic guidance — that's above. This is
what a sharp PA should see that doesn't fit neatly into the structured sections.

**Check and include if applicable:**
- Contradictions between carrier denial grounds and actual policy language (quote both)
- Endorsements flagged in Policy Pro that directly affect this track assignment
- Items in Scope Pro Agentic Notes that have strategic significance now that carrier position is known
- Timeline risks — any compliance milestone within 30 days or already past
- Carrier patterns: if this is a known carrier, note any relevant tendencies (e.g., "State Farm
  consistently denies hail on this roof type — peer review strongly recommended")
- File completeness issues: missing documents that will be needed for the assigned track
- Estimate gaps that may become supplemental opportunities after carrier's inspection

**If nothing notable:** Write "No additional observations."

---

## Output Rules

These are non-negotiable:

- Every report is a .docx file. No exceptions.
- Track assignment must appear at the top — never buried.
- Gap analysis must include a net dispute amount (gross gap minus deductible).
- Do not consolidate or re-print Policy Pro or Scope Pro content — reference them.
- No greetings, no conclusions, no conversational text in the document.
- If carrier position is verbal only, stamp the document with the verbal confirmation notice.
- Peer review requirement (if triggered) must appear as the FIRST item in Critical Actions.
- Always end with the Workflow Handoff section — adjuster cannot be left guessing next steps.
- Use the `docx` skill's document creation workflow (docx-js via npm) for generating the Word file.

---

## File Naming

`Strategy_[ClaimNumber]_[InsuredLastName]_[Date].docx`

Date format: YYYY-MM-DD

Example: `Strategy_01-000125628_Armstrong_2026-03-04.docx`

---

## Edge Cases

- **Carrier position is verbal only** — proceed with verbal stamp; request written confirmation as
  first Critical Action item
- **Carrier has done nothing in 30+ days** — this is a New Claim track; flag the inactivity as a
  Critical Action (send written status request; begin 15-day compliance clock documentation)
- **Carrier issued both a partial payment AND a denial on different components** — Denial PRO track;
  the denial drives the track regardless of partial payment
- **Estimate is significantly higher than CCS scope (estimator added items not in scope)** — flag
  for scope/estimate reconciliation before proceeding; do not submit an estimate that isn't backed
  by the scope
- **Multiple perils, multiple claims on same property** — treat each claim number separately;
  note the relationship in Agentic Notes
- **Denial arrives within days of onboarding (pre-submission denial or rapid denial)** — same
  Denial PRO track; note the compressed timeline in income protection section; peer review 24 hours
- **Client or contractor is pushing for a specific track** — document the request in Agentic Notes
  but assign the correct track based on facts; never let external pressure override the decision matrix

---

## A Note on Estimating

There is no Estimating PRO skill at this time. The estimating department receives the Scope Pro report as their work order and returns a raw Xactimate printout. Strategy PRO treats that printout as a source document — it pulls the total RCV and key line items from it. If an Estimating PRO is built in the future, it will slot between Scope PRO and Strategy PRO in the chain.

---

## What This Skill Does NOT Do

- Does not draft demand letters, denial rebuttals, or carrier correspondence (downstream PRO)
- Does not calculate depreciation or build Xactimate line items (Scope Pro / Estimating)
- Does not make coverage determinations — it analyzes the carrier's position against CCS's documented scope
- Does not replace peer review — it triggers it
- Does not consolidate or re-produce Policy Pro or Scope Pro content
