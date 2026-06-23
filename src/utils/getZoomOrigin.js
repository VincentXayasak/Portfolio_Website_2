import { SCENE_HEIGHT, SCENE_WIDTH } from '../hooks/useSceneScale';

function getZoomOriginFromRect(element, camera, cameraWidth, cameraHeight) {
  const elementRect = element.getBoundingClientRect();
  const cameraRect = camera.getBoundingClientRect();
  const scale = cameraRect.width / cameraWidth || 1;

  const originX = (elementRect.left + elementRect.width / 2 - cameraRect.left) / scale;
  const originY = (elementRect.top + elementRect.height / 2 - cameraRect.top) / scale;
  const centerX = cameraWidth / 2;
  const centerY = cameraHeight / 2;

  return {
    x: originX,
    y: originY,
    translateX: centerX - originX,
    translateY: centerY - originY,
  };
}

export default function getZoomOrigin(element) {
  const camera = element.closest('.scene-camera');
  if (!camera) return null;

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
      return getZoomOriginFromRect(element, camera, cameraWidth, cameraHeight);
    }
  }

  x += element.offsetWidth / 2;
  y += element.offsetHeight / 2;

  const centerX = cameraWidth / 2;
  const centerY = cameraHeight / 2;

  return {
    x,
    y,
    translateX: centerX - x,
    translateY: centerY - y,
  };
}
