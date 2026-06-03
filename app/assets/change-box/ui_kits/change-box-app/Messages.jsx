/* global React, Icon, Avatar, BoxGlyph, GRN, GRN7, INKc, INK2c, LINEc */
const { useState: useMsg } = React;

// ---- Senders ----
const S = {
  cb:       { name: 'Change Box', glyph: 'box' },
  livewell: { name: 'GM Livewell', img: '../../assets/partner-livewell.png' },
  jamie:    { name: 'Recipe of the Week', icon: 'chef-hat', bg: '#F47B20' },
  wipes:    { name: 'WaterWipes', icon: 'droplets', bg: '#2E78C7' },
};

// accent per message (eyebrow + buttons + media band)
const ACCENTS = { cb: '#1DCD96', livewell: '#2E78C7', jamie: '#F47B20', wipes: '#2E78C7' };

// ---- Message content (verbatim-leaning copy from the UJ deck) ----
const MESSAGES = [
  {
    id: 'welcome', sender: S.cb, senderKey: 'cb', category: 'Welcome', ttl: 'Stays in your inbox',
    time: 'Just now', thumb: { type: 'glyph' }, saved: false,
    title: 'Get the most from your messaging channel', reward: 0,
    preview: "You'll receive a few interactive messages a week — look at them when you choose, based on your preferences.",
    steps: [
      { icon: 'inbox', title: 'Get the most from your messaging channel',
        body: "You'll receive a few interactive messages a week — look at them when you choose, for as long as you want, and based on your preferences.",
        options: [{ label: 'Types of messages', go: 1 }, { label: 'Prizes & rewards', go: 2 }, { label: 'Back to inbox', go: 'close', ghost: true }] },
      { icon: 'list-checks', title: 'The types of messages', sub: 'You decide which to receive — or not.',
        list: ['Service tutorials', 'Programme updates', 'Polls & surveys', 'Community interaction', 'Invitations to events', 'Promotions with discounts'],
        options: [{ label: 'Next', go: 2 }] },
      { icon: 'gift', title: 'Prizes & rewards',
        body: "We'll also send fun stuff — competitions and quizzes with prizes — plus promotions for relevant products with rewards for your actions. You're the boss.",
        options: [{ label: 'Got it — back to inbox', go: 'close' }] },
    ],
  },
  {
    id: 'e4e', sender: S.cb, senderKey: 'cb', category: 'Welcome', ttl: 'Stays in your inbox',
    time: '2 days ago', thumb: { type: 'photo', src: '../../assets/cb-webpicture.png', pos: '70% 18%' }, saved: true,
    title: 'Welcome to Essentials for Everyone', reward: 0,
    preview: 'E4E delivers food support for you and your family directly to your phone.',
    steps: [
      { icon: 'shopping-basket', title: 'Welcome to “Essentials for Everyone”',
        body: 'E4E delivers food support for you and your family directly to your phone. Select your coupons, then pick up the items in your local store to receive heavily discounted essentials.',
        options: [{ label: 'Browse coupons now', go: 'link:coupons' }, { label: 'See the features', go: 1, ghost: true }] },
      { icon: 'list-checks', title: 'With E4E you can',
        list: ['Select your preferred shop(s), with map', 'Select coupons before visiting the store', 'Use MyCoupons as a shopping list', 'Review your savings', 'Edit all your account settings'],
        options: [{ label: 'Next', go: 2 }] },
      { icon: 'badge-check', title: "You're all set",
        body: "E4E coupons renew each week while you're eligible to participate. We'll notify you when your eligibility is due to end, so you can liaise with your support office.",
        options: [{ label: 'Browse coupons now', go: 'link:coupons' }, { label: 'Back to inbox', go: 'close', ghost: true }] },
    ],
  },
  {
    id: 'livewell', sender: S.livewell, senderKey: 'livewell', category: 'Life-cycle', ttl: 'Disappears in 3 days',
    time: '3 days ago', thumb: { type: 'photo', src: '../../assets/impact.png', pos: '50% 30%' }, saved: false,
    title: 'Tell us what you think — earn 5 Food Credits', reward: 5,
    preview: 'Watch a 2-min summary of the GM Livewell Programme, then answer 3 quick questions.',
    steps: [
      { icon: 'play-circle', title: 'GM Livewell Programme',
        body: 'GM Livewell fosters community-led health & wellbeing — empowering residents, community groups and public services to build healthier, happier, more resilient communities. Watch the 2-min summary, then tell us what you think.',
        options: [{ label: 'Go to survey', go: 1 }, { label: 'Maybe later', go: 'close', ghost: true }] },
      { q: 'Question 1 of 3', title: 'Before this, had you heard of the GM Livewell Programme?',
        choices: ['Yes', 'No', "Don't know"], go: 2 },
      { q: 'Question 2 of 3', title: 'How did you hear about our GM Livewell programme?',
        choices: ['Welfare office', 'Friend or family', 'Local charity', 'Online / social'], go: 3 },
      { q: 'Question 3 of 3', title: 'Which programme services most interest you?',
        choices: ['Healthy eating', 'Mental wellbeing', 'Getting active', 'Community events'], go: 4 },
      { icon: 'sparkles', title: 'Thank you for your response', reward: 5,
        body: "We'll use your responses to help improve how we support you. We've also rewarded you with 5 Food Credit points.",
        options: [{ label: 'Back to inbox', go: 'rewardClose:5' }] },
    ],
  },
  {
    id: 'recipe', sender: S.jamie, senderKey: 'jamie', category: 'Daily', ttl: 'Disappears in 2 days',
    time: '5 days ago', thumb: { type: 'photo', src: '../../assets/food-shopping.png', pos: '50% 55%' }, saved: true,
    title: "Jamie's Best Vegan Burger", reward: 0,
    preview: 'A much-loved thing that saves £££ and is really healthy — using this week’s E4E basket coupons.',
    steps: [
      { icon: 'chef-hat', title: 'Recipe of the Week: Jamie’s Best Vegan Burger',
        body: "We all want to be healthy. We all want to save money. How about a new thing ‘dressed’ as a much-loved thing — that saves £££ and is really healthy? Made with the couponed ingredients from this week’s E4E basket.",
        options: [{ label: "Sure, let's go", go: 1 }, { label: 'Eww, no chance!', go: 'close', ghost: true }] },
      { icon: 'soup', title: 'Vegan corn burgers', sub: '30 mins + chilling · serves 4 · 417 kcal per serving',
        list: ['1 × 400g tin chickpeas', '1 × 340g tin sweetcorn', '4 wholemeal burger buns', '2 ripe tomatoes · 1 lettuce', 'coriander · lemon · rapeseed oil'],
        options: [{ label: 'See the method', go: 2 }] },
      { icon: 'camera', title: 'How did you get on?',
        body: 'Did it look like ours? Will you make it again? Post a photo or comment, or visit our site for more ideas.',
        options: [{ label: 'Back to inbox', go: 'close' }] },
    ],
  },
  {
    id: 'wipes', sender: S.wipes, senderKey: 'wipes', category: 'Daily', ttl: 'Disappears in 4 days',
    time: '6 days ago', thumb: { type: 'tile', icon: 'droplets', bg: '#DCEAF8', fg: '#2E78C7' }, saved: false,
    title: 'Join our quiz — win some wipes!', reward: 10,
    preview: 'Answer 5 quick questions for a chance to win a 3-month supply of WaterWipes.',
    steps: [
      { icon: 'sparkles', title: 'Join our quiz. Win some wipes!', badge: 'Sponsored',
        body: 'Answer the questions for a chance to win. Ten clever winners will receive a coupon for 3 months’ supply of WaterWipes.',
        options: [{ label: "Yes, let's go", go: 1 }, { label: 'Maybe later', go: 'close', ghost: true }] },
      { q: 'Question 1', title: 'How many ingredients are there in WaterWipes?',
        choices: ['2', '3', '4', '5'], go: 2 },
      { icon: 'droplets', title: 'The answer is 2!',
        body: 'Our unscented Original baby wipes gently clean and help protect delicate skin with just two ingredients: 99.9% purified water and a drop of fruit extract.',
        options: [{ label: 'Enter the prize draw', go: 3 }] },
      { icon: 'party-popper', title: 'Great job!', reward: 10,
        body: "You're now entered into the prize draw. Shop with your Change Box link to receive 15% cash-back, exclusively through your account.",
        options: [{ label: 'Back to inbox', go: 'rewardClose:10' }] },
    ],
  },
];

