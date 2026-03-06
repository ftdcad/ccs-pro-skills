# SPOL PRO — Chain JSON Schema

**How SPOL PRO data lands in the chain JSON at `pros.spol`.**
**For operational logic, see `spol-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "claimIdentification": {
    "insuredNames": "Neil & Sarah Armstrong",
    "policyNumber": "HPC-FL-HO3-2024-091547",
    "carrier": "Heritage Property & Casualty Insurance Company",
    "claimNumber": "HPC-2026-00847",
    "propertyAddress": "4521 Windward Dr, Melbourne, FL 32904",
    "agentName": "Michael Reeves",
    "agentContact": "mreeves@heritageinsurance.com | (321) 555-0142"
  },

  "lossInformation": {
    "dateOfLoss": "01/15/2026",
    "timeOfLoss": "12:00 AM",
    "causeOfLoss": "Wind/Hail",
    "descriptionOfLoss": "Wind and hail damage to roof system including shingle impacts, gutter damage, and resulting interior water intrusion in two rooms. Emergency tarp installed. Fence and screen enclosure also damaged."
  },

  "coverageAndAmounts": [
    {
      "coverage": "Coverage A — Dwelling",
      "policyLimit": "$385,000",
      "amountClaimed": "$16,270"
    },
    {
      "coverage": "Coverage B — Other Structures",
      "policyLimit": "$38,500",
      "amountClaimed": "$2,180"
    },
    {
      "coverage": "Coverage C — Personal Property",
      "policyLimit": "$192,500",
      "amountClaimed": "REQUIRES SEPARATE INVENTORY"
    },
    {
      "coverage": "Coverage D — Loss of Use",
      "policyLimit": "$77,000",
      "amountClaimed": "REQUIRES RECEIPTS"
    }
  ],

  "totals": {
    "totalClaimed": "$18,450",
    "deductible": "$5,382",
    "netAfterDeductible": "$13,068"
  },

  "completionStatus": {
    "fieldsPopulated": 17,
    "totalFields": 20,
    "percentComplete": 85,
    "fieldsRequiringInsuredInput": [
      {
        "field": "Coverage C — Personal Property Amount",
        "instructions": "Provide a room-by-room inventory of damaged personal belongings with estimated replacement costs. If you have receipts, include them."
      },
      {
        "field": "Coverage D — Loss of Use Amount",
        "instructions": "Provide receipts for any additional living expenses incurred due to the loss — hotel stays, meals, temporary storage, etc. If none were incurred, confirm $0."
      },
      {
        "field": "Time of Loss",
        "instructions": "If you know the approximate time the damage occurred (storm arrival), provide it. Otherwise the default of 12:00 AM will be used."
      }
    ]
  },

  "deadlineNotice": {
    "fifteenDayDeadline": "2026-01-30",
    "today": "2026-03-06",
    "daysRemaining": -35,
    "overdue": true
  },

  "documents": {
    "spolDraft": "SPOL_Draft_HPC-2026-00847_2026-03-06.docx"
  },

  "agenticNotes": "15-day deadline from date of loss has already passed — this SPOL is 35 days overdue. Flag immediately and route to 15 Day PRO now. Coverage C and D remain open — insured must provide personal property inventory and ALE receipts before SPOL can be fully executed. Coverage A amount ($16,270) does not exceed policy limit ($385,000). Coverage B amount ($2,180) does not exceed policy limit ($38,500). No limit conflicts detected.",

  "handoff": {
    "to": "15 Day PRO",
    "content": "SPOL draft prepared at 85% completion — 17 of 20 fields populated. Three fields require insured input: Coverage C inventory, Coverage D receipts, and time of loss confirmation. 15-day deadline is 35 days overdue — route to 15 Day PRO immediately. Total claimed: $18,450 RCV. Net after deductible: $13,068. Draft delivered to adjuster for 24-hour insured delivery."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when SPOL PRO finishes |
| `claimIdentification.insuredNames` | string | Yes | Exact legal name(s) from policy declarations |
| `claimIdentification.policyNumber` | string | Yes | From policy document |
| `claimIdentification.carrier` | string | Yes | Full carrier name |
| `claimIdentification.claimNumber` | string | Yes | From estimate or carrier correspondence |
| `claimIdentification.propertyAddress` | string | Yes | From policy document |
| `claimIdentification.agentName` | string | Yes | From policy or `"NOT PROVIDED"` |
| `claimIdentification.agentContact` | string | Yes | From policy or `"NOT PROVIDED"` |
| `lossInformation.dateOfLoss` | string | Yes | MM/DD/YYYY format |
| `lossInformation.timeOfLoss` | string | Yes | Defaults to `"12:00 AM"` if unknown |
| `lossInformation.causeOfLoss` | string | Yes | From estimate (Wind/Hail, Fire, Water, etc.) |
| `lossInformation.descriptionOfLoss` | string | Yes | Summary from estimate scope of loss |
| `coverageAndAmounts` | array | Yes | One object per coverage line (A, B, C, D). Each has `coverage`, `policyLimit`, `amountClaimed` |
| `coverageAndAmounts[].coverage` | string | Yes | Coverage A — Dwelling, Coverage B — Other Structures, etc. |
| `coverageAndAmounts[].policyLimit` | string | Yes | Dollar amount from policy declarations |
| `coverageAndAmounts[].amountClaimed` | string | Yes | Dollar amount from estimate, or `"REQUIRES SEPARATE INVENTORY"` / `"REQUIRES RECEIPTS"` |
| `totals.totalClaimed` | string | Yes | Sum of all claimed amounts (Coverage C/D excluded if not yet provided) |
| `totals.deductible` | string | Yes | From policy declarations |
| `totals.netAfterDeductible` | string | Yes | Total claimed minus deductible |
| `completionStatus.fieldsPopulated` | number | Yes | Count of fields successfully filled |
| `completionStatus.totalFields` | number | Yes | Total SPOL form fields |
| `completionStatus.percentComplete` | number | Yes | Integer percentage (e.g., 85) |
| `completionStatus.fieldsRequiringInsuredInput` | array | Yes | Each has `field` (string) and `instructions` (string, plain English) |
| `deadlineNotice.fifteenDayDeadline` | string | Yes | ISO date — date of loss + 15 days |
| `deadlineNotice.today` | string | Yes | ISO date — current date |
| `deadlineNotice.daysRemaining` | number | Yes | Negative if overdue |
| `deadlineNotice.overdue` | boolean | Yes | `true` if 15 days have passed |
| `documents.spolDraft` | string | Yes | Filename: `SPOL_Draft_[ClaimNumber]_[Date].docx` |
| `agenticNotes` | string | Yes | Free text observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | `"15 Day PRO"` |
| `handoff.content` | string | Yes | Summary of completion status, deadline status, and amounts |

---

## How Downstream PROs Read This

The downstream PROs read `pros.spol` to know:

1. **Is the SPOL complete or pending insured input?** → `completionStatus.percentComplete`, `completionStatus.fieldsRequiringInsuredInput`
2. **Is the 15-day clock already blown?** → `deadlineNotice.overdue`, `deadlineNotice.daysRemaining`
3. **What are the claimed amounts by coverage?** → `coverageAndAmounts`, `totals`
4. **What is the net dispute amount?** → `totals.netAfterDeductible`

Specific downstream consumers:

- **15 Day PRO** reads: `deadlineNotice` (is the clock already running or overdue?), `completionStatus.percentComplete` (is the SPOL ready to submit or still waiting on insured?)
- **Formal Demand PRO** reads: `totals.totalClaimed` (total loss position for demand), `coverageAndAmounts` (coverage-by-coverage breakdown for demand letter)
