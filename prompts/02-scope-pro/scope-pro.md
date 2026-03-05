---
name: scope-pro
description: >
  Coastal Claims Services (CCS) Scope Pro™ — residential and commercial damage assessment tool.
  Use this skill whenever a user uploads photos, an EagleView/Hover report, or a Policy Pro
  report and wants to produce a Scope of Loss. Triggers: 'scope', 'scope of loss', 'scope pro',
  'damage assessment', 'EagleView', 'write up the scope', or any upload of photos/documents
  with property damage descriptions. Produces a CCS-branded .docx Scope of Loss.
---

# CCS Scope Pro™ — Damage Assessment & Scope Generator

## Overview

Turns three inputs into a professional CCS Scope of Loss document:
1. **Policy Pro Report** (required first — auto-populates claim data)
2. **Roof Measurements** (optional — EagleView or Hover PDF)
3. **Contractor Photos + Damage Narration** (required for damage assessment)

Output: A CCS-branded `.docx` Scope of Loss handed off to estimating for Xactimate build.

---

## CORE PRINCIPLE — Scope = Work Order

**The scope is a work order for estimating. If there is no action item, it does not go in the report.**

- Document only what needs to be priced
- Never list components just to say "no damage" or "not present"
- Short, factual, specific — what is it, where is it, how many
- Do NOT fabricate details. If it is not visible in a photo or stated in narration, it does not exist

---

## Step 1 — Policy Pro Integration

Extract from Policy Pro report:
- Insured name, property address
- Carrier, policy number, claim number
- Date of loss, peril type
- Deductible (note hurricane vs. AOP)
- File status / PA rep / estimator

If no Policy Pro, ask for these fields manually.

**Pull Policy Pro Agentic Notes into scope context.** If the Policy Pro report flagged items (existing damage exclusion, roof age/ACV risk, occupancy issues, screen enclosure limitations, cosmetic exclusions), reference those flags in the Scope Pro Agentic Notes section so the estimator has full context before the file moves forward.

---

## Policy Pro Override — Carrier Refusal Protocol

When a carrier refuses to provide a policy or declarations page, a CCS authorized user can invoke the Policy Pro Override to prevent the claim from stalling.

### Trigger Phrase
The user must type the following (exact format):
> **"Override Policy Pro — [Your Name] — [Date]"**

Example: `Override Policy Pro — Frank Dalton — 03/04/2026`

### What Happens When Override Is Invoked

1. **Skip** the Policy Pro document requirement entirely
2. **Collect minimum claim header fields manually** — ask the user for:
   - Insured name
   - Property address
   - Carrier name
   - Claim number
   - Policy number (if known — mark "Not Provided" if not)
   - Date of loss
   - Peril type
   - PA rep / estimator
   - Deductible (if known — mark "Unknown — policy not provided" if not)

3. **Stamp the Claim Information section** of the output document with:

> ⚠️ **POLICY PRO OVERRIDE ACTIVE**
> Policy document and/or declarations page not provided by carrier.
> Scope authorized by [Name] on [Date].
> Coverage limits, deductibles, and endorsements are unknown pending policy receipt.
> Deductible field left blank — do not release estimate to carrier until policy is obtained and deductible is confirmed.

4. **Flag in Agentic Notes:**
> "Policy Pro override invoked by [Name] on [Date]. Carrier has refused or failed to provide policy or declarations page. Coverage limits, deductibles, and endorsements are unknown. PA must obtain policy before finalizing settlement strategy. Note carrier refusal in the claim file."

### What Does NOT Change Under Override
- All photo analysis rules still apply — scope = work order, evidence only
- All PA escalation triggers still apply
- Agentic Notes section still required
- Document still outputs as a full .docx — no shortcuts to format or structure

### Override Is Not a Blank Check
The override bypasses the Policy Pro document requirement only. It does not waive the need to obtain the policy eventually. The stamp in the document is a permanent record that policy data was unavailable at time of scoping.

