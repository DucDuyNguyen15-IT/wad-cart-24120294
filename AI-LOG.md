# AI-LOG.md

<!-- Write each entry as you go. Format: date — task / Tool / Asked for / Kept / Changed / Rejected / By hand -->

## 2026-09-30 — initial harness setup

Tool: Antigravity.
Asked for: Initial harness setup including rules file (AGENTS.md), gate check script, CI workflow, and brief from README.
Kept: Basic project layout, BRIEF.md structure, and .gitignore.
Changed: Created a preliminary 25-line AGENTS.md, package.json check script, and initial .github/workflows/ci.yml in commit 73b1cf2.
Rejected: nothing (first draft).
By hand: Ran initial npm test to verify red state (failure on not implemented), created personal GitHub repository wad-cart-24120294, configured remote origin, and pushed commit 73b1cf2.

## 2026-09-30 — harness alignment with reference starter

Tool: Claude (chat).
Asked for: Diagnose why CI failed on commit 73b1cf2 and synchronize the harness configuration with the reference starter in Downloads/24120294_IA1_workspace/wad-cart-starter.
Kept: The reference 52-line AGENTS.md, the simplified ci.yml (with Node 22, npm ci, format:check, npm test), .prettierignore, .prettierrc, and CLAUDE.md.
Changed: Replaced the preliminary 25-line AGENTS.md with the reference 52-line AGENTS.md; updated ci.yml steps; added .prettierignore for node_modules and package-lock.json; locked prettier to exact 3.9.9 in package.json (commit df682f8).
Rejected: The initial 25-line AGENTS.md and custom gate job from Antigravity, because they differed from the instructor's reference structure and lacked detailed layout/convention sections.
By hand: Checked file differences between local repo and the reference workspace, verified Prettier formatting, and staged commit df682f8.

## 2026-09-30 — implement cartTotal and initial test suite

Tool: Antigravity.
Asked for: Implement cartTotal in src/cart.js and initial unit tests in test/cart.test.js following BRIEF.md and AGENTS.md.
Kept: Input validation loop, subtotal accumulation using Array.prototype.reduce, VAT and shipping threshold logic, single Math.round() at the end.
Changed: Implemented cartTotal in src/cart.js; wrote initial 10 unit tests in test/cart.test.js; created initial draft of SELF_ASSESSMENT_REPORT.md (commits 45f241d and f4bbe42).
Rejected: toFixed() for rounding to ensure return value is strictly a number.
By hand: Ran npm run check locally to verify tests passed green, verified git status, and pushed commits to GitHub.
_(Note on timestamps: Commits df682f8, 45f241d, and f4bbe42 share the same timestamp 01:14:28 because the harness update and implementation were committed sequentially in batch during that interactive session)._

## 2026-09-30 — review and refactor based on grading checklist

Tool: Claude (chat) for evaluation review; Antigravity for applying refactor.
Asked for: Critical evaluation of the submission against rubric criteria ("Việc cần chỉnh sửa trước khi nộp IA#1"), followed by applying all 7 review recommendations.
Kept: Review checklist highlighting unhandled Infinity, grouped multi-assertions in tests, implementation-coupled error message checks, and line-ending diffs.
Changed: In src/cart.js, hardened price validation with Number.isFinite(item.price) to cleanly reject Infinity and NaN; in test/cart.test.js, split tests into 15 isolated single-assertion tests (separating typeof number, integer check, round up and round down, separating zero qty and negative qty), removed err.message.includes(...) to assert purely on RangeError; formatted README.md cleanly; updated SELF_ASSESSMENT_REPORT.md (commit a3aa08a).
Rejected: Grouped assertions in test cases (so each test can fail for one reason only); rejected checking specific error message strings to test specification instead of implementation.
By hand: Verified npm run check (15/15 tests green), verified GitHub Actions CI run on commit a3aa08a passed green (run 36613295215), and updated AI-LOG entries to accurately reflect the multi-tool workflow.
