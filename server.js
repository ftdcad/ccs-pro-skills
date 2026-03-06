require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;
const CLAIMS_DIR = path.join(__dirname, 'claims');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(CLAIMS_DIR)) fs.mkdirSync(CLAIMS_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// File upload config
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const claimDir = path.join(UPLOADS_DIR, req.params.id);
      if (!fs.existsSync(claimDir)) fs.mkdirSync(claimDir, { recursive: true });
      cb(null, claimDir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      cb(null, `${timestamp}-${safeName}`);
    }
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// ─── Utility ───────────────────────────────────────────────

function esc(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatFlagContent(content) {
  const s = esc(content);
  const dash = s.indexOf(' — ');
  if (dash > 0) return `<strong>${s.substring(0, dash)}</strong>${s.substring(dash)}`;
  return s;
}

const CHEVRON = '<div class="chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div>';

// ─── PRO Chain Definition ──────────────────────────────────

const PRO_CHAIN = [
  { key: 'policy', id: 'sec-policy', badge: 'Policy PRO', bc: 'badge-policy', theme: 'theme-policy', title: 'Policy Analysis', sub: 'Coverage \u00b7 Deductibles \u00b7 Endorsements \u00b7 Gaps' },
  { key: 'scope', id: 'sec-scope', badge: 'Scope PRO', bc: 'badge-scope', theme: 'theme-scope', title: 'Scope of Loss', sub: 'Photos \u00b7 Measurements \u00b7 Damage Assessment' },
  { key: 'estimating', id: 'sec-estimating', badge: 'Estimating', bc: 'badge-estimating', theme: 'theme-estimating', title: 'Xactimate Estimate', sub: 'Line-item pricing \u00b7 RCV / ACV \u00b7 O&P' },
  { key: 'strategy', id: 'sec-strategy', badge: 'Strategy PRO', bc: 'badge-strategy', theme: 'theme-strategy', title: 'Claims Strategy', sub: 'Gap analysis \u00b7 Track assignment \u00b7 Leverage points \u00b7 Client email' },
  'branch',
  { key: 'state', id: 'sec-state', badge: 'State PRO', bc: 'badge-state', theme: 'theme-state', title: 'State Law & Compliance', sub: 'Deadlines \u00b7 SOL \u00b7 Appraisal \u00b7 Matching \u00b7 DOI' },
  { key: 'undisputed', id: 'sec-undisputed', badge: 'Undisputed Funds PRO', bc: 'badge-undisputed', theme: 'theme-undisputed', title: 'Undisputed Funds Demand', sub: 'Strategic analysis + demand letter \u00b7 10-day deadline' },
  { key: 'spol', id: 'sec-spol', badge: 'SPOL PRO', bc: 'badge-spol', theme: 'theme-spol', title: 'Sworn Proof of Loss', sub: 'Pre-filled draft \u00b7 24hr delivery \u00b7 Insured email \u00b7 15-day clock' },
  { key: 'day15', id: 'sec-day15', badge: '15 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '15-Day Demand', sub: 'Day 5-6' },
  { key: 'formalDemand', id: 'sec-formal', badge: 'Formal Demand PRO', bc: 'badge-formal', theme: 'theme-formal', title: 'Formal Demand Letter', sub: 'Day 5-10' },
  { key: 'day30', id: 'sec-day30', badge: '30 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '30-Day Follow-Up', sub: 'Day 16-28' },
  { key: 'day45', id: 'sec-day45', badge: '45 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '45-Day Escalation', sub: 'Day 30-45' },
  { key: 'peerReview1', id: 'sec-peer1', badge: 'Peer Review', bc: 'badge-peer', theme: 'theme-peer', title: '45-Day Peer Review', sub: 'Human checkpoint \u00b7 Quality review \u00b7 Course correction' },
  { key: 'day60', id: 'sec-day60', badge: '60 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '60-Day Follow-Up', sub: 'Day 46-60' },
  { key: 'day75', id: 'sec-day75', badge: '75 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '75-Day Follow-Up', sub: 'Day 61-75' },
  { key: 'peerReview2', id: 'sec-peer2', badge: 'Peer Review', bc: 'badge-peer', theme: 'theme-peer', title: '75-Day Peer Review', sub: 'Human checkpoint \u00b7 Final course correction before 90-day' },
  { key: 'day90', id: 'sec-day90', badge: '90 Day PRO', bc: 'badge-day', theme: 'theme-day', title: '90-Day Resolution', sub: 'Day 76-90 \u00b7 Resolved, litigation, or ADR' },
];

const BRANCH_PROS = [
  { key: 'denial', id: 'sec-denial', badge: 'Denial PRO', bc: 'badge-denial', theme: 'theme-denial', title: 'Coverage Denial', sub: 'Mr. Hyde / Dr. Jekyll \u00b7 24hr peer review' },
  { key: 'newClaim', id: 'sec-newclaim', badge: 'NEW Claim PRO', bc: 'badge-newclaim', theme: 'theme-newclaim', title: 'Early Positioning', sub: 'Forward pressure \u00b7 Scenarios A/B/C' },
  { key: 'lossBelow', id: 'sec-lossbelow', badge: 'Loss Below PRO', bc: 'badge-lossbelow', theme: 'theme-lossbelow', title: 'Underpayment', sub: 'Pre-loss restoration \u00b7 4-bucket gap' },
];

const CONDITIONAL_TOOLS = [
  { id: 'sec-rfi', badge: 'RFI PRO', bc: 'badge-rfi', theme: 'theme-rfi', title: 'Request for Information', sub: 'Carrier RFI response \u00b7 ROR detection \u00b7 Insured compliance email' },
  { id: 'sec-state-cond', badge: 'State PRO', bc: 'badge-state', theme: 'theme-state', title: 'State Law Lookup', sub: 'Called by any PRO before correspondence \u00b7 50-state reference' },
];

// ─── Current Step Detection ──────────────────────────────────

// Walk the chain and find the first PRO that isn't complete
function getCurrentStep(pros) {
  // Linear chain (skip 'branch' marker)
  for (const item of PRO_CHAIN) {
    if (item === 'branch') {
      // Check if ANY branch path is needed — look at strategy routing
      const strategyData = pros.strategy;
      if (!strategyData || strategyData.status !== 'complete') continue;
      // Check branch PROs
      for (const bp of BRANCH_PROS) {
        const d = pros[bp.key];
        if (d && d.status !== 'pending' && d.status !== 'complete') return bp;
        if (!d || d.status === 'pending') {
          // Only return this branch if strategy routed here
          const routing = (strategyData.routing || '').toLowerCase();
          if (bp.key === 'denial' && routing.includes('denial')) return bp;
          if (bp.key === 'newClaim' && (routing.includes('new claim') || routing.includes('new_claim'))) return bp;
          if (bp.key === 'lossBelow' && (routing.includes('loss below') || routing.includes('loss_below') || routing.includes('underpay'))) return bp;
        }
      }
      continue;
    }
    const d = pros[item.key];
    if (!d || d.status === 'pending') return item;
    if (d.status !== 'complete') return item;
  }
  return null; // all done
}

// What each PRO step needs uploaded to proceed
const STEP_UPLOAD_PROMPTS = {
  policy: {
    title: 'Policy PRO',
    instruction: 'Upload the insurance policy to begin your claim workflow.',
    detail: 'Declarations page preferred. Full policy accepted. Scanned PDFs are fine — the system handles image-based documents.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  scope: {
    title: 'Scope PRO',
    instruction: 'Upload property photos and inspection notes for the scope of loss.',
    detail: 'Include all damage photos, measurements, and any EagleView or Hover reports if available.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg,.zip',
  },
  estimating: {
    title: 'Estimating',
    instruction: 'Upload the Xactimate estimate when ready.',
    detail: 'This is a human step — upload the completed estimate to advance the chain.',
    accept: '.pdf,.docx,.esx,.xlsx',
  },
  strategy: {
    title: 'Strategy PRO',
    instruction: 'Upload the carrier\'s response letter to run Claims Strategy.',
    detail: 'This can be a denial letter, partial payment notice, or any carrier correspondence. Strategy PRO will determine the claim track.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  denial: {
    title: 'Denial PRO',
    instruction: 'Upload the carrier denial letter.',
    detail: 'Strategy PRO has routed this claim to the denial track. Upload the denial letter to generate the response.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  newClaim: {
    title: 'NEW Claim PRO',
    instruction: 'Ready to generate early positioning documents.',
    detail: 'Strategy PRO has routed this claim to the new claim track. The system will generate forward pressure documents.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  lossBelow: {
    title: 'Loss Below PRO',
    instruction: 'Upload the carrier\'s underpayment notice or partial scope.',
    detail: 'Strategy PRO has routed this claim to the underpayment track. Upload carrier documents showing their low-ball position.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  state: {
    title: 'State PRO',
    instruction: 'State compliance check will run automatically.',
    detail: 'State PRO fires before correspondence is generated. No upload needed — it pulls from claim data.',
    accept: '',
  },
  undisputed: {
    title: 'Undisputed Funds PRO',
    instruction: 'Ready to generate undisputed funds demand.',
    detail: 'Requires the strategic analysis report from the previous step, the estimate, and the policy coverage summary. Upload any missing documents.',
    accept: '.pdf,.docx,.doc',
  },
  spol: {
    title: 'SPOL PRO',
    instruction: 'Upload the blank Sworn Proof of Loss form.',
    detail: 'The system will pre-fill the SPOL from your claim data. Upload the carrier\'s blank SPOL form to begin.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  day15: {
    title: '15 Day PRO',
    instruction: 'Ready to generate 15-day demand.',
    detail: 'The 15-day clock from date of loss is tracked. Upload any new carrier correspondence if applicable.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  formalDemand: {
    title: 'Formal Demand PRO',
    instruction: 'Ready to generate formal demand letter.',
    detail: 'Upload any carrier responses received since the last step.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
  day30: {
    title: '30 Day PRO',
    instruction: 'Ready to generate 30-day follow-up.',
    detail: 'Upload any carrier correspondence received since formal demand.',
    accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
  },
};

// ─── Claude API Integration ─────────────────────────────────

const POLICY_PRO_SYSTEM_PROMPT = `You are CCS Policy Pro™, a specialized insurance policy review system. You extract, analyze, and format insurance policy information into structured JSON for a claims management pipeline.

## Your Task
Read the uploaded insurance policy document completely — every page, every endorsement, every amendment. Extract all data into the JSON schema provided below.

## Extraction Rules
1. EXTRACT FROM SOURCE ONLY. Every data point comes from the policy document. If information isn't in the document, use "Not Specified" for strings or null for numbers.
2. QUOTE POLICY LANGUAGE EXACTLY for exclusions, endorsements, appraisal clauses, and suit clauses. Paraphrasing changes legal meaning.
3. READ EVERY PAGE. Policies bury critical language in endorsements, amendments, and riders that override the declarations page.
4. SCAN ALL ENDORSEMENTS AND AMENDMENTS. Look for: matching endorsements, cosmetic damage exclusions, roof payment schedules (ACV by age), right to repair clauses, ACV endorsements, wind/hail sublimits or exclusions, and any language that reduces coverage from what the dec page suggests.
5. IDENTIFY EXCLUSIONS AND GAPS. Quote the specific language. Flag anything the carrier could use to deny or underpay. Pay special attention to: sand damage coverage, ensuing loss language, and ambiguous provisions.
6. CHECK LEGAL PROVISIONS. Appraisal clause (full text), suit against us clause, statute of limitations.
7. EVERY ENDORSEMENT gets a plain-English explanation, not just the form number.

## Flag Variants
- red: Immediate risk to claim — occupancy issues, roof age triggering depreciation, coverage voids
- yellow: Caution — policy type nuances, low sublimits, endorsement risks
- blue: Informational — strategic leverage, appraisal clause available, burden of proof on carrier
- green: Confirmed positive — coverage verified, policy active on DOL, RCV confirmed

## Endorsement Classification
- critical: Endorsements that DIRECTLY affect claim outcome — form name + number + plain-English why it matters
- warn: Endorsements that MAY limit coverage under certain conditions
- standard: Routine endorsements (state changes, deductible forms, etc.)

## Agentic Notes
After extraction, add strategic observations: policy type analysis (DP-3 vs HO-3, named vs open peril), coverage gap warnings, endorsement impact in plain English, exclusion risks, property red flags. If nothing notable, use [{"title": "None", "content": "No additional observations."}].

## Output
Return ONLY a valid JSON object. No markdown, no code blocks, no explanation text. Just the raw JSON.

The JSON MUST match this structure:
{
  "status": "complete",
  "coverage": {
    "coverageA": "$amount or Not Specified",
    "coverageB": "$amount or Not Specified",
    "coverageC": "$amount or Not Specified",
    "coverageD": "$amount or Not Specified",
    "combinedTotal": "$amount (sum of A+B+C+D)",
    "hurricaneDeductible": "$amount or Not Specified",
    "hurricaneDeductibleBasis": "e.g. 2% of Coverage A, or Not Specified",
    "aopDeductible": "$amount or Not Specified",
    "fungiDeductible": "$amount or Not Specified",
    "waterBackupLimit": "$amount or Not Specified",
    "premisesLiability": "$amount or Not Specified",
    "lossSettlement": "Replacement Cost or Actual Cash Value",
    "appraisalClause": "present or not found"
  },
  "underwriting": {
    "yearBuilt": 1985,
    "sqFootage": "string or Not Specified",
    "roofYear": 2006,
    "roofAge": 18,
    "roofType": "Architectural Shingle, 3-Tab, Metal, Tile, etc.",
    "construction": "Masonry, Frame, etc.",
    "occupancy": "Owner Occupied, Tenant Occupied, Seasonal, Vacant",
    "occupancyFlag": false,
    "county": "county name",
    "policyPeriod": "start - end dates",
    "protectionClass": "ISO class or Not Specified",
    "secondaryWaterResistance": "status or Not Specified",
    "openingProtection": "designation or Not Specified"
  },
  "carrier": {
    "carrierName": "full carrier name from policy",
    "agentName": "name or Not Specified",
    "agentLocation": "location or Not Specified",
    "agentPhone": "phone or Not Specified",
    "premium": "annual premium or Not Specified",
    "premiumBreakdown": "details or Not Specified"
  },
  "mortgagees": [
    { "label": "1st Mortgagee", "value": "name - loan # - escrow status" }
  ],
  "endorsements": {
    "critical": ["Form name + number + why it matters"],
    "warn": ["Form name + number + condition"],
    "standard": ["Form name + number"]
  },
  "exclusionsGapsLimitations": {
    "gaps": ["coverage gaps"],
    "limitations": ["things that reduce payout"],
    "exclusions": ["things not covered - quote specific language"]
  },
  "legalStatutory": {
    "statuteOfLimitations": "SOL with deadline if calculable",
    "appraisalClause": "FULL QUOTED TEXT from policy",
    "suitAgainstUs": "FULL QUOTED TEXT from policy",
    "euoRequirements": "EUO obligations"
  },
  "flags": [
    { "variant": "red", "content": "description" }
  ],
  "missing": ["items not found in the document"],
  "agenticNotes": [
    { "title": "observation title", "content": "detailed observation" }
  ],
  "reviewMeta": {
    "reviewer": "CCS Policy Pro",
    "sourcePages": 47,
    "generatedDate": "YYYY-MM-DD"
  },
  "handoff": {
    "to": "Scope PRO",
    "content": "summary paragraph: insured, address, carrier, policy type, key limits, deductible, roof info, flags"
  }
}`;

// Map of which PRO keys use which Claude model
const PRO_MODEL_MAP = {
  policy: 'claude-sonnet-4-5-20250929',   // extraction
  scope: 'claude-sonnet-4-5-20250929',    // extraction
  strategy: 'claude-opus-4-6',            // strategy
  denial: 'claude-opus-4-6',              // strategy
  newClaim: 'claude-opus-4-6',            // strategy
  lossBelow: 'claude-opus-4-6',           // strategy
  undisputed: 'claude-opus-4-6',          // strategy
  spol: 'claude-sonnet-4-5-20250929',     // extraction
  state: 'claude-sonnet-4-5-20250929',    // extraction
};

// System prompt map — only Policy PRO for now, others added as built
const PRO_SYSTEM_PROMPTS = {
  policy: POLICY_PRO_SYSTEM_PROMPT,
};

async function runPolicyPro(claimData, files) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    throw new Error('ANTHROPIC_API_KEY not configured. Add your key to the .env file.');
  }

  const claim = claimData.claim || {};

  // Build content blocks for Claude
  const content = [];

  // Add uploaded files as documents/images
  for (const file of files) {
    const fileData = fs.readFileSync(file.path);
    const base64 = fileData.toString('base64');
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === '.pdf') {
      content.push({
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data: base64 }
      });
    } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      const mediaMap = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };
      content.push({
        type: 'image',
        source: { type: 'base64', media_type: mediaMap[ext], data: base64 }
      });
    }
  }

  // Add the instruction with claim context
  content.push({
    type: 'text',
    text: [
      'Analyze this insurance policy document and return the structured JSON.',
      '',
      'Claim context:',
      '- Insured: ' + (claim.insured || 'Unknown'),
      '- Property: ' + (claim.address || 'Unknown'),
      '- Carrier: ' + (claim.carrier || 'Unknown'),
      '- Policy #: ' + (claim.policyNumber || 'Unknown'),
      '- Claim #: ' + (claim.claimNumber || 'Unknown'),
      '- Date of Loss: ' + (claim.dateOfLoss || 'Unknown'),
    ].join('\n')
  });

  console.log('[Policy PRO] Sending to Claude API...');
  console.log('[Policy PRO] Files:', files.map(f => f.originalname).join(', '));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: PRO_MODEL_MAP.policy,
      max_tokens: 16384,
      system: POLICY_PRO_SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Policy PRO] API error:', response.status, errText);
    throw new Error('Claude API error (' + response.status + '): ' + errText.substring(0, 200));
  }

  const result = await response.json();
  const text = result.content[0].text;

  console.log('[Policy PRO] Response received. Tokens: input=' + result.usage?.input_tokens + ' output=' + result.usage?.output_tokens);

  // Parse JSON from response
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    // Try to extract from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[1]);
    } else {
      const objMatch = text.match(/\{[\s\S]*\}/);
      if (objMatch) {
        parsed = JSON.parse(objMatch[0]);
      } else {
        console.error('[Policy PRO] Could not parse JSON from response:', text.substring(0, 500));
        throw new Error('Could not extract JSON from Claude response');
      }
    }
  }

  parsed.status = 'complete';

  // Track API usage
  parsed._meta = {
    model: result.model,
    inputTokens: result.usage?.input_tokens,
    outputTokens: result.usage?.output_tokens,
    processedAt: new Date().toISOString(),
  };

  console.log('[Policy PRO] Complete. Data saved.');
  return parsed;
}

