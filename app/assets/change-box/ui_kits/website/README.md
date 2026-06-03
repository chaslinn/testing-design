# Website UI kit — change-box.net

A high-fidelity recreation of the Change Box marketing site as a single-page,
click-through React prototype.

## Run
Open `index.html`. Loads React + Babel from CDN, Nunito from Google Fonts, and
the brand tokens from `../../colors_and_type.css`. Brand imagery is pulled from
`../../assets/`.

## Components (`window`-exported)
- **Nav.jsx** — `BoxGlyph` (faceted-box brand symbol, tintable), `Wordmark`,
  `Header` (sticky, blurred, in-page nav), `Footer` (green).
- **Sections.jsx** — `Hero` ("Impact First" + stat badge), `E4ESection`
  (Dignity / Affordability / Access pillars), `Partners` (8 partner logos),
  `Team` (4 founders).
- **Contact.jsx** — `ContactForm` (First/Last/Email/Message → "Thanks for
  submitting!" success state) + reusable `Field`.

## Interactions
Sticky nav scroll-spy + smooth-scroll; CTA buttons jump to sections; contact
form validates and shows the success state.

## Fidelity notes
Built from the live Wix site's copy + rendered layout (no source/Figma was
available). Copy is verbatim where possible. The `BoxGlyph` is a close inline
approximation of the logo's faceted box so it can take `currentColor`; the
raster logo lives at `../../assets/CB-logo.png`.
