# AI-LOG.md

<!-- Write each entry as you go. Format: date — task / Tool / Asked for / Kept / Changed / Rejected / By hand -->

## 2026-09-30 — harness: rules file, gate, CI, brief

Tool: Claude (chat).
Asked for: AGENTS.md, a format+test gate, a GitHub Actions workflow and the brief for cartTotal, from the rubric and README.
Kept: The rule structure in AGENTS.md, the BRIEF.md specification, and the GitHub Actions check workflow.
Changed: In commit df682f8: synced .github/workflows/ci.yml to use Node 22, npm ci, format:check and npm test; added .prettierignore to ignore node_modules and package-lock.json; updated package.json scripts with "check": "npm run format:check && npm test"; locked prettier to 3.9.9; created CLAUDE.md pointing to @AGENTS.md.
Rejected: nothing.
By hand: Ran initial npm test to verify red state (failure on not implemented), created personal GitHub repository wad-cart-24120294, configured git remote origin, and pushed to GitHub.

## 2026-09-30 — implement cartTotal and test suite

Tool: Antigravity.
Asked for: Implement cartTotal in src/cart.js and comprehensive tests in test/cart.test.js following BRIEF.md and AGENTS.md.
Kept: Input validation loop, subtotal accumulation using Array.prototype.reduce, VAT and shipping threshold logic, single Math.round() at the end.
Changed: Hardened price validation with Number.isFinite(item.price) to cleanly reject Infinity and NaN; removed implementation-specific message string assertions (err.message.includes) to test purely against RangeError; split multi-assertion tests into distinct tests (typeof number, integer check, round down, round up) so each test can fail for one reason only; separated zero qty and negative qty into independent tests.
Rejected: toFixed() for rounding to ensure the result is strictly a number; rejected string matching on error messages to test spec instead of implementation.
By hand: Ran npm run check gate locally, verified all 15 tests pass green, checked Prettier formatting, ensured README.md line endings match upstream, and wrote the self-assessment report.
