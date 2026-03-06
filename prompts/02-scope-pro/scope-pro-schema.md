# Scope PRO — Chain JSON Schema

**How Scope PRO data lands in the chain JSON at `pros.scope`.**
**For operational logic, see `scope-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "subtitle": "75 photos analyzed · No EagleView · Hip roof · Hurricane Milton",

  "measurements": {
    "netArea": "23.42 SQ (2,342 SF)",
    "recommendedSQ": { "value": "26.93 SQ (23.42 + 15% hip waste)", "highlight": true },
    "pitch": "5/12",
    "configuration": "Hip — 4 facets",
    "ridge": "32.33 LF",
    "perimeter": "~199 LF"
  },

  "roofExterior": [
    { "item": "Shingle Replacement", "description": "Full roof — 25 chalk hits: F(11) R(5) B(5) L(4). Arch. asphalt. No EagleView — 15% hip waste applied.", "qty": "26.93 SQ" },
    { "item": "Aluminum Ridge Vent", "description": "Continuous — photos #13, #14. R&R with roof.", "qty": "Per LF" },
    { "item": "Turtle Vent", "description": "1 unit — photos #13, #18. R&R with roof.", "qty": "1 EA" },
    { "item": "Pipe Jacks", "description": "4 units — chalk annotation confirmed — photos #14–#19.", "qty": "4 EA" },
    { "item": "Electric Mast Boot", "description": "Weatherhead / service mast — photo #29. R&R with roof.", "qty": "1 EA" },
    { "item": "Gutters — Aluminum", "description": "White aluminum, full perimeter — photos #3–#11. R&R.", "qty": "~199 LF" }
  ],

  "interior": [
    {
      "room": "Bedroom 3",
      "source": "Water stain ring — photo #75",
      "items": ["R&R drywall ceiling (verify drywall vs. plaster in field)", "R&R attic insulation (same SF)", "Texture ceiling — full room", "Paint ceiling — full room"],
      "sf": "Field measure"
    },
    {
      "room": "Master Bedroom",
      "source": "Ceiling staining — photos #50–#52",
      "items": ["R&R drywall ceiling (verify drywall vs. plaster in field)", "R&R attic insulation (same SF)", "Texture ceiling — full room", "Paint ceiling — full room"],
      "sf": "Field measure"
    }
  ],

  "severity": {
    "level": "Severity 2",
    "description": "Light/Moderate | Habitable"
  },

  "flags": [
    { "variant": "green", "content": "Functional damage confirmed — 25 documented impacts across all 4 slopes. Hurricane Milton 10/10/2024." },
    { "variant": "green", "content": "Above deductible — Hurricane deductible $5,382 confirmed. Scope supports recovery above threshold." },
    { "variant": "red", "content": "PA REVIEW REQUIRED — Occupancy conflict from Policy PRO must be resolved before strategy. Carrier has DL 24 16 07 88 on file." },
    { "variant": "yellow", "content": "Drywall vs. plaster not confirmed — verify in field before estimating interior." },
    { "variant": "yellow", "content": "Moisture testing recommended — Bedroom 3 prior to estimate finalization." }
  ],

  "notes": [
    "Back porch metal roof — present, no damage observed.",
    "75 photos analyzed.",
    "No screen enclosure visible — Screen Enclosure Limitation likely not triggered.",
    "No floor damage observed — Cosmetic Floors endorsement not triggered."
  ],

  "agenticNotes": "No additional observations.",

  "handoff": {
    "to": "Estimating",
    "content": "26.93 SQ recommended. 2 interior rooms need field SF. Drywall/plaster confirmation needed before pricing interior. PA must resolve occupancy conflict before Strategy PRO proceeds."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Scope PRO finishes |
| `subtitle` | string | Yes | Summary line: photo count, measurement source (EagleView/Hover/manual), roof type, peril |
| `measurements.netArea` | string | Yes | Net roof area in SQ and SF |
| `measurements.recommendedSQ` | object | Yes | `.value` = adjusted SQ with waste factor explained. `.highlight` = `true` if waste was applied |
| `measurements.pitch` | string | Yes | Roof pitch (e.g., `"5/12"`, `"8/12"`) |
| `measurements.configuration` | string | Yes | Roof shape and facet count (e.g., `"Hip — 4 facets"`, `"Gable — 2 facets"`) |
| `measurements.ridge` | string | Yes | Ridge length in LF |
| `measurements.perimeter` | string | Yes | Eave/perimeter length in LF (prefix `~` if estimated) |
| `roofExterior` | array | Yes | Each object: `item` (string), `description` (string), `qty` (string). One entry per scoped line item. |
| `roofExterior[].item` | string | Yes | Component name (e.g., `"Shingle Replacement"`, `"Pipe Jacks"`) |
| `roofExterior[].description` | string | Yes | What, where, how many. Photo references, chalk counts, slope breakdown. |
| `roofExterior[].qty` | string | Yes | Quantity with unit (e.g., `"26.93 SQ"`, `"4 EA"`, `"Per LF"`, `"~199 LF"`) |
| `interior` | array | Conditional | Present only if interior damage exists. One object per room. |
| `interior[].room` | string | Yes | Room name (e.g., `"Bedroom 3"`, `"Master Bedroom"`) |
| `interior[].source` | string | Yes | Damage source and photo reference |
| `interior[].items` | string[] | Yes | Line items for that room — each is a work-order action |
| `interior[].sf` | string | Yes | Square footage or `"Field measure"` if not yet measured |
| `severity.level` | string | Yes | CCS scale: `"Severity 1"` through `"Severity 5"` |
| `severity.description` | string | Yes | Label from scale (e.g., `"Light/Moderate | Habitable"`, `"Severe | Emergency Tarp"`) |
| `flags` | array | Yes | Each object: `variant` (`"green"`, `"yellow"`, `"red"`), `content` (string). Green = confirmed positive. Yellow = needs verification. Red = blocker. |
| `flags[].variant` | enum | Yes | `"green"`, `"yellow"`, or `"red"` |
| `flags[].content` | string | Yes | Plain-language explanation of the flag |
| `notes` | string[] | Yes | Items present on property but not scoped — no damage observed, endorsement not triggered, etc. |
| `agenticNotes` | string | Yes | Free text AI observations, or `"No additional observations."` |
| `handoff.to` | string | Yes | Always `"Estimating"` — Scope PRO hands off to human estimator |
| `handoff.content` | string | Yes | Summary: recommended SQ, outstanding field items, blockers for downstream PROs |

---

## How Downstream PROs Read This

### Estimating (human step)
Reads `pros.scope` to build the Xactimate estimate:

1. **How much roof?** -> `measurements.recommendedSQ` (the number to price)
2. **What line items?** -> `roofExterior[]` (each item becomes an Xactimate line)
3. **Any interior?** -> `interior[]` (rooms, items, SF — or "Field measure" flag)
4. **How bad is it?** -> `severity` (drives pricing tier and urgency)
5. **What's unresolved?** -> `flags` where `variant = "yellow"` (field verification needed before pricing)

### Strategy PRO
Reads `pros.scope` to run gap analysis against the carrier estimate:

1. **What did CCS scope?** -> `measurements.recommendedSQ` (compare against carrier SQ)
2. **What's the damage severity?** -> `severity` (informs dispute positioning)
3. **Any red flags?** -> `flags` (blockers that must clear before strategy proceeds)
4. **What was present but not scoped?** -> `notes` (endorsements not triggered, items carrier may try to dispute)
5. **AI observations** -> `agenticNotes` (anything the model noticed that a human might miss)

### Denial / New Claim / Loss Below PROs
Read `pros.scope` to compare CCS scope against carrier scope:

1. **Full CCS line-item scope** -> `roofExterior[]` + `interior[]` (item-by-item comparison against carrier EOS)
2. **What carrier missed** -> Compare carrier scope lines against `roofExterior[].item` and `interior[].room` to identify omissions
3. **Damage flags** -> `flags` (confirmed damage evidence for dispute letters)
4. **Scope notes** -> `notes` (items NOT scoped — prevents carrier from claiming CCS missed something that was actually inspected and found undamaged)
