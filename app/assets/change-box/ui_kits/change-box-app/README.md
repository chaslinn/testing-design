# Change Box App — unified UI kit

A high-fidelity recreation of the **whole Change Box member app** in one shell:
the immersive messaging **Inbox** *and* the **Essentials for Everyone (E4E)**
coupon service, under one shared navigation. Rendered in an Android (Material 3)
device frame. This kit supersedes the earlier separate `e4e-app/` and
`engagement-inbox/` kits.

## Run
Open `index.html`. Loads React + Babel + Lucide from CDN, Nunito from Google
Fonts, brand tokens from `../../colors_and_type.css`, and imagery from `../../assets/`.

## Navigation (from the real *New inbox.jpg*)
Bottom bar: **HOME · INTERESTS · PROFILE · MENU**. MENU is the outlined button
(bottom-right) that opens the drawer of "location" items — Inbox, Essentials for
Everyone, My Coupons, **My local shop**, My Savings, My Responses, Interests,
Food Credits, Account, Help.

## Files
- **android-frame.jsx** — device bezel (starter component).
- **Shell.jsx** — shared chrome: `Icon` (Lucide helper), `BoxGlyph`, `Avatar`,
  `Inbox` (message list), `BottomNav`, `MenuDrawer`, `TabView` + tokens.
- **Messages.jsx** — `MESSAGES` content + `Immersive` story-viewer (surveys,
  recipe, sponsored quiz, Food Credit rewards; deep-links into Coupons).
- **Coupons.jsx** — `RETAILERS`, `PRODUCTS`, `CouponCard`, `Retailer`, `Disc`,
  `ProdTile`, `CouponHeader` (back-to-inbox + My Coupons basket).
- **CouponScreens.jsx** — `ExploreScreen`, `DetailScreen`, `SavedScreen`,
  `RedeemScreen` (single-barcode redeem), `Pill`, `Barcode`.

## Demo flows
- **HOME = Inbox** → open a message → tap-through story → surveys earn Food
  Credits (balance + toast). The E4E welcome message **deep-links to Coupons**.
- **MENU → Essentials for Everyone** → browse coupons → open one → **Save** →
  basket / **My Coupons** → **Redeem** → single barcode ("paid with dignity").

## Fidelity notes
App chrome (header, list, bottom nav, MENU drawer) follows the real *New
inbox.jpg* screenshot. Coupon and message **content** follows the live site +
*CB User Engagement Channel UJ Mar25.pdf*. Substitutions (documented in the root
README): **Nunito** fonts, **Lucide** icons, and icon/tile placeholders for
product & campaign imagery. The barcode is a generated placeholder, not scannable.
