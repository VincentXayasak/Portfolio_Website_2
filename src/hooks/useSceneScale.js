import { useEffect, useState } from 'react';

export const SCENE_WIDTH = 1920;
export const SCENE_HEIGHT = 1080;

function getViewportSize() {
  const viewport = window.visualViewport;
  return {
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  };
}

export function computeSceneLayout(width, height) {
  const widthScale = width / SCENE_WIDTH;
  const heightScale = height / SCENE_HEIGHT;
  const coverScale = Math.max(widthScale, heightScale);
  const displayWidthAtHeightFit = SCENE_WIDTH * heightScale;
  const isHorizontalScroll = displayWidthAtHeightFit > width + 1;

  const scale = isHorizontalScroll
    ? heightScale > 0
      ? heightScale
      : 0.1
    : coverScale > 0
      ? coverScale
      : 0.1;

  return {
    scale,
    isHorizontalScroll,
  };
}

const DEFAULT_LAYOUT = {
  scale: 1,
  isHorizontalScroll: false,
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
