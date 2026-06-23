const ITEMS = [
  { id: 'ABOUT', icon: '◈', label: 'ABOUT' },
  { id: 'PROJECTS', icon: '▣', label: 'PROJECTS' },
  { id: 'SOCIALS', icon: '◎', label: 'SOCIALS' },
];

export default function SelectScreen({ menuIndex, onMenuSelect, onMenuHover }) {
  return (
    <div className="screen">
      <h1 className="screen__title glitch-text">Vincent Xayasak</h1>
      <p className="screen__subtitle">select a channel</p>
      <div className="menu-grid">
        {ITEMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`menu-card ${index === menuIndex ? 'is-active' : ''}`}
            onClick={() => onMenuSelect(item.id)}
            onMouseEnter={() => onMenuHover(index)}
          >
            <span className="menu-card__icon">{item.icon}</span>
            <span className="menu-card__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
