# Specification

## Summary
**Goal:** Build a staged e-commerce aggregator application with routing, mock data scraping, order API, and versioned contact/sitemap pages. Stage 1 fully implemented, Stages 2-3 stubbed with TODOs.

**Planned changes:**
- Create application shell with five routes: home (/), contact, sitemap, products, and services
- Define backend Product and Service data models with id, title, sourceUrl, price, currency, and rawPayload fields
- Implement internal mock scraper function that populates 5-10 sample products and 5-10 sample services from hard-coded arrays (no external HTTP)
- Create Order model and POST /api/orders endpoint that stores orders without Merkle tracing or payout logic
- Build /products page displaying all products with title, price, currency, and source URL
- Build /services page displaying all services with title, price, currency, and source URL
- Implement /contact page reading version-controlled contact info from backend and displaying iframe placeholder for e-contract-lwf.caffeine.xyz with stubbed CORS validation
- Create /sitemap page and /sitemap.xml route dynamically generated from pages array containing path, priority, and roleAccess fields
- Stub QRC onboarding flow function generating clientId from unixTimestamp + mobile10 with QR placeholder and session storage (Stage 2 stub with TODOs)
- Stub arbitrage functions set_arbitrage(p1, p2) and get_arbitrage(p1, p2) with correct signatures and dummy wallet call placeholders (Stage 2 stub with TODOs)
- Add TODO comments for Stage 3: real HTTP scraping, Merkle Root + Nonce order tracing with last-6-chars memory, and leaderboard payout integration

**User-visible outcome:** Users can navigate between five pages, browse mock products and services with pricing, submit orders, view versioned contact information with embedded contract iframe, and access a dynamic sitemap. QRC onboarding and arbitrage functions are stubbed for future implementation.
