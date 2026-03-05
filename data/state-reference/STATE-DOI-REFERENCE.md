# State DOI Reference Index
## For CCS State PRO — Claude Code Reference
### Purpose: Official DOI websites and PA status for all 50 states + DC
### Use this to locate statutes, carrier deadlines, and PA regulations per state
### Last compiled: March 2026 — verify URLs before hardcoding

---

## NOTES FOR CLAUDE CODE
- Search pattern: `site:[DOI_URL] public adjuster` to find PA-specific statutes
- For carrier deadlines: search `[DOI_URL] unfair claims settlement practices`
- For statutes: most states host full insurance code on DOI or legislature site
- States marked ❌ do NOT license PAs — flag immediately if claim comes from these states
- States marked ⚠️ have unusual PA rules — read carefully before processing

---

## REFERENCE TABLE

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

## HIGH-PRIORITY STATES FOR CCS
*These states represent the core CCS operating footprint — hardcode these in State PRO*

| State | Pre-Suit Notice | Cure Window | Key Statute |
|-------|----------------|-------------|-------------|
| Florida | Civil Remedies Notice (CRN) | 60 days | Fla. Stat. §624.155 |
| Texas | 542A Notice | 90 days | Tex. Ins. Code §542A |
| Georgia | None specific | N/A | Web search for current deadlines |
| South Carolina | None | N/A | S.C. Code §38-59-20 bad faith |
| Louisiana | None specific | N/A | La. R.S. §22:1892 prompt payment |
| Illinois | None specific | N/A | 215 ILCS 5/155 |

---

## STATES WHERE CCS IS NOT LICENSED (DO NOT PROCESS)
- Alabama
- Arkansas
- Alaska
*Verify current CCS license status for all other states before processing*

---

## USEFUL UNIVERSAL RESOURCES
- **NAPIA** (National Association of Public Insurance Adjusters): napia.com
- **NIPR** (license lookup all states): nipr.com
- **NAIC** (model regulations): naic.org
- **Merlin Law Group** (PA guides by state): merlinlawgroup.com/resources
- **MWL Matching Chart** (all 50 states, last updated 1/13/22): on file in repo as MATCHING-CHART source

---
*This file is a reference index only. Always verify current URLs and regulations before acting.*
*DOI websites and statutes change. Web search to confirm before hardcoding any rule.*