// ─── Shared Renderers ──────────────────────────────────────

function renderFlag(f) {
  return `<div class="flag flag-${esc(f.variant)}">${formatFlagContent(f.content)}</div>`;
}

function renderFlags(flags) {
  if (!flags || !flags.length) return '';
  return flags.map(renderFlag).join('\n      ');
}

function renderHandoff(h) {
  if (!h) return '';
  return `
      <div class="handoff">
        <strong>Hands off to &rarr; ${esc(h.to)}</strong><br>
        ${esc(h.content)}
      </div>`;
}

function renderInfoCell(label, value, cls) {
  const valClass = cls ? ` class="${cls}"` : '';
  return `<div class="info-cell"><label>${esc(label)}</label><value${valClass}>${esc(value)}</value></div>`;
}

// ─── Policy PRO Body ───────────────────────────────────────

function renderPolicyBody(d) {
  const cov = d.coverage || {};
  const uw = d.underwriting || {};
  const car = d.carrier || {};
  const egl = d.exclusionsGapsLimitations || {};
  const legal = d.legalStatutory || {};

  // Handle both old (A, B, C, D) and new (coverageA, coverageB, etc.) field names
  const covA = cov.coverageA || cov.A;
  const covB = cov.coverageB || cov.B;
  const covC = cov.coverageC || cov.C;
  const covD = cov.coverageD || cov.D;

  const occValue = typeof uw.occupancy === 'object' ? uw.occupancy.value : uw.occupancy;
  const occFlag = (typeof uw.occupancy === 'object' && uw.occupancy.flag === 'warn') || uw.occupancyFlag;

  let html = '';

  // Coverage Limits
  html += '<div class="section-label">Coverage Limits</div>';
  html += '<div class="info-grid cols-4">';
  html += renderInfoCell('Coverage A \u2014 Dwelling', covA);
  html += renderInfoCell('Coverage B \u2014 Other Structures', covB);
  html += renderInfoCell('Coverage C \u2014 Personal Property', covC);
  html += renderInfoCell('Coverage D \u2014 Fair Rental Value', covD);
  if (cov.combinedTotal) html += renderInfoCell('Combined Total', cov.combinedTotal, 'highlight');
  html += renderInfoCell('Hurricane Deductible', cov.hurricaneDeductible, 'highlight');
  if (cov.hurricaneDeductibleBasis) html += renderInfoCell('Deductible Basis', cov.hurricaneDeductibleBasis);
  html += renderInfoCell('AOP Deductible', cov.aopDeductible);
  html += renderInfoCell('Loss Settlement', cov.lossSettlement);
  html += renderInfoCell('Appraisal Clause', cov.appraisalClause ? '\u2713 ' + cov.appraisalClause : 'Not confirmed');
  if (cov.fungiDeductible && cov.fungiDeductible !== 'Not Specified') html += renderInfoCell('Fungi/Mold', cov.fungiDeductible);
  if (cov.waterBackupLimit && cov.waterBackupLimit !== 'Not Specified') html += renderInfoCell('Water Backup', cov.waterBackupLimit);
  if (cov.premisesLiability && cov.premisesLiability !== 'Not Specified') html += renderInfoCell('Premises Liability', cov.premisesLiability);
  html += '</div>';

  // Carrier Info
  if (car.carrierName) {
    html += '<div class="section-label">Insurance Carrier</div>';
    html += '<div class="info-grid cols-3">';
    html += renderInfoCell('Carrier', car.carrierName);
    if (car.agentName && car.agentName !== 'Not Specified') html += renderInfoCell('Agent', car.agentName);
    if (car.agentLocation && car.agentLocation !== 'Not Specified') html += renderInfoCell('Agent Location', car.agentLocation);
    if (car.agentPhone && car.agentPhone !== 'Not Specified') html += renderInfoCell('Agent Phone', car.agentPhone);
    if (car.premium && car.premium !== 'Not Specified') html += renderInfoCell('Premium', car.premium);
    html += '</div>';
  }

  // Underwriting
  html += '<div class="section-label">Property Underwriting</div>';
  html += '<div class="info-grid cols-4">';
  html += renderInfoCell('Year Built', uw.yearBuilt);
  html += renderInfoCell('Sq Footage', uw.sqFootage);
  html += renderInfoCell('Roof Year', uw.roofYear);
  html += renderInfoCell('Roof Type', uw.roofType);
  html += renderInfoCell('Construction', uw.construction);
  html += renderInfoCell('Occupancy', occFlag ? occValue + ' \u26a0' : occValue, occFlag ? 'warn' : '');
  html += renderInfoCell('County / Territory', uw.county);
  html += renderInfoCell('Policy Period', uw.policyPeriod);
  if (uw.roofAge) html += renderInfoCell('Roof Age at DOL', uw.roofAge + ' years');
  html += '</div>';

  // Mortgagees
  if (d.mortgagees && d.mortgagees.length) {
    html += '<div class="section-label">Mortgagees / Additional Interests</div>';
    html += '<div class="info-grid cols-3">';
    d.mortgagees.forEach(m => { html += renderInfoCell(m.label, m.value); });
    html += '</div>';
  }

  // Flags
  if (d.flags && d.flags.length) {
    html += '<div class="section-label">Critical Flags</div>';
    html += renderFlags(d.flags);
  }

  // Endorsements
  if (d.endorsements) {
    html += '<div class="section-label">Endorsements</div>';
    html += '<ul class="endorse-list">';
    (d.endorsements.critical || []).forEach(e => { html += `<li class="critical">${esc(e)}</li>`; });
    (d.endorsements.warn || []).forEach(e => { html += `<li class="warn">${esc(e)}</li>`; });
    (d.endorsements.standard || []).forEach(e => { html += `<li>${esc(e)}</li>`; });
    html += '</ul>';
  }

  // Exclusions / Gaps / Limitations
  if (egl.gaps || egl.limitations || egl.exclusions) {
    html += '<div class="section-label">Exclusions / Gaps / Limitations</div>';
    if (egl.exclusions && egl.exclusions.length) {
      html += '<div class="subsection-label">Exclusions</div>';
      html += '<ul class="endorse-list">';
      egl.exclusions.forEach(e => { html += `<li class="critical">${esc(e)}</li>`; });
      html += '</ul>';
    }
    if (egl.limitations && egl.limitations.length) {
      html += '<div class="subsection-label">Limitations</div>';
      html += '<ul class="endorse-list">';
      egl.limitations.forEach(l => { html += `<li class="warn">${esc(l)}</li>`; });
      html += '</ul>';
    }
    if (egl.gaps && egl.gaps.length) {
      html += '<div class="subsection-label">Coverage Gaps</div>';
      html += '<ul class="endorse-list">';
      egl.gaps.forEach(g => { html += `<li>${esc(g)}</li>`; });
      html += '</ul>';
    }
  }

  // Legal / Statutory
  if (legal.statuteOfLimitations || legal.appraisalClause || legal.suitAgainstUs) {
    html += '<div class="section-label">Legal / Statutory</div>';
    html += '<div class="legal-items">';
    if (legal.statuteOfLimitations) {
      html += '<div class="legal-item"><div class="legal-label">Statute of Limitations</div><div class="legal-text">' + esc(legal.statuteOfLimitations) + '</div></div>';
    }
    if (legal.suitAgainstUs) {
      html += '<div class="legal-item"><div class="legal-label">Suit Against Us</div><div class="legal-text"><em>' + esc(legal.suitAgainstUs) + '</em></div></div>';
    }
    if (legal.appraisalClause && legal.appraisalClause.length > 20) {
      html += '<div class="legal-item"><div class="legal-label">Appraisal Clause</div><div class="legal-text"><em>' + esc(legal.appraisalClause) + '</em></div></div>';
    }
    if (legal.euoRequirements) {
      html += '<div class="legal-item"><div class="legal-label">EUO Requirements</div><div class="legal-text">' + esc(legal.euoRequirements) + '</div></div>';
    }
    html += '</div>';
  }

  // Agentic Notes
  if (d.agenticNotes && Array.isArray(d.agenticNotes) && d.agenticNotes.length) {
    const hasContent = d.agenticNotes.some(n => n.title !== 'None');
    if (hasContent) {
      html += '<div class="section-label">Agentic Notes</div>';
      html += '<div class="agentic-notes">';
      d.agenticNotes.forEach((note, i) => {
        html += '<div class="agentic-note"><div class="agentic-note-title">' + (i + 1) + '. ' + esc(note.title) + '</div><div class="agentic-note-content">' + esc(note.content) + '</div></div>';
      });
      html += '</div>';
    }
  }

  // Missing
  if (d.missing && d.missing.length) {
    html += '<div class="section-label">Missing \u2014 Required for Full Review</div>';
    html += '<ul class="missing-list">';
    d.missing.forEach(m => { html += `<li>${esc(m)}</li>`; });
    html += '</ul>';
  }

  // Review Meta
  if (d.reviewMeta) {
    html += '<div class="section-label">Review Data</div>';
    html += '<div class="info-grid cols-3">';
    html += renderInfoCell('Reviewer', d.reviewMeta.reviewer);
    html += renderInfoCell('Source Pages', d.reviewMeta.sourcePages);
    html += renderInfoCell('Generated', d.reviewMeta.generatedDate);
    html += '</div>';
  }

  html += renderHandoff(d.handoff);
  return html;
}

