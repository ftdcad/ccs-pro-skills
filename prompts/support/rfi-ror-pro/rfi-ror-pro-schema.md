# RFI/ROR PRO — Chain JSON Schema

**How RFI/ROR PRO data lands in the chain JSON at `pros.rfiResponses[]`.**
**Note: This is an array — multiple RFIs can arrive during a claim lifecycle. Each RFI appends to the array.**
**For operational logic, see `rfi-ror-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "rfiDate": "2026-02-28",

  "requestNumber": 1,

  "responseDeadline": "2026-03-21",

  "isEscalated": false,

  "isEmbeddedInROR": false,

  "rorDualRoute": null,

  "items": [
    {
      "number": 1,
      "carrierRequest": "Please provide all photographs taken of the property before, during, and after the reported loss, including photographs taken by any contractor, public adjuster, or other third party.",
      "plainEnglish": "Every photo you have of the damage — yours, the contractor's, ours. Before, during, and after the storm.",
      "whereToFind": "Phone camera roll, contractor photos (ask contractor directly), PA inspection photos (we will provide ours).",
      "status": "pending",
      "flagged": false,
      "flagReason": null
    },
    {
      "number": 2,
      "carrierRequest": "Provide all receipts, invoices, and estimates for any repairs, temporary or permanent, performed at the property since the date of loss.",
      "plainEnglish": "Any receipts for work already done — emergency tarp, board-up, temporary fixes, anything.",
      "whereToFind": "Email receipts from contractors, credit card statements, bank records for payments made.",
      "status": "pending",
      "flagged": false,
      "flagReason": null
    },
    {
      "number": 3,
      "carrierRequest": "Provide maintenance records for the roof system including date of last replacement, any prior repairs, and the name of the roofing contractor who performed the most recent work.",
      "plainEnglish": "When was the roof last replaced or repaired? Who did the work? Any paperwork you have from those jobs.",
      "whereToFind": "Home improvement records, contractor invoices, permit records (county building department), home purchase inspection report.",
      "status": "pending",
      "flagged": false,
      "flagReason": null
    },
    {
      "number": 4,
      "carrierRequest": "Provide the name, address, phone number, and license number of any public adjuster, contractor, or other representative acting on your behalf in connection with this claim.",
      "plainEnglish": "Our information — PA name, license, contact. Also the contractor's info if one is involved.",
      "whereToFind": "We will provide our information. Insured should confirm contractor details if one has been retained.",
      "status": "obtained",
      "flagged": false,
      "flagReason": null
    },
    {
      "number": 5,
      "carrierRequest": "The insured is requested to submit to an examination under oath and/or provide a recorded statement regarding the facts and circumstances of the claimed loss at a mutually agreeable date and time.",
      "plainEnglish": "The carrier wants to interview you on the record about what happened.",
      "whereToFind": "No documents needed — this is a scheduled event. DO NOT AGREE without PA guidance.",
      "status": "pending",
      "flagged": true,
      "flagReason": "Recorded statement / EUO request — insured should not agree without PA present. Consider whether attorney counsel is appropriate. Compliance is generally required under policy cooperation clause, but timing and conditions should be managed by PA."
    }
  ],

  "escalationFlags": [
    {
      "condition": "Recorded statement requested",
      "flag": "PA must be present or attorney counsel recommended. Do not let insured schedule independently."
    },
    {
      "condition": "Maintenance records requested",
      "flag": "Carrier may be building pre-existing damage defense. Document current roof age and condition thoroughly. If records do not exist, insured must formally state 'not in possession' — do not leave unanswered."
    }
  ],

  "agenticNotes": "First RFI — standard 15 business day response window. Five items requested. Item 5 (recorded statement/EUO) is flagged for PA review — insured should not agree to this without PA present. Item 3 (maintenance records) suggests carrier may be building a pre-existing damage argument — prepare accordingly. Item 4 (PA/contractor info) is already in our possession and can be provided immediately. Remaining items require insured cooperation. Schedule call with insured within 24 hours to walk through the response guide.",

  "handoff": {
    "to": "Adjuster action required",
    "content": "First carrier RFI received 02/28/2026 with 15 business day deadline (03/21/2026). Five items requested — 1 already obtained (PA info), 3 pending insured cooperation (photos, receipts, maintenance records), 1 flagged for PA review (recorded statement). Email to insured generated. Schedule insured call within 24 hours. Do not let recorded statement proceed without PA present."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when RFI/ROR PRO finishes processing this RFI |
| `rfiDate` | string | Yes | ISO date — date the carrier's RFI letter was sent or received |
| `requestNumber` | number | Yes | `1`, `2`, or `3` — which request this is (1st, 2nd, 3rd) |
| `responseDeadline` | string | Yes | ISO date — deadline stated in RFI, or calculated (RFI date + 10 business days if unstated) |
| `isEscalated` | boolean | Yes | `true` if this is a 2nd or 3rd request — denial risk is immediate |
| `isEmbeddedInROR` | boolean | Yes | `true` if the RFI was found inside a Reservation of Rights letter |
| `rorDualRoute` | object/null | Yes | `null` if not embedded in ROR. If embedded: `{strategyProRouted: boolean, note: string}` |
| `rorDualRoute.strategyProRouted` | boolean | Conditional | `true` if the ROR coverage portion has been routed to Strategy PRO |
| `rorDualRoute.note` | string | Conditional | Explanation of the dual-route (e.g., "ROR sent to Strategy PRO for coverage analysis, RFI items handled here") |
| `items` | array | Yes | One object per requested item, numbered to match the carrier's letter |
| `items[].number` | number | Yes | Item number matching the carrier's RFI numbering |
| `items[].carrierRequest` | string | Yes | Exact text quoted from the carrier's RFI letter — do not paraphrase |
| `items[].plainEnglish` | string | Yes | Plain-language translation for the insured |
| `items[].whereToFind` | string | Yes | Guidance on where the insured can find the requested item |
| `items[].status` | enum | Yes | `"pending"`, `"obtained"`, or `"notInPossession"` |
| `items[].flagged` | boolean | Yes | `true` if the request needs PA/attorney review before compliance |
| `items[].flagReason` | string/null | Yes | `null` if not flagged, otherwise explains the concern |
| `escalationFlags` | array | Yes | Each has `condition` (string) and `flag` (string) — broader claim-level concerns |
| `agenticNotes` | string | Yes | Free text observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | Typically `"Adjuster action required"` — RFI response requires human action |
| `handoff.content` | string | Yes | Summary of items, deadline, flags, and required next steps |

---

## How Downstream PROs Read This

RFI/ROR PRO writes to `pros.rfiResponses[]` (array). Each RFI appends a new entry. Downstream PROs scan the array for relevant data:

1. **Is this claim escalated due to unanswered RFIs?** → `isEscalated` (true on 2nd/3rd request — urgency flag)
2. **When is the response due?** → `responseDeadline` (critical deadline)
3. **Are there flagged items?** → `items[].flagged` (overly broad requests, recorded statements, etc.)
4. **Was this an ROR dual-route?** → `isEmbeddedInROR`, `rorDualRoute` (coordination with Strategy PRO)
5. **Did the insured cooperate?** → `items[].status` (evidence of cooperation or non-cooperation)

Specific downstream consumers:

- **Strategy PRO** reads: (if ROR dual-route) `rorDualRoute` (confirms RFI portion is being handled separately), `items[].flagged` (overly broad or improper requests are a bad faith indicator the strategy should reference)
- **Denial PRO** reads: `items[].status` (was cooperation fulfilled? If all items were provided and carrier still denied, non-cooperation defense fails — strong leverage point)
- **All PROs** read: `isEscalated` (urgency flag — a 2nd or 3rd unanswered RFI means the claim is at risk regardless of merits), `responseDeadline` (critical date that overrides other workflow priorities)
