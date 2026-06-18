const TRACKS = [
  'NEON DREAMS',
  'STATIC RAIN',
  'MIDNIGHT BIOS',
  'PIXEL HEART',
  'LOW RES LOVE',
  'CRT GLOW',
];

export default function MusicScreen() {
  return (
    <div className="screen">
      <h1 className="screen__title">MUSIC</h1>
      <p className="screen__subtitle">now playing: nothing (demo mode)</p>
      <div className="screen__panel">
        <div className="album-grid">
          {TRACKS.map((track) => (
            <div key={track} className="album-card">
              <span className="album-card__title">{track}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