// ─── Scope PRO Body ────────────────────────────────────────

function renderScopeBody(d) {
  let html = '';
  const m = d.measurements || {};

  // Measurements
  html += '<div class="section-label">Roof Measurements</div>';
  html += '<div class="info-grid cols-3">';
  html += renderInfoCell('Net Area', m.netArea);
  const recSQ = typeof m.recommendedSQ === 'object' ? m.recommendedSQ.value : m.recommendedSQ;
  const recHL = typeof m.recommendedSQ === 'object' && m.recommendedSQ.highlight;
  html += renderInfoCell('Recommended SQ', recSQ, recHL ? 'highlight' : '');
  html += renderInfoCell('Pitch', m.pitch);
  html += renderInfoCell('Configuration', m.configuration);
  html += renderInfoCell('Ridge', m.ridge);
  html += renderInfoCell('Perimeter / Gutters', m.perimeter);
  html += '</div>';

  // Roof & Exterior table
  if (d.roofExterior && d.roofExterior.length) {
    html += '<div class="section-label">Roof & Exterior Scope</div>';
    html += '<table class="scope-table"><thead><tr><th>Item</th><th>Description</th><th style="text-align:center;">Qty</th></tr></thead><tbody>';
    d.roofExterior.forEach(r => {
      html += `<tr><td class="item">${esc(r.item)}</td><td>${esc(r.description)}</td><td class="qty">${esc(r.qty)}</td></tr>`;
    });
    html += '</tbody></table>';
  }

  // Interior
  if (d.interior && d.interior.length) {
    html += '<div class="section-label">Interior \u2014 Ensuing Loss</div>';
    html += '<table class="scope-table"><thead><tr><th>Room</th><th>Scope Items</th><th style="text-align:center;">SF</th></tr></thead><tbody>';
    d.interior.forEach(room => {
      const items = (room.items || []).map(i => `\u00b7 ${esc(i)}`).join('<br>');
      html += `<tr><td class="item">${esc(room.room)}</td><td>${esc(room.source)}<br>${items}</td><td class="qty">${esc(room.sf)}</td></tr>`;
    });
    html += '</tbody></table>';
  }

  // Severity
  if (d.severity) {
    html += '<div class="section-label">Severity & Assessment</div>';
    html += `<div class="severity-badge">${esc(d.severity.level)} \u2014 ${esc(d.severity.description)}</div>`;
  }

  // Flags
  if (d.flags && d.flags.length) {
    html += renderFlags(d.flags);
  }

  // Notes
  if (d.notes && d.notes.length) {
    html += '<div class="section-label">Notes</div>';
    html += '<div class="notes-text">';
    html += d.notes.map(n => `\u00b7 ${esc(n)}`).join('<br>');
    html += '</div>';
  }

  html += renderHandoff(d.handoff);
  return html;
}

