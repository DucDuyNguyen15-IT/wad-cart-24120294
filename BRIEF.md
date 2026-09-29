# Brief — cartTotal

Implement `cartTotal(items, options)` in this repository.

## Files you may touch

- `src/cart.js` — the implementation.
- `test/cart.test.js` — add tests. Keep the existing test `the example from the slides` exactly as it is.

Do not touch any other file (`package.json`, `.github/`, `README.md`, `AGENTS.md`, this brief). Read `AGENTS.md` and `README.md` first.

## Constraints

- Plain JavaScript, ES modules, **no dependencies** — no packages, no imports other than `node:` built-ins in tests.
- Export `cartTotal` as a named export from `src/cart.js`.

## Contract

- `items`: array of `{ name, price, qty }`. `price` is in đồng.
- `options`: `{ vatRate, freeShipFrom, shipFee }`. Assume it is well-formed; do not validate it.
- `subtotal` = sum of `price × qty` over all items.
- `vat` = `subtotal × vatRate`.
- `shipping` = `0` when `subtotal >= freeShipFrom` (exactly at the threshold is free), otherwise `shipFee`.
- Result = `subtotal + vat + shipping`, rounded **once**, at the end, to the nearest whole đồng with `Math.round`. It is a `number`, never a string (no `toFixed`).
- Empty `items` returns `0` — no VAT, no shipping.
- Worked example: `[{ price: 180000, qty: 2 }, { price: 45000, qty: 1 }]` with `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }` → `467400`.

## Error cases — throw `RangeError`

- an item with a negative `price` (a `price` of `0` is allowed);
- an item whose `qty` is not a positive integer (`0`, `-1`, `1.5`, `NaN`, a string all throw).

Validate every item before computing anything. The message names the field and the item index, e.g. `items[1].qty must be a positive integer`.

## Tests to write

One behaviour per test, so each can fail for one reason only. Use literal expected values, not recomputed ones:

1. the worked example (already there — keep it);
2. empty cart returns `0`;
3. subtotal just below the threshold pays shipping; subtotal exactly at the threshold ships free;
4. negative price throws `RangeError`;
5. non-integer `qty` (e.g. `1.5`) throws `RangeError`;
6. the result is a `number` (`typeof`) and a whole number.

## Done when

`npm run check` passes (format + tests), and you have listed each changed file and what changed in it.
