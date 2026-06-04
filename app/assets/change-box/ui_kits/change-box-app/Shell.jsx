/* global React, lucide */
const { useState: useIb, useEffect: useIbEffect, useRef: useIbRef } = React;

const GRN = '#1DCD96', GRN7 = '#0E9A71', INKc = '#272F3A', INK2c = '#5A6577', LINEc = '#E8ECEA';
const PAGEBG = '#F4F6F5';

// ---- Lucide icon helper ----
function Icon({ name, size = 22, color = 'currentColor', strokeWidth = 2, fill = 'none', style }) {
  const ref = useIbRef(null);
  useIbEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, fill, 'stroke-width': strokeWidth }, nameAttr: 'data-lucide' });
    }
  }, [name, size, color, strokeWidth, fill]);
  return <span ref={ref} style={{ display: 'inline-flex', lineHeight: 0, ...style }} />;
}

function BoxGlyph({ size = 20, color = '#fff' }) {
  return (
    <img src="../../assets/cb-box-glyph.png" alt="" aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }} />
  );
}

// sender avatar (used in immersive top bar)
function Avatar({ sender, size = 44 }) {
  const base = { width: size, height: size, borderRadius: 999, display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0, overflow: 'hidden' };
  if (sender.img) return <img src={sender.img} alt={sender.name} style={{ ...base, objectFit: 'cover', border: '1px solid ' + LINEc, background: '#fff' }} />;
  if (sender.glyph === 'box') return <span style={{ ...base, background: GRN }}><BoxGlyph size={size * 0.5} color="#06382A" /></span>;
  return <span style={{ ...base, background: sender.bg }}><Icon name={sender.icon} size={size * 0.46} color="#fff" /></span>;
}

