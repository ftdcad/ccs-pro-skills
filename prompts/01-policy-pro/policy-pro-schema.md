# Policy PRO — Chain JSON Schema

**How Policy PRO data lands in the chain JSON at `pros.policy`.**
**For operational logic, see `policy-pro.md` in this directory.**

---

## Schema

```json
{
  "status": "complete",

  "coverage": {
    "coverageA": "$269,080.00",
    "coverageB": "$26,908.00",
    "coverageC": "$6,727.00",
    "coverageD": "$26,908.00",
    "combinedTotal": "$329,623.00",
    "hurricaneDeductible": "$5,382.00",
    "hurricaneDeductibleBasis": "2% of Coverage A",
    "aopDeductible": "$2,500.00",
    "fungiDeductible": "Not Specified",
    "waterBackupLimit": "Not Specified",
    "premisesLiability": "Not Specified",
    "lossSettlement": "Replacement Cost (Coverages A, B, C)",
    "appraisalClause": "present"
  },

  "underwriting": {
    "yearBuilt": 1985,
    "sqFootage": "Not Specified",
    "roofYear": 2006,
    "roofAge": 18,
    "roofType": "Architectural Shingle",
    "construction": "Masonry",
    "occupancy": "Tenant Occupied",
    "occupancyFlag": true,
    "county": "Volusia",
    "policyPeriod": "07/09/2024 – 07/09/2025",
    "protectionClass": "Not Specified",
    "secondaryWaterResistance": "Not Specified",
    "openingProtection": "Not Specified"
  },

  "carrier": {
    "carrierName": "Frontline / First Protective Insurance Company",
    "agentName": "Not Specified",
    "agentLocation": "Not Specified",
    "agentPhone": "Not Specified",
    "premium": "Not Specified",
    "premiumBreakdown": "Not Specified"
  },

  "mortgagees": [
    { "label": "1st Mortgagee", "value": "PNWBX LLC — Loan #579767923 — Escrowed" },
    { "label": "2nd Mortgagee", "value": "Loan #00000083486960 — Not Escrowed" },
    { "label": "Additional Interest", "value": "USA Federal Savings Bank ISAOA/ATIMA" }
  ],

  "endorsements": {
    "critical": [
      "DP 00 03 07 88 — Dwelling Property 3 Special Form (named-peril base form — not open peril like HO-3)",
      "FIM 00 30 03 07 — Pre-Existing Damage Exclusion (carrier may cite to deny storm damage)"
    ],
    "warn": [
      "FIM 01 11 04 21 — Cosmetic Damage Exclusion (metal roofs, gutters — may limit surface-only claims)",
      "FIM 01 42 01 18 — Roof Payment Schedule (ACV by roof age — 18-yr roof triggers depreciation)"
    ],
    "standard": [
      "FIM 01 55 01 19 — Florida Changes Endorsement",
      "FIM 01 60 07 20 — Hurricane Deductible Endorsement (2% Coverage A)",
      "FIM 00 90 01 18 — Anti-Concurrent Causation Clause",
      "FIM 01 03 01 20 — Ordinance or Law Coverage"
    ]
  },

  "exclusionsGapsLimitations": {
    "gaps": [
      "Coverage C ($6,727) is unusually low at 2.5% of dwelling — standard is 50-75%. Contents coverage may be inadequate for tenant personal property claims.",
      "No flood coverage identified in policy — property is in Volusia County coastal zone."
    ],
    "limitations": [
      "Roof Payment Schedule (FIM 01 42 01 18) — 18-year-old architectural shingle roof will trigger ACV depreciation on any roof claim. Replacement cost recoverable only after repairs completed and documented.",
      "Cosmetic Damage Exclusion (FIM 01 11 04 21) — surface marring, pitting, or denting on metal components (gutters, flashing, vents) excluded unless functional damage proven."
    ],
    "exclusions": [
      "Pre-Existing Damage Exclusion (FIM 00 30 03 07) — carrier may attempt to attribute storm damage to pre-existing conditions. Burden of proof language: carrier must demonstrate damage existed prior to DOL.",
      "Sand damage — no specific sand/windborne debris coverage identified. Review ensuing loss language for wind-driven sand entry through storm-created openings.",
      "Ensuing loss language — standard ensuing loss provision present in base DP-3 form. If wind creates an opening, resulting water/sand damage should be covered regardless of exclusions on the initial cause."
    ]
  },

  "legalStatutory": {
    "statuteOfLimitations": "5 years from DOL per Florida Statute 95.11(2) — deadline 10/10/2029",
    "appraisalClause": "If we and you disagree on the value of the property or the amount of loss, either may make written demand for an appraisal of the loss. In this event, each party will select a competent and impartial appraiser. The two appraisers will select an umpire. If they cannot agree, either may request that selection be made by a judge of a court having jurisdiction. The appraisers will state separately the value of the property and amount of loss. If the appraisers fail to agree, they will submit their differences to the umpire. A decision agreed to by any two will be binding. — DP 00 03 07 88",
    "suitAgainstUs": "No action can be brought against us unless there has been full compliance with all of the terms under Section I of this policy and the action is started within five years after the date of loss.",
    "euoRequirements": "Insured may be required to submit to examination under oath as often as reasonably required. Public adjuster cannot be compelled to EUO but may be subpoenaed for records or deposition in litigation."
  },

  "flags": [
    { "variant": "red", "content": "Tenant occupied — verify insurable interest, check for separate tenant policy, confirm named insured is property owner not tenant" },
    { "variant": "red", "content": "Roof is 18 years old at DOL — Roof Payment Schedule will impose ACV depreciation on any roof claim" },
    { "variant": "yellow", "content": "DP-3 is named-peril, not open-peril like HO-3 — covered perils must be specifically listed in policy. Confirm windstorm/hurricane is a named peril before proceeding." },
    { "variant": "yellow", "content": "Coverage C at $6,727 (2.5% of dwelling) is far below standard — may create disputes if tenant contents are claimed" },
    { "variant": "yellow", "content": "Second mortgagee not escrowed — payment coordination may be complex on large claims" },
    { "variant": "blue", "content": "Appraisal clause present (DP 00 03 07 88) — available as dispute resolution path if carrier underpays" },
    { "variant": "blue", "content": "Pre-existing damage exclusion (FIM 00 30 03 07) — carrier bears burden of proof. Document current storm damage thoroughly to counter any pre-existing argument." },
    { "variant": "green", "content": "Policy was active on DOL (10/10/2024 falls within 07/09/2024 – 07/09/2025 period)" },
    { "variant": "green", "content": "Replacement Cost loss settlement on Coverages A, B, C — full RCV recoverable after repairs" }
  ],

  "missing": [
    "Agent name, location, and phone number",
    "Annual premium and premium breakdown",
    "Square footage (not in policy — check county appraiser)",
    "Protection class",
    "Secondary water resistance status",
    "Opening protection designation",
    "Fungi/mold sublimit",
    "Water backup sublimit",
    "Premises liability limit"
  ],

  "agenticNotes": [
    {
      "title": "DP-3 vs HO-3 implications",
      "content": "This is a Dwelling Fire policy (DP 00 03), not a Homeowner's policy (HO-3). DP-3 is named-peril on the dwelling and open-peril on contents — the inverse of HO-3. Adjusters accustomed to HO-3 open-peril dwelling coverage should verify that the specific peril (windstorm/hurricane) is listed. For Hurricane Milton, this should be covered, but the named-peril framework changes how ambiguous damage is argued."
    },
    {
      "title": "Tenant occupancy creates insurable interest questions",
      "content": "Property is tenant occupied. Verify the named insured (Dale Armstrong) is the property owner, not the tenant. If tenant-occupied, Coverage C ($6,727) likely covers landlord-owned items only — tenant personal property requires a separate renter's policy. This may become relevant if contents claims are filed."
    },
    {
      "title": "Roof age + depreciation exposure",
      "content": "Architectural shingle roof installed 2006 is 18 years old at DOL. Industry standard life expectancy is 25-30 years. The Roof Payment Schedule endorsement will apply ACV depreciation based on age. Expect carrier to depreciate aggressively. Replacement cost is recoverable but only after completed repairs — document all repair invoices."
    },
    {
      "title": "Multiple mortgagees complicate payment",
      "content": "Three parties on the mortgage: PNWBX LLC (1st, escrowed), second mortgage (not escrowed), and USA Federal Savings Bank as additional interest. Claims payments will require endorsement from multiple parties. The non-escrowed second mortgage adds a coordination step. Advise insured early about payment processing timeline."
    }
  ],

  "reviewMeta": {
    "reviewer": "CCS Policy Pro",
    "sourcePages": 47,
    "generatedDate": "2026-03-05"
  },

  "handoff": {
    "to": "Scope PRO",
    "content": "Armstrong — 836 E 20th Ave, New Smyrna Beach FL 32168. Frontline/First Protective DP-3. Hurricane Milton (10/10/2024). Cov A $269,080, hurricane deductible $5,382 (2% Cov A). Roof: 2006 architectural shingle, 18 yrs at DOL — Roof Payment Schedule applies (ACV depreciation). Tenant occupied — verify insurable interest. Pre-existing damage exclusion present (FIM 00 30 03 07). Appraisal clause available. Coverage C unusually low ($6,727). Replacement Cost loss settlement on A/B/C."
  }
}
```