// ─── Strategy PRO Body ─────────────────────────────────────

function renderStrategyBody(d) {
  let html = '';
  const cc = d.carrierContact || {};

  // Carrier Contact
  html += '<div class="section-label">Carrier Contact</div>';
  html += '<div class="info-grid cols-3">';
  html += renderInfoCell('Adjuster', cc.adjuster);
  html += renderInfoCell('Title', cc.title);
  html += renderInfoCell('Carrier', cc.carrier);
  html += renderInfoCell('License', cc.license);
  html += renderInfoCell('Phone', cc.phone);
  html += renderInfoCell('Routing', d.routing);
  html += '</div>';

  // Carrier Letter Dates
  if (d.carrierLetterDate || d.carrierLetterReceived) {
    html += '<div class="section-label">Carrier Letter Timeline</div>';
    html += '<div class="info-grid cols-3">';
    if (d.carrierLetterDate) html += renderInfoCell('Letter Dated', d.carrierLetterDate);
    if (d.carrierLetterReceived) html += renderInfoCell('Received by CCS', d.carrierLetterReceived);
    html += renderInfoCell('Peer Review', d.peerReview ? 'Required' : 'Not required at this stage');
    html += '</div>';
  }

  // Flags
  if (d.flags && d.flags.length) {
    html += '<div class="section-label">Strategy Flags</div>';
    html += renderFlags(d.flags);
  }

  // SPOL Checklist
  if (d.spolChecklist && d.spolChecklist.length) {
    html += '<div class="section-label">Carrier Document Request (SPOL Items)</div>';
    html += '<ul class="missing-list">';
    d.spolChecklist.forEach(item => { html += `<li>${esc(item)}</li>`; });
    html += '</ul>';
  }

  html += renderHandoff(d.handoff);
  return html;
}

