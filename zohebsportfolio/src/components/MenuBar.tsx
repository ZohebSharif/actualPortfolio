import React, { useState, useEffect } from 'react';

const MenuBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="macos-menubar">
      <div className="flex items-center gap-1 flex-1">
        <span className="macos-menubar-item font-semibold">
          <img src="/Apple_logo_black.svg" alt="Apple" className="inline -mt-0.5" style={{ width: 13, height: 13, filter: 'invert(1)', transform: 'scaleX(0.85)' }} />
        </span>
        <span className="macos-menubar-item font-semibold">Finder</span>
        <span className="macos-menubar-item">File</span>
        <span className="macos-menubar-item">Edit</span>
        <span className="macos-menubar-item">View</span>
        <span className="macos-menubar-item">Window</span>
        <span className="macos-menubar-item">Help</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <img src="/medium-battery.svg" alt="Battery" style={{ width: 32, height: 18, filter: 'invert(1)', opacity: 0.85 }} />
        <img src="/ios-wifi-2.svg" alt="Wi-Fi" style={{ width: 18, height: 18, filter: 'invert(1)', opacity: 0.85 }} />
        <span style={{ color: 'rgba(255,255,255,0.9)' }}>{dateStr}</span>
        <span style={{ color: 'rgba(255,255,255,0.9)' }}>{time}</span>
      </div>
    </div>
  );
};

export default MenuBar;