---

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | Yes | `"complete"` when Policy PRO finishes |
| `coverage.coverageA` | string | Yes | Dwelling limit — dollar formatted |
| `coverage.coverageB` | string | Yes | Other Structures limit |
| `coverage.coverageC` | string | Yes | Personal Property / Contents limit |
| `coverage.coverageD` | string | Yes | Loss of Use / Fair Rental Value limit |
| `coverage.combinedTotal` | string | Yes | Sum of A + B + C + D |
| `coverage.hurricaneDeductible` | string | Yes | Dollar amount, or `"Not Specified"` |
| `coverage.hurricaneDeductibleBasis` | string | Yes | How it's calculated (e.g., "2% of Coverage A") |
| `coverage.aopDeductible` | string | Yes | All Other Perils deductible |
| `coverage.fungiDeductible` | string | Conditional | Fungi/mold sublimit if present, else `"Not Specified"` |
| `coverage.waterBackupLimit` | string | Conditional | Water backup sublimit if present, else `"Not Specified"` |
| `coverage.premisesLiability` | string | Conditional | Premises liability limit if present, else `"Not Specified"` |
| `coverage.lossSettlement` | string | Yes | `"Replacement Cost"`, `"Actual Cash Value"`, or specific basis per coverage |
| `coverage.appraisalClause` | string | Yes | `"present"` or `"not found"` — full text lives in `legalStatutory` |
| `underwriting.yearBuilt` | number | Yes | From county appraiser or policy, `null` if unknown |
| `underwriting.sqFootage` | string | Conditional | Square footage or `"Not Specified"` |
| `underwriting.roofYear` | number | Conditional | Year of last roof replacement, `null` if unknown |
| `underwriting.roofAge` | number | Conditional | Calculated: DOL year minus roofYear |
| `underwriting.roofType` | string | Yes | Architectural Shingle, 3-Tab, Metal, Tile, etc. |
| `underwriting.construction` | string | Yes | Masonry, Frame, etc. |
| `underwriting.occupancy` | string | Yes | Owner Occupied, Tenant Occupied, Seasonal, Vacant |
| `underwriting.occupancyFlag` | boolean | Yes | `true` if anything other than Owner Occupied |
| `underwriting.county` | string | Yes | County name — needed for State PRO and appraiser lookup |
| `underwriting.policyPeriod` | string | Yes | Start – end dates |
| `underwriting.protectionClass` | string | Conditional | ISO protection class or `"Not Specified"` |
| `underwriting.secondaryWaterResistance` | string | Conditional | SWR status or `"Not Specified"` |
| `underwriting.openingProtection` | string | Conditional | Opening protection designation or `"Not Specified"` |
| `carrier.carrierName` | string | Yes | Full carrier name as it appears on the policy |
| `carrier.agentName` | string | Conditional | Agent name or `"Not Specified"` |
| `carrier.agentLocation` | string | Conditional | Agent office location or `"Not Specified"` |
| `carrier.agentPhone` | string | Conditional | Agent phone or `"Not Specified"` |
| `carrier.premium` | string | Conditional | Annual premium or `"Not Specified"` |
| `carrier.premiumBreakdown` | string | Conditional | Breakdown details or `"Not Specified"` |
| `mortgagees` | array | Yes | Each object has `label` (string) and `value` (string). Empty array if none. |
| `endorsements.critical` | string[] | Yes | Endorsements that directly affect claim outcome — form name + number + why it matters |
| `endorsements.warn` | string[] | Yes | Endorsements that may limit coverage under certain conditions |
| `endorsements.standard` | string[] | Yes | Routine endorsements (state changes, deductible forms, etc.) |
| `exclusionsGapsLimitations.gaps` | string[] | Yes | Coverage gaps — things missing or inadequate |
| `exclusionsGapsLimitations.limitations` | string[] | Yes | Coverage limitations — things that reduce payout |
| `exclusionsGapsLimitations.exclusions` | string[] | Yes | Full exclusions — things not covered at all |
| `legalStatutory.statuteOfLimitations` | string | Yes | SOL with deadline date if calculable |
| `legalStatutory.appraisalClause` | string | Yes | Full quoted text of appraisal clause from the policy |
| `legalStatutory.suitAgainstUs` | string | Yes | Full quoted text of suit clause |
| `legalStatutory.euoRequirements` | string | Yes | EUO obligations — insured and PA separately |
| `flags` | array | Yes | Each has `variant` (`"red"`, `"yellow"`, `"blue"`, `"green"`) and `content` (string) |
| `missing` | string[] | Yes | Items not found in the policy document. Empty array if nothing missing. |
| `agenticNotes` | array | Yes | Each has `title` (string) and `content` (string). Use `[{"title": "None", "content": "No additional observations."}]` if nothing notable. |
| `reviewMeta.reviewer` | string | Yes | Always `"CCS Policy Pro"` |
| `reviewMeta.sourcePages` | number | Yes | Number of pages in the source policy document |
| `reviewMeta.generatedDate` | string | Yes | ISO date (YYYY-MM-DD) |
| `handoff.to` | string | Yes | Always `"Scope PRO"` — Policy PRO always hands off to Scope PRO |
| `handoff.content` | string | Yes | Summary paragraph for Scope PRO: insured, address, carrier, policy type, key limits, deductible, roof info, flags |

