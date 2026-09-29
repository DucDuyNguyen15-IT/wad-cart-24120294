// Implement cartTotal here. See README.md for the specification.
export function cartTotal(items, options) {
  if (!items || items.length === 0) {
    return 0
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (
      typeof item.price !== 'number' ||
      Number.isNaN(item.price) ||
      item.price < 0
    ) {
      throw new RangeError(`items[${i}].price cannot be negative`)
    }
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError(`items[${i}].qty must be a positive integer`)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const vat = subtotal * options.vatRate
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee

  return Math.round(subtotal + vat + shipping)
}
