import './WindowScene.css';

const CLOUDS = [
  { id: 1, top: '18%', size: 1, duration: 38, delay: 0 },
  { id: 2, top: '42%', size: 0.75, duration: 52, delay: -12 },
  { id: 3, top: '28%', size: 0.55, duration: 44, delay: -24 },
];

const BIRDS = [
  { id: 1, top: '35%', duration: 14, delay: 0, scale: 1 },
  { id: 2, top: '22%', duration: 18, delay: -6, scale: 0.8 },
  { id: 3, top: '48%', duration: 16, delay: -11, scale: 0.65 },
];

const STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 17) % 84}%`,
  top: `${10 + (i * 23) % 55}%`,
  size: i % 3 === 0 ? 2 : 1.5,
  delay: (i % 5) * 0.7,
}));

export default function WindowScene({ sky }) {
  return (
    <div className={`room__window window-scene window-scene--${sky.phase}`}>
      <div
        className="window-scene__viewport"
        style={{
          '--sky-top': sky.skyTop,
          '--sky-mid': sky.skyMid,
          '--sky-bottom': sky.skyBottom,
          '--sun-opacity': sky.sunOpacity,
          '--moon-opacity': sky.moonOpacity,
          '--stars-opacity': sky.starsOpacity,
          '--clouds-opacity': sky.cloudsOpacity,
          '--birds-opacity': sky.birdsOpacity,
          '--sun-x': `${sky.sunX}%`,
          '--sun-y': `${sky.sunY}%`,
          '--moon-x': `${sky.moonX}%`,
          '--moon-y': `${sky.moonY}%`,
        }}
      >
        <div className="window-scene__sky" />

        <div className="window-scene__stars" aria-hidden="true">
          {STARS.map((star) => (
            <span
              key={star.id}
              className="window-scene__star"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {CLOUDS.map((cloud) => (
          <div
            key={cloud.id}
            className="window-scene__cloud"
            style={{
              top: cloud.top,
              '--cloud-scale': cloud.size,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
            }}
            aria-hidden="true"
          />
        ))}

        {sky.sunVisible && (
          <div className="window-scene__sun" aria-hidden="true">
            <div className="window-scene__sun-core" />
            <div className="window-scene__sun-rays" />
          </div>
        )}

        {sky.moonVisible && (
          <div className="window-scene__moon" aria-hidden="true" />
        )}

        {sky.birdsOpacity > 0.05 &&
          BIRDS.map((bird) => (
            <div
              key={bird.id}
              className="window-scene__bird"
              style={{
                top: bird.top,
                '--bird-scale': bird.scale,
                animationDuration: `${bird.duration}s`,
                animationDelay: `${bird.delay}s`,
              }}
              aria-hidden="true"
            >
              <span className="window-scene__bird-wing window-scene__bird-wing--left" />
              <span className="window-scene__bird-wing window-scene__bird-wing--right" />
            </div>
          ))}
      </div>

      <div className="room__window-frame" />
      <div className="room__window-sill" />
    </div>
  );
}
