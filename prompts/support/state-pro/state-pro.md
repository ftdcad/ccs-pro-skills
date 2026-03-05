# STATE PRO
## CCS Claim Chain — State Compliance & Carrier Obligations Skill
### Version: 0.2.0
### Status: 🚧 UNDER CONSTRUCTION
### TX: Production-ready | All other states: Placeholder (web search fallback)
### Portal integration: Stubbed — ties to portal.coastalclaims.net/compliance when built

---

## ⚠️ BUILD NOTES FOR CLAUDE CODE

This skill is under active construction. Do not treat it as complete.

**What is production-ready:**
- Texas (TX) — full carrier obligations + PA compliance + entity registration risk matrix
- JSON source files: `TX_carrier_obligations.json` + `TX_pa_compliance.json`
- TWIA detection, 542A fee trap warning, suit bar risk flag

**What is placeholder / under construction:**
- All states except TX route to web search fallback mode
- Portal integration is stubbed — function signatures only, no implementation
- Reciprocity data (4 fields per state) not yet populated
- State module schema defined but only TX populated

**Portal tie-in:**
This skill eventually routes to `portal.coastalclaims.net/compliance` for all state compliance data. The portal Compliance module has 798 rules across 50 states in four categories: PA Laws / Insurance / Construction / Legal. When that module is production-ready, State PRO calls into it instead of loading local JSON files. Until then, TX uses local JSON and all other states use web search mode.

**Do not duplicate portal data. State PRO calls into the portal — it does not replace it.**

---

## SKILL DESCRIPTION

State PRO is the state compliance and carrier obligations module in the CCS claim chain. It answers two questions for any active claim file:

1. What must the **carrier** do in this state — deadlines, obligations, consequences
2. What must the **PA and firm** do in this state — licensing, contracts, fees, ethics, entity compliance

It is not a legal advice tool. It is a compliance awareness and deadline management tool.

---

## TRIGGER CONDITIONS

Activate State PRO when:
- A claim file includes a state field
- An adjuster asks about carrier deadlines or obligations
- An adjuster asks about PA contract requirements in a state
- A compliance officer asks about entity operations in a state
- A manager asks about litigation trajectory or pre-suit requirements
- Fee dispute detected + entity registration status unknown

---

## INPUT SCHEMA

```json
{
  "state": "TX",
  "carrier_name": "string",
  "policy_type": "homeowners | commercial | flood | TWIA | other",
  "policy_number": "string",
  "loss_date": "date",
  "claim_status": "string",
  "all_items_date": "date | null",
  "supplement_submitted": "boolean",
  "carrier_nonresponsive_days": "integer | null",
  "payment_delayed": "boolean",
  "payment_issue": "string | null",
  "carrier_position": "string | null",
  "coverage_status": "string | null",
  "carrier_response_status": "string | null",
  "event_type": "string | null",
  "entity_is_foreign": "boolean",
  "sos_foreign_registration_status": "registered | not_registered | unknown",
  "fee_dispute": "boolean",
  "litigation_indicators": ["string"],
  "demand_type": "string | null",
  "role": "adjuster | manager | compliance"
}
```

---

## DETECTION FLAGS

### TX_TWIA_TRACK
**Fires when:**
- `carrier_name` contains "TWIA" or "Texas Windstorm"
- `policy_type` == "TWIA"
- `policy_number` starts with "TWIA"

**Action:** Load TWIA-specific clocks. Route TWIA modules only.

---

### TX_LITIGATION_TRAJECTORY
**Fires when:**
- `litigation_indicators` contains any of: attorney, lawsuit, suit, pre-suit, 542A, 541 notice, abatement, litigation, counsel
- `demand_type` == "pre_suit_notice"

**Action:** Enable 542A/541 pre-suit modules. Trigger 542A fee trap warning.

---

### TX_542A_FEE_TRAP_WARNING
**Fires when:** TX_LITIGATION_TRAJECTORY is true AND state == TX