// ─── Estimating Body ───────────────────────────────────────

function renderEstimatingBody(d) {
  let html = '';
  if (d.content) {
    html += `<div style="font-size:13px;color:#94a3b8;font-style:italic;">${esc(d.content)}</div>`;
  }
  html += renderHandoff(d.handoff);
  return html;
}

// ─── Body Renderer Dispatch ────────────────────────────────

const BODY_RENDERERS = {
  policy: renderPolicyBody,
  scope: renderScopeBody,
  strategy: renderStrategyBody,
  estimating: renderEstimatingBody,
};

function renderProBody(key, data) {
  const renderer = BODY_RENDERERS[key];
  if (renderer) return renderer(data);
  // Generic fallback for future PROs with data
  let html = '';
  if (data.content) html += `<div style="font-size:13px;color:#94a3b8;">${esc(data.content)}</div>`;
  if (data.flags && data.flags.length) {
    html += '<div class="section-label">Flags</div>';
    html += renderFlags(data.flags);
  }
  html += renderHandoff(data.handoff);
  return html || '<div style="font-size:13px;color:#94a3b8;font-style:italic;">Data populated — renderer pending.</div>';
}

// ─── Section Rendering ─────────────────────────────────────

function renderPendingSection(pro) {
  return `
  <div class="pro-section placeholder" id="${pro.id}" data-status="pending">
    <div class="pro-header ${pro.theme}">
      <div class="pro-header-left">
        <span class="pro-badge ${pro.bc}">${pro.badge}</span>
        <div>
          <div class="pro-title">${pro.title}</div>
          <div class="pro-subtitle">${pro.sub}</div>
        </div>
      </div>
      <div class="pro-header-right">
        <span class="status-pill status-pending">Pending</span>
      </div>
    </div>
  </div>`;
}

function renderActiveSection(pro, data) {
  const status = data.status === 'complete' ? 'complete' : 'active';
  const label = status === 'complete' ? 'Complete' : 'In Progress';
  const pillClass = status === 'complete' ? 'status-complete' : 'status-active';
  const subtitle = data.subtitle || pro.sub;

  return `
  <div class="pro-section" id="${pro.id}" data-status="${status}">
    <div class="pro-header ${pro.theme}" onclick="toggle('${pro.id}')">
      <div class="pro-header-left">
        <span class="pro-badge ${pro.bc}">${pro.badge}</span>
        <div>
          <div class="pro-title">${pro.title}</div>
          <div class="pro-subtitle">${esc(subtitle)}</div>
        </div>
      </div>
      <div class="pro-header-right">
        <span class="status-pill ${pillClass}">${label}</span>
        ${CHEVRON}
      </div>
    </div>
    <div class="pro-body">
      ${renderProBody(pro.key, data)}
    </div>
  </div>`;
}

function renderErrorSection(pro, data) {
  return `
  <div class="pro-section" id="${pro.id}" data-status="error">
    <div class="pro-header ${pro.theme}" onclick="toggle('${pro.id}')">
      <div class="pro-header-left">
        <span class="pro-badge ${pro.bc}">${pro.badge}</span>
        <div>
          <div class="pro-title">${pro.title}</div>
          <div class="pro-subtitle">Error during processing</div>
        </div>
      </div>
      <div class="pro-header-right">
        <span class="status-pill status-error">Error</span>
        ${CHEVRON}
      </div>
    </div>
    <div class="pro-body">
      <div class="error-message">${esc(data.error || 'An unknown error occurred during processing.')}</div>
      <div class="error-hint">Try uploading the document again. Check that your API key is set in the .env file.</div>
    </div>
  </div>`;
}

function renderProcessingSection(pro) {
  return `
  <div class="pro-section" id="${pro.id}" data-status="processing">
    <div class="pro-header ${pro.theme}">
      <div class="pro-header-left">
        <span class="pro-badge ${pro.bc}">${pro.badge}</span>
        <div>
          <div class="pro-title">${pro.title}</div>
          <div class="pro-subtitle">Analyzing document...</div>
        </div>
      </div>
      <div class="pro-header-right">
        <span class="status-pill status-active">Processing</span>
      </div>
    </div>
  </div>`;
}

function renderSection(pro, pros) {
  const data = pros[pro.key];
  if (!data || data.status === 'pending') return renderPendingSection(pro);
  if (data.status === 'error') return renderErrorSection(pro, data);
  if (data.status === 'processing') return renderProcessingSection(pro);
  return renderActiveSection(pro, data);
}

function renderConnector() {
  return '<div class="connector"><div class="connector-line"></div></div>';
}

