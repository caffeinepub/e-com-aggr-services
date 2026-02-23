# Specification

## Summary
**Goal:** Implement a minimal arbitrage computation module that calculates price differences and logs results during order creation.

**Planned changes:**
- Create `frontend/src/lib/arbitrage.ts` module with `set_arbitrage` function that computes `p3 = p1 - p2` and returns `{ p1, p2, p3 }`
- Export `get_arbitrage` function in the same module that calls `set_arbitrage`, logs the result to console, and includes a TODO comment for future payout and Merkle-root integration
- Integrate arbitrage computation into the order creation flow in `frontend/src/pages/Products.tsx` by calling `get_arbitrage(total, mockWholesalePrice)` where `mockWholesalePrice = total * 0.8`

**User-visible outcome:** When placing an order, the arbitrage calculation (price difference between retail and wholesale) will be computed and logged to the browser console for debugging purposes. The order creation flow remains unchanged with no actual money transfers or external integrations.
