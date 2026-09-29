# AGENTS.md — Repository Rules & Operating Constraints

This file defines the operating rules, stack specifications, and constraints for any human or AI agent working in this repository.

## 1. Stack Specification

- **Language**: Plain JavaScript (ECMAScript Modules / ESM, `"type": "module"`).
- **Runtime**: Node.js `>= 18.0.0` (LTS recommended, e.g. Node 20 or 22).
- **Testing**: Built-in Node test runner (`node:test`) and strict assertions (`node:assert/strict`).
- **Dependencies**: Zero runtime dependencies. No external packages may be added to `dependencies`. Only dev tooling (such as `prettier` for code formatting) is permitted in `devDependencies`.

## 2. Standard Commands

- `npm test`: Runs the test suite via `node --test`.
- `npm run format`: Automatically formats files using Prettier.
- `npm run format:check`: Checks files against Prettier formatting rules without modifying them.
- `npm run check`: The harness **gate**. Runs both `node --test` and `prettier --check .`. Must pass cleanly before any code is considered complete.

## 3. Strict Rules ("NEVER" Constraints)

1. **NEVER** install or import external runtime dependencies or libraries. Use only standard JavaScript and Node.js built-ins.
2. **NEVER** return a string or unrounded float from `cartTotal`. The return value must be a `number` rounded to the nearest whole đồng using `Math.round()`. Do NOT use `.toFixed()` because it returns a string.
3. **NEVER** touch or modify configuration or harness files (`package.json`, `AGENTS.md`, `BRIEF.md`, `README.md`, `.github/`) during the implementation phase. Only `src/cart.js` and `test/cart.test.js` may be edited.
4. **NEVER** mutate input parameters (`items` array or its objects, `options` object). Treat all inputs as immutable.
5. **NEVER** bypass, silence, or remove existing tests. Tests must test behaviour according to the specification and each test must fail for only one reason.
