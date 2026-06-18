import { useEffect, useState } from 'react';

export const SCENE_WIDTH = 1920;
export const SCENE_HEIGHT = 1080;

export default function useSceneScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      // Cover the viewport (like object-fit: cover) so no letterbox bars appear.
      const next = Math.max(
        window.innerWidth / SCENE_WIDTH,
        window.innerHeight / SCENE_HEIGHT
      );
      setScale(next > 0 ? next : 0.1);
    };

    update();
    window.addEventListener('resize', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return scale;
}
