# New Claim PRO — Chain JSON Schema

**How New Claim PRO data lands in the chain JSON at `pros.newClaim`.**
**For operational logic, see `new-claim-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "openingPosition": {
    "ccsEstimateRCV": "$18,450.00",
    "applicableDeductible": "$5,382.00",
    "netClaimValue": "$13,068.00",
    "peril": "Hurricane / Wind",
    "dateOfLoss": "10/10/2024",
    "claimNumber": "FP-2024-087431",
    "carrier": "Frontline / First Protective Ins. Co.",
    "carrierAdjuster": "Pending assignment",
    "carrierInspectionDate": "Not yet scheduled"
  },

  "coverageConcerns": [
    {
      "concern": "ACV roof endorsement — depreciation will significantly reduce initial payment on roofing line items",
      "impact": "Carrier may withhold 40-60% of roof RCV until repairs complete; reduces initial check to ~$7,200 net",
      "source": "Policy PRO"
    },
    {
      "concern": "Matching exclusion — carrier may limit scope to damaged sections only and refuse full slope replacement",
      "impact": "Could reduce roof scope from 26.93 SQ to 8-12 SQ if carrier applies section-only repair",
      "source": "Policy PRO"
    },
    {
      "concern": "Roof age 14 years — pre-existing wear argument available to carrier",
      "impact": "Carrier inspector may attribute granule loss or cracking to age rather than storm; document pre-loss condition",
      "source": "Policy PRO"
    }
  ],

  "submissionStrategy": {
    "readiness": [
      { "item": "Scope Pro report finalized", "status": "ready" },
      { "item": "Xactimate estimate finalized", "status": "ready" },
      { "item": "Supporting photos organized and labeled", "status": "ready" },
      { "item": "Carrier claim number confirmed", "status": "ready" },
      { "item": "Submission method confirmed", "status": "pending" }
    ],
    "recommendedMethod": "Carrier portal upload with email confirmation to claims department",
    "timing": "Submit immediately — carrier has not yet scheduled inspection. CCS scope on file before adjuster arrives."
  },

  "forwardPressure": {
    "currentCarrierStatus": "Claim acknowledged. No adjuster assigned. No inspection scheduled. No estimate or payment issued.",
    "activeNextMove": "Submit CCS scope and estimate to carrier immediately. Send written status request demanding adjuster assignment and inspection scheduling within 10 business days.",
    "undisputedFundsIdentified": false,
    "undisputedAmount": null
  },

  "homeownerPrep": [
    "The carrier's inspector has zero financial authority. They cannot approve, deny, or settle the claim on site. Nothing said during the inspection is a final determination.",
    "CCS will not be present during the carrier's inspection. The carrier's adjuster documents more thoroughly when unassisted. Their process often creates a record that benefits CCS.",
    "Answer questions honestly and briefly. 'I noticed damage after the storm' is a complete answer. Do not volunteer information beyond what is directly asked.",
    "Get the inspector's name, company, and contact information before they leave.",
    "Note the inspection date and approximate duration. This matters if the carrier later claims the inspection was thorough.",
    "Do not allow access to areas outside the scope of the claim. If the claim is for storm damage to the roof and interior, access is limited to those areas."
  ],

  "anticipatedResponse": {
    "scenario": "B",
    "indicators": "Known underpaying carrier on wind claims, ACV endorsement on 14-year-old roof, matching exclusion in policy, complex scope with O&P and interior ensuing loss. High probability carrier underpays significantly.",
    "preparation": "Submit with O&P justification upfront. Document matching argument preemptively — all 4 slopes show impact, manufacturer warranty requires full system replacement. Prepare supplement before carrier estimate arrives. Pre-existing rebuttal: 25 chalk-tested hits across all slopes confirm functional storm damage post-DOL."
  },

  "criticalActions": [
    {
      "action": "Submit CCS scope and estimate to carrier",
      "detail": "Upload via carrier portal. Email confirmation copy to claims department. Record submission date, method, and confirmation number in claim file immediately.",
      "deadline": "Today"
    },
    {
      "action": "Homeowner field preparation",
      "detail": "Deliver all 6 field instructions to homeowner before carrier inspection is scheduled. PA confirms delivery in writing.",
      "deadline": "Before carrier inspection"
    },
    {
      "action": "Undisputed funds identification",
      "detail": "Interior water damage (2 rooms) is separately documented and causation is clear. If carrier disputes roof but acknowledges water intrusion, press for interior payment release.",
      "deadline": null
    },
    {
      "action": "Supplement preparation",
      "detail": "Prepare O&P justification, matching argument, and pre-existing rebuttal package. Have ready before carrier estimate arrives — do not wait to react.",
      "deadline": "Before carrier estimate"
    },
    {
      "action": "Proceed to State PRO",
      "detail": "Confirm carrier acknowledgment deadline, inspection response window, and submission requirements for Florida before any formal correspondence is generated.",
      "deadline": "Immediately after submission"
    }
  ],

  "peerReview": {
    "status": "recommended",
    "triggers": [
      "Scenario B anticipated — high Loss Below risk",
      "ACV roof endorsement with 14-year-old roof creates significant depreciation exposure",
      "Pre-existing wear argument available to carrier on older property"
    ]
  },

  "agenticNotes": "High Loss Below risk. Carrier is Frontline/First Protective — known for aggressive depreciation on ACV-endorsed roofs and section-only repairs on matching claims. Roof age (14 years) gives carrier a pre-existing argument, but 25 chalk-tested hits across all 4 slopes confirm functional storm damage. If carrier issues estimate below CCS scope, file shifts to Loss Below track — coverage concerns and opening position values carry forward. Interior water damage (2 rooms) may qualify as undisputed if carrier acknowledges water intrusion but disputes roof causation — flag for Undisputed Funds PRO if carrier splits the claim. Storm data has been verified for DOL. No late notice exposure. Submission before carrier inspection is the single highest-value action on this file right now.",

  "handoff": {
    "to": "State PRO",
    "content": "New Claim track. Carrier: Frontline / First Protective (FL). Peril: Hurricane/Wind. CCS estimate submitted before carrier inspection. Net claim value $13,068. ACV roof endorsement + matching exclusion flagged. Scenario B anticipated — high Loss Below risk. Need: FL carrier acknowledgment deadline, inspection response window, submission requirements, and any undisputed funds statute. 15-day income protection clock starts at estimate completion."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when New Claim PRO finishes |
| `openingPosition.ccsEstimateRCV` | string | Yes | Dollar amount from Xactimate estimate |
| `openingPosition.applicableDeductible` | string | Yes | From `pros.policy.coverage` |
| `openingPosition.netClaimValue` | string | Yes | RCV minus deductible — the number CCS is pursuing |
| `openingPosition.peril` | string | Yes | Wind, Hail, Water, Hurricane, Fire, etc. |
| `openingPosition.dateOfLoss` | string | Yes | MM/DD/YYYY format |
| `openingPosition.claimNumber` | string | Yes | Carrier-assigned claim number |
| `openingPosition.carrier` | string | Yes | Carrier name and subsidiary if applicable |
| `openingPosition.carrierAdjuster` | string | Yes | Name if assigned, `"Pending assignment"` if not |
| `openingPosition.carrierInspectionDate` | string | Yes | Date if scheduled, `"Not yet scheduled"` if not |
| `coverageConcerns` | array | Yes | Each has `concern` (string), `impact` (string), `source` (string — always `"Policy PRO"`) |
| `submissionStrategy.readiness` | array | Yes | Each has `item` (string) and `status` (`"ready"`, `"pending"`, `"blocked"`) |
| `submissionStrategy.recommendedMethod` | string | Yes | How to submit — portal, email, certified mail |
| `submissionStrategy.timing` | string | Yes | When to submit and why |
| `forwardPressure.currentCarrierStatus` | string | Yes | Plain English summary of where the carrier stands right now |
| `forwardPressure.activeNextMove` | string | Yes | What CCS does next — never passive |
| `forwardPressure.undisputedFundsIdentified` | boolean | Yes | `true` if any portion of the claim is clearly owed |
| `forwardPressure.undisputedAmount` | string/null | Yes | Dollar amount if identified, `null` if not yet |
| `homeownerPrep` | string[] | Yes | Always exactly 6 items — the standard field instructions |
| `anticipatedResponse.scenario` | enum | Yes | `"A"`, `"B"`, or `"C"` |
| `anticipatedResponse.indicators` | string | Yes | What signals point to this scenario |
| `anticipatedResponse.preparation` | string | Yes | What CCS prepares in advance for this scenario |
| `criticalActions` | array | Yes | Each has `action` (string), `detail` (string), optional `deadline` (string/null) |
| `peerReview.status` | enum | Yes | `"required"`, `"recommended"`, `"not_required"` |
| `peerReview.triggers` | string[] | Yes | Which triggers apply (empty array if not required) |
| `agenticNotes` | string | Yes | Free text observations for downstream PROs, or `"No additional observations."` |
| `handoff.to` | string | Yes | Always `"State PRO"` — New Claim PRO always hands off to State PRO |
| `handoff.content` | string | Yes | Summary of what State PRO needs to know |

---

## How Downstream PROs Read This

The next PRO in the chain (State PRO) and any PRO that receives the file after a track shift reads `pros.newClaim` to know:

1. **What is CCS's position?** -- `openingPosition.ccsEstimateRCV`, `openingPosition.netClaimValue`
2. **What carrier are we dealing with?** -- `openingPosition.carrier` + `openingPosition.peril` (State PRO uses these for state-specific deadlines)
3. **Where does the carrier stand right now?** -- `forwardPressure.currentCarrierStatus`
4. **Are there undisputed funds to press for?** -- `forwardPressure.undisputedFundsIdentified`, `forwardPressure.undisputedAmount`
5. **What scenario are we preparing for?** -- `anticipatedResponse.scenario` (all correspondence PROs read this)
6. **What coverage risks exist?** -- `coverageConcerns[]` (Loss Below PRO reads these if the track shifts)
7. **Is peer review ticking?** -- `peerReview.status` + `peerReview.triggers`
8. **What did the AI notice?** -- `agenticNotes` (track shift risk, undisputed funds opportunity, pre-existing exposure)

### Specific downstream consumers:

- **State PRO** reads: `openingPosition.carrier` + `openingPosition.peril` (for state-specific deadlines), `forwardPressure.currentCarrierStatus` (to determine which statutory clocks apply), `handoff.content` (full context summary)
- **Loss Below PRO** reads (if track shifts): `openingPosition` values (RCV, deductible, net claim), `coverageConcerns[]` (ACV, matching, cosmetic flags carry forward)
- **Undisputed Funds PRO** reads: `forwardPressure.undisputedFundsIdentified`, `forwardPressure.undisputedAmount`, `openingPosition.ccsEstimateRCV` and `openingPosition.netClaimValue` (totals for context)
- **All correspondence PROs** read: `anticipatedResponse.scenario` (shapes tone and urgency), `criticalActions[]` (confirms what has been done and what is pending)

Each downstream PRO writes to its own path (`pros.statePro`, `pros.lossBelow`, etc.) following the same pattern: status, analysis, actions, handoff.
