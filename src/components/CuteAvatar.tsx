'use client';

const HAIR_STYLES = [
  // Short spiky
  (c: string) => <><path d="M12 4C9 4 7 6 7 8h10c0-2-2-4-5-4z" fill={c} /><path d="M10 4c-1-2 0-3 2-3s3 1 2 3" fill={c} /></>,
  // Wavy
  (c: string) => <path d="M7 8c0-3 2-5 5-6s5 2 5 5c-1-2-3-3-5-3s-4 1-5 4z" fill={c} />,
  // Bob
  (c: string) => <path d="M6 8c0-4 3-6 6-6s6 2 6 6c0 2-1 4-2 5v-3c0-3-2-5-4-5s-4 2-4 5v3c-1-1-2-3-2-5z" fill={c} />,
  // Curly
  (c: string) => <><circle cx="9" cy="5" r="2" fill={c} /><circle cx="13" cy="4" r="2.5" fill={c} /><circle cx="16" cy="6" r="2" fill={c} /><circle cx="7" cy="7" r="1.5" fill={c} /></>,
  // Bun
  (c: string) => <><path d="M8 8c0-3 2-5 4-5s4 2 4 5" fill={c} /><circle cx="12" cy="3" r="2.5" fill={c} /></>,
];

const ACCESSORIES = [
  // Glasses
  () => <><circle cx="9.5" cy="12" r="2.5" fill="none" stroke="#333" strokeWidth="0.6" /><circle cx="14.5" cy="12" r="2.5" fill="none" stroke="#333" strokeWidth="0.6" /><line x1="12" y1="12" x2="12" y2="12" stroke="#333" strokeWidth="0.6" /></>,
  // None
  () => null,
  // Earring
  () => <circle cx="6.5" cy="14" r="0.7" fill="#f9ca24" />,
  // None
  () => null,
  // Headband
  () => <path d="M7 7.5h10" stroke="#fd79a8" strokeWidth="1" strokeLinecap="round" />,
];

const EXPRESSIONS = [
  // Smile
  () => <path d="M9.5 15.5Q12 17.5 14.5 15.5" stroke="#333" strokeWidth="0.7" fill="none" strokeLinecap="round" />,
  // Grin
  () => <><path d="M9 15Q12 18 15 15" stroke="#333" strokeWidth="0.7" fill="none" strokeLinecap="round" /><path d="M9.5 15Q12 17 14.5 15" fill="white" /></>,
  // Smirk
  () => <path d="M10 15.5Q13 17 14.5 15" stroke="#333" strokeWidth="0.7" fill="none" strokeLinecap="round" />,
  // Cat smile
  () => <><path d="M9 15Q12 17 15 15" stroke="#333" strokeWidth="0.7" fill="none" strokeLinecap="round" /><line x1="8" y1="13" x2="5" y2="12" stroke="#333" strokeWidth="0.3" /><line x1="8" y1="14" x2="5" y2="14.5" stroke="#333" strokeWidth="0.3" /><line x1="16" y1="13" x2="19" y2="12" stroke="#333" strokeWidth="0.3" /><line x1="16" y1="14" x2="19" y2="14.5" stroke="#333" strokeWidth="0.3" /></>,
  // Happy
  () => <ellipse cx="12" cy="15.5" rx="2.5" ry="2" fill="#333" />,
];

const SKIN_TONES = ['#fdbcb4', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#ffdbac'];
const HAIR_COLORS = ['#2c1810', '#4a3728', '#8b4513', '#d4a76a', '#c0392b', '#1a1a2e', '#fd79a8', '#6c5ce7'];
const BLUSH_COLORS = ['#fd79a880', '#ff6b6b60', '#fab1a070', '#e17055660'];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

export default function CuteAvatar({ name, size = 64, className = '' }: { name: string; size?: number; className?: string }) {
  const hash = hashStr(name);
  const skinTone = SKIN_TONES[hash % SKIN_TONES.length];
  const hairColor = HAIR_COLORS[(hash >> 3) % HAIR_COLORS.length];
  const hairStyle = HAIR_STYLES[(hash >> 5) % HAIR_STYLES.length];
  const accessory = ACCESSORIES[(hash >> 7) % ACCESSORIES.length];
  const expression = EXPRESSIONS[(hash >> 9) % EXPRESSIONS.length];
  const blush = BLUSH_COLORS[(hash >> 11) % BLUSH_COLORS.length];
  const eyeStyle = (hash >> 13) % 3;

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={{ borderRadius: '50%', background: `hsl(${hash % 360}, 70%, 92%)` }}>
      {/* Head */}
      <ellipse cx="12" cy="13" rx="6" ry="7" fill={skinTone} />

      {/* Hair */}
      {hairStyle(hairColor)}

      {/* Eyes */}
      {eyeStyle === 0 ? (
        <>
          <circle cx="9.5" cy="12" r="1.2" fill="white" />
          <circle cx="14.5" cy="12" r="1.2" fill="white" />
          <circle cx="9.8" cy="12" r="0.7" fill="#1a1a2e" />
          <circle cx="14.8" cy="12" r="0.7" fill="#1a1a2e" />
          <circle cx="9.5" cy="11.5" r="0.3" fill="white" />
          <circle cx="14.5" cy="11.5" r="0.3" fill="white" />
        </>
      ) : eyeStyle === 1 ? (
        <>
          <ellipse cx="9.5" cy="12" rx="1.3" ry="1" fill="white" />
          <ellipse cx="14.5" cy="12" rx="1.3" ry="1" fill="white" />
          <circle cx="9.5" cy="12" r="0.6" fill="#1a1a2e" />
          <circle cx="14.5" cy="12" r="0.6" fill="#1a1a2e" />
        </>
      ) : (
        <>
          <path d="M8 12Q9.5 10.5 11 12" stroke="#1a1a2e" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M13 12Q14.5 10.5 16 12" stroke="#1a1a2e" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Blush */}
      <circle cx="7.5" cy="14" r="1.5" fill={blush} />
      <circle cx="16.5" cy="14" r="1.5" fill={blush} />

      {/* Mouth */}
      {expression()}

      {/* Accessory */}
      {accessory()}

      {/* Eyebrows */}
      <path d={`M8.5 ${10.5 - (hash % 2) * 0.3}Q9.5 ${10 - (hash % 2) * 0.3} 10.5 ${10.5 - (hash % 2) * 0.3}`} stroke={hairColor} strokeWidth="0.5" fill="none" />
      <path d={`M13.5 ${10.5 - (hash % 2) * 0.3}Q14.5 ${10 - (hash % 2) * 0.3} 15.5 ${10.5 - (hash % 2) * 0.3}`} stroke={hairColor} strokeWidth="0.5" fill="none" />
    </svg>
  );
}
