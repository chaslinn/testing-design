/* global React, Icon */
// Coupon module for the unified Change Box app.
// Relies on the shared `Icon` (from Shell.jsx, loaded first).

// ---- Data ----
const RETAILERS = {
  nn:       { name: 'N&N',      img: '../../assets/partner-nn.png' },
  shopmate: { name: 'Shopmate', img: '../../assets/partner-shopmate.png' },
  livewell: { name: 'Livewell', img: '../../assets/partner-livewell.png' },
  brick:    { name: 'The Brick', img: '../../assets/partner-brick.png' },
};

const PRODUCTS = [
  { id: 'milk',   name: 'Lakeland Dairies Semi-Skimmed Milk', retailer: 'nn',       discount: 100, expiry: '31/10/2025', icon: 'milk',      tint: '#EAF3FB', was: '1.45', now: '0.00' },
  { id: 'eggs',   name: 'Best-in 6 British Free Range Eggs',  retailer: 'shopmate', discount: 100, expiry: '31/10/2025', icon: 'egg',       tint: '#FBF3E0', was: '1.89', now: '0.00' },
  { id: 'rice',   name: 'Tilda Long Grain Rice 500g',         retailer: 'nn',       discount: 100, expiry: '31/10/2025', icon: 'wheat',     tint: '#F3F0E8', was: '2.20', now: '0.00' },
  { id: 'carrot', name: 'Best-in Carrots 1kg',                retailer: 'livewell', discount: 65,  expiry: '31/10/2025', icon: 'carrot',    tint: '#FCEEDD', was: '0.70', now: '0.25' },
  { id: 'bread',  name: 'Baker Street Wholemeal Bread',       retailer: 'shopmate', discount: 65,  expiry: '31/10/2025', icon: 'croissant', tint: '#F6EFE3', was: '1.10', now: '0.39' },
  { id: 'apple',  name: 'Gala Apples 6-pack',                 retailer: 'livewell', discount: 50,  expiry: '31/10/2025', icon: 'apple',     tint: '#EAF6E8', was: '1.50', now: '0.75' },
];

const G = '#1DCD96', INK = '#272F3A', INK2 = '#5A6577', LINE = '#E4E8E7';

function Retailer({ id, size = 30 }) {
  const r = RETAILERS[id];
  return <img src={r.img} alt={r.name} title={r.name}
    style={{ width: size, height: size, borderRadius: 999, objectFit: 'cover',
      border: '1px solid ' + LINE, background: '#fff', flexShrink: 0 }} />;
}

function Disc({ pct, big }) {
  const orange = pct < 100;
  return <span style={{ background: orange ? '#F47B20' : G, color: orange ? '#fff' : '#06382A',
    font: `900 ${big ? 16 : 12}px/1 var(--font-display)`, padding: big ? '5px 11px' : '3px 7px',
    borderRadius: 8 }}>-{pct}%</span>;
}

function ProdTile({ p, h = 96 }) {
  return (
    <div style={{ height: h, background: p.tint, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: INK, position: 'relative' }}>
      <Icon name={p.icon} size={h > 110 ? 56 : 38} color={INK} strokeWidth={1.6} />
    </div>
  );
}

function CouponCard({ p, onOpen }) {
  return (
    <button onClick={() => onOpen(p)} style={{ textAlign: 'left', padding: 0, border: '1px solid ' + LINE,
      borderRadius: 14, overflow: 'hidden', background: '#fff', cursor: 'pointer', boxShadow: '0 1px 2px rgba(39,47,58,.05)' }}>
      <div style={{ position: 'relative' }}>
        <ProdTile p={p} />
        <div style={{ position: 'absolute', top: 7, left: 7 }}><Disc pct={p.discount} /></div>
        <div style={{ position: 'absolute', top: 7, right: 7 }}><Retailer id={p.retailer} size={26} /></div>
      </div>
      <div style={{ padding: '9px 10px 11px' }}>
        <div style={{ font: '800 12.5px/1.25 var(--font-display)', color: INK, height: 31, overflow: 'hidden' }}>{p.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, color: INK2, font: '600 11px/1 var(--font-body)' }}>
          <Icon name="calendar" size={12} color={INK2} /> {p.expiry}
        </div>
      </div>
    </button>
  );
}

// Slim service header for the coupon module: back to inbox + title + My Coupons basket
function CouponHeader({ onBack, savedCount, onSaved }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid ' + LINE, padding: '12px 14px', flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
        <Icon name="arrow-left" size={23} color={INK} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '900 16px/1 var(--font-display)', color: G, whiteSpace: 'nowrap' }}>Essentials for Everyone</div>
        <div style={{ font: '600 11px/1 var(--font-body)', color: INK2, marginTop: 3 }}>This week’s coupons</div>
      </div>
      <button onClick={onSaved} aria-label="My Coupons" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
        <Icon name="shopping-bag" size={23} color={INK} />
        {savedCount > 0 && <span style={{ position: 'absolute', top: -6, right: -7, background: '#F47B20',
          color: '#fff', font: '800 10px/1 var(--font-body)', minWidth: 16, height: 16, borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{savedCount}</span>}
      </button>
    </div>
  );
}

Object.assign(window, { Retailer, Disc, ProdTile, CouponCard, CouponHeader, RETAILERS, PRODUCTS, G, INK, INK2, LINE });