---

## Flag Variants

| Variant | Meaning | Examples |
|---|---|---|
| `red` | Immediate risk to claim — must address before proceeding | Occupancy issues, roof age triggering depreciation, coverage voids |
| `yellow` | Caution — may affect claim depending on circumstances | Policy type nuances, low sublimits, endorsement risks |
| `blue` | Informational — strategic leverage or dispute tool | Appraisal clause available, burden of proof on carrier |
| `green` | Confirmed positive — coverage verified or condition met | Policy active on DOL, RCV settlement confirmed |

---

## How Downstream PROs Read This

### Scope PRO reads `pros.policy` to know:

1. **What's the hurricane deductible?** -> `coverage.hurricaneDeductible` — needed for net claim calculations
2. **What's the roof situation?** -> `underwriting.roofYear`, `underwriting.roofAge`, `underwriting.roofType` — determines scope approach and depreciation exposure
3. **Is occupancy flagged?** -> `underwriting.occupancyFlag` — tenant-occupied properties change how contents and Loss of Use are scoped
4. **What endorsements restrict the scope?** -> `endorsements.critical` and `endorsements.warn` — cosmetic exclusions, roof payment schedules, and pre-existing damage exclusions all affect what can be claimed
5. **What flags carry forward?** -> `flags[]` — all red and yellow flags inform Scope PRO's inspection priorities