// ─── Branch Row ────────────────────────────────────────────

function renderBranchRow(pros) {
  let html = '<div class="branch-row">';
  BRANCH_PROS.forEach(bp => {
    const data = pros[bp.key];
    if (!data || data.status === 'pending') {
      html += renderPendingSection(bp);
    } else {
      html += renderActiveSection(bp, data);
    }
  });
  html += '</div>';
  return html;
}

// ─── Conditional Tools ─────────────────────────────────────

function renderConditionalTools() {
  let html = `
<div class="conditional-section">
  <div class="conditional-label">Conditional Tools &mdash; Fire on demand at any pipeline position</div>
  <div class="conditional-row">`;
  CONDITIONAL_TOOLS.forEach(ct => {
    html += `
    <div class="pro-section placeholder" id="${ct.id}" data-status="pending">
      <div class="pro-header ${ct.theme}">
        <div class="pro-header-left">
          <span class="pro-badge ${ct.bc}">${ct.badge}</span>
          <div>
            <div class="pro-title">${ct.title}</div>
            <div class="pro-subtitle">${ct.sub}</div>
          </div>
        </div>
        <span class="status-pill status-pending">On Demand</span>
      </div>
    </div>`;
  });
  html += '\n  </div>\n</div>';
  return html;
}

// ─── Full Chain Page ───────────────────────────────────────

function renderChainPage(claim) {
  const c = claim.claim || {};
  const m = claim.meta || {};
  const pros = claim.pros || {};

  // Count progress
  let total = 0, done = 0;
  PRO_CHAIN.forEach(p => { if (typeof p === 'object') { total++; const d = pros[p.key]; if (d && d.status === 'complete') done++; } });
  BRANCH_PROS.forEach(p => { total++; const d = pros[p.key]; if (d && d.status === 'complete') done++; });

  // Build chain sections
  let chainHTML = '';
  let first = true;
  PRO_CHAIN.forEach(item => {
    if (item === 'branch') {
      chainHTML += renderConnector();
      chainHTML += renderBranchRow(pros);
      return;
    }
    if (!first) chainHTML += renderConnector();
    chainHTML += renderSection(item, pros);
    first = false;
  });

  // Detect current step for upload prompt
  const currentStep = getCurrentStep(pros);
  const claimId = m.claimNumber ? m.claimNumber.replace(/[^a-zA-Z0-9_-]/g, '_') : 'unknown';
  let uploadPromptHTML = '';
  if (currentStep) {
    const prompt = STEP_UPLOAD_PROMPTS[currentStep.key] || {
      title: currentStep.badge,
      instruction: 'Upload documents to proceed.',
      detail: '',
      accept: '.pdf,.docx,.doc,.png,.jpg,.jpeg',
    };
    uploadPromptHTML = `
<div class="upload-prompt">
  <div class="upload-prompt-step">NEXT STEP</div>
  <div class="upload-prompt-title">${esc(prompt.title)}</div>
  <div class="upload-prompt-instruction">${esc(prompt.instruction)}</div>
  <div class="upload-prompt-detail">${esc(prompt.detail)}</div>
  ${prompt.accept ? `
  <form class="upload-form" action="/claim/${esc(claimId)}/upload/${esc(currentStep.key)}" method="POST" enctype="multipart/form-data">
    <label class="upload-dropzone" id="dropzone">
      <input type="file" name="documents" multiple accept="${prompt.accept}" onchange="updateFileList(this)">
      <div class="dropzone-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="dropzone-text">Drop files here or click to browse</div>
      <div class="dropzone-accept">${esc(prompt.accept.replace(/\./g, '').toUpperCase().replace(/,/g, ', '))}</div>
    </label>
    <div class="file-list" id="fileList"></div>
    <button type="submit" class="btn-upload" id="uploadBtn" style="display:none;">Upload &amp; Run ${esc(prompt.title)}</button>
  </form>` : `
  <div class="upload-auto-note">This step runs automatically — no upload needed.</div>`}
</div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CCS PRO Chain \u2014 ${esc(m.claimNumber)} ${esc(m.lastName)}</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<div class="topbar">
  <div class="topbar-logo">COASTAL CLAIMS <span>SERVICES</span></div>
  <div class="topbar-claim">PRO CHAIN &nbsp;\u00b7&nbsp; ${esc(m.claimNumber)} &nbsp;\u00b7&nbsp; ${esc(m.lastName)}</div>
</div>

<div class="claim-strip">
  <div class="claim-field"><label>Insured</label><value>${esc(c.insured)}</value></div>
  <div class="claim-field"><label>Property</label><value>${esc(c.address)}</value></div>
  <div class="claim-field"><label>Carrier</label><value>${esc(c.carrier)}</value></div>
  <div class="claim-field"><label>Policy #</label><value>${esc(c.policyNumber)}</value></div>
  <div class="claim-field"><label>Claim #</label><value>${esc(c.claimNumber)}</value></div>
  <div class="claim-field"><label>Date of Loss</label><value>${esc(c.dateOfLoss)}</value></div>
  <div class="claim-field"><label>Policy Type</label><value>${esc(c.policyType)}</value></div>
  <div class="claim-field"><label>File Status</label><value>${esc(c.fileStatus)}</value></div>
</div>

<div class="toolbar">
  <button class="btn" onclick="expandAll()">Expand All</button>
  <button class="btn" onclick="collapseAll()">Collapse All</button>
  <a href="/" class="btn" style="text-decoration:none;">&larr; Dashboard</a>
  <span class="toolbar-label">${done} / ${total} steps complete</span>
</div>

${uploadPromptHTML}

<div class="chain">
${chainHTML}
</div>

${renderConditionalTools()}

<script src="/chain.js"></script>
</body>
</html>`;
}

// ─── Dashboard Page ────────────────────────────────────────

function loadAllClaims() {
  if (!fs.existsSync(CLAIMS_DIR)) return [];
  return fs.readdirSync(CLAIMS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        const raw = fs.readFileSync(path.join(CLAIMS_DIR, f), 'utf-8');
        const data = JSON.parse(raw);
        const pros = data.pros || {};
        let total = 0, done = 0, active = 0;
        [...PRO_CHAIN.filter(p => typeof p === 'object'), ...BRANCH_PROS].forEach(p => {
          total++;
          const d = pros[p.key];
          if (d && d.status === 'complete') done++;
          else if (d && d.status === 'active') active++;
        });
        return {
          id: f.replace('.json', ''),
          meta: data.meta || {},
          claim: data.claim || {},
          total, done, active,
        };
      } catch (e) { return null; }
    })
    .filter(Boolean);
}

