import './RoomDog.css';

export default function RoomDog() {
  return (
    <div className="room__dog" aria-hidden="true">
      <svg className="room__dog-art" viewBox="0 0 200 220" aria-hidden="true">
        <ellipse cx="100" cy="205" rx="58" ry="10" fill="rgba(0,0,0,0.18)" />

        {/* Tail */}
        <path
          d="M 128 145 C 168 130 188 88 162 82 C 176 108 160 138 128 145 Z"
          fill="#ece7df"
        />

        {/* Back haunches */}
        <ellipse cx="72" cy="168" rx="24" ry="30" fill="#f5f1ea" />
        <ellipse cx="128" cy="168" rx="24" ry="30" fill="#f5f1ea" />

        {/* Body */}
        <ellipse cx="100" cy="142" rx="52" ry="58" fill="#faf8f4" />
        <ellipse cx="100" cy="150" rx="34" ry="40" fill="#fff" />

        {/* Front legs */}
        <rect x="72" y="158" width="18" height="44" rx="9" fill="#faf8f4" />
        <rect x="110" y="158" width="18" height="44" rx="9" fill="#faf8f4" />

        {/* Paws */}
        <ellipse cx="81" cy="200" rx="14" ry="7" fill="#fff" stroke="#d8d0c4" strokeWidth="1.5" />
        <ellipse cx="119" cy="200" rx="14" ry="7" fill="#fff" stroke="#d8d0c4" strokeWidth="1.5" />

        {/* Left ear */}
        <path
          d="M 58 72 C 8 8 0 78 42 98 C 24 72 30 42 58 72 Z"
          fill="#2b2622"
        />
        <path d="M 52 72 C 18 28 12 72 38 88 Z" fill="#8b5e3c" />

        {/* Right ear */}
        <path
          d="M 142 72 C 192 8 200 78 158 98 C 176 72 170 42 142 72 Z"
          fill="#2b2622"
        />
        <path d="M 148 72 C 182 28 188 72 162 88 Z" fill="#8b5e3c" />

        {/* Head */}
        <circle cx="100" cy="92" r="40" fill="#fff" />

        {/* Cheek fluff */}
        <ellipse cx="64" cy="104" rx="12" ry="10" fill="#faf8f4" />
        <ellipse cx="136" cy="104" rx="12" ry="10" fill="#faf8f4" />

        {/* Eye patches */}
        <ellipse cx="78" cy="90" rx="14" ry="16" fill="#2b2622" />
        <ellipse cx="122" cy="90" rx="14" ry="16" fill="#2b2622" />

        {/* Tan brows */}
        <ellipse cx="78" cy="74" rx="8" ry="5" fill="#a06b3c" />
        <ellipse cx="122" cy="74" rx="8" ry="5" fill="#a06b3c" />

        {/* Eyes */}
        <circle cx="78" cy="92" r="6" fill="#111" />
        <circle cx="80" cy="89" r="2.2" fill="#fff" />
        <circle cx="122" cy="92" r="6" fill="#111" />
        <circle cx="120" cy="89" r="2.2" fill="#fff" />

        {/* Muzzle */}
        <ellipse cx="100" cy="112" rx="18" ry="14" fill="#fff" />

        {/* Nose */}
        <ellipse cx="100" cy="108" rx="7" ry="5" fill="#1a1410" />

        {/* Mouth */}
        <path
          d="M 92 116 Q 100 122 108 116"
          fill="none"
          stroke="#1a1410"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Chest tuft */}
        <path
          d="M 88 132 Q 100 148 112 132"
          fill="none"
          stroke="#ece7df"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
