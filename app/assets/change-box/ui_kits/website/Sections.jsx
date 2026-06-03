/* global React */

// ---------- Hero: "Impact First" ----------
function Hero({ onNav }) {
  return (
    <section style={hero.wrap}>
      <div style={hero.inner}>
        <div style={hero.copy}>
          <span className="cb-eyebrow">Innovating for social impact</span>
          <h1 style={hero.h1}>Impact First.</h1>
          <p style={hero.lead}>
            We use technology to benefit underserved communities by helping them with
            everyday challenges. We listen to people's needs, apply crafted, relevant
            digital services that make a difference, then test and improve.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={hero.primary} onClick={() => onNav('e4e')}>
              See Essentials for Everyone →
            </button>
            <button style={hero.secondary} onClick={() => onNav('charter')}>Our charter</button>
          </div>
        </div>
        <div style={hero.media}>
          <img src="../../assets/impact.png" alt="A child enjoying fresh fruit" style={hero.img} />
          <div style={hero.badge}>
            <span style={{ font: '900 26px/1 var(--font-display)', color: 'var(--cb-green-700)' }}>20yr</span>
            <span style={{ font: '600 12px/1.3 var(--font-body)', color: 'var(--cb-ink-700)' }}>
              life-expectancy gap we're working to close
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const hero = {
  wrap: { background: 'linear-gradient(180deg, var(--cb-green-50), #fff 78%)' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '64px 28px 56px', display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' },
  copy: { display: 'flex', flexDirection: 'column', gap: 18 },
  h1: { font: '900 clamp(2.8rem,5vw,4.2rem)/1.02 var(--font-display)', letterSpacing: '-0.03em',
    color: 'var(--cb-ink)', margin: 0 },
  lead: { font: '400 1.18rem/1.6 var(--font-body)', color: 'var(--cb-ink-700)', margin: 0, maxWidth: 480 },
  primary: { font: '800 15px/1 var(--font-display)', color: '#06382A', background: 'var(--cb-green)',
    border: 'none', padding: '14px 22px', borderRadius: 999, cursor: 'pointer', boxShadow: 'var(--shadow-brand)' },
  secondary: { font: '800 15px/1 var(--font-display)', color: 'var(--cb-ink)', background: '#fff',
    border: '1.5px solid var(--cb-line-strong)', padding: '14px 22px', borderRadius: 999, cursor: 'pointer' },
  media: { position: 'relative' },
  img: { width: '100%', borderRadius: 28, display: 'block', boxShadow: 'var(--shadow-lg)', aspectRatio: '4/4.2', objectFit: 'cover' },
  badge: { position: 'absolute', left: -18, bottom: 26, background: '#fff', borderRadius: 18,
    padding: '14px 16px', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column',
    gap: 2, maxWidth: 150 },
};

// ---------- E4E feature split ----------
function E4ESection({ onNav }) {
  const pillars = [
    ['Dignity', 'Paying with a barcode on your phone removes the stigma of food aid and reduces reliance on food banks.'],
    ['Affordability', 'Partnerships across the local food value chain reduce the cost of household essentials and healthy food.'],
    ['Access', 'Data-driven insight increases the availability of nutritious food in local stores in deprived areas.'],
  ];
  return (
    <section id="e4e" style={e4e.wrap}>
      <div style={e4e.inner}>
        <div style={e4e.media}>
          <img src="../../assets/cb-webpicture.png" alt="The E4E app in use while shopping" style={e4e.img} />
        </div>
        <div style={e4e.copy}>
          <span className="cb-eyebrow">Essentials for Everyone</span>
          <h2 style={e4e.h2}>Affordable, healthy food for every family.</h2>
          <p style={e4e.p}>
            E4E is our groundbreaking platform for households facing food insecurity.
            We provide multi-retailer digital coupons and user-controlled messaging to
            capture needs, delivering affordable, healthy goods directly through local stores.
          </p>
          <div style={e4e.grid}>
            {pillars.map(([t, d]) => (
              <div key={t} style={e4e.pillar}>
                <h3 style={e4e.pt}>{t}</h3>
                <p style={e4e.pd}>{d}</p>
              </div>
            ))}
          </div>
          <button style={hero.primary} onClick={() => onNav('contact')}>Join the trials →</button>
        </div>
      </div>
    </section>
  );
}

const e4e = {
  wrap: { padding: '72px 0' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '0 28px', display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' },
  media: { display: 'flex', justifyContent: 'center' },
  img: { width: '100%', maxWidth: 380, borderRadius: 24, display: 'block', boxShadow: 'var(--shadow-lg)' },
  copy: { display: 'flex', flexDirection: 'column', gap: 16 },
  h2: { font: '900 2.4rem/1.08 var(--font-display)', letterSpacing: '-0.025em', color: 'var(--cb-ink)', margin: 0 },
  p: { font: '400 1.1rem/1.6 var(--font-body)', color: 'var(--cb-ink-700)', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, margin: '6px 0 4px' },
  pillar: { background: 'var(--cb-green-50)', border: '1px solid var(--cb-green-100)', borderRadius: 16, padding: '16px 14px' },
  pt: { font: '800 1.05rem/1 var(--font-display)', color: 'var(--cb-green-700)', margin: '0 0 7px' },
  pd: { font: '400 0.86rem/1.5 var(--font-body)', color: 'var(--cb-ink-700)', margin: 0 },
};

// ---------- Joined Up Thinking + partners ----------
const PARTNERS = ['gmca', 'livewell', 'brick', 'sheffield', 'odi', 'shopmate', 'nn', 'tbbt'];
function Partners() {
  return (
    <section id="charter" style={pt.wrap}>
      <div style={pt.inner}>
        <div style={pt.head}>
          <span className="cb-eyebrow">Joined up thinking</span>
          <h2 style={e4e.h2}>Everything we do is in partnership.</h2>
          <p style={{ ...e4e.p, maxWidth: 640 }}>
            We work hand in hand with organisations in local communities and those tackling
            issues at a systemic level — designing initiatives that foster community action
            and social justice.
          </p>
        </div>
        <div style={pt.logos}>
          {PARTNERS.map((p) => (
            <div key={p} style={pt.tile}>
              <img src={`../../assets/partner-${p}.png`} alt={p} style={pt.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pt = {
  wrap: { background: 'var(--cb-paper)', padding: '72px 0' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '0 28px' },
  head: { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center', marginBottom: 40 },
  logos: { display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 18 },
  tile: { aspectRatio: '1', background: '#fff', borderRadius: 18, border: '1px solid var(--cb-line)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 },
  logo: { width: '100%', height: '100%', objectFit: 'contain' },
};

// ---------- Team ----------
const TEAM = [
  ['nicky', "Nicky O'Malley", 'Co-founder'],
  ['steve', 'Steven Griffin', 'Co-founder'],
  ['adam', 'Adam Thilthorpe', 'Co-founder'],
  ['john', 'John Roberts', 'Co-founder'],
];
function Team() {
  return (
    <section style={tm.wrap}>
      <div style={tm.inner}>
        <div style={{ maxWidth: 520 }}>
          <span className="cb-eyebrow">About us</span>
          <h2 style={{ ...e4e.h2, marginTop: 10 }}>A health-tech start-up built for communities.</h2>
          <p style={{ ...e4e.p, marginTop: 14 }}>
            We provide AI-powered data insights to advance health outcomes for families and
            communities in need. Our expertise in digital, telecoms, media and cloud — combined
            with deep NGO, charity and policy experience — helps people harness digital for good.
          </p>
        </div>
        <div style={tm.grid}>
          {TEAM.map(([img, name, role]) => (
            <div key={img} style={tm.card}>
              <img src={`../../assets/team-${img}.png`} alt={name} style={tm.photo} />
              <div style={{ font: '800 15px/1.2 var(--font-display)', color: 'var(--cb-ink)' }}>{name}</div>
              <div style={{ font: '600 12.5px/1 var(--font-body)', color: 'var(--cb-ink-500)' }}>{role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tm = {
  wrap: { padding: '72px 0' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '0 28px', display: 'grid',
    gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  card: { display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' },
  photo: { width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 18, background: 'var(--cb-mist)',
    marginBottom: 4, boxShadow: 'var(--shadow-sm)' },
};

Object.assign(window, { Hero, E4ESection, Partners, Team });
