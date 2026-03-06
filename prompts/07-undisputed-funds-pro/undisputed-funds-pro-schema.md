# Undisputed Funds PRO — Chain JSON Schema

**How Undisputed Funds PRO data lands in the chain JSON at `pros.undisputed`.**
**For operational logic, see `undisputed-funds-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "claimSummary": {
    "carrier": "Heritage Property & Casualty Insurance Company",
    "claimNumber": "HPC-2026-00847",
    "policyNumber": "HPC-FL-HO3-2024-091547",
    "insured": "Neil & Sarah Armstrong",
    "property": "4521 Windward Dr, Melbourne, FL 32904",
    "dateOfLoss": "2026-01-15",
    "totalLossPosition": "$18,450.00",
    "undisputedAmount": "$9,720.00",
    "carrierPaidToDate": "$2,500.00",
    "balanceDemanded": "$7,220.00"
  },

  "strategicFoundation": {
    "coverageBasis": "HO3 Coverage A — Dwelling, open perils. Wind/hail damage to roof, gutters, and interior water intrusion from compromised roof system.",
    "carrierPosition": "Carrier acknowledged partial roof damage on initial inspection but has not issued payment beyond the emergency tarp ALE advance of $2,500.",
    "carrierDelayTactic": "Nonresponsive — carrier acknowledged coverage verbally, issued partial scope, then stopped communicating. No written denial. No payment. No dispute on record.",
    "leveragePoint": "Carrier's own field inspector documented 14 of 25 chalk hits and noted interior water staining in two rooms. Their own scope includes items they have not paid.",
    "promptPaymentStatus": "FL prompt payment clock running — 90 days from proof of loss submission. 47 days elapsed. 43 days remaining before statutory interest triggers."
  },

  "undisputedAnalysis": {
    "immediatePaymentDue": "$7,220.00",
    "coverageBasis": "Section I — Coverage A, Dwelling: 'We insure against direct physical loss to property described in Coverages A and B caused by any of the following perils unless the loss is excluded in Section I — Exclusions.'",
    "undisputedItems": [
      { "item": "Roof — 14 confirmed hail impacts (carrier-documented)", "amount": "$4,280.00" },
      { "item": "Gutters — perimeter damage noted in carrier scope", "amount": "$1,640.00" },
      { "item": "Interior — ceiling staining, 2 rooms (carrier inspector photographed)", "amount": "$2,350.00" },
      { "item": "Emergency tarp — already acknowledged via ALE advance", "amount": "$950.00" }
    ],
    "excludedItems": [
      { "item": "Remaining 11 chalk hits and full roof replacement differential", "reason": "Disputed — reserved for separate escalation" },
      { "item": "Fence and screen enclosure damage", "reason": "Carrier has not acknowledged — reserved for formal demand" }
    ]
  },

  "carrierDelayAnalysis": {
    "tacticIdentified": "Nonresponsive after partial acknowledgment — carrier verbally confirmed coverage, issued a partial scope reflecting 14 impacts, then went silent. No denial, no payment, no written dispute. Classic 'pocket veto' tactic designed to run the clock without creating a paper trail.",
    "whyItFails": "Carrier's own field inspector documented the damage in their scope. Verbal acknowledgment plus documented scope equals coverage concession. Withholding payment on items the carrier itself scoped is indefensible under the policy and Florida prompt payment law.",
    "promptPaymentClock": {
      "state": "FL",
      "statute": "Fla. Stat. §627.70131",
      "triggerDate": "2026-01-20",
      "daysElapsed": 47,
      "daysUntilLiability": 43,
      "exposure": "Statutory interest at 12% per annum + attorney fees if suit filed. CRN (Civil Remedies Notice) required before bad faith action — 60-day cure window."
    }
  },

  "escalationFramework": {
    "ifPays": "Route to SPOL Pro for sworn proof of loss on remaining disputed amounts ($8,730 in dispute beyond undisputed items).",
    "ifRefuses": "Document refusal as bad faith indicator. Route to Formal Demand Pro for full demand preparation. Carrier refusal to pay its own scoped items after acknowledgment establishes timeline violations for future bad faith action.",
    "ifDelays": "Reject delay as unreasonable — carrier has had 47 days since proof of loss. Demand immediate acknowledgment and payment timeline within 10 business days. Position continued delay as prompt payment violation and preserve CRN filing option."
  },

  "documents": {
    "doc1": "Undisputed_Analysis_HPC-2026-00847_2026-03-06.docx",
    "doc2": "Undisputed_Demand_HPC-2026-00847_2026-03-06.docx"
  },

  "managerReview": {
    "required": true,
    "checklist": [
      "Undisputed amount is defensible from the estimate",
      "Policy language quoted accurately",
      "No disputed items included in demand amount",
      "State prompt payment deadlines verified",
      "Carrier delay tactic accurately characterized",
      "Letter is professional and does not overreach",
      "Routing to SPOL Pro is appropriate for this file"
    ]
  },

  "agenticNotes": "Carrier's own field inspector documented 14 impacts and interior water damage but no payment has followed. The gap between acknowledgment and payment is the strongest leverage point — this is not a coverage dispute, it is a payment dispute on conceded items. The 90-day FL prompt payment clock is running and 47 days have elapsed. If carrier does not respond within 10 business days, CRN filing should be evaluated.",

  "handoff": {
    "to": "SPOL PRO",
    "content": "Undisputed funds demand sent for $7,220 on carrier-acknowledged items. Carrier paid $2,500 ALE advance to date. FL prompt payment clock at 47/90 days. Two documents produced — strategic analysis (internal) and demand letter (sent to carrier). Manager review completed. Route to SPOL Pro for sworn proof of loss preparation on full claimed amount. If carrier refuses payment, escalate to Formal Demand Pro."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Undisputed Funds PRO finishes |
| `claimSummary.carrier` | string | Yes | Insurance company name |
| `claimSummary.claimNumber` | string | Yes | Carrier-assigned claim number |
| `claimSummary.policyNumber` | string | Yes | Policy number from Policy PRO |
| `claimSummary.insured` | string | Yes | Named insured(s) from policy |
| `claimSummary.property` | string | Yes | Property address |
| `claimSummary.dateOfLoss` | string | Yes | ISO date |
| `claimSummary.totalLossPosition` | string | Yes | CCS total loss position (full estimate RCV) |
| `claimSummary.undisputedAmount` | string | Yes | Total of items carrier cannot reasonably dispute |
| `claimSummary.carrierPaidToDate` | string | Yes | Dollar amount carrier has already paid or advanced |
| `claimSummary.balanceDemanded` | string | Yes | Undisputed amount minus carrier paid to date |
| `strategicFoundation.coverageBasis` | string | Yes | Policy language supporting payment |
| `strategicFoundation.carrierPosition` | string | Yes | What the carrier has said or done |
| `strategicFoundation.carrierDelayTactic` | string | Yes | Identified delay tactic (nonresponsive, partial payment, scope dispute, etc.) |
| `strategicFoundation.leveragePoint` | string | Yes | Why the undisputed items are undisputed |
| `strategicFoundation.promptPaymentStatus` | string | Yes | State prompt payment clock status and remaining days |
| `undisputedAnalysis.immediatePaymentDue` | string | Yes | Dollar amount demanded now |
| `undisputedAnalysis.coverageBasis` | string | Yes | Exact quoted policy language — not paraphrased |
| `undisputedAnalysis.undisputedItems` | array | Yes | Each has `item` (string) and `amount` (string) |
| `undisputedAnalysis.excludedItems` | array | Yes | Items reserved for separate escalation, each with `item` and `reason` |
| `carrierDelayAnalysis.tacticIdentified` | string | Yes | Specific description of the delay tactic |
| `carrierDelayAnalysis.whyItFails` | string | Yes | Contractual and factual basis for why the tactic is indefensible |
| `carrierDelayAnalysis.promptPaymentClock.state` | string | Yes | Two-letter state code |
| `carrierDelayAnalysis.promptPaymentClock.statute` | string | Yes | Applicable prompt payment statute citation |
| `carrierDelayAnalysis.promptPaymentClock.triggerDate` | string | Yes | ISO date — when the clock started |
| `carrierDelayAnalysis.promptPaymentClock.daysElapsed` | number | Yes | Days since trigger date |
| `carrierDelayAnalysis.promptPaymentClock.daysUntilLiability` | number | Yes | Days remaining before statutory liability attaches |
| `carrierDelayAnalysis.promptPaymentClock.exposure` | string | Yes | What the carrier faces if they do not pay (interest rate, fees, etc.) |
| `escalationFramework.ifPays` | string | Yes | Next step if carrier pays the undisputed amount |
| `escalationFramework.ifRefuses` | string | Yes | Next step if carrier refuses |
| `escalationFramework.ifDelays` | string | Yes | Next step if carrier continues delaying |
| `documents.doc1` | string | Yes | Filename: `Undisputed_Analysis_[ClaimNumber]_[Date].docx` |
| `documents.doc2` | string | Yes | Filename: `Undisputed_Demand_[ClaimNumber]_[Date].docx` |
| `managerReview.required` | boolean | Yes | Always `true` — manager review is mandatory before sending |
| `managerReview.checklist` | string[] | Yes | 7-item checklist for manager peer review |
| `agenticNotes` | string | Yes | Free text observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | `"SPOL PRO"` (primary) or `"Formal Demand PRO"` (if carrier refuses) |
| `handoff.content` | string | Yes | Summary of what is being passed forward |

---

## How Downstream PROs Read This

The downstream PROs read `pros.undisputed` to know:

1. **What was demanded and how much?** → `claimSummary.balanceDemanded`, `undisputedAnalysis.immediatePaymentDue`
2. **What is the claim data for SPOL preparation?** → `claimSummary` (carrier, claim number, policy number, insured, property, date of loss, amounts)
3. **Is the prompt payment clock running?** → `carrierDelayAnalysis.promptPaymentClock` (state, trigger date, days elapsed, days remaining)
4. **What happens if carrier refuses?** → `escalationFramework.ifRefuses` (routes to Formal Demand PRO)

Specific downstream consumers:

- **SPOL PRO** reads: `claimSummary` (claim data for SPOL form population), `undisputedAnalysis.immediatePaymentDue` (amount context for SPOL)
- **Formal Demand PRO** reads: (if carrier refuses) `carrierDelayAnalysis` (delay documentation), `escalationFramework` (escalation rationale)
- **15 Day PRO** reads: `carrierDelayAnalysis.promptPaymentClock` (deadline data for compliance tracking)
