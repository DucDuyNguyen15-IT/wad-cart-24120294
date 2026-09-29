import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

test('empty cart returns 0', () => {
  const items = []
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 0)
})

test('subtotal just below the threshold pays shipping', () => {
  const items = [{ name: 'Món A', price: 400000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 470000)
})

test('subtotal exactly at the threshold ships free', () => {
  const items = [{ name: 'Món B', price: 500000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 550000)
})

test('subtotal above the threshold ships free', () => {
  const items = [{ name: 'Món C', price: 600000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 660000)
})

test('negative price throws RangeError', () => {
  const items = [{ name: 'Lỗi giá âm', price: -10000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('infinite price throws RangeError', () => {
  const items = [{ name: 'Lỗi giá vô cực', price: Infinity, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('non-integer qty throws RangeError', () => {
  const items = [{ name: 'Lỗi số lượng lẻ', price: 50000, qty: 1.5 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('zero qty throws RangeError', () => {
  const items = [{ name: 'Lỗi số lượng bằng 0', price: 50000, qty: 0 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('negative qty throws RangeError', () => {
  const items = [{ name: 'Lỗi số lượng âm', price: 50000, qty: -1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('item with zero price is allowed', () => {
  const items = [{ name: 'Quà tặng miễn phí', price: 0, qty: 2 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 30000)
})

test('the result is of type number', () => {
  const items = [{ name: 'Sản phẩm', price: 100000, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(typeof cartTotal(items, options), 'number')
})

test('the result is an integer', () => {
  const items = [{ name: 'Sản phẩm lẻ', price: 33333, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(Number.isInteger(cartTotal(items, options)), true)
})

test('rounds down to nearest whole đồng when fraction is less than 0.5', () => {
  const items = [{ name: 'Món làm tròn xuống', price: 100001, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 0 }
  // 100001 + 8000.08 + 0 = 108001.08 -> 108001
  assert.equal(cartTotal(items, options), 108001)
})

test('rounds up to nearest whole đồng when fraction is at least 0.5', () => {
  const items = [{ name: 'Món làm tròn lên', price: 100007, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 0 }
  // 100007 + 8000.56 + 0 = 108007.56 -> 108008
  assert.equal(cartTotal(items, options), 108008)
})