---

## Step 2 — Roof Measurements

### When EagleView/Hover IS uploaded:
Extract and use the **Suggested Squares** field directly — waste is already calculated. Always use suggested squares, never base/net.

Document:
- Total area (sq ft) and suggested squares
- Pitch (predominant)
- Roof configuration (hip, gable, complex)
- Ridge LF, Hip LF, Valley LF, Rake LF, Eave/Perimeter LF
- Stories

### When NO EagleView:
Calculate recommended squares manually and always note the calculation:
- **Gable roof** → base squares × 1.10 (10% waste)
- **Hip roof** → base squares × 1.15 (15% waste)

Always display as: **"X.XX SQ (Y.YY net + Z% hip/gable waste)"** — never leave the estimator guessing.

If no measurements at all, insert: "Field measurements required — EagleView not provided."

---

## Step 3 — Photo Analysis Rules

### CRITICAL: Evidence-Only Assessment
- Only document what is **clearly visible in photos** or **explicitly stated in narration**
- Never assume, infer, or fabricate components or damage
- If not in a photo → it does not go in the scope
- Wrong answer is always worse than "not documented"

### Reading Chalk Annotations (IMPORTANT)
When reviewing roof photos with chalk markings:
- **Letters** (F, R, B, L) = slope designation (Front, Right, Back, Left)
- **Numbers next to letters** (W=11, W=5) = wind/hail hit COUNT on that slope
- **Numbers next to a component** (e.g., "3" next to pipe jack) = QUANTITY of that component
- **"X"** next to a component = that specific item is damaged
- Always tally chalk counts across all slopes and report total

### Component Identification — Use Correct Terminology
| What you see | Correct term |
|---|---|
| Low-profile slanted roof vent | Turtle vent |
| Continuous vented ridge cap | Ridge vent (note material: aluminum, etc.) |
| Pipe through roof with rubber seal | Pipe jack |
| Electrical service entry point on roof | Electric mast boot / weatherhead boot |
| Continuous trough at eave | Gutter (note material: aluminum, vinyl, etc.) |

### Gutter Verification
Before marking gutters absent: scan the eave line in **every exterior elevation photo**. Gutters are often visible only as a thin line at the roofline edge. If visible in any photo → they are present. If present → they come off for a full roof replacement. Default action = R&R gutters full perimeter.

---

## Step 4 — Build the Scope Document

Read `/mnt/skills/public/docx/SKILL.md` before writing any code.

Use `docx` npm package. US Letter, 1-inch margins, Arial font, navy `#1B3A6B` section headers.

---

## Document Structure

### Title
`[Claim #] | [Insured Name] | [Property Address]`
`Prepared by CCS Scope Pro™`

---

### CLAIM INFORMATION
Two-column table: label | value. Pull from Policy Pro.

---

### ROOF MEASUREMENTS
Two-column table. Always show **recommended squares** with waste calculation noted.

---

### ROOF & EXTERIOR SCOPE
**Action items only.** Three columns: Item | Description | Qty/Unit

Line item format:
- Item name (bold)
- Brief description — what the photo shows, which photo numbers support it
- Quantity with unit (SQ, EA, LF)

Common roof line items:
- Shingle replacement (full roof — note squares with waste)
- Ridge vent (note material, LF)
- Turtle vent (count)
- Pipe jacks (count — read chalk annotations for quantity)
- Electric mast boot
- Skylights (count)
- Step/counter flashing (if damage noted)
- Drip edge
- Gutters (LF — use perimeter from measurements or note "full perimeter")
- Downspouts (count if noted)

Gutters can live in the Roof & Exterior section when that is the only exterior damage — no need for a separate exterior section.

---

### INTERIOR — ENSUING LOSS
Only include rooms with visible water staining or confirmed damage. Note photo numbers.

**When interior ceiling damage is identified, ask TWO questions before writing the line item:**

