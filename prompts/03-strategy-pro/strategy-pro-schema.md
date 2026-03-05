# Strategy PRO — Chain JSON Schema

**How Strategy PRO data lands in the chain JSON at `pros.strategy`.**
**For operational logic, see `strategy-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "carrierPosition": {
    "type": "denial_issued | new_claim | below_deductible",
    "source": "written | verbal",
    "summary": "Carrier issued full denial citing pre-existing damage exclusion (FIM 00 30 03 07)."
  },

  "gapAnalysis": {
    "ccsEstimateRCV": "$18,450.00",
    "carrierPositionRCV": "$0.00",
    "grossGap": "$18,450.00",
    "applicableDeductible": "$5,382.00",
    "netDisputeAmount": "$13,068.00",
    "projectedGap": false,
    "topGapDrivers": [
      "Full roof replacement — carrier scoped 0 SQ vs. CCS 26.93 SQ",
      "Interior water damage — 2 rooms not acknowledged by carrier",
      "Gutters — full perimeter R&R not included in carrier scope"
    ]
  },

  "routing": {
    "assignedTrack": "denial",
    "reasoning": "Carrier issued written denial citing pre-existing damage. Full CCS estimate ($18,450 RCV) is in dispute. Net dispute after deductible: $13,068."
  },

  "contradictionFlag": null,

  "leveragePoints": [
    {
      "point": "Policy language contradicts denial — FIM 00 30 03 07 requires carrier to prove pre-existing, not assume it",
      "source": "Policy Pro"
    },
    {
      "point": "25 documented chalk hits across all 4 slopes — functional storm damage confirmed",
      "source": "Scope Pro"
    },
    {
      "point": "Denial letter references wrong endorsement number — carrier may have applied wrong exclusion",
      "source": "Carrier letter"
    }
  ],

  "peerReview": {
    "status": "required",
    "triggers": ["denial_track"],
    "deadline": "24hr"
  },

  "estimateRevision": {
    "needed": false,
    "items": []
  },

  "reserveAdjustment": {
    "needed": false,
    "currentReserve": null,
    "estimateTotal": "$18,450.00",
    "variance": null,
    "reasoning": null
  },

  "criticalActions": [
    {
      "action": "peer_review",
      "detail": "Submit PR Request to CRM within 24 hours — denial track mandatory",
      "deadline": "24hr"
    },
    {
      "action": "homeowner_education",
      "detail": "Advise homeowner: carrier inspector has no financial authority. CCS will not attend inspection."
    },
    {
      "action": "client_communication",
      "detail": "Email client and referral source — estimate attached, file cleared estimating."
    },
    {
      "action": "income_protection",
      "detail": "15-day compliance deadline marked. All downstream PROs are time-gated."
    }
  ],

  "incomeProtection": {
    "fifteenDayDeadline": "2026-03-19",
    "milestones": [
      { "milestone": "Claim filed with carrier", "deadline": "Day 0", "status": "done" },
      { "milestone": "Carrier acknowledgment", "deadline": "Per state statute", "status": "done" },
      { "milestone": "Carrier inspection completed", "deadline": "Confirm date", "status": "done" },
      { "milestone": "Carrier decision", "deadline": "Per state statute", "status": "done" },
      { "milestone": "SPOL / Formal demand window", "deadline": "Per track", "status": "pending" },
      { "milestone": "Suit limitation", "deadline": "Per policy", "status": "pending" },
      { "milestone": "CCS PA contract in file", "deadline": "Confirm", "status": "done" }
    ],
    "risks": []
  },

  "agenticNotes": "Denial letter references FIM 00 30 03 07 but quotes language from a different endorsement. Carrier may have applied the wrong exclusion — verify exact endorsement text before responding. Peer review should evaluate this discrepancy.",

  "handoff": {
    "to": "Denial PRO",
    "content": "Written denial on pre-existing damage grounds. Net dispute $13,068. Peer review mandatory within 24hr. Leverage: policy language contradicts denial basis, functional damage well-documented, carrier may have cited wrong endorsement. 15-day deadline: 2026-03-19."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Strategy PRO finishes |
| `carrierPosition.type` | enum | Yes | `denial_issued`, `new_claim`, `below_deductible` — adjuster-selected |
| `carrierPosition.source` | enum | Yes | `written` or `verbal` |
| `carrierPosition.summary` | string | Yes | 1-2 sentence summary of what the carrier said/did |
| `gapAnalysis.ccsEstimateRCV` | string | Yes | Dollar amount from Xactimate estimate |
| `gapAnalysis.carrierPositionRCV` | string | Yes | Dollar amount from carrier EOB/EOS, or `"$0.00"` for denials |
| `gapAnalysis.grossGap` | string | Yes | CCS estimate minus carrier position |
| `gapAnalysis.applicableDeductible` | string | Yes | From `pros.policy.coverage` |
| `gapAnalysis.netDisputeAmount` | string | Yes | Gross gap minus deductible — the number that matters |
| `gapAnalysis.projectedGap` | boolean | Yes | `true` if carrier hasn't issued an estimate yet |
| `gapAnalysis.topGapDrivers` | string[] | Yes | Top 3-5 line items driving the gap |
| `routing.assignedTrack` | enum | Yes | `"denial"`, `"newClaim"`, `"lossBelow"` |
| `routing.reasoning` | string | Yes | 2-4 sentences explaining the assignment |
| `contradictionFlag` | string/null | Yes | `null` if no contradiction, otherwise describes the mismatch |
| `leveragePoints` | array | Yes | 2-4 items, each with `point` (string) and `source` (string) |
| `peerReview.status` | enum | Yes | `"required"`, `"recommended"`, `"not_required"` |
| `peerReview.triggers` | string[] | Yes | Which triggers apply (empty array if not required) |
| `peerReview.deadline` | string | Yes | `"24hr"`, `"48hr"`, or `"n/a"` |
| `estimateRevision.needed` | boolean | Yes | Does estimate need corrections? |
| `estimateRevision.items` | string[] | Yes | Specific items to fix (empty if not needed) |
| `reserveAdjustment.needed` | boolean | Yes | Do reserves need updating? |
| `reserveAdjustment.currentReserve` | string/null | Conditional | Current reserve amount if known |
| `reserveAdjustment.estimateTotal` | string | Yes | CCS estimate total |
| `reserveAdjustment.variance` | string/null | Conditional | Amount + percentage if reserves differ |
| `reserveAdjustment.reasoning` | string/null | Conditional | Why reserves changed |
| `criticalActions` | array | Yes | Each has `action` (string), `detail` (string), optional `deadline` (string) |
| `incomeProtection.fifteenDayDeadline` | string | Yes | ISO date — 15 days from estimate completion |
| `incomeProtection.milestones` | array | Yes | Each has `milestone`, `deadline`, `status` (`"done"` / `"pending"`) |
| `incomeProtection.risks` | string[] | Yes | Any flagged compliance risks (empty if none) |
| `agenticNotes` | string | Yes | Free text observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | `"Denial PRO"`, `"NEW Claim PRO"`, or `"Loss Below PRO"` |
| `handoff.content` | string | Yes | Summary of what's being passed forward |

---

## How Downstream PROs Read This

The downstream PRO (Denial / NEW Claim / Loss Below) reads `pros.strategy` to know:

1. **What track am I on?** → `routing.assignedTrack`
2. **What's the dispute amount?** → `gapAnalysis.netDisputeAmount`
3. **What are my leverage points?** → `leveragePoints[]`
4. **Is peer review ticking?** → `peerReview.status` + `peerReview.deadline`
5. **Is the estimate clean?** → `estimateRevision.needed`
6. **What's the 15-day deadline?** → `incomeProtection.fifteenDayDeadline`
7. **What did the AI notice?** → `agenticNotes`

Each downstream PRO writes to its own path (`pros.denial`, `pros.newClaim`, or `pros.lossBelow`) following the same pattern: status, analysis, actions, handoff.
