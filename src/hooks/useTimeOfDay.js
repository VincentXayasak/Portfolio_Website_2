import { useEffect, useState } from 'react';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const smoothstep = (t) => t * t * (3 - 2 * t);

export function computeSkyState(date = new Date()) {
  const t = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  let dayAmount = 0;
  if (t >= 7 && t < 17) {
    dayAmount = 1;
  } else if (t >= 5 && t < 7) {
    dayAmount = smoothstep((t - 5) / 2);
  } else if (t >= 17 && t < 20) {
    dayAmount = 1 - smoothstep((t - 17) / 3);
  }

  let phase = 'night';
  if (dayAmount > 0.9) phase = 'day';
  else if (dayAmount > 0.1) phase = t < 12 ? 'dawn' : 'dusk';

  const sunVisible = t >= 5.5 && t < 19 && dayAmount > 0.08;
  const sunArc = clamp((t - 6) / 12, 0, 1);
  const sunX = 18 + sunArc * 58;
  const sunY = 62 - Math.sin(sunArc * Math.PI) * 38;

  const moonVisible = dayAmount < 0.92;
  const moonX = 100 - sunX * 0.55;
  const moonY = 22 + (1 - dayAmount) * 6;

  const skyTop = mixColor('#0a1228', '#5eb3ff', dayAmount);
  const skyMid = mixColor('#1a2540', '#87ceeb', dayAmount);
  const skyBottom = mixColor('#2a3a5c', '#cce8ff', dayAmount);

  const windowGlow = dayAmount > 0.5
    ? `rgba(255, 230, 160, ${lerp(0.08, 0.22, dayAmount)})`
    : `rgba(120, 150, 210, ${lerp(0.18, 0.06, dayAmount)})`;

  return {
    phase,
    dayAmount,
    sunVisible,
    sunOpacity: sunVisible ? clamp(dayAmount * 1.15, 0.15, 1) : 0,
    sunX,
    sunY,
    moonVisible,
    moonOpacity: moonVisible ? clamp(1 - dayAmount * 0.95, 0.12, 1) : 0,
    moonX,
    moonY,
    starsOpacity: clamp((1 - dayAmount) * 1.3, 0, 1),
    cloudsOpacity: clamp(lerp(0.15, 0.95, dayAmount), 0.1, 0.95),
    birdsOpacity: dayAmount > 0.25 && dayAmount < 0.98 ? clamp(dayAmount, 0, 1) : 0,
    skyTop,
    skyMid,
    skyBottom,
    windowGlow,
  };
}

function mixColor(nightHex, dayHex, amount) {
  const n = hexToRgb(nightHex);
  const d = hexToRgb(dayHex);
  const r = Math.round(lerp(n.r, d.r, amount));
  const g = Math.round(lerp(n.g, d.g, amount));
  const b = Math.round(lerp(n.b, d.b, amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export default function useTimeOfDay() {
  const [sky, setSky] = useState(() => computeSkyState());

  useEffect(() => {
    const update = () => setSky(computeSkyState());
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return sky;
}
