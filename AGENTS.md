# cart — rules for coding assistants

A tiny module: `cartTotal(items, options)` in `src/cart.js`. The specification
is `README.md` — it is the source of truth; if this file and the README
disagree, the README wins.

## Stack

- Node 22, ES modules (`"type": "module"`), plain JavaScript — no TypeScript.
- Tests: the built-in `node:test` + `node:assert/strict`. No test framework.
- Formatting: Prettier (the only devDependency). No runtime dependencies.

## Commands

- `npm test` — run the tests (`node --test`).
- `npm run format:check` — fail if any file is not formatted.
- `npm run format` — fix formatting.
- `npm run check` — the gate: `format:check` then `npm test`. CI runs the same.

## Layout

- `src/cart.js` — the implementation (one exported function, `cartTotal`).
- `test/cart.test.js` — the tests.
- Everything else (`package.json`, `.github/`, `README.md`, this file) is
  harness: leave it alone unless the task says so.

## Conventions

- Style is whatever Prettier produces: no semicolons, single quotes.
- Money is an integer number of đồng. Round exactly once, on the final total,
  with `Math.round`. Return a `number`, never a string.
- Validate input before computing. Throw `RangeError` with a message that names
  the field and the offending item index, e.g. `items[1].qty must be a positive integer`.
- Tests: one behaviour per test, named after the rule it checks. Write expected
  values as literals taken from the README — never recompute them with the same
  formula the code uses.

## Never

- Never add a dependency, runtime or dev, without asking first.
- Never use `toFixed` for the result, or return anything but a `number`.
- Never edit, delete or weaken an existing test to make it pass.
- Never touch files outside `src/` and `test/` for a cart task.
- Never put secrets, `.env` contents or real user data in code, tests or prompts.
- Never call a task done until `npm run check` is green and the diff has been read.

## Working rules

- Red first: run `npm test`, see it fail, then implement.
- Keep diffs small. Say which files changed and why.
- If the spec is ambiguous, ask — do not guess silently.
