# Denial PRO — Chain JSON Schema

**How Denial PRO data lands in the chain JSON at `pros.denial`.**
**For operational logic, see `denial-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "denialReason": {
    "quote": "Based on our inspection, the damages to the roof are consistent with long-term wear, deterioration, and pre-existing conditions rather than a covered peril. The policy excludes loss caused by wear and tear, deterioration, and inherent vice per endorsement FIM 00 30 03 07.",
    "category": "pre_existing_maintenance",
    "policySectionCited": "FIM 00 30 03 07 — Pre-existing damage / wear and tear exclusion"
  },

  "carrierPosition": {
    "statedReason": "Carrier claims all roof damage predates the reported date of loss and is the result of long-term wear and deterioration, not a covered storm event.",
    "logic": "Carrier's adjuster noted the 2006 installation date (20-year roof at time of loss) and concluded that age alone accounts for the observed condition. Denial letter asserts that no functional storm damage was identified during their field inspection.",
    "evidenceReliedOn": "Carrier's field adjuster inspection report (single visit, 45 minutes on-site). No storm data cited. No manufacturer specifications referenced. No pre-loss condition photos provided by carrier."
  },

  "ccsRebuttal": {
    "policyInterpretation": "The policy covers direct physical loss caused by windstorm or hail. FIM 00 30 03 07 excludes wear and tear but does not exclude storm damage to aged components. The exclusion requires carrier to demonstrate that the specific damage claimed was caused by wear — not merely that the roof is old. Age of the component does not establish cause of damage.",
    "carrierMistake": "Carrier conflated roof age with damage causation. 25 documented hail impact marks across all four slopes — each showing granule displacement, mat fracture, and bruising consistent with hail impact — constitute functional storm damage regardless of roof age. Carrier's inspection report does not address or rebut these specific impact points. The exclusion requires proof of pre-existing cause, not proof of pre-existing age.",
    "winningArgument": "Twenty-five documented hail impacts with granule displacement and mat fracture across all four roof slopes constitute functional storm damage under the policy, and roof age alone does not satisfy the carrier's burden to prove the pre-existing damage exclusion applies."
  },

  "evidenceChecklist": [
    {
      "item": "NOAA / CoreLogic hail verification for date of loss at property coordinates",
      "status": "obtained",
      "responsibleParty": "CCS — pulled during Scope PRO",
      "deadline": null
    },
    {
      "item": "Loss photos showing 25 hail impacts with chalk circles across all 4 slopes",
      "status": "obtained",
      "responsibleParty": "CCS field adjuster",
      "deadline": null
    },
    {
      "item": "Pre-loss Google Street View historical imagery (2018, 2020, 2023)",
      "status": "needed",
      "responsibleParty": "CCS — pull before peer review",
      "deadline": "24hr"
    },
    {
      "item": "Manufacturer shingle specifications — hail rating and expected service life",
      "status": "needed",
      "responsibleParty": "CCS estimator — identify manufacturer from field photos",
      "deadline": "48hr"
    },
    {
      "item": "Contractor affidavit distinguishing storm damage patterns from wear patterns",
      "status": "needed",
      "responsibleParty": "Referring contractor or CCS field adjuster",
      "deadline": "5 business days"
    },
    {
      "item": "Carrier's full inspection report and field photos",
      "status": "needed",
      "responsibleParty": "CCS — request from carrier via State PRO correspondence",
      "deadline": "Per state statute"
    },
    {
      "item": "Prior carrier inspections that did not note pre-existing roof condition",
      "status": "unavailable",
      "responsibleParty": "Insured — check for prior claims on this property",
      "deadline": null
    }
  ],

  "criticalActions": [
    {
      "action": "peer_review",
      "detail": "Submit PR Request to CRM within 24 hours — denial track mandatory. Prepare: denial letter, 25-impact photo set, Strategy PRO leverage points, and proposed rebuttal position.",
      "deadline": "24hr"
    },
    {
      "action": "evidence_acquisition",
      "detail": "Pull Google Street View historical imagery and manufacturer shingle specs before peer review. Request contractor affidavit within 5 business days.",
      "deadline": "48hr"
    },
    {
      "action": "reinspection_assessment",
      "detail": "Evaluate whether joint reinspection with CCS expert is warranted before written response. 25 impacts across 4 slopes supports reinspection demand.",
      "deadline": null
    },
    {
      "action": "state_pro",
      "detail": "Proceed to State PRO before any correspondence. Confirm carrier response deadlines, bad faith thresholds, and prompt payment statute applicability for this state.",
      "deadline": null
    }
  ],

  "peerReview": {
    "status": "required",
    "deadline": "24hr"
  },

  "agenticNotes": "Carrier's denial letter references FIM 00 30 03 07 but the inspection report does not address any of the 25 documented hail impacts individually — carrier appears to have dismissed roof damage categorically based on age rather than evaluating each impact point. This is a potential bad faith indicator: denial without adequate investigation of reported damage. SOL exposure: denial letter dated 2026-03-01 — confirm statute of limitations and suit deadline via State PRO. Scope PRO documented 2 rooms of interior water damage that the denial letter does not mention at all — carrier may have denied the entire claim but only evaluated the roof. Interior damage items are unaddressed, not denied.",

  "handoff": {
    "to": "State PRO",
    "content": "Full denial on pre-existing damage grounds (FIM 00 30 03 07). CCS rebuttal: 25 hail impacts with functional damage across all 4 slopes — roof age does not satisfy carrier's burden to prove exclusion. Peer review mandatory within 24hr. Key evidence gaps: pre-loss imagery, manufacturer specs, contractor affidavit. Bad faith flag: carrier did not evaluate individual impact points. Interior water damage unaddressed in denial. Need state-specific carrier response deadlines and bad faith thresholds before any correspondence."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Denial PRO finishes |
| `denialReason.quote` | string | Yes | Exact quote from the denial letter — no paraphrasing |
| `denialReason.category` | enum | Yes | `no_covered_peril`, `pre_existing_maintenance`, `cosmetic_exclusion`, `cause_of_loss_exclusion`, `late_notice`, `vacancy_occupancy`, `acv_roof_endorsement`, `prior_damage`, `policy_not_in_force` |
| `denialReason.policySectionCited` | string | Yes | Section number, endorsement, or page reference from the denial letter |
| `carrierPosition.statedReason` | string | Yes | 1-2 sentence summary of the carrier's argument |
| `carrierPosition.logic` | string | Yes | How the carrier connects their cited policy language to the denial conclusion |
| `carrierPosition.evidenceReliedOn` | string | Yes | What the carrier based their decision on — inspection report, photos, weather data, or "none stated" |
| `ccsRebuttal.policyInterpretation` | string | Yes | Why coverage applies — with specific policy language quoted |
| `ccsRebuttal.carrierMistake` | string | Yes | The exact flaw in the carrier's reasoning — misapplied exclusion, wrong section, contradicting evidence, etc. |
| `ccsRebuttal.winningArgument` | string | Yes | One sentence — the clearest possible statement of why coverage applies |
| `evidenceChecklist` | array | Yes | Each item has `item` (string), `status` (enum), `responsibleParty` (string), `deadline` (string/null) |
| `evidenceChecklist[].item` | string | Yes | Specific evidence item needed — not generic |
| `evidenceChecklist[].status` | enum | Yes | `"obtained"`, `"needed"`, `"unavailable"` |
| `evidenceChecklist[].responsibleParty` | string | Yes | Who is responsible for obtaining this item |
| `evidenceChecklist[].deadline` | string/null | Yes | Deadline for obtaining, or `null` if already obtained or no deadline applies |
| `criticalActions` | array | Yes | Each has `action` (string), `detail` (string), `deadline` (string/null). Peer review is always index 0. |
| `criticalActions[].action` | string | Yes | Action identifier: `peer_review`, `evidence_acquisition`, `reinspection_assessment`, `coverage_counsel`, `state_pro` |
| `criticalActions[].detail` | string | Yes | Specific, executable instruction |
| `criticalActions[].deadline` | string/null | Yes | `"24hr"`, `"48hr"`, `"5 business days"`, or `null` if no fixed deadline |
| `peerReview.status` | enum | Yes | Always `"required"` on denial track — no exceptions |
| `peerReview.deadline` | string | Yes | Always `"24hr"` on denial track |
| `agenticNotes` | string | Yes | Free text observations — bad faith indicators, SOL exposure, coverage counsel triggers, cross-flags from prior PROs. `"No additional observations."` if nothing notable. |
| `handoff.to` | string | Yes | Always `"State PRO"` — Denial PRO never hands off elsewhere |
| `handoff.content` | string | Yes | Summary for State PRO: denial basis, rebuttal position, peer review status, evidence gaps, time-sensitive flags |

---

## How Downstream PROs Read This

**State PRO** reads `pros.denial` to know:

1. **What was the denial basis?** -> `denialReason.category` (determines which state statutes apply — bad faith, prompt payment, unfair claims practices)
2. **What is the exact denial language?** -> `denialReason.quote` (needed for correspondence that references the carrier's own words)
3. **What is CCS's rebuttal?** -> `ccsRebuttal.winningArgument` (State PRO weaves this into state-specific legal framework)
4. **Are there deadlines ticking?** -> `criticalActions` (deadline awareness for state-specific response windows)
5. **Is peer review done?** -> `peerReview.status` (State PRO should not generate correspondence until peer review is complete)
6. **Any bad faith flags?** -> `agenticNotes` (State PRO uses these to determine whether bad faith statutes apply)

**Undisputed Funds PRO** reads `pros.denial`:

- Only relevant if the denial is partial (rare — most partial denials route to Loss Below instead). If a partial denial does reach this path, Undisputed Funds reads `denialReason.category` and `evidenceChecklist` to determine whether any undisputed items exist.

**All correspondence PROs** (SPOL, 15 Day, Formal Demand, 30/45/60/75/90 Day) read `pros.denial`:

1. **What is our argument?** -> `ccsRebuttal.winningArgument` (the one-sentence position that anchors every letter)
2. **What did the carrier claim?** -> `carrierPosition` (correspondence must acknowledge and rebut their stated position)
3. **What evidence do we have?** -> `evidenceChecklist` where `status = "obtained"` (only reference evidence actually in hand)
4. **What evidence are we still missing?** -> `evidenceChecklist` where `status = "needed"` (correspondence may request carrier cooperation on outstanding items)
