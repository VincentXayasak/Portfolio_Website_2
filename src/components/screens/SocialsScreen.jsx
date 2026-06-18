const SOCIALS = [
  { name: 'Instagram', handle: '@artist', color: '#ff6b9d' },
  { name: 'Twitter / X', handle: '@artist', color: '#00c6ff' },
  { name: 'YouTube', handle: '@artist', color: '#ff4444' },
  { name: 'Discord', handle: 'community', color: '#7289da' },
  { name: 'Spotify', handle: 'artist', color: '#1db954' },
];

export default function SocialsScreen() {
  return (
    <div className="screen">
      <h1 className="screen__title">SOCIALS</h1>
      <p className="screen__subtitle">plug into the network</p>
      <div className="screen__panel">
        {SOCIALS.map((social) => (
          <div key={social.name} className="list-row">
            <span
              className="list-row__dot"
              style={{ background: social.color, boxShadow: `0 0 8px ${social.color}` }}
            />
            <span className="list-row__name">{social.name}</span>
            <span className="list-row__meta">{social.handle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