// ---- Immersive story-style viewer ----
function Immersive({ message, onClose, onReward, onLink }) {
  const [i, setI] = useMsg(0);
  const steps = message.steps;
  const step = steps[i];
  const accent = ACCENTS[message.senderKey];
  const tint = accent + '14'; // ~8% alpha

  const handle = (go) => {
    if (typeof go === 'number') { setI(go); return; }
    if (typeof go === 'string' && go.startsWith('rewardClose:')) {
      onReward(parseInt(go.split(':')[1], 10)); onClose(); return;
    }
    if (typeof go === 'string' && go.startsWith('link:')) {
      onLink && onLink(go.split(':')[1]); onClose(); return;
    }
    if (go === 'close') { onClose(); return; }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', zIndex: 20 }}>
      {/* progress segments */}
      <div style={{ display: 'flex', gap: 4, padding: '12px 14px 0' }}>
        {steps.map((_, idx) => (
          <div key={idx} style={{ flex: 1, height: 3.5, borderRadius: 2, background: idx <= i ? accent : '#E4E8E7' }} />
        ))}
      </div>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 8px' }}>
        <Avatar sender={message.sender} size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '800 13px/1 var(--font-display)', color: INKc }}>{message.sender.name}</div>
          <div style={{ font: '600 10.5px/1 var(--font-body)', color: '#8B95A5', marginTop: 2 }}>{message.ttl}</div>
        </div>
        {step.badge && <span style={{ font: '700 9.5px/1 var(--font-body)', letterSpacing: '.05em', textTransform: 'uppercase',
          color: '#8B95A5', border: '1px solid ' + LINEc, borderRadius: 999, padding: '4px 8px' }}>{step.badge}</span>}
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="x" size={22} color={INKc} /></button>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* media band */}
        <div style={{ margin: '6px 16px 0', borderRadius: 18, background: tint, height: 132, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <span style={{ width: 66, height: 66, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 6px 16px rgba(39,47,58,.1)' }}>
            <Icon name={step.icon || 'message-circle'} size={32} color={accent} strokeWidth={1.8} />
          </span>
          {step.q && <span style={{ position: 'absolute', top: 12, left: 14, font: '800 11px/1 var(--font-display)',
            letterSpacing: '.04em', textTransform: 'uppercase', color: accent }}>{step.q}</span>}
        </div>

        <div style={{ padding: '18px 20px 8px' }}>
          {step.reward ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEFBF6', border: '1px solid #D6F7EC',
              borderRadius: 999, padding: '6px 12px', marginBottom: 12 }}>
              <Icon name="sparkles" size={14} color={GRN7} />
              <span style={{ font: '800 12px/1 var(--font-display)', color: GRN7 }}>+{step.reward} Food Credits earned</span>
            </div>
          ) : null}
          <h1 style={{ font: '900 21px/1.2 var(--font-display)', letterSpacing: '-0.01em', color: INKc, margin: '0 0 10px' }}>{step.title}</h1>
          {step.sub && <div style={{ font: '700 13px/1.4 var(--font-body)', color: INK2c, margin: '0 0 10px' }}>{step.sub}</div>}
          {step.body && <p style={{ font: '400 14.5px/1.6 var(--font-body)', color: INK2c, margin: 0 }}>{step.body}</p>}
          {step.list && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 6 }}>
              {step.list.map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name="check" size={16} color={GRN7} strokeWidth={2.6} />
                  <span style={{ font: '600 14px/1.4 var(--font-body)', color: INKc }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* actions */}
      <div style={{ padding: '8px 16px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {step.choices ? step.choices.map((c) => (
          <button key={c} onClick={() => handle(step.go)} style={{ ...btn.choice }}>
            <span>{c}</span><Icon name="chevron-right" size={18} color="#8B95A5" />
          </button>
        )) : step.options.map((o) => (
          <button key={o.label} onClick={() => handle(o.go)} style={o.ghost ? btn.ghost : { ...btn.primary, background: accent, color: tone(accent) }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function tone(hex) { return hex === '#1DCD96' ? '#06382A' : '#fff'; }

const btn = {
  primary: { width: '100%', font: '800 15px/1 var(--font-display)', border: 'none', padding: '15px', borderRadius: 999,
    cursor: 'pointer', boxShadow: '0 8px 18px rgba(39,47,58,.14)' },
  ghost: { width: '100%', font: '800 14.5px/1 var(--font-display)', color: '#5A6577', background: '#F2F4F3', border: 'none',
    padding: '14px', borderRadius: 999, cursor: 'pointer' },
  choice: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    font: '700 14.5px/1 var(--font-body)', color: '#272F3A', background: '#fff', border: '1.5px solid #E4E8E7',
    padding: '14px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left' },
};

Object.assign(window, { MESSAGES, Immersive });