**Question 1 — Ceiling material:**
> "Is the ceiling drywall or plaster?"

Different Xactimate line items, different costs. If unsure → note "Drywall vs. plaster — verify in field."

**Question 2 — Room dimensions:**
> "Do you have room sizes? You can upload a sketch, floor plan, or just tell me the dimensions (e.g. 14x12)."

Accept room sizes in any of these formats:
- **Uploaded sketch or floor plan** (photo, PDF, Xactimate export) — read dimensions directly from the document
- **Verbal/typed dimensions** — e.g. "master is 14x12, bedroom 3 is 11x10" — calculate SF automatically (L × W)
- **No dimensions available** — note "SF to be measured in field"

When calculating SF from dimensions: use L × W. Do not add wall area — ceiling only.
For dimensions like 13'5" — convert inches to decimal feet (5/12 = 0.42), so 13'5" = 13.42 ft.

**Always ask the scoper TWO dimension questions:**
1. "What are the room dimensions?" (full room — for paint/texture match)
2. "What is the size of the damaged area?" (actual repair SF)

These are almost always different numbers and both are needed.

**For every room with ceiling damage, always include FOUR line items:**
1. R&R [drywall / plaster] ceiling — [damaged area SF]
2. R&R attic insulation — [same as damaged area SF]
3. Texture ceiling — [full room SF] (to match existing)
4. Paint ceiling — [full room SF] (to match existing)

The repair SF (lines 1-2) is the damage only.
The finish SF (lines 3-4) is the full room — paint and texture must match across the entire ceiling.

If full room dimensions are unknown, note "Full room SF to be measured in field" for lines 3-4 but still scope the damaged area for lines 1-2.

---

### SEVERITY ASSESSMENT
Tight two-column table:
- Severity level (use CCS definitions below)
- Functional damage: Yes/No
- Storm causation
- Above deductible: Yes/No (or TBD if deductible not confirmed)
- Photos analyzed

**CCS Official Severity Scale — always use exact definitions:**

| Level | Definition |
|---|---|
| **Severity 1** | Light damage, dwelling is habitable. May include missing shingles, downed tree, fence damage, soffit/fascia issues. |
| **Severity 2** | Light/Moderate damage, dwelling is habitable. May include multiple missing shingles, roof holes, light truss damage, broken windows, and some interior water damage. |
| **Severity 3** | Moderate damage, dwelling is likely habitable but may not be. May include collapsed roof sections, light truss damage, broken windows, damaged siding, and minor interior water damage. |
| **Severity 4** | Moderate/Severe damage, dwelling likely not habitable (though insured may think it is). May include collapsed roof, moderate truss damage, and moderate/severe interior water damage. |
| **Severity 5** | Severe damage, dwelling is not habitable. Considered a total loss. |

Always base severity selection on photographic evidence and field reports. If unsure, note "Escalate to supervisor for review" rather than guessing.

---

### NOTES
Short bullets for:
- Structures with no damage observed (one line each — note present, no action)
- Items needing field verification
- Deductible confirmation if missing

---

### AGENTIC NOTES

Every scope document includes an **AGENTIC NOTES** section as the final section, before the closing summary line.

**Purpose:** Observation-only flags for the PA. Not part of the work order. Not priced. Not coverage opinions. Things a sharp PA should see before this file moves to estimating.

**Rules:**
- Observations only — no dollar amounts, no coverage determinations
- If nothing notable: write "No additional observations."
- Never force notes where there aren't any
- Flag, don't conclude — the PA decides what to do with it

**Always check for and include if applicable:**

**Photo-to-Scope Gaps**
- Damage visible in photos that was NOT scoped (list photo number and what was observed)
- Example: "Photo 75 shows ceiling stain in what appears to be a bathroom — not scoped. Verify room access."