function renderDashboard(claims) {
  let rows = '';
  if (claims.length === 0) {
    rows = '<tr><td colspan="6" style="text-align:center;color:#6b7280;padding:40px;">No claims found. Add a JSON file to the /claims folder.</td></tr>';
  } else {
    claims.forEach(c => {
      const pct = c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;
      rows += `
      <tr onclick="window.location='/claim/${esc(c.id)}'" style="cursor:pointer;">
        <td style="font-family:var(--mono);color:var(--accent-blue);">${esc(c.meta.claimNumber || c.id)}</td>
        <td style="font-weight:600;color:var(--text-primary);">${esc(c.claim.insured || 'Unknown')}</td>
        <td>${esc(c.claim.carrier || '')}</td>
        <td>${esc(c.claim.dateOfLoss || '')}</td>
        <td>${esc(c.claim.fileStatus || '')}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="flex:1;height:6px;background:#1f2937;border-radius:3px;overflow:hidden;">
              <div style="width:${pct}%;height:100%;background:${pct === 100 ? '#6ee7b7' : '#60a5fa'};border-radius:3px;"></div>
            </div>
            <span style="font-size:11px;color:var(--text-muted);white-space:nowrap;">${c.done}/${c.total}</span>
          </div>
        </td>
      </tr>`;
    });
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CCS PRO Chain \u2014 Dashboard</title>
<link rel="stylesheet" href="/styles.css">
<style>
  .dashboard { max-width: 95vw; margin: 40px auto; padding: 0 32px; }
  .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .dash-header h2 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0; }
  .dash-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .dash-table th {
    text-align: left; padding: 10px 14px; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-blue);
    border-bottom: 1px solid var(--border);
  }
  .dash-table td {
    padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--text-muted);
  }
  .dash-table tr:hover td { background: rgba(255,255,255,0.03); }
  .claim-count {
    font-size: 12px; color: var(--text-dim); margin-bottom: 16px;
  }
  .btn-new {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; padding: 9px 20px;
    border-radius: 8px; border: 1px solid #2563eb;
    background: #1e40af; color: #fff; cursor: pointer;
    text-decoration: none; transition: background 0.15s;
  }
  .btn-new:hover { background: #2563eb; }
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-logo">COASTAL CLAIMS <span>SERVICES</span></div>
  <div class="topbar-claim">PRO CHAIN DASHBOARD</div>
</div>

<div class="dashboard">
  <div class="dash-header">
    <h2>Active Claims</h2>
    <a href="/new" class="btn-new">+ New Claim</a>
  </div>
  <div class="claim-count">${claims.length} claim${claims.length !== 1 ? 's' : ''} on file</div>
  <table class="dash-table">
    <thead>
      <tr>
        <th>Claim #</th>
        <th>Insured</th>
        <th>Carrier</th>
        <th>Date of Loss</th>
        <th>Status</th>
        <th>Progress</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</div>

</body>
</html>`;
}

// ─── Routes ────────────────────────────────────────────────

app.get('/', (req, res) => {
  const claims = loadAllClaims();
  res.send(renderDashboard(claims));
});

// ─── New Claim Form ────────────────────────────────────────

app.get('/new', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CCS PRO Chain \u2014 New Claim</title>
<link rel="stylesheet" href="/styles.css">
<style>
  .new-claim { max-width: 560px; margin: 48px auto; padding: 0 32px; }
  .new-claim h2 { font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
  .new-claim .subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 32px; }
  .form-group { margin-bottom: 20px; }
  .form-group label {
    display: block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--accent-blue); margin-bottom: 6px;
  }
  .form-group input {
    width: 100%; padding: 10px 14px; font-size: 14px;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text-primary);
    font-family: 'Inter', sans-serif; outline: none;
    transition: border-color 0.15s;
  }
  .form-group input:focus { border-color: var(--accent-blue); }
  .form-group input::placeholder { color: var(--text-dim); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-actions { display: flex; gap: 12px; margin-top: 32px; }
  .btn-submit {
    font-size: 14px; font-weight: 600; padding: 11px 28px;
    border-radius: 8px; border: 1px solid #2563eb;
    background: #1e40af; color: #fff; cursor: pointer;
    font-family: 'Inter', sans-serif; transition: background 0.15s;
  }
  .btn-submit:hover { background: #2563eb; }
  .btn-cancel {
    font-size: 14px; font-weight: 600; padding: 11px 28px;
    border-radius: 8px; border: 1px solid var(--border);
    background: transparent; color: var(--text-muted); cursor: pointer;
    font-family: 'Inter', sans-serif; text-decoration: none;
    display: inline-flex; align-items: center; transition: background 0.15s;
  }
  .btn-cancel:hover { background: rgba(255,255,255,0.05); }
  .paste-section {
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .paste-section label {
    display: block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #6ee7b7; margin-bottom: 6px;
  }
  .paste-hint {
    font-size: 12px; color: var(--text-dim); margin-bottom: 10px; line-height: 1.5;
  }
  .paste-box {
    width: 100%; min-height: 120px; padding: 12px 14px; font-size: 13px;
    background: var(--bg-card); border: 1px dashed #059669;
    border-radius: 8px; color: var(--text-primary);
    font-family: 'Inter', sans-serif; outline: none; resize: vertical;
    transition: border-color 0.15s; line-height: 1.6;
  }
  .paste-box:focus { border-color: #6ee7b7; }
  .paste-box::placeholder { color: var(--text-dim); font-size: 12px; }
  .paste-result {
    margin-top: 8px; font-size: 12px; color: #6ee7b7;
    display: none;
  }
  .paste-result.show { display: block; }
  .or-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0; font-size: 11px; color: var(--text-dim);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .or-divider::before, .or-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-logo">COASTAL CLAIMS <span>SERVICES</span></div>
  <div class="topbar-claim">NEW CLAIM</div>
</div>

<div class="new-claim">
  <h2>Start New Claim</h2>
  <div class="subtitle">Paste from ClaimWizard to auto-fill, or enter manually below.</div>

  <div class="paste-section">
    <label>Paste from ClaimWizard</label>
    <div class="paste-hint">Copy the claim info from ClaimWizard and paste it here. Fields will auto-fill.</div>
    <textarea class="paste-box" id="pasteBox" placeholder="Paste claim data here..."></textarea>
    <div class="paste-result" id="pasteResult"></div>
  </div>

  <div class="or-divider">or enter manually</div>

  <form action="/new" method="POST" id="claimForm">
    <div class="form-group">
      <label>Claim Number</label>
      <input type="text" name="claimNumber" id="f-claimNumber" placeholder="0794736884" required>
    </div>

    <div class="form-group">
      <label>Insured Name</label>
      <input type="text" name="insured" id="f-insured" placeholder="Pedro & Blanca Castrejon" required>
    </div>

    <div class="form-group">
      <label>Carrier</label>
      <input type="text" name="carrier" id="f-carrier" placeholder="Allstate" required>
    </div>

    <div class="form-group">
      <label>Property Address</label>
      <input type="text" name="address" id="f-address" placeholder="4292 Rock Bend Dr, College Station, TX 77845" required>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Date of Loss</label>
        <input type="text" name="dateOfLoss" id="f-dateOfLoss" placeholder="5/24/2025 \u2014 Wind/Hail" required>
      </div>
      <div class="form-group">
        <label>Policy Number</label>
        <input type="text" name="policyNumber" id="f-policyNumber" placeholder="000838425633">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>File Status</label>
        <input type="text" name="fileStatus" id="f-fileStatus" placeholder="CTG - Supplemental">
      </div>
      <div class="form-group">
        <label>Peril</label>
        <input type="text" name="peril" id="f-peril" placeholder="Wind/Hail">
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-submit">Create Claim</button>
      <a href="/" class="btn-cancel">Cancel</a>
    </div>
  </form>
</div>

<script>
document.getElementById('pasteBox').addEventListener('input', function() {
  const raw = this.value.trim();
  if (!raw) return;

  const lines = raw.split(/\\n/).map(l => l.trim()).filter(Boolean);
  const text = raw;
  let filled = 0;

  // Claim # — look for "Claim #" label followed by number
  const claimMatch = text.match(/Claim\\s*#\\s*[:\\n]?\\s*([A-Za-z0-9-]+)/i);
  if (claimMatch) { document.getElementById('f-claimNumber').value = claimMatch[1]; filled++; }

  // Policy #
  const policyMatch = text.match(/Policy\\s*#\\s*[:\\n]?\\s*([A-Za-z0-9-]+)/i);
  if (policyMatch) { document.getElementById('f-policyNumber').value = policyMatch[1]; filled++; }

  // Carrier
  const carrierMatch = text.match(/Carrier\\s*[:\\n]?\\s*(.+)/i);
  if (carrierMatch) { document.getElementById('f-carrier').value = carrierMatch[1].trim(); filled++; }

  // Loss Date
  const dateMatch = text.match(/Loss\\s*Date\\s*[:\\n]?\\s*([\\d\\/\\-]+)/i);
  if (dateMatch) {
    let dateVal = dateMatch[1].trim();
    // Also grab peril if on next line or nearby
    const perilMatch = text.match(/Peril\\s*[:\\n]?\\s*(.+)/i);
    if (perilMatch) {
      dateVal += ' \\u2014 ' + perilMatch[1].trim();
      document.getElementById('f-peril').value = perilMatch[1].trim();
      filled++;
    }
    document.getElementById('f-dateOfLoss').value = dateVal;
    filled++;
  }

  // Loss Address
  const addrMatch = text.match(/Loss\\s*Address\\s*:\\s*(.+)/i);
  if (addrMatch) { document.getElementById('f-address').value = addrMatch[1].trim(); filled++; }

  // Insured — first line, usually "Name — Address" or "Name"
  // Try first line before any label
  const firstLine = lines[0] || '';
  const namePart = firstLine.split(/\\s*[\\u2014—-]\\s*/)[0].trim();
  if (namePart && !namePart.match(/^(Loss|Carrier|Policy|Claim|Peril|Severity|CTG|\\$)/i)) {
    document.getElementById('f-insured').value = namePart;
    filled++;
  }

  // File status — CTG lines
  const ctgMatch = text.match(/(CTG\\s*[-\\u2014—]\\s*\\w[\\w\\s]*)/i);
  if (ctgMatch) { document.getElementById('f-fileStatus').value = ctgMatch[1].trim(); filled++; }

  // If no Loss Address found, try to get address from first line after dash
  if (!addrMatch) {
    const dashAddr = firstLine.match(/[\\u2014—-]\\s*(.+)/);
    if (dashAddr) {
      // Look for a fuller address in the text
      const fullAddr = text.match(/([\\d]+\\s+[\\w\\s]+(?:Dr|St|Ave|Rd|Ln|Ct|Blvd|Way|Pl)[\\w\\s,]*\\d{5}(?:-\\d{4})?)/i);
      if (fullAddr) {
        document.getElementById('f-address').value = fullAddr[1].trim();
        filled++;
      }
    }
  }

  const result = document.getElementById('pasteResult');
  result.textContent = filled + ' field' + (filled !== 1 ? 's' : '') + ' auto-filled. Review below and hit Create Claim.';
  result.classList.add('show');
});
</script>

</body>
</html>`);
});

