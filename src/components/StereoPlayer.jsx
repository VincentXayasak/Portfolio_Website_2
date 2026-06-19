import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TRACKS } from '../data/tracks';
import getZoomOrigin from '../utils/getZoomOrigin';
import './StereoPlayer.css';

function formatTrackName(name) {
  return name.replace(/[-_]/g, ' ').toUpperCase();
}

const NOTE_SYMBOLS = ['♪', '♫', '♬', '♩'];

let noteId = 0;

function createFloatingNote(side, originX, originY) {
  const driftX = side === 'left' ? -(50 + Math.random() * 60) : 50 + Math.random() * 60;
  const driftY = -(100 + Math.random() * 90);

  return {
    id: `note-${noteId++}`,
    side,
    symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
    originX,
    originY,
    driftX,
    driftY,
  };
}

export default function StereoPlayer({ stereoZoomed, onStereoZoom }) {
  const stereoRef = useRef(null);
  const audioRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const trackIndexRef = useRef(0);
  const skipTrackEffectRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState([]);
  const [liveNoteIds, setLiveNoteIds] = useState(() => new Set());
  const [driftNoteIds, setDriftNoteIds] = useState(() => new Set());

  const currentTrack = TRACKS[trackIndex] ?? null;

  trackIndexRef.current = trackIndex;

  const getSpeakerOrigins = useCallback(() => {
    const stereo = stereoRef.current;
    if (!stereo) return null;

    const rect = stereo.getBoundingClientRect();
    return {
      left: {
        x: rect.left + rect.width * 0.14,
        y: rect.top + rect.height * 0.46,
      },
      right: {
        x: rect.right - rect.width * 0.14,
        y: rect.top + rect.height * 0.46,
      },
    };
  }, []);

  const removeNote = useCallback((id) => {
    setFloatingNotes((notes) => notes.filter((note) => note.id !== id));
    setLiveNoteIds((ids) => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
    setDriftNoteIds((ids) => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  }, []);

  const spawnNote = useCallback(
    (side) => {
      const origins = getSpeakerOrigins();
      if (!origins) return;

      const origin = origins[side];
      const note = createFloatingNote(side, origin.x, origin.y);
      setFloatingNotes((notes) => [...notes.slice(-18), note]);

      requestAnimationFrame(() => {
        setLiveNoteIds((ids) => new Set(ids).add(note.id));
      });

      window.setTimeout(() => {
        setDriftNoteIds((ids) => new Set(ids).add(note.id));
      }, 150);

      window.setTimeout(() => removeNote(note.id), 2700);
    },
    [getSpeakerOrigins, removeNote]
  );

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasPlayed(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (TRACKS.length === 0) {
        setIsPlaying(false);
        return;
      }

      const nextIndex = (trackIndexRef.current + 1) % TRACKS.length;
      const nextTrack = TRACKS[nextIndex];
      const audio = audioRef.current;

      if (!audio || !nextTrack) {
        setIsPlaying(false);
        return;
      }

      skipTrackEffectRef.current = true;
      setTrackIndex(nextIndex);
      audio.src = nextTrack.url;
      audio.play().catch(() => setIsPlaying(false));
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
      return undefined;
    }

    spawnNote('left');
    spawnNote('right');

    spawnTimerRef.current = window.setInterval(() => {
      spawnNote('left');
      spawnNote('right');
    }, 750);

    return () => {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
    };
  }, [isPlaying, spawnNote]);

  useEffect(() => {
    if (!isPlaying) {
      setFloatingNotes([]);
      setLiveNoteIds(new Set());
      setDriftNoteIds(new Set());
    }
  }, [isPlaying]);

  useEffect(() => {
    if (skipTrackEffectRef.current) {
      skipTrackEffectRef.current = false;
      return;
    }

    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (audio.paused) return;

    audio.src = currentTrack.url;
    audio.play().catch(() => setIsPlaying(false));
  }, [trackIndex, currentTrack]);

  const handleOpenZoom = useCallback(() => {
    const origin = stereoRef.current ? getZoomOrigin(stereoRef.current) : null;
    onStereoZoom?.(origin);
  }, [onStereoZoom]);

  const goToPrev = useCallback((event) => {
    event.stopPropagation();
    if (TRACKS.length === 0) return;
    setTrackIndex((index) => (index - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  const goToNext = useCallback((event) => {
    event.stopPropagation();
    if (TRACKS.length === 0) return;
    setTrackIndex((index) => (index + 1) % TRACKS.length);
  }, []);

  const handlePlay = useCallback(
    async (event) => {
      event.stopPropagation();
      const audio = audioRef.current;
      if (!currentTrack || !audio || isPlaying) return;

      try {
        audio.src = currentTrack.url;
        await audio.play();
        setHasPlayed(true);
      } catch {
        setIsPlaying(false);
      }
    },
    [currentTrack, isPlaying]
  );

  const handlePause = useCallback((event) => {
    event.stopPropagation();
    audioRef.current?.pause();
  }, []);

  const notesPortal =
    floatingNotes.length > 0
      ? createPortal(
          <div className="stereo-notes-portal" aria-hidden="true">
            {floatingNotes.map((note) => {
              const isLive = liveNoteIds.has(note.id);
              const isDrift = driftNoteIds.has(note.id);
              const transform = isDrift
                ? `translate(calc(-50% + ${note.driftX}px), calc(-50% + ${note.driftY}px)) scale(1.15)`
                : isLive
                  ? 'translate(-50%, -50%) scale(1)'
                  : 'translate(-50%, -50%) scale(0.6)';

              return (
                <span
                  key={note.id}
                  className={`stereo-note stereo-note--${note.side} ${isLive ? 'is-live' : ''} ${isDrift ? 'is-drift' : ''}`}
                  style={{
                    left: `${note.originX}px`,
                    top: `${note.originY}px`,
                    transform,
                  }}
                >
                  {note.symbol}
                </span>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {notesPortal}
      <div className="room__stereo" ref={stereoRef}>
        <div className="room__stereo-unit">
          <div className="room__speaker room__speaker--left">
            <div className="room__speaker-cone" />
          </div>
          <div className="room__stereo-center">
            <div className={`room__stereo-display ${stereoZoomed ? 'room__stereo-display--active' : ''}`}>
              {stereoZoomed ? (
                <>
                  <button
                    type="button"
                    className="room__stereo-nav room__stereo-nav--prev"
                    onClick={goToPrev}
                    aria-label="Previous track"
                    disabled={TRACKS.length === 0}
                  >
                    ‹
                  </button>
                  <span className="room__stereo-track">
                    {currentTrack ? formatTrackName(currentTrack.name) : 'NO TRACKS'}
                  </span>
                  <button
                    type="button"
                    className="room__stereo-nav room__stereo-nav--next"
                    onClick={goToNext}
                    aria-label="Next track"
                    disabled={TRACKS.length === 0}
                  >
                    ›
                  </button>
                </>
              ) : hasPlayed && currentTrack ? (
                <button
                  type="button"
                  className="room__stereo-display-btn room__stereo-display-btn--track"
                  onClick={handleOpenZoom}
                  aria-label="Open stereo player"
                >
                  {formatTrackName(currentTrack.name)}
                </button>
              ) : (
                <button
                  type="button"
                  className="room__stereo-display-btn"
                  onClick={handleOpenZoom}
                  aria-label="Open stereo player"
                >
                  CLICK HERE
                </button>
              )}
            </div>
            <div className="room__stereo-deck">
              <button
                type="button"
                className={`room__stereo-btn room__stereo-btn--play ${isPlaying ? 'is-active' : ''}`}
                onClick={handlePlay}
                aria-label="Play"
                disabled={!stereoZoomed || !currentTrack}
              />
              <button
                type="button"
                className="room__stereo-btn room__stereo-btn--pause"
                onClick={handlePause}
                aria-label="Pause"
                disabled={!stereoZoomed}
              />
            </div>
            <div className="room__stereo-knobs">
              <span /><span /><span />
            </div>
          </div>
          <div className="room__speaker room__speaker--right">
            <div className="room__speaker-cone" />
          </div>
        </div>
        <div className="room__stereo-shelf" />
      </div>
    </>
  );
}
