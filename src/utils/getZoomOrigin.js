export default function getZoomOrigin(element) {
  const camera = element.closest('.scene-camera');
  if (!camera) return null;

  const elementRect = element.getBoundingClientRect();
  const cameraRect = camera.getBoundingClientRect();

  const originX = elementRect.left + elementRect.width / 2 - cameraRect.left;
  const originY = elementRect.top + elementRect.height / 2 - cameraRect.top;
  const centerX = cameraRect.width / 2;
  const centerY = cameraRect.height / 2;

  return {
    x: originX,
    y: originY,
    translateX: centerX - originX,
    translateY: centerY - originY,
  };
}
