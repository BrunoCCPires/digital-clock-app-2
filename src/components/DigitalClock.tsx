import { useState, useEffect } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import './DigitalClock.css';

interface ClockPreferences {
  format24Hour: boolean;
  showSeconds: boolean;
  showDate: boolean;
  lastUpdated?: number;
}

export function DigitalClock() {
  const { useStorage } = useSubscribeDev();
  const [currentTime, setCurrentTime] = useState(new Date());

  const [preferences, setPreferences, syncStatus] = useStorage<ClockPreferences>('clock-preferences', {
    format24Hour: false,
    showSeconds: true,
    showDate: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    let period = '';

    if (!preferences.format24Hour) {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    let timeString = `${hoursStr}:${minutesStr}`;

    if (preferences.showSeconds) {
      timeString += `:${secondsStr}`;
    }

    return timeString + period;
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return currentTime.toLocaleDateString(undefined, options);
  };

  const toggleFormat = () => {
    setPreferences({
      ...preferences,
      format24Hour: !preferences.format24Hour,
      lastUpdated: Date.now(),
    });
  };

  const toggleSeconds = () => {
    setPreferences({
      ...preferences,
      showSeconds: !preferences.showSeconds,
      lastUpdated: Date.now(),
    });
  };

  const toggleDate = () => {
    setPreferences({
      ...preferences,
      showDate: !preferences.showDate,
      lastUpdated: Date.now(),
    });
  };

  return (
    <div className="clock-container">
      <div className="clock-display" role="timer" aria-live="polite" aria-atomic="true">
        <div className="time">{formatTime()}</div>
        {preferences.showDate && <div className="date">{formatDate()}</div>}
      </div>

      <div className="clock-controls">
        <h3>Clock Settings</h3>
        <div className="control-group">
          <label htmlFor="format-toggle">
            <input
              id="format-toggle"
              type="checkbox"
              checked={preferences.format24Hour}
              onChange={toggleFormat}
            />
            <span>24-hour format</span>
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="seconds-toggle">
            <input
              id="seconds-toggle"
              type="checkbox"
              checked={preferences.showSeconds}
              onChange={toggleSeconds}
            />
            <span>Show seconds</span>
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="date-toggle">
            <input
              id="date-toggle"
              type="checkbox"
              checked={preferences.showDate}
              onChange={toggleDate}
            />
            <span>Show date</span>
          </label>
        </div>

        {syncStatus !== 'synced' && (
          <div className="sync-status" role="status" aria-live="polite">
            <span className={`sync-indicator sync-${syncStatus}`}>
              {syncStatus === 'syncing' && '⟳ Syncing...'}
              {syncStatus === 'local' && '○ Local only'}
              {syncStatus === 'error' && '⚠ Sync error'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}