**Chalk Count vs. Scope Quantity Mismatches**
- If total chalk hit count across all slopes seems disproportionate to roof square footage, flag it
- Example: "Chalk counts total 25 hits across 4 slopes on a ~14 SQ roof. Density warrants full replacement recommendation."

**Second / Detached Structures**
- Note presence of any detached structure visible in photos — metal roof, shed, garage — even if not scoped
- Example: "Metal roof structure visible in Photos 15 and 26. Not included in scope — Coverage A vs. B classification required."

**Supplemental Candidate Items**
- Items present in photos commonly missed on first inspection and frequently become supplementals
- Screen enclosures, satellite/antenna masts, exterior lighting, HVAC disconnects, gutters on rear elevations

**Interior Ceiling Pattern**
- If multiple rooms show staining, note the pattern — it may indicate a larger leak source than individual rooms suggest
- Example: "Ceiling staining documented in 4 separate rooms. Pattern suggests potential systemic leak path — structural engineer or re-inspection may be warranted before finalizing interior scope."

**Age / Condition Flags**
- Visible pre-existing wear the carrier may use as a defense
- Example: "Shingles show significant granule loss beyond storm-related areas. Carrier may attempt ACV argument. Document carefully."

**Underscope Risk**
- If available square footage and scope line items seem mismatched, flag it
- Example: "1,292 SF home — only 2 interior rooms scoped. Recommend confirming all rooms were accessed during inspection."

**Policy Pro Cross-Flags**
- If a Policy Pro report was provided and contained Agentic Notes flags (existing damage exclusion, roof ACV risk, screen enclosure limitation, occupancy issues, cosmetic exclusions), restate the relevant ones here so the estimator has full context
- Example: "Policy Pro flagged an Existing Damage Exclusion endorsement. Pre-storm documentation for all scoped items is critical."

---

## Common Mistakes — Learn From Real Files

These are documented errors from actual CCS scope sessions. Check against each before finalizing.

