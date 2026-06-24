import { useEffect, useState } from 'react';
import './Instructions.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => setIsMobile(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

export default function Instructions({
  page,
  itemZoomed = false,
  contactFormOpen = false,
  isHorizontalScroll = false,
}) {
  const isMobile = useIsMobile();

  return (
    <div className="instructions">
      {contactFormOpen ? (
        <div className="instructions__row">
          <span className="instructions__key">ESC</span>
          <span className="instructions__text">close form</span>
        </div>
      ) : itemZoomed ? (
        <div className="instructions__row">
          {isMobile ? (
            <span className="instructions__text">Tap ESC to zoom out</span>
          ) : (
            <>
              <span className="instructions__key">ESC</span>
              <span className="instructions__text">zoom out</span>
            </>
          )}
        </div>
      ) : page === 'SELECT' ? (
        <div className="instructions__row">
          {isMobile || isHorizontalScroll ? (
            <span className="instructions__text">
              {isHorizontalScroll ? 'Swipe sideways to explore · Tap a channel on the TV' : 'Tap a channel on the TV'}
            </span>
          ) : (
            <>
              <span className="instructions__key">←</span>
              <span className="instructions__key">→</span>
              <span className="instructions__text">navigate</span>
              <span className="instructions__divider">|</span>
              <span className="instructions__key">ENTER</span>
              <span className="instructions__text">select</span>
            </>
          )}
        </div>
      ) : (
        <div className="instructions__row">
          {isMobile ? (
            <span className="instructions__text">Tap ESC to go back</span>
          ) : (
            <>
              <span className="instructions__key">ESC</span>
              <span className="instructions__text">back to menu</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
