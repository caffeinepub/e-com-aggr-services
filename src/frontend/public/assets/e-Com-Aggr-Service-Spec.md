# App Specification: "e-Com Aggr. Services"
**Platform Goal**: Create a real-time, ONDC-superior e-commerce aggregator service. It actively scrapes unlimited sources to populate product/service datasets, facilitating drop-shipping while dynamically extracting profit arbitrage based on a built-in Leaderboard. 
**Domain**: `*.caffeine.xyz`
**System Architecture**: Modular, Scalable, Resilient, Robust, De-centralized.
*(Note: This is an independent branch/project leveraging the same feature sets/fixtures (from spec*.md) as previous apps, but operating parallel to Crowd-AI-Fund.)*
## Core Technical Directives (50-Credit Bound)
- **AI Instruction Constraint**: Strict 50-credit limit for AI generation. Instructions must be strictly modular, actionable, and pointwise.
- **Transaction & Order Tracing**: 
  - Mandatory implementation of Merkle Root coupled with a cryptographic Nonce for all order-related data tracking.
  - Maintain exactly the last 6 chars of each transaction hashes in active memory/session.
  - Commit the Final Merkle-Root Hash reliably to the backend before any Client or Admin logouts to ensure order integrity.
## 1. Frictionless QRC Client Onboarding
- **Mandatory Onboarding Pattern**: Replace account signup logic with an instant Unique QRC generator.
- **Identifier Concatenation**: Combine the exact current `unix-timestamp` directly with the user's mandatory 10-digit mobile number.
- **Output Handling**: Output this concatenation as the definitive, scannable Client ID required to execute any Drop-ship orders.
## 2. Real-Time Distributed Aggregation (Scraping)
- **Crawler-Bot Architecture**: Deploy non-blocking backend scraper services capable of fetching target HTML/JSON from unlimited source URLs of external e-com platforms.
- **Unbounded Collections**: Initialize scalable schema structures designed for perpetual data appending:
  - `Products[item1, item2, ... itemN]`
  - `Services[serve1, serve2, ... serveN]`
- **Dataset Append Logic**: Ensure items scraped from e-com websites are cleaned, formatted, and pushed in real-time to the respective `Products[...]` and `Services[...]` collections.
## 3. Leaderboard-Driven Drop-ship Arbitrage
- **Leader Payout Execution**: Client funds (paying for ordered items) are routed directly to the top-ranking "Leader" or e-Com Company, derived from the Project Fixtures Leaderboard.
- **Arbitrage Parameters (`[p1, p2, p3... pN]`)**:
  - `p1 = retailPrice` (Gross amount paid by Client).
  - `p2 = wholesaleLeaderPrice` (Procurement price demanded by the Leaderboard e-com provider).
  - `p3 = arbitrageMargin` (The dynamic profit difference: `p1 - p2`).
- **Profit Execution Functions**:
  - `set_arbitrage(p1, p2)` -> Defines the transaction variables for the Merkle log.
  - `get_arbitrage(p1, p2)` -> Triggers the transaction: exacts the `arbitrageMargin (p3)` for the Aggregator's profit and dispatches `wholesaleLeaderPrice (p2)` to the specified Leader.
## 4. Enhanced UI/UX: Contact & Sitemap
- **Contact Page Management (`/contact`)**:
  - Implement comprehensive, version-controlled contact information display.
  - Integrate dynamic loading state management (preventing duplicate submissions) and fallback static display layers.
  - Seamlessly embed `e-contract-lwf.caffeine.xyz` via iframe with strict CORS whitelisting, extracting from `caffeine-projects[id:.. urls:..]`.
- **Sitemap Architecture (`/sitemap`)**:
  - Auto-generate `sitemap.xml` with dynamically ranked topic entries, JSON-LD structured data, and SEO-optimized canonical URLs.
  - Deploy a parallel `pages[]` array with admin-controlled priority indexing.
  - Build a visual "Priority Pages Section" rendering human-readable directory trees carrying appropriate Role-Based Access Badges.
## Action Plan for AI Generation
1. Parse this pointwise markdown to scaffold the `e-Com Aggr. Services` dropping engine.
2. Initialize Real-Time web scrapers hooked directly into boundless `Products[]` and `Services[]` datasets.
3. Configure the Order Tracing module explicitly using the Merkle Root & Nonce cryptography structure.
4. Integrate the QRC onboarding module (`unix-timestamp` + `Mobile_10_Digits`) alongside the Contact & Sitemap UI upgrades.
5. Wire the Drop-shipping payout module using `get_arbitrage` to isolate Profit (p3) prior to completing the transaction loop.