import { useEffect, useState } from 'react';

export const SCENE_WIDTH = 1920;
export const SCENE_HEIGHT = 1080;

export function computeSceneScale(width, height) {
  const widthScale = width / SCENE_WIDTH;
  const heightScale = height / SCENE_HEIGHT;
  const coverScale = Math.max(widthScale, heightScale);
  const isPortrait = width < height;

  if (isPortrait) {
    // Fit full scene width so side elements (corkboard, stereo) stay on screen.
    return widthScale > 0 ? widthScale : 0.1;
  }

  return coverScale > 0 ? coverScale : 0.1;
}

function getViewportSize() {
  const viewport = window.visualViewport;
  return {
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  };
}

export function computeSceneLayout(width, height) {
  const scale = computeSceneScale(width, height);
  const displayHeight = SCENE_HEIGHT * scale;
  const gapY = Math.max(0, height - displayHeight);

  return {
    scale,
    bleedTop: gapY / 2,
    bleedBottom: gapY / 2,
    hasVerticalBleed: gapY > 1,
  };
}

const DEFAULT_LAYOUT = {
  scale: 1,
  bleedTop: 0,
  bleedBottom: 0,
  hasVerticalBleed: false,
};

export default function useSceneScale() {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  useEffect(() => {
    const update = () => {
      const { width, height } = getViewportSize();
      setLayout(computeSceneLayout(width, height));
    };

    update();
    window.addEventListener('resize', update);
    document.addEventListener('visibilitychange', update);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, []);

  return layout;
}