// row thumbnail (rounded square)
function Thumb({ thumb }) {
  const base = { width: 52, height: 52, borderRadius: 13, flexShrink: 0, overflow: 'hidden' };
  if (thumb.type === 'photo') return <img src={thumb.src} alt="" style={{ ...base, objectFit: 'cover', objectPosition: thumb.pos || 'center' }} />;
  if (thumb.type === 'glyph') return <span style={{ ...base, background: GRN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BoxGlyph size={26} color="#06382A" /></span>;
  return <span style={{ ...base, background: thumb.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={thumb.icon} size={24} color={thumb.fg} strokeWidth={1.8} /></span>;
}

// ---- Inbox (matches the real app) ----
function Inbox({ messages, readIds, savedIds, onOpen, onToggleSave, unread }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: PAGEBG }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 18px 10px' }}>
        <span style={{ width: 36, height: 36, borderRadius: 11, background: GRN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={22} color="#fff" strokeWidth={3} />
        </span>
        <h1 style={{ font: '800 24px/1 var(--font-display)', color: INKc, margin: 0, flex: 1 }}>Inbox</h1>
        <span style={{ minWidth: 26, height: 26, borderRadius: 999, background: GRN, color: '#06382A',
          font: '800 13px/1 var(--font-display)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 7px' }}>{unread}</span>
      </div>

      {/* list card */}
      <div style={{ margin: '6px 14px 18px', background: '#fff', borderRadius: 20, boxShadow: '0 6px 20px rgba(39,47,58,.07)', overflow: 'hidden' }}>
        {messages.map((m, idx) => {
          const saved = savedIds.includes(m.id);
          const read = readIds.includes(m.id);
          return (
            <div key={m.id} onClick={() => onOpen(m)} style={{ display: 'flex', gap: 13, alignItems: 'center',
              padding: '13px 15px', cursor: 'pointer',
              borderTop: idx === 0 ? 'none' : '1px solid ' + LINEc, background: read ? '#fff' : '#FCFEFD' }}>
              <Thumb thumb={m.thumb} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '800 15px/1.25 var(--font-display)', color: INKc, marginBottom: 4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                  <span style={{ font: '700 13px/1 var(--font-display)', color: GRN7, whiteSpace: 'nowrap' }}>{m.sender.name}</span>
                  <span style={{ width: 3, height: 3, borderRadius: 999, background: '#C2C9C6', flexShrink: 0 }} />
                  <span style={{ font: '600 12.5px/1 var(--font-body)', color: '#9AA2AE', whiteSpace: 'nowrap' }}>{m.time}</span>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onToggleSave(m.id); }} aria-label="Save"
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4, flexShrink: 0 }}>
                {saved
                  ? <Icon name="heart" size={20} color={INKc} fill={INKc} />
                  : <Icon name="chevron-right" size={22} color="#C2C9C6" />}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', padding: '0 16px 24px', font: '600 12px/1.5 var(--font-body)', color: '#A6AEBC' }}>
        That's everything for now · new messages arrive on your schedule
      </div>
    </div>
  );
}

// ---- Bottom navigation (HOME · INTERESTS · PROFILE · MENU) ----
function BottomNav({ active, onNav }) {
  const item = (id, icon, label) => {
    const on = active === id;
    return (
      <button key={id} onClick={() => onNav(id)} style={{ background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1, padding: '2px 0' }}>
        <Icon name={icon} size={23} color={on ? GRN7 : '#8B95A5'} strokeWidth={on ? 2.4 : 2} />
        <span style={{ font: `${on ? 800 : 700} 10px/1 var(--font-body)`, letterSpacing: '.03em',
          color: on ? GRN7 : '#8B95A5' }}>{label}</span>
      </button>
    );
  };
  const menuOn = active === 'menu';
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px 10px', borderTop: '1px solid ' + LINEc, background: '#fff', flexShrink: 0 }}>
      {item('home', 'house', 'HOME')}
      {item('interests', 'smile', 'INTERESTS')}
      {item('profile', 'user', 'PROFILE')}
      {/* MENU — outlined button */}
      <button onClick={() => onNav('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1, padding: '2px 0' }}>
        <span style={{ width: 52, height: 30, borderRadius: 9, border: `1.5px solid ${menuOn ? GRN7 : '#CFD6D4'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', background: menuOn ? '#EEFBF6' : '#fff' }}>
          <Icon name="menu" size={20} color={menuOn ? GRN7 : '#5A6577'} />
        </span>
        <span style={{ font: '700 10px/1 var(--font-body)', letterSpacing: '.03em', color: menuOn ? GRN7 : '#8B95A5' }}>MENU</span>
      </button>
    </div>
  );
}

// ---- MENU drawer (the key "location" items) ----
const MENU_ITEMS = [
  ['inbox', 'Inbox', 'Your messages & rewards', 'home'],
  ['shopping-basket', 'Essentials for Everyone', "Browse this week's coupons", 'coupons'],
  ['ticket', 'My Coupons', 'Saved coupons & shopping list', 'saved'],
  ['map-pin', 'My local shop', 'Choose your store · view on map', null],
  ['piggy-bank', 'My Savings', "See how much you've saved", null],
  ['clipboard-list', 'My Responses', 'Edit or delete your survey answers', null],
  ['sliders-horizontal', 'Interests & preferences', 'Tailor what you receive', 'interests'],
  ['sparkles', 'Food Credits', 'Balance & rewards', null],
  ['settings', 'Account & settings', 'Profile, consent & notifications', 'profile'],
  ['life-buoy', 'Help & support', 'support@change-box.net', null],
];

function MenuDrawer({ credits, onClose, onNav }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
      <div onClick={onClose} style={{ flex: 1, background: 'rgba(39,47,58,.38)' }} />
      <div style={{ background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingBottom: 8,
        boxShadow: '0 -10px 30px rgba(39,47,58,.18)', maxHeight: '88%', display: 'flex', flexDirection: 'column' }}>
        {/* grabber */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: '#DDE3E1' }} />
        </div>
        {/* profile + credits */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 18px 14px', borderBottom: '1px solid ' + LINEc }}>
          <span style={{ width: 44, height: 44, borderRadius: 999, background: '#EEFBF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="user" size={22} color={GRN7} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '800 15px/1.1 var(--font-display)', color: INKc }}>Welcome back</div>
            <div style={{ font: '600 12px/1 var(--font-body)', color: INK2c, marginTop: 3 }}>Greater Manchester · E4E member</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EEFBF6', border: '1px solid #D6F7EC', borderRadius: 999, padding: '6px 11px 6px 7px' }}>
            <Icon name="sparkles" size={14} color={GRN7} />
            <span style={{ font: '800 13px/1 var(--font-display)', color: GRN7 }}>{credits}</span>
          </div>
        </div>
        {/* items */}
        <div style={{ overflowY: 'auto', padding: '6px 0 4px' }}>
          {MENU_ITEMS.map(([icon, label, sub, dest]) => (
            <button key={label} onClick={() => { dest ? onNav(dest) : onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: PAGEBG, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={19} color={INKc} strokeWidth={1.9} />
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', font: '800 14px/1.2 var(--font-display)', color: INKc }}>{label}</span>
                <span style={{ display: 'block', font: '600 11.5px/1.3 var(--font-body)', color: '#9AA2AE', marginTop: 2 }}>{sub}</span>
              </span>
              <Icon name="chevron-right" size={18} color="#C2C9C6" />
            </button>
          ))}
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '12px 18px',
            background: 'none', border: 'none', borderTop: '1px solid ' + LINEc, cursor: 'pointer', textAlign: 'left', marginTop: 4 }}>
            <span style={{ width: 38, height: 38, borderRadius: 11, background: '#FBE2DC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="log-out" size={19} color="#C0392B" strokeWidth={1.9} />
            </span>
            <span style={{ font: '800 14px/1.2 var(--font-display)', color: '#C0392B' }}>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// simple non-inbox tab placeholder
function TabView({ icon, title, body }) {
  return (
    <div style={{ flex: 1, background: PAGEBG, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: 32, gap: 14 }}>
      <span style={{ width: 70, height: 70, borderRadius: 999, background: '#fff', boxShadow: '0 6px 18px rgba(39,47,58,.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={30} color={GRN7} /></span>
      <h2 style={{ font: '800 19px/1.2 var(--font-display)', color: INKc, margin: 0 }}>{title}</h2>
      <p style={{ font: '400 14px/1.5 var(--font-body)', color: INK2c, margin: 0, maxWidth: 250 }}>{body}</p>
    </div>
  );
}

Object.assign(window, { Icon, BoxGlyph, Avatar, Inbox, BottomNav, MenuDrawer, TabView, GRN, GRN7, INKc, INK2c, LINEc, PAGEBG });
