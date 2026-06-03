/* global React */
const { useState } = React;

// ---------- Brand mark (inline so it tints; mirrors the faceted box logo) ----------
function BoxGlyph({ size = 30, color = '#272F3A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4 7 13v22l17 9 17-9V13L24 4Z" fill={color} opacity="0"/>
      <path d="M24 5 9 13.2v6.3l15 8.2 15-8.2v-6.3L24 5Z" fill={color}/>
      <path d="M8 21v13.5L22.5 42V29L8 21Z" fill={color}/>
      <path d="M40 21v13.5L25.5 42V29L40 21Z" fill={color} opacity="0.78"/>
    </svg>
  );
}

function Wordmark({ on = 'light' }) {
  const ink = on === 'green' ? '#06382A' : '#272F3A';
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
      <BoxGlyph size={30} color={ink} />
      <span style={{ font: '900 22px/1 var(--font-display)', letterSpacing: '-0.02em', color: ink }}>
        Change-Box
      </span>
    </a>
  );
}

// ---------- Sticky header ----------
function Header({ active, onNav }) {
  const links = [
    ['Home', 'top'],
    ['Essentials for Everyone', 'e4e'],
    ['Charter', 'charter'],
    ['Contact', 'contact'],
  ];
  return (
    <header style={hdr.bar}>
      <div style={hdr.inner}>
        <Wordmark />
        <nav style={hdr.nav}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => onNav(id)}
              style={{ ...hdr.link, ...(active === id ? hdr.linkActive : {}) }}>
              {label}
            </button>
          ))}
          <button style={hdr.cta} onClick={() => onNav('contact')}>Get in touch</button>
        </nav>
      </div>
    </header>
  );
}

const hdr = {
  bar: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.86)',
    backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--cb-line)' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '14px 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  nav: { display: 'flex', alignItems: 'center', gap: 6 },
  link: { font: '700 14.5px/1 var(--font-body)', color: 'var(--cb-ink-700)', background: 'none',
    border: 'none', padding: '9px 13px', borderRadius: 999, cursor: 'pointer' },
  linkActive: { color: 'var(--cb-green-700)', background: 'var(--cb-green-50)' },
  cta: { font: '800 14.5px/1 var(--font-display)', color: '#06382A', background: 'var(--cb-green)',
    border: 'none', padding: '11px 20px', borderRadius: 999, cursor: 'pointer', marginLeft: 8,
    boxShadow: 'var(--shadow-brand)' },
};

// ---------- Footer ----------
function Footer({ onNav }) {
  return (
    <footer style={ft.wrap}>
      <div style={ft.inner}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
          <Wordmark on="green" />
          <p style={{ font: '600 14px/1.6 var(--font-body)', color: '#0a4b38', margin: 0 }}>
            Innovating for social impact. Essentials for Everyone.
          </p>
        </div>
        <div style={ft.cols}>
          <div style={ft.col}>
            <span style={ft.h}>Explore</span>
            <button style={ft.l} onClick={() => onNav('e4e')}>Essentials for Everyone</button>
            <button style={ft.l} onClick={() => onNav('charter')}>Our Charter</button>
            <button style={ft.l} onClick={() => onNav('contact')}>Contact</button>
          </div>
          <div style={ft.col}>
            <span style={ft.h}>Get in touch</span>
            <a style={ft.l} href="mailto:hello@change-box.net">hello@change-box.net</a>
            <span style={{ ...ft.l, cursor: 'default' }}>Greater Manchester, UK</span>
          </div>
        </div>
      </div>
      <div style={ft.base}>© 2025 Change Box</div>
    </footer>
  );
}

const ft = {
  wrap: { background: 'var(--cb-green)', marginTop: 0 },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '52px 28px 28px',
    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 },
  cols: { display: 'flex', gap: 64, flexWrap: 'wrap' },
  col: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' },
  h: { font: '800 13px/1 var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em',
    color: '#06382A', marginBottom: 2 },
  l: { font: '600 14.5px/1 var(--font-body)', color: '#0a4b38', background: 'none', border: 'none',
    padding: 0, textAlign: 'left', cursor: 'pointer', textDecoration: 'none' },
  base: { borderTop: '1px solid rgba(6,56,42,0.15)', padding: '18px 28px', textAlign: 'center',
    font: '700 13px/1 var(--font-body)', color: '#06382A' },
};

Object.assign(window, { BoxGlyph, Wordmark, Header, Footer });
