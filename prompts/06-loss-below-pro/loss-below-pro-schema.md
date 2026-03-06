# Loss Below PRO — Chain JSON Schema

**How Loss Below PRO data lands in the chain JSON at `pros.lossBelow`.**
**For operational logic, see `loss-below-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "carrierAction": {
    "type": "below_deductible | partial_payment | limited_scope",
    "carrierEstimateRCV": "$8,200.00",
    "carrierPayment": "$2,818.00",
    "statedReason": "Carrier scoped partial repair — 8 SQ shingle replacement, no interior, no gutters."
  },

  "deductibleMath": {
    "ccsEstimateRCV": "$18,450.00",
    "applicableDeductible": "$5,382.00",
    "ccsNetAboveDeductible": "$13,068.00",
    "carrierEstimateRCV": "$8,200.00",
    "carrierNetAboveDeductible": "$2,818.00",
    "deductibleTypeCorrect": true
  },

  "scopeReasonableness": {
    "preLossCondition": "Roof was in functional, weather-tight condition prior to loss. 26.93 SQ architectural shingle system, no active leaks, no prior claims. Age and material discontinuation make partial repair non-restorative.",
    "failurePoints": {
      "discontinuedMaterials": true,
      "salvageReality": true,
      "repairCascading": true,
      "functionalCondition": true
    },
    "conclusion": "Partial repair of 8 SQ on a 26.93 SQ roof cannot restore pre-loss functional condition. Material discontinuation eliminates matching. Salvage carries equivalent degradation. New fastener penetrations in aged membrane create leak potential across every repaired section. Replacement cost coverage requires replacement."
  },

  "gapAnalysis": {
    "missedEntirely": [
      { "item": "Interior water damage — 2 rooms", "ccsAmount": "$3,200.00" },
      { "item": "Gutter R&R — full perimeter", "ccsAmount": "$1,850.00" }
    ],
    "underpriced": [
      { "item": "Roof shingle R&R", "carrierAmount": "8 SQ", "ccsAmount": "26.93 SQ", "reason": "Carrier scoped partial repair — functional damage extends full roof system" },
      { "item": "Underlayment", "carrierAmount": "8 SQ synthetic", "ccsAmount": "26.93 SQ ice & water + synthetic", "reason": "Full roof R&R requires code-compliant underlayment at all valleys and eaves" }
    ],
    "improperlyDepreciated": [
      { "item": "Roof labor", "issue": "Labor depreciated at 40% — labor is non-depreciable in this jurisdiction" }
    ],
    "notYetSubmitted": [
      { "item": "Ridge vent replacement", "note": "Pending field verification of existing ridge vent type and length" }
    ]
  },

  "opAnalysis": {
    "owed": true,
    "included": false,
    "amount": "$2,990.00",
    "justification": "Scope requires GC coordination across roofing, gutters, and interior trades. Carrier excluded O&P without written justification. 10/10 on applicable line items."
  },

  "depreciationRecovery": {
    "totalRCV": "$18,450.00",
    "totalACVPaid": "$2,818.00",
    "recoverableDepreciation": "$4,200.00",
    "withheldByCarrier": "$4,200.00",
    "disputed": [
      { "item": "Roof labor", "issue": "Labor depreciated — non-depreciable in this jurisdiction" },
      { "item": "Gutter labor", "issue": "Not in carrier estimate — depreciation applied to an item they did not scope" }
    ]
  },

  "carrierDialogue": [
    {
      "carrierSays": "We only cover direct damage — 8 SQ partial repair is sufficient.",
      "ccsSays": "This is a replacement cost policy. Partial repair of 8 SQ on a 26.93 SQ roof cannot restore pre-loss functional condition. The roof's age and material discontinuation make repair non-restorative. Replacement is required under the policy."
    },
    {
      "carrierSays": "Matching shingles are available through salvage sources.",
      "ccsSays": "Salvage of equivalent age carries equivalent degradation. Installing aged salvage does not restore — it replicates the decline. The policy requires restoration to pre-loss condition, not continuation of it."
    },
    {
      "carrierSays": "Interior damage is unrelated to the roof claim.",
      "ccsSays": "Water intrusion through storm-damaged roofing is direct consequential damage. Two rooms show active staining consistent with roof penetration points documented in the CCS scope. Interior damage is a direct result of the covered loss."
    }
  ],

  "criticalActions": [
    {
      "action": "Reject ITELL involvement",
      "detail": "ITELL note present in file. CCS does not cooperate with ITELL under any circumstances. Flag to PA immediately.",
      "deadline": "Immediate"
    },
    {
      "action": "Pre-loss condition documentation",
      "detail": "Obtain prior inspection reports, real estate listing photos, Google Street View history, and any permits showing roof was functional before loss date.",
      "deadline": "Before supplement submission"
    },
    {
      "action": "Supplement preparation",
      "detail": "Missed items (interior, gutters) and underpriced items (full roof R&R) ready for submission. Confirm estimate is final before sending.",
      "deadline": null
    },
    {
      "action": "O&P demand",
      "detail": "Prepare O&P position statement — $2,990.00 owed. Carrier provided no written justification for exclusion.",
      "deadline": null
    },
    {
      "action": "Depreciation release demand",
      "detail": "Labor depreciation disputed. Prepare depreciation challenge separately from supplement.",
      "deadline": null
    },
    {
      "action": "Proceed to State PRO",
      "detail": "Before any supplement or correspondence is submitted, confirm state-specific supplement requirements, carrier response deadlines, and statutory timeframes.",
      "deadline": "Before any carrier communication"
    }
  ],

  "peerReview": {
    "status": "recommended",
    "triggers": ["new_adjuster_on_file", "itell_involvement"]
  },

  "agenticNotes": "ITELL note present in file — carrier may attempt third-party engineering inspection. CCS firm rule: reject all ITELL involvement. Carrier scoped 8 SQ on a 26.93 SQ system — a 70% scope reduction with no documented justification for limiting to partial repair. No visual continuity argument used per CCS firm rules — pre-loss condition restoration is the lead argument. Labor depreciation applied by carrier is non-depreciable in this jurisdiction — separate leverage point from scope fight. Appraisal clause may be viable given the magnitude of the gap ($10,250 gross) if negotiations are protracted.",

  "handoff": {
    "to": "State PRO",
    "content": "Carrier acknowledged coverage but underpaid significantly — 8 SQ partial repair vs 26.93 SQ full replacement. Net dispute after deductible: $13,068. ITELL note present — reject any involvement. Pre-loss condition restoration is the lead argument. O&P owed ($2,990), labor depreciation disputed. Supplement and O&P demand ready pending State PRO confirmation of deadlines and statutory requirements."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Loss Below PRO finishes |
| `carrierAction.type` | enum | Yes | `below_deductible`, `partial_payment`, `limited_scope` — describes what the carrier did |
| `carrierAction.carrierEstimateRCV` | string | Yes | Dollar amount from carrier estimate |
| `carrierAction.carrierPayment` | string | Yes | Dollar amount carrier actually paid, or `"$0.00"` if below-deductible |
| `carrierAction.statedReason` | string | Yes | 1-2 sentence summary of carrier's stated justification |
| `deductibleMath.ccsEstimateRCV` | string | Yes | CCS full estimate RCV from Xactimate |
| `deductibleMath.applicableDeductible` | string | Yes | From `pros.policy.coverage` — dollar amount (percentage deductibles pre-calculated) |
| `deductibleMath.ccsNetAboveDeductible` | string | Yes | CCS RCV minus deductible |
| `deductibleMath.carrierEstimateRCV` | string | Yes | Carrier's estimate RCV |
| `deductibleMath.carrierNetAboveDeductible` | string | Yes | Carrier RCV minus deductible — if zero or negative, below-deductible is a scope problem |
| `deductibleMath.deductibleTypeCorrect` | boolean | Yes | `true` if carrier applied correct deductible type, `false` if wrong type applied |
| `scopeReasonableness.preLossCondition` | string | Yes | File-specific analysis of pre-loss condition — never generic boilerplate |
| `scopeReasonableness.failurePoints.discontinuedMaterials` | boolean | Yes | `true` if materials are discontinued or unmatchable |
| `scopeReasonableness.failurePoints.salvageReality` | boolean | Yes | `true` if salvage cannot restore to pre-loss condition |
| `scopeReasonableness.failurePoints.repairCascading` | boolean | Yes | `true` if partial repair creates new penetration/leak risk |
| `scopeReasonableness.failurePoints.functionalCondition` | boolean | Yes | `true` if partial repair cannot guarantee return to functional standard |
| `scopeReasonableness.conclusion` | string | Yes | The winning argument — pre-loss condition restoration, not matching |
| `gapAnalysis.missedEntirely` | array | Yes | Items not in carrier estimate. Each: `item` (string), `ccsAmount` (string) |
| `gapAnalysis.underpriced` | array | Yes | Items with wrong qty/unit/grade. Each: `item`, `carrierAmount`, `ccsAmount`, `reason` (all strings) |
| `gapAnalysis.improperlyDepreciated` | array | Yes | Items with depreciation errors. Each: `item` (string), `issue` (string) |
| `gapAnalysis.notYetSubmitted` | array | Yes | Pending supplement items. Each: `item` (string), `note` (string). Empty array if none. |
| `opAnalysis.owed` | boolean | Yes | `true` if O&P is owed based on scope requiring GC coordination |
| `opAnalysis.included` | boolean | Yes | `true` if carrier included O&P in their estimate |
| `opAnalysis.amount` | string/null | Yes | Dollar amount if owed, `null` if not owed |
| `opAnalysis.justification` | string | Yes | Why O&P is or is not owed, and carrier's stated reason for exclusion if applicable |
| `depreciationRecovery.totalRCV` | string | Yes | CCS estimate total RCV |
| `depreciationRecovery.totalACVPaid` | string | Yes | Total ACV carrier paid |
| `depreciationRecovery.recoverableDepreciation` | string | Yes | Total recoverable depreciation amount |
| `depreciationRecovery.withheldByCarrier` | string | Yes | Depreciation amount carrier is holding back |
| `depreciationRecovery.disputed` | array | Yes | Items with depreciation disputes. Each: `item` (string), `issue` (string). Empty array if none. |
| `carrierDialogue` | array | Yes | File-specific what-they-say / what-CCS-says pairs. Each: `carrierSays` (string), `ccsSays` (string) |
| `criticalActions` | array | Yes | Numbered action plan. Each: `action` (string), `detail` (string), `deadline` (string/null) |
| `peerReview.status` | enum | Yes | `"required"`, `"recommended"`, `"not_required"` |
| `peerReview.triggers` | string[] | Yes | Which triggers apply (empty array if not required) |
| `agenticNotes` | string | Yes | Free text: pre-loss evidence gaps, carrier anomalies, matching availability, bad faith indicators, ITELL flags. Or `"No additional observations."` |
| `handoff.to` | string | Yes | Always `"State PRO"` — Loss Below always routes to State PRO next |
| `handoff.content` | string | Yes | Summary for State PRO: dispute amount, key arguments, pending actions, deadline awareness |

---

## How Downstream PROs Read This

**State PRO** reads `pros.lossBelow` to know:

1. **What type of underpayment?** -> `carrierAction.type`
2. **What are the dollar amounts?** -> `deductibleMath` (CCS vs carrier positions, net above deductible)
3. **Are there deadlines ticking?** -> `criticalActions[]` (any items with deadlines)
4. **What state-specific rules apply?** -> Uses `carrierAction.type` to determine which supplement statutes, carrier response timeframes, and depreciation rules to pull

**Undisputed Funds PRO** reads `pros.lossBelow` to know:

1. **What did the carrier actually pay?** -> `deductibleMath.carrierNetAboveDeductible`
2. **What is clearly owed beyond dispute?** -> `gapAnalysis.missedEntirely` (items carrier never addressed — strongest undisputed candidates)
3. **What is the CCS position?** -> `deductibleMath.ccsEstimateRCV`
4. **Is O&P undisputed?** -> `opAnalysis` (if owed and carrier gave no written justification, it may qualify)
5. **What depreciation is recoverable now?** -> `depreciationRecovery` (withheld amounts, disputed items)

**All correspondence PROs** (SPOL, 15 Day, Formal Demand, 30/45/60/75/90 Day) read `pros.lossBelow` to know:

1. **What is the winning argument?** -> `scopeReasonableness.conclusion`
2. **What are the carrier dialogue responses?** -> `carrierDialogue[]` (pre-built rebuttals for anticipated carrier positions)
3. **What are the specific gaps to reference?** -> `gapAnalysis` (all four buckets — missed, underpriced, improperly depreciated, not yet submitted)
4. **Is peer review pending?** -> `peerReview.status` (correspondence may need to wait)
5. **What did the AI flag?** -> `agenticNotes` (ITELL involvement, bad faith indicators, appraisal clause viability)