### Strategy PRO reads `pros.policy` to know:

1. **What are the coverage limits?** -> `coverage` (all fields) — needed for gap analysis and reserve calculations
2. **What's the deductible?** -> `coverage.hurricaneDeductible` + `coverage.aopDeductible` — determines net dispute amount
3. **What endorsements exist?** -> `endorsements` (all three tiers) — critical endorsements shape the carrier's likely defense, warn endorsements are potential secondary arguments
4. **What are the exclusion risks?** -> `exclusionsGapsLimitations` — carrier will use these to deny or reduce; Strategy PRO must counter each one
5. **Is appraisal available?** -> `legalStatutory.appraisalClause` — determines whether appraisal is a viable dispute resolution track
6. **What did Policy PRO flag?** -> `flags[]` — all flags carry forward and inform strategy decisions

### All downstream PROs:

- **Flags propagate through the chain.** Every PRO reads `pros.policy.flags[]` and carries forward any that remain relevant. Flags are never deleted — only marked resolved by a later PRO if the issue is addressed.
- **Missing data matters.** If `pros.policy.missing[]` includes items that a downstream PRO needs, that PRO must note the gap and work around it or request the information.
- **Handoff is the summary.** `pros.policy.handoff.content` gives any PRO a quick-read summary of what Policy PRO found without parsing the full schema.
