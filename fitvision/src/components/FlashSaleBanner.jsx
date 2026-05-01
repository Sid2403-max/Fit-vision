import { useState, useEffect } from 'react';

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="flash-sale-banner">
      <div className="flash-sale-left">
        <span className="flash-icon">⚡</span>
        <div>
          <div className="flash-title">Deal Mela — Flash Sale</div>
          <div className="flash-subtitle">Incredible deals on Fashion + AI Style DNA enabled</div>
        </div>
      </div>
      <div className="flash-sale-right">
        <span className="flash-ends">Sale ends in:</span>
        <div className="countdown">
          <div className="countdown-block">
            <span className="countdown-num">{pad(timeLeft.hours)}</span>
            <span className="countdown-label">HRS</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-block">
            <span className="countdown-num">{pad(timeLeft.minutes)}</span>
            <span className="countdown-label">MIN</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-block">
            <span className="countdown-num">{pad(timeLeft.seconds)}</span>
            <span className="countdown-label">SEC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
