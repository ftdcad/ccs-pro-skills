# State PRO — Chain JSON Schema

**How State PRO data lands in the chain JSON at `pros.statePro`.**
**This is a support/conditional PRO — it writes to its own path and is read by multiple downstream PROs.**
**For operational logic, see `state-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "state": "FL",

  "sourceMode": "hardcoded",

  "carrierObligations": {
    "claimClock": [
      {
        "trigger": "Notice of claim received",
        "deadline": "14 days — acknowledge receipt and begin investigation",
        "consequence": "Unfair claim settlement practice",
        "citation": "Fla. Stat. §626.9541(1)(i)(3)(a)"
      },
      {
        "trigger": "Proof of loss received (all items)",
        "deadline": "90 days — pay or deny with written explanation",
        "consequence": "Statutory interest + potential bad faith exposure",
        "citation": "Fla. Stat. §627.70131(5)(a)"
      },
      {
        "trigger": "Carrier agrees claim is covered",
        "deadline": "20 days — issue payment",
        "consequence": "Statutory interest at 12% per annum",
        "citation": "Fla. Stat. §627.70131(5)(b)"
      },
      {
        "trigger": "Supplement or reopened claim submitted",
        "deadline": "90 days — pay or deny supplement",
        "consequence": "Same as initial proof of loss deadline",
        "citation": "Fla. Stat. §627.70131(5)(a)"
      },
      {
        "trigger": "Written communication received from insured/PA",
        "deadline": "14 days — respond in writing",
        "consequence": "Unfair claim settlement practice",
        "citation": "Fla. Stat. §626.9541(1)(i)(3)(c)"
      }
    ],
    "interestAndDamages": {
      "rate": "12% per annum simple interest on overdue payments",
      "basis": "Interest accrues from date payment was due. Attorney fees recoverable under §627.428 if suit is filed and insured prevails.",
      "citation": "Fla. Stat. §627.70131(5)(a), §627.428"
    },
    "specialTracks": "Hurricane/catastrophe claims: Governor may extend deadlines via executive order during declared state of emergency. Verify executive orders for any active declarations affecting the loss date."
  },

  "paCompliance": {
    "feeCap": {
      "percentage": "20% standard / 10% during declared state of emergency",
      "citation": "Fla. Stat. §626.854(11)"
    },
    "preSuitNotice": {
      "required": true,
      "type": "Civil Remedies Notice (CRN)",
      "cureWindow": "60 days from filing with DFS",
      "citation": "Fla. Stat. §624.155(3)(a)"
    },
    "contractRequirements": "Written contract required before PA services. Must include fee percentage, rescission rights, scope of authority, and notice that insured may cancel within specified period.",
    "rescissionPeriod": "3 business days — insured may cancel PA contract without penalty within 3 business days of execution. If carrier pays or commits to pay within 3 business days of loss, PA fee limited to hourly rate."
  },

  "detectionFlags": [
    {
      "flag": "FL_PROMPT_PAYMENT_CLOCK",
      "triggered": true,
      "detail": "90-day prompt payment deadline running from proof of loss submission date. Track days elapsed and flag at 60 days."
    },
    {
      "flag": "FL_CRN_REQUIRED",
      "triggered": false,
      "detail": "Civil Remedies Notice required before any bad faith action. 60-day cure window. Not yet triggered — file when carrier exceeds prompt payment deadline without payment."
    },
    {
      "flag": "FL_EMERGENCY_FEE_CAP",
      "triggered": false,
      "detail": "10% emergency fee cap applies only during active declared state of emergency. Verify Governor's executive order status for loss date. If no active declaration, standard 20% cap applies."
    },
    {
      "flag": "FL_AOB_RESTRICTIONS",
      "triggered": false,
      "detail": "Assignment of Benefits restrictions under §627.7152. PA contracts are not AOBs, but if contractor has an AOB on this property, coordination required."
    }
  ],

  "deadlines": [
    {
      "name": "Carrier acknowledgment",
      "date": "2026-01-29",
      "daysRemaining": -36,
      "source": "14 days from notice of claim (01/15/2026)"
    },
    {
      "name": "Prompt payment — 90 day deadline",
      "date": "2026-04-20",
      "daysRemaining": 45,
      "source": "90 days from proof of loss submission (01/20/2026)"
    },
    {
      "name": "CRN filing window opens",
      "date": "2026-04-20",
      "daysRemaining": 45,
      "source": "Available after prompt payment deadline passes without payment"
    },
    {
      "name": "CRN cure period expires (if filed on day 90)",
      "date": "2026-06-19",
      "daysRemaining": 105,
      "source": "60 days after CRN filing date"
    }
  ],

  "agenticNotes": "Florida claim — 20% standard fee cap applies (no active emergency declaration for this loss date). CRN pre-suit notice will be required before any bad faith action — 60-day cure window means earliest suit date is approximately 150 days from proof of loss if carrier does not pay. Carrier acknowledgment deadline already passed (14 days from notice). 90-day prompt payment clock is the critical deadline — 45 days remaining. All correspondence PROs should reference the prompt payment clock but never cite §627.70131 in carrier letters.",

  "handoff": {
    "to": "Undisputed Funds PRO",
    "content": "FL state compliance loaded. 20% fee cap, CRN pre-suit required (60-day cure), 90-day prompt payment clock running with 45 days remaining. No emergency declaration active. Carrier acknowledgment deadline already blown. All deadlines and detection flags available at pros.statePro for downstream reference."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when State PRO finishes |
| `state` | string | Yes | Two-letter state code (e.g., `"FL"`, `"TX"`) |
| `sourceMode` | enum | Yes | `"hardcoded"` (TX, FL when built) or `"webSearch"` (all other states) |
| `carrierObligations.claimClock` | array | Yes | Each has `trigger`, `deadline`, `consequence`, `citation` |
| `carrierObligations.claimClock[].trigger` | string | Yes | Event that starts the clock |
| `carrierObligations.claimClock[].deadline` | string | Yes | Time limit and required action |
| `carrierObligations.claimClock[].consequence` | string | Yes | What happens if carrier misses the deadline |
| `carrierObligations.claimClock[].citation` | string | Yes | Statute reference (internal use only — never in carrier letters) |
| `carrierObligations.interestAndDamages.rate` | string | Yes | Interest rate on overdue payments |
| `carrierObligations.interestAndDamages.basis` | string | Yes | How interest is calculated and what else is recoverable |
| `carrierObligations.interestAndDamages.citation` | string | Yes | Statute reference |
| `carrierObligations.specialTracks` | string/null | Yes | Catastrophe extensions, TWIA tracks, or `null` if none |
| `paCompliance.feeCap.percentage` | string | Yes | Fee cap percentage and conditions |
| `paCompliance.feeCap.citation` | string | Yes | Statute reference |
| `paCompliance.preSuitNotice.required` | boolean | Yes | Whether pre-suit notice is required in this state |
| `paCompliance.preSuitNotice.type` | string | Yes | Name of the notice (CRN, 542A notice, etc.) or `"N/A"` |
| `paCompliance.preSuitNotice.cureWindow` | string | Yes | Cure period or `"N/A"` |
| `paCompliance.preSuitNotice.citation` | string | Yes | Statute reference |
| `paCompliance.contractRequirements` | string | Yes | State-specific PA contract requirements summary |
| `paCompliance.rescissionPeriod` | string | Yes | Insured's right to cancel PA contract |
| `detectionFlags` | array | Yes | Each has `flag` (string), `triggered` (boolean), `detail` (string) |
| `detectionFlags[].flag` | string | Yes | Flag identifier (e.g., `"FL_PROMPT_PAYMENT_CLOCK"`) |
| `detectionFlags[].triggered` | boolean | Yes | Whether this flag is active for the current claim |
| `detectionFlags[].detail` | string | Yes | Explanation of the flag and what to do |
| `deadlines` | array | Yes | Each has `name`, `date` (ISO), `daysRemaining` (number, negative if past), `source` |
| `deadlines[].name` | string | Yes | Human-readable deadline name |
| `deadlines[].date` | string | Yes | ISO date — the deadline date |
| `deadlines[].daysRemaining` | number | Yes | Days until deadline, negative if already passed |
| `deadlines[].source` | string | Yes | How the deadline was calculated |
| `agenticNotes` | string | Yes | Free text observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | Next PRO varies by claim track (Undisputed Funds, Denial, etc.) |
| `handoff.content` | string | Yes | Summary of state compliance findings and active deadlines |

---

## How Downstream PROs Read This

State PRO is a shared resource — multiple PROs read `pros.statePro` for different purposes:

1. **What are the carrier's deadlines?** → `carrierObligations.claimClock` (prompt payment deadlines by trigger event)
2. **What interest/damages apply?** → `carrierObligations.interestAndDamages` (rate, basis, citation)
3. **Is pre-suit notice required?** → `paCompliance.preSuitNotice` (type, cure window)
4. **What is the fee cap?** → `paCompliance.feeCap` (percentage and conditions)
5. **Are any detection flags active?** → `detectionFlags[]` (prompt payment clock, emergency fee cap, etc.)
6. **What deadlines are running?** → `deadlines[]` (calculated dates with days remaining)

Specific downstream consumers:

- **Undisputed Funds PRO** reads: `carrierObligations.claimClock` (prompt payment deadlines for Document 1), `deadlines` (days remaining calculations)
- **SPOL PRO** reads: `paCompliance` (state-specific SPOL requirements and PA contract rules)
- **All correspondence PROs** (Undisputed, Formal Demand, 15/30/45/60/75/90 Day) read: `paCompliance.preSuitNotice` (is CRN/542A notice required before escalation?), `carrierObligations` (deadline math for internal documents), `detectionFlags` (active warnings)
- **15/30/45/60/75/90 Day PROs** read: `deadlines` (running deadline calculations), `carrierObligations.interestAndDamages` (exposure calculations for escalating letters)
