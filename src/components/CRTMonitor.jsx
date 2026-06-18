import SelectScreen from './screens/SelectScreen';
import SocialsScreen from './screens/SocialsScreen';
import ShopScreen from './screens/ShopScreen';
import MusicScreen from './screens/MusicScreen';
import './CRTMonitor.css';

const SCREENS = {
  SELECT: SelectScreen,
  SOCIALS: SocialsScreen,
  SHOP: ShopScreen,
  MUSIC: MusicScreen,
};

export default function CRTMonitor({
  booted,
  page,
  menuIndex,
  zoomed,
  tvOn,
  onTogglePower,
  onMenuSelect,
  onMenuHover,
}) {
  const Screen = SCREENS[page] || SelectScreen;

  return (
    <div className={`crt-stage ${booted ? 'crt-stage--visible' : ''} ${zoomed ? 'crt-stage--zoomed' : ''} ${tvOn ? '' : 'crt-stage--tv-off'}`}>
      <div className="crt-stage__shadow" />
      <div className={`crt-monitor crt-tv ${tvOn ? 'crt-tv--on' : 'crt-tv--off'}`}>
        <div className="crt-tv__antenna" aria-hidden="true">
          <span className="crt-tv__antenna-ear crt-tv__antenna-ear--left" />
          <span className="crt-tv__antenna-ear crt-tv__antenna-ear--right" />
        </div>

        <div className="crt-tv__cabinet">
          <div className="crt-tv__body">
            <div className="crt-tv__screen-section">
              <div className="crt-tv__brand">PORTFOLIO TV</div>
              <div className="crt-monitor__screen-wrap">
                <div className="crt-monitor__screen">
                  {tvOn && (
                    <div className="crt-monitor__screen-inner">
                      <Screen
                        menuIndex={menuIndex}
                        onMenuSelect={onMenuSelect}
                        onMenuHover={onMenuHover}
                      />
                    </div>
                  )}
                  <div className="crt-tv__screen-off" aria-hidden={tvOn} />
                  <div className="crt-monitor__screen-reflection" />
                  <div className="crt-monitor__screen-curve" />
                </div>
              </div>
              <div className="crt-tv__speaker-bar" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>

            <div className="crt-tv__side-panel">
              <div className="crt-tv__panel-label">CH</div>
              <div className="crt-tv__dial crt-tv__dial--large" aria-hidden="true" />
              <div className="crt-tv__panel-label">VOL</div>
              <div className="crt-tv__dial" aria-hidden="true" />
              <div className="crt-tv__speaker-grille" aria-hidden="true" />
              <button
                type="button"
                className="crt-tv__power-btn"
                onClick={onTogglePower}
                aria-label={tvOn ? 'Turn TV off' : 'Turn TV on'}
                aria-pressed={tvOn}
              >
                <span className="crt-tv__power-light" />
                <span className="crt-tv__power-label">PWR</span>
              </button>
            </div>
          </div>
        </div>

        <div className="crt-tv__feet" aria-hidden="true">
          <span /><span />
        </div>
      </div>
    </div>
  );
}