**Output:**
⚠️ **542A FEE TRAP — LITIGATION TRACK DETECTED**
The dollar amount in the 542A pre-suit notice controls attorney fee recovery. If the amount alleged significantly exceeds what is ultimately recovered, fees are cut proportionally under §542A.007(a)-(c). Confirm the demand number is defensible and document-supported before the notice is sent.

---

### TX_SUIT_BAR_RISK
**Fires when:** `fee_dispute` == true AND `sos_foreign_registration_status` != "registered"

**Output:**
⚠️ **SUIT BAR RISK — Do not escalate to collections until resolved.**
An unregistered foreign entity cannot maintain an action in Texas courts to collect fees on cause of action arising from transacting business in Texas. Contracts are valid but suit is barred until SOS registration is complete and back fees/penalties are paid. Cure before escalating.
— BOC §9.051(b), §9.051(c)(1)

---

## ROUTING LOGIC

```
IF state == "TX"
  → Load TX_carrier_obligations.json
  → Load TX_pa_compliance.json
  → Run detection flags
  → Execute TX module (production-ready)

IF state IN ["FL", "GA", "SC", "LA", "IL"]
  → [TODO — hardcode pending research completion]
  → FALLBACK: web search mode with ⚠️ VERIFY flag

ALL OTHER STATES
  → Web search mode (see below)
  → ⚠️ WEB-SOURCED — Verify before acting on any deadline
```

---

## TX MODULE — CARRIER OBLIGATIONS

**Source file:** `data/state-reference/TX/TX_carrier_obligations.json`

### Claim Clock (TX)

| Trigger | Deadline | Consequence | Citation |
|---------|----------|-------------|----------|
| Notice received | 15 days — acknowledge, investigate, request items | §542 liability | §542.055(a) |
| All items received | 15 business days — accept or deny | Late payment damages | §542.056(a) |
| Cannot decide in time | Written notice required + 45-day hard limit | Unfair practice | §542.056(d) |
| Carrier says will pay | 5 business days to pay | Late payment damages | §542.057(a) |
| All items received, unpaid | 60-day maximum | 18% + attorney fees (non-542A) | §542.058(a) |
| Weather catastrophe | All deadlines +15 days | — | §542.059(b) |
| Written communication | 15 business days — respond | Unfair practice | 28 TAC §21.203(2) |

### Interest & Damages (TX)
- Non-542A: 18%/year + attorney fees — §542.060(a)-(b)
- 542A actions: Finance Code §304.003 rate + 5% simple — §542.060(c)
- Appraisal payment does NOT automatically bar prompt payment claim — *Barbara Technologies* (2019), *Ortiz* (2019)

### TWIA Clocks (TX_TWIA_TRACK only)
- RCV request window: 545 days — §2210.5741
- TWIA response: 30 days after repair documentation
- TWIA payment: 10 days after acceptance

---

## TX MODULE — PA COMPLIANCE

**Source file:** `data/state-reference/TX/TX_pa_compliance.json`

### Individual Licensing
- Exam required (Pearson VUE) — pass before applying — §4102.057(a)
- Fingerprints required — IdentoGO — 28 TAC §19.711
- Application via Sircon — $50 fee
- Bond: $10,000 surety minimum — 28 TAC §19.705 (amended 6/19/2023)
- Contract: FIN535 or filed/approved alternative — §4102.103
- Apply within 1 year of passing exam or retake required
- No pre-licensing education requirement found in TX primary sources

### License Maintenance
- Renewal: every 2 years — §4102.064
- CE: 24 hours per cycle, 3 ethics hours minimum — §4102.109
- Renewal fee: $50 | Late fee: $25 | CE fine: $50/missing hour
- Contract must be resubmitted at renewal — 28 TAC §19.708(e)-(f)

