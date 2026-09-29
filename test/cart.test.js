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
  assert.throws(
    () => cartTotal(items, options),
    (err) =>
      err instanceof RangeError && err.message.includes('items[0].price'),
  )
})

test('non-integer qty throws RangeError', () => {
  const items = [{ name: 'Lỗi số lượng lẻ', price: 50000, qty: 1.5 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => cartTotal(items, options),
    (err) => err instanceof RangeError && err.message.includes('items[0].qty'),
  )
})

test('zero or negative qty throws RangeError', () => {
  const items = [{ name: 'Lỗi số lượng không dương', price: 50000, qty: 0 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.throws(
    () => cartTotal(items, options),
    (err) => err instanceof RangeError && err.message.includes('items[0].qty'),
  )
})

test('item with zero price is allowed', () => {
  const items = [{ name: 'Quà tặng miễn phí', price: 0, qty: 2 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 30000)
})

test('the result is a number and a whole number rounded to nearest whole đồng', () => {
  const items = [{ name: 'Sản phẩm lẻ', price: 33333, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  const total = cartTotal(items, options)
  assert.equal(typeof total, 'number')
  assert.equal(Number.isInteger(total), true)
  assert.equal(total, 66000)
})
