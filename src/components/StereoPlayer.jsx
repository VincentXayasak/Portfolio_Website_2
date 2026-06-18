import { useCallback, useEffect, useRef, useState } from 'react';
import { TRACKS } from '../data/tracks';
import getZoomOrigin from '../utils/getZoomOrigin';

function formatTrackName(name) {
  return name.replace(/[-_]/g, ' ').toUpperCase();
}

export default function StereoPlayer({ stereoZoomed, onStereoZoom }) {
  const stereoRef = useRef(null);
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const currentTrack = TRACKS[trackIndex] ?? null;

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || !currentTrack || !audioRef.current) return;
    audioRef.current.src = currentTrack.url;
    audioRef.current.play().catch(() => setIsPlaying(false));
  }, [trackIndex, isPlaying, currentTrack]);

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
    (event) => {
      event.stopPropagation();
      if (!currentTrack || !audioRef.current) return;
      if (isPlaying) return;
      audioRef.current.src = currentTrack.url;
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
      setHasPlayed(true);
    },
    [currentTrack, isPlaying]
  );

  const handlePause = useCallback((event) => {
    event.stopPropagation();
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  return (
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
  );
}