### Key PA Rules (TX)
- Fee cap: **10%** hard cap — §4102.104(a)
- 72-hour rescission required in every contract — §4102.103
- 72-hour policy limits carve-out: if carrier pays/commits within 72 hours, PA gets hourly only — §4102.104(b)
- Solicitation hours: 9am–9pm weekdays/Sat, noon–9pm Sun — §4102.152
- No solicitation during active natural disaster — §4102.151
- Records retention: 5 years — §4102.108
- TDI does NOT accept DBAs for licensing — licensed name only
- No temporary, emergency, or provisional PIA licenses in TX (TDI confirmed)

### Entity Operations (TX)
**Three independent registration requirements — all must be in place before first TX contract:**

1. **TDI individual license** — each person performing PA acts
2. **TDI entity license** — firm must be separately licensed; requires at least one licensed officer/DRLP — §4102.055 / §4102.056
3. **SOS foreign registration** — required separately from TDI license; TDI application instructions list "Registration with Texas Secretary of State" as required — BOC §9.001

**Roofing contractor prohibition:**
- Contractor cannot act as PA on property they may work on — §4102.163
- PA cannot participate in repair/restoration of property they adjust — §4102.158(a)
- PA cannot receive financial benefit from contractors on adjusted claims — §4102.158(a)(2)

### Staff Acts (TX)
**Unlicensed staff MAY:**
- Schedule appointments
- Receive and route documents
- CRM data entry and status updates
- Bookkeeping and invoicing
- Status calls without claim advice or negotiation

**Unlicensed staff MAY NOT:**
- Negotiate or settle any claim
- Advise on coverage or claim strategy
- Sign or issue PA communications as the adjuster
- Solicit clients or advertise as an adjuster
- Perform any act under §4102.001(3) definition

Citation: §4102.001(3), §4102.051(a), §4102.155

### Entity Registration Risk Matrix (TX)

| Failure | Legal Consequence | Contract Effect | Cure | Confidence |
|---------|------------------|----------------|------|------------|
| SOS foreign registration missing | Suit-barred in TX courts | Valid but unenforceable until registered | Register + pay back fees/penalties | HIGH |
| SOS late (>90 days) | Late filing fee = registration fee × years delinquent | Same | Register + pay §9.054 fee | HIGH |
| AG civil penalty | Back fees + taxes + interest + penalties | No direct contract effect | Pay + register | HIGH |
| TDI entity license missing | Prohibited activity + discipline | Voidable at insured option per §4102.207 | License before operating | HIGH |
| Franchise tax forfeiture | Right to sue may be affected | No explicit void/voidable provision found | Reinstate per Tax Code | MEDIUM |

Citations: BOC §9.051(b), §9.051(c)(1), §9.052, §9.054, §9.002(c), §4102.207

### Concurrent Causation Doctrine (TX)
- **Inseparable causes → exclusion triggers** — *Utica National Ins. Co. of Tex. v. Am. Indem. Co.*, 141 S.W.3d 198 (Tex. 2004)
- **ACC clause enforced as written** — *JAW The Pointe, L.L.C. v. Lexington Ins. Co.*, 460 S.W.3d 597 (Tex. 2015)
- **Documentation rule:** Allocate damage by cause in estimates and photo logs wherever supportable. If causes cannot be separated, exclusion triggers. Mixed submissions are the carrier's best friend.

### Contract & Claim Killers (TX)

| Condition | Consequence | Citation | Confidence |
|-----------|-------------|----------|------------|
| Unlicensed practice | Contract voidable at insured option + no fees past or future | §4102.207(a)-(b) | HIGH |
| Any Chapter 4102 violation | Class B misdemeanor + sanctions | §4102.206 | HIGH |
| Non-approved contract form | Prohibited + discipline risk | §4102.103 + 28 TAC §19.708 | HIGH |
| Solicitation during disaster | Discipline + credibility attack | §4102.151 | HIGH |
| PA participates in repairs | Prohibited + discipline | §4102.158(a) | HIGH |
| Contractor acts as PA | Prohibited | §4102.163 | HIGH |

### Reciprocity (TX — 4 fields required per state)
**Note:** TDI does not publish a canonical PA reciprocity state list. Verify at time of application via Sircon or License@tdi.texas.gov

