import React from 'react';
import './TelemetryTiles.css';

export default function TelemetryTiles() {
  const tiles = [
    {
      icon: '🎥',
      title: 'Auto Clip Detection',
      desc: 'AI cuts uploaded streams in <90s',
      color: 'red'
    },
    {
      icon: '💰',
      title: 'Sponsorship CRM',
      desc: 'Deliverables tracked with auto-invoicing',
      color: 'orange'
    },
    {
      icon: '⚡',
      title: 'Global CDN Relays',
      desc: '0% frame-drop ingest guaranteed',
      color: 'yellow'
    }
  ];

  return (
    <div className="telemetry-tiles">
      {tiles.map((tile, index) => (
        <div key={index} className="telemetry-tile">
          <div className={`telemetry-tile__icon telemetry-tile__icon--${tile.color}`}>
            {tile.icon}
          </div>
          <div className="telemetry-tile__content">
            <h4 className="telemetry-tile__title">{tile.title}</h4>
            <p className="telemetry-tile__desc">{tile.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
