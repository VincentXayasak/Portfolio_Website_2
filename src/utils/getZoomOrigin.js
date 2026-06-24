import { SCENE_HEIGHT, SCENE_WIDTH } from '../hooks/useSceneScale';

function getCanvasScale(element) {
  const canvas = element?.closest('.scene-canvas');
  if (!canvas) return 1;

  const transform = window.getComputedStyle(canvas).transform;
  if (!transform || transform === 'none') return 1;

  return new DOMMatrix(transform).a || 1;
}

function getElementCenterInCamera(element, camera) {
  const cameraWidth = camera.offsetWidth || SCENE_WIDTH;
  const cameraHeight = camera.offsetHeight || SCENE_HEIGHT;

  let x = 0;
  let y = 0;
  let node = element;

  while (node && node !== camera) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
    if (node && node !== camera && !camera.contains(node)) {
      const cameraRect = camera.getBoundingClientRect();
      const scale = cameraRect.width / cameraWidth || 1;
      const elementRect = element.getBoundingClientRect();
      return {
        x: (elementRect.left + elementRect.width / 2 - cameraRect.left) / scale,
        y: (elementRect.top + elementRect.height / 2 - cameraRect.top) / scale,
      };
    }
  }

  x += element.offsetWidth / 2;
  y += element.offsetHeight / 2;
  return { x, y };
}

function getElementCenterFromRect(element, camera, canvasScale) {
  const cameraWidth = camera.offsetWidth || SCENE_WIDTH;
  const cameraRect = camera.getBoundingClientRect();
  const scale = cameraRect.width / cameraWidth || canvasScale;
  const elementRect = element.getBoundingClientRect();

  return {
    x: (elementRect.left + elementRect.width / 2 - cameraRect.left) / scale,
    y: (elementRect.top + elementRect.height / 2 - cameraRect.top) / scale,
  };
}

function getZoomTargetCenter(camera, viewportEl, canvasScale, isItemZoomed) {
  const cameraWidth = camera.offsetWidth || SCENE_WIDTH;
  const cameraHeight = camera.offsetHeight || SCENE_HEIGHT;

  if (viewportEl?.classList.contains('scene-viewport--pan') && isItemZoomed) {
    return {
      x: (viewportEl.scrollLeft + viewportEl.clientWidth / 2) / canvasScale,
      y: cameraHeight / 2,
    };
  }

  if (viewportEl) {
    const cameraRect = camera.getBoundingClientRect();
    const viewportRect = viewportEl.getBoundingClientRect();
    const scale = cameraRect.width / cameraWidth || canvasScale;

    return {
      x: (viewportRect.left + viewportRect.width / 2 - cameraRect.left) / scale,
      y: (viewportRect.top + viewportRect.height / 2 - cameraRect.top) / scale,
    };
  }

  return {
    x: cameraWidth / 2,
    y: cameraHeight / 2,
  };
}

export default function getZoomOrigin(element) {
  const camera = element.closest('.scene-camera');
  if (!camera) return null;

  const viewportEl = element.closest('.scene-viewport');
  const canvasScale = getCanvasScale(element);
  const isItemZoomed = camera.classList.contains('scene-camera--item-zoom');

  const { x: originX, y: originY } = isItemZoomed
    ? getElementCenterInCamera(element, camera)
    : getElementCenterFromRect(element, camera, canvasScale);

  const { x: centerX, y: centerY } = getZoomTargetCenter(
    camera,
    viewportEl,
    canvasScale,
    isItemZoomed
  );

  return {
    x: originX,
    y: originY,
    translateX: centerX - originX,
    translateY: centerY - originY,
  };
}
