/* global React */
const { useState: useStateC } = React;

function ContactForm() {
  const [sent, setSent] = useStateC(false);
  const [f, setF] = useStateC({ first: '', last: '', email: '', msg: '' });
  const upd = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <section id="contact" style={cf.wrap}>
      <div style={cf.inner}>
        <div style={cf.left}>
          <span className="cb-eyebrow" style={{ color: '#7fe9c8' }}>Get in touch</span>
          <h2 style={cf.h2}>We're only just getting started.</h2>
          <p style={cf.p}>
            Trials are live across the Greater Manchester area. Get in touch to find out
            more or, better still… join in.
          </p>
          <a href="mailto:hello@change-box.net" style={cf.mail}>hello@change-box.net</a>
        </div>
        <div style={cf.card}>
          {sent ? (
            <div style={cf.thanks}>
              <div style={cf.tick}>✓</div>
              <h3 style={{ font: '800 1.4rem/1.2 var(--font-display)', color: 'var(--cb-ink)', margin: 0 }}>
                Thanks for submitting!
              </h3>
              <p style={{ font: '400 15px/1.5 var(--font-body)', color: 'var(--cb-ink-700)', margin: 0 }}>
                We'll be in touch shortly.
              </p>
              <button style={cf.again} onClick={() => { setSent(false); setF({ first:'', last:'', email:'', msg:'' }); }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={cf.form}>
              <div style={cf.row}>
                <Field label="First name" value={f.first} onChange={upd('first')} />
                <Field label="Last name" value={f.last} onChange={upd('last')} />
              </div>
              <Field label="Email" type="email" value={f.email} onChange={upd('email')} />
              <Field label="Message" textarea value={f.msg} onChange={upd('msg')} />
              <button type="submit" style={cf.send}>Send →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', textarea }) {
  const [focus, setFocus] = useStateC(false);
  const base = { ...cf.field, ...(focus ? cf.fieldFocus : {}) };
  return (
    <label style={cf.field_wrap}>
      <span style={cf.label}>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={onChange} rows={4} required
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...base, resize: 'vertical', fontFamily: 'var(--font-body)' }} />
      ) : (
        <input type={type} value={value} onChange={onChange} required
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={base} />
      )}
    </label>
  );
}

const cf = {
  wrap: { background: 'var(--cb-ink)', padding: '76px 0' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '0 28px', display: 'grid',
    gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' },
  left: { display: 'flex', flexDirection: 'column', gap: 16 },
  h2: { font: '900 2.4rem/1.08 var(--font-display)', letterSpacing: '-0.025em', color: '#fff', margin: 0 },
  p: { font: '400 1.1rem/1.6 var(--font-body)', color: '#c7cdd6', margin: 0, maxWidth: 420 },
  mail: { font: '800 1.25rem/1 var(--font-display)', color: 'var(--cb-green)', textDecoration: 'none', marginTop: 4 },
  card: { background: '#fff', borderRadius: 24, padding: 28, boxShadow: 'var(--shadow-lg)' },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field_wrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { font: '700 12.5px/1 var(--font-body)', color: 'var(--cb-ink-700)' },
  field: { border: '1.5px solid var(--cb-line)', borderRadius: 14, padding: '12px 14px',
    font: '400 15px/1.4 var(--font-body)', color: 'var(--cb-ink)', outline: 'none', background: '#fff' },
  fieldFocus: { borderColor: 'var(--cb-green)', boxShadow: 'var(--focus-ring)' },
  send: { font: '800 15px/1 var(--font-display)', color: '#06382A', background: 'var(--cb-green)',
    border: 'none', padding: '14px 22px', borderRadius: 999, cursor: 'pointer', marginTop: 4, boxShadow: 'var(--shadow-brand)' },
  thanks: { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', padding: '12px 4px' },
  tick: { width: 52, height: 52, borderRadius: 999, background: 'var(--cb-green-100)', color: 'var(--cb-green-700)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 26px/1 var(--font-display)' },
  again: { font: '700 14px/1 var(--font-body)', color: 'var(--cb-green-700)', background: 'var(--cb-green-50)',
    border: 'none', padding: '11px 18px', borderRadius: 999, cursor: 'pointer', marginTop: 4 },
};

Object.assign(window, { ContactForm });
