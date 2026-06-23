import './Instructions.css';

export default function Instructions({ page, itemZoomed = false, contactFormOpen = false }) {
  return (
    <div className="instructions">
      {contactFormOpen ? (
        <div className="instructions__row">
          <span className="instructions__key">ESC</span>
          <span className="instructions__text">close form</span>
        </div>
      ) : itemZoomed ? (
        <div className="instructions__row">
          <span className="instructions__key">ESC</span>
          <span className="instructions__text">zoom out</span>
        </div>
      ) : page === 'SELECT' ? (
        <div className="instructions__row">
          <span className="instructions__key">←</span>
          <span className="instructions__key">→</span>
          <span className="instructions__text">navigate</span>
          <span className="instructions__divider">|</span>
          <span className="instructions__key">ENTER</span>
          <span className="instructions__text">select</span>
        </div>
      ) : (
        <div className="instructions__row">
          <span className="instructions__key">ESC</span>
          <span className="instructions__text">back to menu</span>
        </div>
      )}
    </div>
  );
}