Schema for future population:
```
state: [code]
pa_license_reciprocity: YES | NO | VERIFY
pa_ce_reciprocity: YES | NO | VERIFY
alllines_exam_reciprocity: YES | NO | N/A
alllines_ce_reciprocity: YES | NO | N/A
notes: [string]
```

Texas confirmed as YES/YES on Florida's outbound PA CE list and YES/YES on Florida's all-lines exam + CE list.

### Post-2020 Change Log (TX)
- §4102.054(b)-(c) repealed 9/1/2021
- §4102.114(d) repealed 9/1/2021
- 28 TAC §19.705 amended 6/19/2023 (bond amount)
- 28 TAC §19.708 amended 6/19/2023 (contract requirements)
- TDI PIA apply page updated 3/24/2025
- TDI reciprocity statement updated 5/17/2023

---

## WEB SEARCH FALLBACK MODE (ALL NON-TX STATES)

When state is not TX:

1. Search state DOI website first (reference STATE-DOI-REFERENCE.md)
2. Cross-reference Justia for statute text
3. Return findings with source URL for every rule
4. Flag every output: ⚠️ **WEB-SOURCED — Verify before acting**
5. Never output a deadline without primary source citation
6. Never output a fee cap without primary source citation
7. If no primary source found, say so — do not infer

**States with no PA licensing — flag immediately:**
- Alabama — PA prohibited (attorneys only)
- Arkansas — PA prohibited entirely
- Alaska — no PA license issued

---

## PORTAL INTEGRATION STUB
*Implementation pending portal.coastalclaims.net/compliance module build*

```javascript
// State PRO → Portal interface
// When portal compliance module is production-ready,
// replace local JSON loads with portal API calls

async function getStateModule(state) {
  if (state === "TX") {
    // Production: load local JSON
    const carrierObligation = await load("TX_carrier_obligations.json");
    const paCompliance = await load("TX_pa_compliance.json");
    return { carrierObligation, paCompliance };
  }
  // All other states: web search fallback
  return webSearchFallback(state);
}

async function getClaimMetadata(claimId) {
  // TODO: pull from CCS CRM via portal
  return {
    state,
    carrier_name,
    policy_type,
    policy_number,
    loss_date,
    claim_status,
    litigation_indicators,
    entity_is_foreign,
    sos_foreign_registration_status,
    fee_dispute
  };
}

async function detectSpecialTracks(metadata) {
  // TX_TWIA_TRACK
  // TX_LITIGATION_TRAJECTORY
  // TX_542A_FEE_TRAP_WARNING
  // TX_SUIT_BAR_RISK
}

// Portal compliance module URL (future)
// GET portal.coastalclaims.net/compliance/api/state/{state}
// Returns: PA Laws / Insurance / Construction / Legal (4 categories)
// State PRO maps: carrier_obligations → Insurance
//                 pa_compliance → PA Laws + Legal
//                 entity_registration → Legal
```

---

## OUTPUT FORMAT

**For adjusters:** Carrier obligations brief + PA compliance brief
**For managers:** Full brief + litigation flags + 542A warnings
**For compliance:** Full brief + staff acts + entity registration risk matrix + discipline grounds

---

## FILES REFERENCED
```
data/state-reference/TX/TX_carrier_obligations.json  ← production-ready
data/state-reference/TX/TX_pa_compliance.json        ← production-ready
data/state-reference/STATE-DOI-REFERENCE.md          ← all 50 states
prompts/state-pro.md                                 ← this file
```

---

*State PRO — CCS Claim Chain*
*Status: Under Construction*
*TX complete | All other states pending | Portal integration stubbed*
*Do not use non-TX output without verifying against primary sources*

---

## STATE DOI REFERENCE INDEX
### 🚧 UNDER CONSTRUCTION — Appended for future buildout. Not being completed this session.
### Purpose: Official DOI websites + PA licensing status for all 50 states + DC
### Last compiled: March 2026 — verify URLs before hardcoding