app.post('/new', (req, res) => {
  const { claimNumber, insured, carrier, address, dateOfLoss, policyNumber, fileStatus, peril } = req.body;

  if (!claimNumber || !insured) {
    return res.status(400).send('Claim number and insured name are required.');
  }

  // Create safe filename from claim number
  const fileId = claimNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filePath = path.join(CLAIMS_DIR, `${fileId}.json`);

  // Don't overwrite existing claims
  if (fs.existsSync(filePath)) {
    return res.status(409).send(`Claim ${claimNumber} already exists. <a href="/claim/${fileId}">Open it</a>`);
  }

  // Build the claim JSON — everything starts at pending
  const claimData = {
    meta: {
      claimNumber: claimNumber,
      lastName: insured.split(' ').pop(),
      generatedDate: new Date().toISOString().split('T')[0],
    },
    claim: {
      insured: insured,
      address: address || '',
      carrier: carrier || '',
      policyNumber: policyNumber || '',
      claimNumber: claimNumber,
      dateOfLoss: dateOfLoss || '',
      peril: peril || '',
      policyType: '',
      fileStatus: fileStatus || 'New — Awaiting Policy Review',
    },
    pros: {},
  };

  fs.writeFileSync(filePath, JSON.stringify(claimData, null, 2));
  res.redirect(`/claim/${fileId}`);
});

// ─── File Upload Route ─────────────────────────────────────

app.post('/claim/:id/upload/:proKey', upload.array('documents', 10), async (req, res) => {
  const claimPath = path.join(CLAIMS_DIR, `${req.params.id}.json`);
  if (!fs.existsSync(claimPath)) {
    return res.status(404).json({ success: false, error: 'Claim not found' });
  }

  const files = req.files || [];
  if (files.length === 0) {
    return res.json({ success: true, redirect: `/claim/${req.params.id}` });
  }

  const proKey = req.params.proKey;
  let claim;

  try {
    claim = JSON.parse(fs.readFileSync(claimPath, 'utf-8'));
  } catch (e) {
    return res.status(500).json({ success: false, error: 'Could not read claim file' });
  }

  // Record the upload
  if (!claim.pros[proKey]) claim.pros[proKey] = {};
  claim.pros[proKey].uploadedFiles = files.map(f => ({
    originalName: f.originalname,
    savedAs: f.filename,
    size: f.size,
    uploadedAt: new Date().toISOString(),
  }));

  // Run the PRO skill if we have an API handler for it
  if (proKey === 'policy' && PRO_SYSTEM_PROMPTS[proKey]) {
    claim.pros[proKey].status = 'processing';
    fs.writeFileSync(claimPath, JSON.stringify(claim, null, 2));

    try {
      const result = await runPolicyPro(claim, files);
      // Preserve the uploaded files list
      result.uploadedFiles = claim.pros[proKey].uploadedFiles;
      claim.pros[proKey] = result;
      fs.writeFileSync(claimPath, JSON.stringify(claim, null, 2));
    } catch (err) {
      console.error('[Upload] PRO execution failed:', err.message);
      claim.pros[proKey].status = 'error';
      claim.pros[proKey].error = err.message;
      fs.writeFileSync(claimPath, JSON.stringify(claim, null, 2));
    }
  } else {
    // No API handler yet — just mark as active
    claim.pros[proKey].status = 'active';
    fs.writeFileSync(claimPath, JSON.stringify(claim, null, 2));
  }

  // Return JSON for fetch requests, redirect for regular form posts
  if (req.headers['x-requested-with'] === 'fetch') {
    return res.json({ success: true, redirect: `/claim/${req.params.id}` });
  }
  res.redirect(`/claim/${req.params.id}`);
});

// ─── Claim View ────────────────────────────────────────────

app.get('/claim/:id', (req, res) => {
  const filePath = path.join(CLAIMS_DIR, `${req.params.id}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send(`<h1 style="color:#fff;font-family:sans-serif;padding:40px;">Claim not found: ${esc(req.params.id)}</h1>`);
  }
  try {
    const claim = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.send(renderChainPage(claim));
  } catch (e) {
    res.status(500).send(`<h1 style="color:#fff;font-family:sans-serif;padding:40px;">Error reading claim: ${esc(e.message)}</h1>`);
  }
});

// ─── Start ─────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n  CCS PRO Chain running at http://localhost:${PORT}\n`);
  console.log(`  Claims folder: ${CLAIMS_DIR}`);
  const count = fs.existsSync(CLAIMS_DIR) ? fs.readdirSync(CLAIMS_DIR).filter(f => f.endsWith('.json')).length : 0;
  console.log(`  Claims loaded: ${count}\n`);
});
