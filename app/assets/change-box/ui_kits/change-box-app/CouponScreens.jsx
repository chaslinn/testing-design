/* global React, Icon, Retailer, Disc, ProdTile, CouponCard, AppHeader, BottomNav, RETAILERS, PRODUCTS, G, INK, INK2, LINE */
const { useState: useScr } = React;

const SCROLL = { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' };
const SECTION_H = { font: '800 16px/1 var(--font-display)', color: INK, margin: '0 0 12px' };

// ---------- EXPLORE ----------
function ExploreScreen({ onOpen }) {
  const rids = Object.keys(RETAILERS);
  return (
    <div style={SCROLL}>
      <div style={{ padding: '16px 14px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={SECTION_H}>Find coupons by retailer</h2>
          <span style={{ font: '700 12px/1 var(--font-body)', color: '#0E9A71' }}>See more</span>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {rids.map((id) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60 }}>
              <Retailer id={id} size={52} />
              <span style={{ font: '600 11px/1.1 var(--font-body)', color: INK2, textAlign: 'center' }}>{RETAILERS[id].name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
      <div style={{ background: 'linear-gradient(180deg,#EEFBF6,#fff)', margin: '0 14px', borderRadius: 16,
        padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #D6F7EC' }}>
        <span style={{ width: 40, height: 40, borderRadius: 999, background: '#fff', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(29,205,150,.25)' }}>
          <Icon name="hand-heart" size={22} color="#0E9A71" />
        </span>
        <div>
          <div style={{ font: '800 13.5px/1.2 var(--font-display)', color: INK }}>£12.40 saved this month</div>
          <div style={{ font: '600 11.5px/1.3 var(--font-body)', color: INK2 }}>Pay with a barcode — no stigma, just essentials.</div>
        </div>
      </div>

      <div style={{ padding: '18px 14px 18px' }}>
        <h2 style={SECTION_H}>Our promotions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PRODUCTS.map((p) => <CouponCard key={p.id} p={p} onOpen={onOpen} />)}
        </div>
      </div>
    </div>
  );
}

// ---------- DETAIL ----------
function DetailScreen({ p, onBack, onSave, isSaved }) {
  return (
    <div style={{ ...SCROLL, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <Icon name="arrow-left" size={24} color={INK} />
        </button>
        <span style={{ font: '800 15px/1 var(--font-display)', color: INK }}>Coupon details</span>
      </div>
      <div style={{ position: 'relative', margin: '0 14px', borderRadius: 18, overflow: 'hidden', border: '1px solid ' + LINE }}>
        <ProdTile p={p} h={150} />
        <div style={{ position: 'absolute', top: 10, left: 10 }}><Disc pct={p.discount} big /></div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}><Retailer id={p.retailer} size={36} /></div>
      </div>
      <div style={{ padding: '16px 18px 4px' }}>
        <h1 style={{ font: '800 21px/1.2 var(--font-display)', color: INK, margin: '0 0 10px' }}>{p.name}</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <Pill icon="leaf" tone="green">Healthy choice</Pill>
          <Pill icon="store" tone="info">Available in local stores</Pill>
          <Pill icon="calendar" tone="grey">Expires {p.expiry}</Pill>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 18 }}>
          <span style={{ font: '900 30px/1 var(--font-display)', color: '#0E9A71' }}>£{p.now}</span>
          <span style={{ font: '600 16px/1 var(--font-body)', color: '#8B95A5', textDecoration: 'line-through', marginBottom: 3 }}>£{p.was}</span>
          <span style={{ marginLeft: 'auto', font: '800 13px/1 var(--font-display)', color: INK }}>You save £{(p.was - p.now).toFixed(2)}</span>
        </div>
        <p style={{ font: '400 13.5px/1.6 var(--font-body)', color: INK2, margin: '0 0 18px' }}>
          Add this coupon to your wallet, then pay with a single barcode at the till of any
          participating {RETAILERS[p.retailer].name} store near you.
        </p>
      </div>
      <div style={{ padding: '0 16px 18px' }}>
        <button onClick={() => onSave(p)} disabled={isSaved} style={{ width: '100%', font: '800 15px/1 var(--font-display)',
          color: isSaved ? '#0E9A71' : '#06382A', background: isSaved ? '#D6F7EC' : G, border: 'none',
          padding: '15px', borderRadius: 999, cursor: isSaved ? 'default' : 'pointer',
          boxShadow: isSaved ? 'none' : '0 8px 18px rgba(29,205,150,.35)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8 }}>
          <Icon name={isSaved ? 'check' : 'plus'} size={19} color={isSaved ? '#0E9A71' : '#06382A'} />
          {isSaved ? 'Saved to My Coupons' : 'Save coupon'}
        </button>
      </div>
    </div>
  );
}

function Pill({ icon, tone, children }) {
  const tones = { green: ['#D6F7EC', '#0E9A71'], info: ['#DCEAF8', '#1c4f86'], grey: ['#F2F4F3', '#5A6577'] };
  const [bg, fg] = tones[tone];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: bg, color: fg,
    font: '700 11.5px/1 var(--font-body)', padding: '6px 10px', borderRadius: 999 }}>
    <Icon name={icon} size={13} color={fg} /> {children}</span>;
}

// ---------- MY COUPONS ----------
function SavedScreen({ saved, onRedeem, onBrowse }) {
  if (saved.length === 0) {
    return (
      <div style={{ ...SCROLL, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: 30, gap: 12 }}>
        <span style={{ width: 64, height: 64, borderRadius: 999, background: '#F2F4F3', display: 'flex',
          alignItems: 'center', justifyContent: 'center' }}><Icon name="ticket" size={28} color="#8B95A5" /></span>
        <h2 style={{ font: '800 18px/1.2 var(--font-display)', color: INK, margin: 0 }}>No coupons yet</h2>
        <p style={{ font: '400 14px/1.5 var(--font-body)', color: INK2, margin: 0 }}>Browse promotions and save coupons to redeem in store.</p>
        <button onClick={onBrowse} style={{ font: '800 14px/1 var(--font-display)', color: '#06382A', background: G,
          border: 'none', padding: '12px 22px', borderRadius: 999, cursor: 'pointer', marginTop: 4 }}>Browse promotions</button>
      </div>
    );
  }
  return (
    <div style={SCROLL}>
      <div style={{ padding: '16px 14px' }}>
        <h2 style={SECTION_H}>My coupons · {saved.length}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {saved.map((p) => (
            <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff',
              border: '1px solid ' + LINE, borderRadius: 14, padding: 10 }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                <ProdTile p={p} h={56} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '800 13px/1.25 var(--font-display)', color: INK, overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Disc pct={p.discount} /><span style={{ font: '600 11px/1 var(--font-body)', color: INK2 }}>{RETAILERS[p.retailer].name}</span>
                </div>
              </div>
              <button onClick={() => onRedeem(p)} style={{ font: '800 12.5px/1 var(--font-display)', color: '#06382A',
                background: G, border: 'none', padding: '10px 15px', borderRadius: 999, cursor: 'pointer', flexShrink: 0 }}>Redeem</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- REDEEM (barcode) ----------
function RedeemScreen({ p, saved, onPick }) {
  const item = p || saved[0];
  if (!item) {
    return (
      <div style={{ ...SCROLL, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: 30, gap: 12 }}>
        <span style={{ width: 64, height: 64, borderRadius: 999, background: '#F2F4F3', display: 'flex',
          alignItems: 'center', justifyContent: 'center' }}><Icon name="scan-barcode" size={28} color="#8B95A5" /></span>
        <h2 style={{ font: '800 18px/1.2 var(--font-display)', color: INK, margin: 0 }}>Nothing to redeem</h2>
        <p style={{ font: '400 14px/1.5 var(--font-body)', color: INK2, margin: 0 }}>Save a coupon first, then show its barcode at the till.</p>
      </div>
    );
  }
  return (
    <div style={{ ...SCROLL, background: '#EEFBF6' }}>
      <div style={{ padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ font: '700 12px/1 var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase',
          color: '#0E9A71', marginBottom: 14 }}>Show this at the till</span>
        <div style={{ background: '#fff', borderRadius: 20, padding: '22px 22px 18px', width: '100%',
          maxWidth: 320, boxShadow: '0 12px 28px rgba(39,47,58,.12)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Retailer id={item.retailer} size={40} /></div>
          <div style={{ font: '800 15px/1.25 var(--font-display)', color: INK, marginBottom: 4 }}>{item.name}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', marginBottom: 18 }}>
            <Disc pct={item.discount} /><span style={{ font: '800 14px/1 var(--font-display)', color: '#0E9A71' }}>Pay £{item.now}</span>
          </div>
          <Barcode seed={item.id} />
          <div style={{ font: '600 13px/1 var(--font-mono, monospace)', letterSpacing: '.18em', color: INK, marginTop: 10 }}>
            CB · {item.id.toUpperCase()} · 4471 0258
          </div>
        </div>
        {saved.length > 1 && (
          <div style={{ marginTop: 18, width: '100%', maxWidth: 320 }}>
            <div style={{ font: '700 12px/1 var(--font-body)', color: INK2, marginBottom: 8 }}>Other coupons</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {saved.filter((s) => s.id !== item.id).map((s) => (
                <button key={s.id} onClick={() => onPick(s)} style={{ background: '#fff', border: '1px solid ' + LINE,
                  borderRadius: 999, padding: '7px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  font: '700 11.5px/1 var(--font-body)', color: INK }}>
                  <Retailer id={s.retailer} size={18} /> {RETAILERS[s.retailer].name}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 20, color: INK2 }}>
          <Icon name="shield-check" size={15} color="#0E9A71" />
          <span style={{ font: '600 12px/1.4 var(--font-body)' }}>Paid with dignity — looks like any everyday purchase.</span>
        </div>
      </div>
    </div>
  );
}

function Barcode({ seed }) {
  // deterministic bar widths from seed string
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const bars = [];
  for (let i = 0; i < 48; i++) { h = (h * 1103515245 + 12345) >>> 0; bars.push(1 + (h % 4)); }
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 2, height: 78,
      background: '#fff', padding: '0 4px' }}>
      {bars.map((w, i) => <div key={i} style={{ width: w * 2, background: i % 2 ? '#fff' : INK }} />)}
    </div>
  );
}

Object.assign(window, { ExploreScreen, DetailScreen, SavedScreen, RedeemScreen });
