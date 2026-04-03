# CCS PRO Chain
**Coastal Claims Services — Claims Workflow Viewer**

## What This Is
A standalone web app that displays the full CCS claims workflow as a collapsible chain of PRO sections. One HTML file per claim. Opens in any browser. No server, no framework, no build step.

## Project Structure
```
ccs-pro-chain/
├── index.html              ← Main app shell (open this in browser)
├── generate.js             ← Node script: generates claim HTML from JSON
├── template.html           ← HTML template used by generator
├── styles.css              ← Full design system
├── chain.js                ← Toggle/expand/collapse logic
├── data/
│   └── armstrong.json      ← Armstrong claim data (working example)
├── assets/
│   └── ccs-logo.png        ← CCS logo (add manually)
└── README.md
```

## How To Use

### View the Armstrong example
```bash
open index.html
```
Or just drag `index.html` into any browser.

### Generate a new claim HTML
```bash
node generate.js --claim data/armstrong.json
# Outputs: CCS_Chain_01-000125628_Armstrong.html
```

### Add a new claim
1. Copy `data/armstrong.json`
2. Rename it to the new claim number
3. Fill in the claim data
4. Run the generator

## PRO Chain Order
1. Policy PRO
2. Scope PRO
3. Estimating
4. Claims Strategy PRO → branches: Denial PRO | NEW Claim PRO | Loss Below PRO
5. UnDisputed Funds PRO
6. SPOL PRO
7. 15 Day PRO
8. Formal Demand PRO
9. 30 Day PRO
10. 45 Day PRO
11. Peer Review
12. 60 Day PRO
13. 75 Day PRO
14. Peer Review
15. 90 Day PRO

## Claude Code Instructions
Start with `index.html` — it contains the full Armstrong chain hardcoded.
Once that's working, wire up `generate.js` to pull from `data/armstrong.json`.
Design system is in `styles.css` — don't touch the color variables.

## Status
- [ ] index.html (Armstrong hardcoded)
- [ ] styles.css (full design system)
- [ ] chain.js (toggle logic)
- [ ] generate.js (template engine)
- [ ] data/armstrong.json (claim data)