### Search Patterns for Claude Code
- PA statutes: `site:[DOI_URL] public adjuster`
- Carrier deadlines: `site:[DOI_URL] unfair claims settlement practices`
- Full statute text: most states host insurance code on DOI or legislature site
- States marked ❌ do NOT license PAs — flag immediately if claim comes from these states
- States marked ⚠️ have unusual PA rules — read carefully before processing

---

### Reference Table

| State | DOI Name | Website | PA Licensed? | Notes |
|-------|----------|---------|--------------|-------|
| Alabama | AL Dept of Insurance | www.aldoi.gov | ❌ No | Attorneys only |
| Alaska | AK Division of Insurance | www.commerce.alaska.gov/web/ins | ❌ No | May constitute practice of law |
| Arizona | AZ Dept of Insurance & Financial Institutions (DIFI) | difi.az.gov | ✅ Yes | |
| Arkansas | AR Insurance Dept | insurance.arkansas.gov | ❌ No | PAs prohibited entirely |
| California | CA Dept of Insurance | www.insurance.ca.gov | ✅ Yes | No fee cap (proposed 15% cat cap) |
| Colorado | CO Division of Insurance | doi.colorado.gov | ✅ Yes | 10% fee cap during catastrophe |
| Connecticut | CT Insurance Dept | portal.ct.gov/cid | ✅ Yes | No fee if insurer pays full limits within 30 days of loss |
| Delaware | DE Dept of Insurance | insurance.delaware.gov | ✅ Yes | 10% fee cap during state of emergency |
| Florida | Dept of Financial Services (DFS) | www.myfloridacfo.com | ✅ Yes | 20% standard / 10% during declared emergency. CRN pre-suit required — 60 day cure window |
| Georgia | Office of Commissioner of Insurance | oci.georgia.gov | ✅ Yes | |
| Hawaii | DCCA Division of Insurance | cca.hawaii.gov/ins | ✅ Yes | |
| Idaho | ID Dept of Insurance | doi.idaho.gov | ✅ Yes | |
| Illinois | IL Dept of Insurance | insurance.illinois.gov | ✅ Yes | |
| Indiana | IN Dept of Insurance | www.in.gov/idoi | ✅ Yes | |
| Iowa | IA Insurance Division | iid.iowa.gov | ✅ Yes | |
| Kansas | KS Insurance Dept | insurance.ks.gov | ⚠️ Partial | Historically limited licensing framework |
| Kentucky | KY Dept of Insurance | insurance.ky.gov | ✅ Yes | 806 KAR 12:095 matching reg — no line of sight rule |
| Louisiana | LA Dept of Insurance | www.ldi.la.gov | ✅ Yes | 12% fee cap — La. R.S. §22:1703 |
| Maine | ME Bureau of Insurance | www.maine.gov/pfr/insurance | ✅ Yes | |
| Maryland | MD Insurance Administration | insurance.maryland.gov | ✅ Yes | |
| Massachusetts | MA Division of Insurance | www.mass.gov/orgs/division-of-insurance | ✅ Yes | |
| Michigan | MI Dept of Insurance & Financial Services (DIFS) | www.michigan.gov/difs | ✅ Yes | |
| Minnesota | MN Dept of Commerce | mn.gov/commerce | ✅ Yes | |
| Mississippi | MS Insurance Dept | www.mid.ms.gov | ✅ Yes | |
| Missouri | MO Dept of Commerce & Insurance | insurance.mo.gov | ✅ Yes | |
| Montana | MT State Auditor / Commissioner of Securities & Insurance | csimt.gov | ✅ Yes | |
| Nebraska | NE Dept of Insurance | doi.nebraska.gov | ✅ Yes | |
| Nevada | NV Division of Insurance | doi.nv.gov | ✅ Yes | |
| New Hampshire | NH Insurance Dept | www.nh.gov/insurance | ✅ Yes | |
| New Jersey | NJ Dept of Banking & Insurance (DOBI) | www.njdobi.org | ✅ Yes | |
| New Mexico | NM Office of Superintendent of Insurance | www.osi.state.nm.us | ✅ Yes | |
| New York | NY Dept of Financial Services (DFS) | www.dfs.ny.gov | ✅ Yes | No reciprocity with any state. $1,000 bond. |
| North Carolina | NC Dept of Insurance | www.ncdoi.gov | ✅ Yes | |
| North Dakota | ND Insurance Dept | www.insurance.nd.gov | ✅ Yes | |
| Ohio | OH Dept of Insurance | insurance.ohio.gov | ✅ Yes | O.A.C. §3901-1-54(I) matching reg |
| Oklahoma | OK Insurance Dept | www.oid.ok.gov | ✅ Yes | |
| Oregon | OR Division of Financial Regulation | dfr.oregon.gov | ✅ Yes | |
| Pennsylvania | PA Insurance Dept | www.insurance.pa.gov | ✅ Yes | |
| Rhode Island | RI Division of Insurance | www.dbr.ri.gov | ✅ Yes | Matching reg applies |
| South Carolina | SC Dept of Insurance | doi.sc.gov | ✅ Yes | 5-day rescission. No pre-suit notice req. 3-yr SOL. |
| South Dakota | SD Division of Insurance | dlr.sd.gov/insurance | ✅ Yes | |
| Tennessee | TN Dept of Commerce & Insurance | www.tn.gov/commerce/insurance | ✅ Yes | Matching reg applies — Tenn. Comp. R. & Regs. 0780-01-05-.10 |
| Texas | TX Dept of Insurance (TDI) | www.tdi.texas.gov | ✅ Yes | 542A pre-suit notice — 90 day cure window. $10,000 bond. |
| Utah | UT Insurance Dept | insurance.utah.gov | ✅ Yes | Matching reg applies — Utah Admin. Code R590-190 |
| Vermont | VT Dept of Financial Regulation | dfr.vermont.gov | ✅ Yes | Matching reg — line of sight rule applies |
| Virginia | VA State Corporation Commission / Bureau of Insurance | www.scc.virginia.gov/pages/bureau-of-insurance | ✅ Yes | |
| Washington | WA Office of Insurance Commissioner | www.insurance.wa.gov | ✅ Yes | |
| West Virginia | WV Insurance Commission | www.wvinsurance.gov | ✅ Yes | No matching statute — ambiguity construed in favor of insured |
| Wisconsin | WI Office of the Commissioner of Insurance | oci.wi.gov | ✅ Yes | "Like kind and quality" = reasonably comparable, not identical |
| Wyoming | WY Insurance Dept | doi.wyo.gov | ✅ Yes | |
| DC | DC Dept of Insurance, Securities & Banking | disb.dc.gov | ✅ Yes | |

