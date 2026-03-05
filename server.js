const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CLAIMS_DIR = path.join(__dirname, 'claims');

// Static files (styles.css, chain.js)
app.use(express.static(path.join(__dirname, 'public')));

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
  const occValue = typeof uw.occupancy === 'object' ? uw.occupancy.value : uw.occupancy;
  const occFlag = typeof uw.occupancy === 'object' && uw.occupancy.flag === 'warn';

  let html = '';

  // Coverage Limits
  html += '<div class="section-label">Coverage Limits</div>';
  html += '<div class="info-grid cols-4">';
  html += renderInfoCell('Coverage A \u2014 Dwelling', cov.A);
  html += renderInfoCell('Coverage B \u2014 Other Structures', cov.B);
  html += renderInfoCell('Coverage C \u2014 Personal Property', cov.C);
  html += renderInfoCell('Coverage D \u2014 Fair Rental Value', cov.D);
  html += renderInfoCell('Hurricane Deductible', cov.hurricaneDeductible, 'highlight');
  html += renderInfoCell('AOP Deductible', cov.aopDeductible);
  html += renderInfoCell('Loss Settlement', cov.lossSettlement);
  html += renderInfoCell('Appraisal Clause', cov.appraisalClause ? '\u2713 ' + cov.appraisalClause : 'Not confirmed');
  html += '</div>';

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
    (d.endorsements.critical || []).forEach(e => { html += `<li class="critical">${esc(e)} \ud83d\udea8</li>`; });
    (d.endorsements.warn || []).forEach(e => { html += `<li class="warn">${esc(e)}</li>`; });
    (d.endorsements.standard || []).forEach(e => { html += `<li>${esc(e)}</li>`; });
    html += '</ul>';
  }

  // Missing
  if (d.missing && d.missing.length) {
    html += '<div class="section-label">Missing \u2014 Required for Full Review</div>';
    html += '<ul class="missing-list">';
    d.missing.forEach(m => { html += `<li>${esc(m)}</li>`; });
    html += '</ul>';
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

function renderSection(pro, pros) {
  const data = pros[pro.key];
  if (!data || data.status === 'pending') return renderPendingSection(pro);
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
  .dashboard { max-width: 960px; margin: 40px auto; padding: 0 24px; }
  .dashboard h2 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 20px; }
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
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-logo">COASTAL CLAIMS <span>SERVICES</span></div>
  <div class="topbar-claim">PRO CHAIN DASHBOARD</div>
</div>

<div class="dashboard">
  <h2>Active Claims</h2>
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