| Mistake | What Happened | The Rule |
|---|---|---|
| **Satellite dish hallucination** | Armstrong file — no dish existed. Fabricated from assumption. | Never document a component unless visible in a photo. |
| **Gutters marked "Not Present"** | Visible in every exterior photo (Armstrong #3–#11) as thin line at eave. | Always scan eave line in ALL exterior photos before calling gutters absent. |
| **Pipe jack quantity wrong** | Read chalk mark as damage flag, not quantity. "3" next to pipe jack = 3 pipe jacks. | Numbers next to components = quantity. Read it, don't guess. |
| **Pitch recorded incorrectly** | Used field measurement decimal (5.4/12) instead of working number. | Record pitch as working X/12. Source from pitch gauge photo. |
| **Component listed with no action** | Rows added for items with "no damage observed." | Scope = work order. No action item = not in the report. |
| **Waste factor applied wrong** | Used 20% for hip roof instead of CCS standard 15%. | Hip = 15%, Gable = 10%, Flat = 5%, Tile repairs = 20%. Always show the math. |
| **Interior room scoped without drywall/plaster question** | Assumed drywall. Some older FL homes are plaster. | Always ask before writing the line item. |
| **Ceiling only — no insulation** | Scoped ceiling repair without companion insulation line. | Ceiling damage always = two line items: ceiling + insulation at same SF. |

---

## PA Review Escalation Triggers

The scoper's job is documentation. The following situations require flagging for PA review before the scope is finalized — do not make coverage or structural calls independently.

Flag with: *"PA review required before finalizing — [reason]"*

| Situation | Why It Needs PA |
|---|---|
| Damage visible adjacent to or on a load-bearing wall | Structural determination — beyond scope documentation |
| Mold visible in any photo | Coverage sub-limit applies; mold estimate must be separated |
| Detached or appurtenant structure with unclear Coverage A vs. B classification | Policy review required before estimating |
| Roof damage with no EagleView AND no field measurements | Estimate unreliable without verified square footage |
| Interior water damage with no identifiable roof source | Cause of loss must be confirmed before scope |
| Damage that appears pre-existing or unrelated to the date of loss | PA must determine if claimable before it goes in scope |
| Total loss indicators (Severity 4–5) | Management notification required |

---

## Output

Save to `/mnt/user-data/outputs/CCS_Scope_[ClaimNumber]_[LastName].docx`

One-line summary after presenting:
> "Scope complete — [X] line items. Severity [#]. [Above/Below/TBD] deductible. Ready for estimating."

---

## Waste Factor Quick Reference

| Roof Type | Waste Factor | Calculation |
|---|---|---|
| Gable | 10% | Net SQ × 1.10 |
| Hip | 15% | Net SQ × 1.15 |
| Complex / Multi-facet | 15–20% | Use EagleView suggested if available |
| Flat roof | 5% | Round up to next square |
| Tile (repairs) | 20% | Due to breakage |

**Always label clearly in the scope:** e.g. `26.93 SQ (23.42 net + 15% hip waste)`

**Steep charges:** Apply when pitch is 7/12 or greater.

---

## CCS Estimating Rules (Decision Triggers)

These are working rules extracted from CCS Inspecting & Estimating Guidelines. Apply these when scoping — they determine line items.

### Ceiling & Texture
- **Popcorn ceiling** — always scrape entire ceiling, repair damaged SF, re-popcorn entire ceiling. Never patch popcorn in place.
- **All other textures** — cut out damaged area, replace drywall, blend texture approximately 2x the damaged area using heavy knockdown, seal/prime/paint full ceiling.
- **Damage adjacent to wall** — flag: "Based on proximity to wall, repairs to wall surface may also be required."
- **New drywall** — must be sealed before texture application.

### Interior — Line Item Rules
- **Drywall** — scope only actual damaged SF. Do not round to full sheets unless necessary. Water-damaged drywall must be cut out and replaced, not sealed.
- **Plaster** — determine correct plaster/lath combo. Default backing: 1/2" gypsum blueboard. Scope actual SF of damage plus thin coat over full affected area. Requires TWO coats of paint due to absorption.
- **Paint** — deduct wall openings over 32 SF. Repaint adjacent walls when no natural break. New drywall: prime + 1 coat minimum.
- **Wallpaper** — if any section damaged, replace all adjacent walls. If adjoining room has no natural break, replace that room too.
- **Full interior sketch required** if damage affects 3 or more rooms.

### Natural Breaks
Stop repairs at natural breaks. Do not patch mid-room.
- Flooring: doorway, transition strip, or material change
- Paint/drywall: wall, soffit, or ceiling change
- Roofing: ridge, hip, or slope transition
- Siding: corner or material change

### Overhead & Profit
- Apply 10% overhead + 10% profit (not compounded) when a general contractor will manage or subcontract work.
- Do NOT apply to: emergency repairs, water mitigation, temporary repairs, single-trade jobs, insured's personal labor.

### Depreciation
- Apply per line item — never lump sum.
- Do NOT depreciate labor-only tasks (tear-out, debris removal).
- Do not exceed 80% depreciation unless fully justified.

### Steep & High Charges
- Apply steep charges when pitch is **7/12 or greater**.
- Apply two-story charges when materials require hand-carrying on homes taller than two stories.

### Roofing Layer Removal
- First layer: include as tear-off line item.
- Additional layers: estimate separately.

### Fencing
- Measure to nearest linear foot.
- Repairs at RCV. Full replacement at ACV.

## Edge Cases

- **No Policy Pro** — ask for manual claim header fields before proceeding
- **No EagleView** — calculate waste manually, label clearly, note "EagleView not provided"
- **No photos, narration only** — proceed; note "Assessment based on contractor narration only"
- **Multiple perils** — sub-section by peril
- **Detached structures** — note separately, flag for separate scope if damage unclear
- **Interior not accessed** — do not list rooms; omit entirely