---

### High-Priority States for CCS
*Core CCS operating footprint — hardcode these in State PRO*

| State | Pre-Suit Notice | Cure Window | Key Statute |
|-------|----------------|-------------|-------------|
| Florida | Civil Remedies Notice (CRN) | 60 days | Fla. Stat. §624.155 |
| Texas | 542A Notice | 90 days | Tex. Ins. Code §542A |
| Georgia | None specific | N/A | Web search for current deadlines |
| South Carolina | None | N/A | S.C. Code §38-59-20 bad faith |
| Louisiana | None specific | N/A | La. R.S. §22:1892 prompt payment |
| Illinois | None specific | N/A | 215 ILCS 5/155 |

---

### States Where CCS Is Not Licensed — Do Not Process
- Alabama
- Arkansas
- Alaska

*Verify current CCS license status for all other states before processing any claim.*

---

### Universal Reference Resources
- **NAPIA** (National Association of Public Insurance Adjusters): napia.com
- **NIPR** (license lookup all states): nipr.com
- **NAIC** (model regulations): naic.org
- **Merlin Law Group** (PA guides by state): merlinlawgroup.com/resources
- **MWL Matching Chart** (all 50 states, last updated 1/13/22): on file in repo as MATCHING-CHART source

*Always verify current URLs and regulations before acting. DOI websites and statutes change.*
