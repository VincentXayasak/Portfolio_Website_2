import { useEffect, useState } from 'react';
import './DeskClock.css';

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DeskClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="room__desk-clock">
      <div className="room__desk-clock-body">
        <div className="room__desk-clock-screen">
          <span className="room__desk-clock-display">{formatTime(time)}</span>
        </div>
        <div className="room__desk-clock-feet">
          <span /><span />
        </div>
      </div>
    </div>
  );
}
