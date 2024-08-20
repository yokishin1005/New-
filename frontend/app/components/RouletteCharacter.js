// app/components/RouletteCharacter.js
import React from 'react';

const RouletteCharacter = ({ state }) => {
  const getExpression = () => {
    switch (state) {
      case 'idle':
        return (
          <g>
            <path d="M20 28 Q25 32 30 28" stroke="black" strokeWidth="2" fill="none" />
            <circle cx="18" cy="22" r="3" fill="black" />
            <circle cx="32" cy="22" r="3" fill="black" />
          </g>
        );
      case 'spinning':
        return (
          <g>
            <path d="M20 28 Q25 32 30 28" stroke="black" strokeWidth="2" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 30"
                to="360 25 30"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
            <circle cx="18" cy="22" r="3" fill="black">
              <animate attributeName="r" values="3;1;3" dur="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="32" cy="22" r="3" fill="black">
              <animate attributeName="r" values="3;1;3" dur="0.5s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      case 'talking':
        return (
          <g>
            <path d="M20 28 Q25 30 30 28" stroke="black" strokeWidth="2" fill="none">
              <animate attributeName="d" values="M20 28 Q25 30 30 28;M20 30 Q25 28 30 30;M20 28 Q25 30 30 28" dur="1s" repeatCount="indefinite" />
            </path>
            <circle cx="18" cy="22" r="3" fill="black" />
            <circle cx="32" cy="22" r="3" fill="black" />
          </g>
        );
      default:
        return (
          <g>
            <path d="M20 28 Q25 32 30 28" stroke="black" strokeWidth="2" fill="none" />
            <circle cx="18" cy="22" r="3" fill="black" />
            <circle cx="32" cy="22" r="3" fill="black" />
          </g>
        );
    }
  };

  return (
    <svg width="120" height="120" viewBox="0 0 60 60">
      {/* Body */}
      <ellipse cx="30" cy="35" rx="25" ry="20" fill="#FF0000" />
      
      {/* Head bump */}
      <path d="M30 15 Q35 5 40 15" fill="#FFD700" />
      
      {/* Arms */}
      <path d="M5 35 Q0 25 5 20" stroke="#FF0000" strokeWidth="4" fill="none" />
      <path d="M55 35 Q60 25 55 20" stroke="#FF0000" strokeWidth="4" fill="none" />
      
      {/* Legs */}
      <rect x="20" y="52" width="8" height="8" fill="#000080" />
      <rect x="32" y="52" width="8" height="8" fill="#000080" />
      
      {/* Face */}
      {getExpression()}
    </svg>
  );
};

export default RouletteCharacter;