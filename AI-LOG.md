# AI-LOG.md

<!-- Write each entry as you go. Format: date — task / Tool / Asked for / Kept / Changed / Rejected / By hand -->

## 2026-09-30 — harness: rules file, gate, CI, brief

Tool: Antigravity.
Asked for: AGENTS.md, a format+test gate, a GitHub Actions workflow, and the brief for cartTotal from the rubric and README.
Kept: The starter repository structure, original failing test `the example from the slides`, and Prettier devDependency setup.
Changed: Synced .github/workflows/ci.yml with Node 22, npm ci, format:check, and test steps; configured .prettierrc (semi: false, singleQuote: true) and .prettierignore to ignore node_modules and package-lock.json.
Rejected: Any external test runners (e.g. Jest or Mocha) to maintain zero runtime dependencies and rely strictly on Node's built-in node:test.
By hand: Verified initial failing test (RED), verified git remote and pushed to personal GitHub repository.

## 2026-09-30 — implement cartTotal and test suite

Tool: Antigravity.
Asked for: Implement cartTotal in src/cart.js and write isolated unit tests in test/cart.test.js following BRIEF.md and AGENTS.md.
Kept: Input validation loop throwing RangeError, subtotal accumulation with Array.prototype.reduce, VAT calculation, and shipping logic.
Changed: Ensured error messages include exact item index and field (`items[i].price cannot be negative`, `items[i].qty must be a positive integer`); split shipping threshold test into just below, exactly at threshold, and above threshold.
Rejected: String-based currency formatting or `toFixed` which would return a string; used `Math.round()` strictly returning integer number of đồng.
By hand: Ran `npm run check` (gate), verified all 10 unit tests pass (GREEN), checked code style compliance with Prettier, and reviewed git diff.
