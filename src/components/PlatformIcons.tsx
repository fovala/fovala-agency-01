import React from 'react';
import type { PlatformId } from '../data/platforms';

interface PlatformIconProps {
  id: PlatformId;
  className?: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ id, className = 'w-7 h-7' }) => {
  switch (id) {
    case 'wordpress':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="#21759B" />
          <circle cx="32" cy="32" r="24.5" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.9" />
          <path
            d="M11.6 32c0 8.1 4.7 15.1 11.6 18.4L13.4 23.5c-1.1 2.6-1.8 5.4-1.8 8.5zm34.2-1c0-2.5-.9-4.3-1.7-5.7-1-1.7-2-3.1-2-4.8 0-1.9 1.4-3.6 3.4-3.6h.3C42.2 13.7 37.4 11.7 32 11.7c-7.1 0-13.4 3.6-17 9.1.5 0 .9.1 1.3.1 2.1 0 5.3-.3 5.3-.3 1.1-.1 1.2 1.5.1 1.6 0 0-1.1.1-2.3.2l7.3 21.8 4.4-13.2-3.1-8.6c-1.1-.1-2.1-.2-2.1-.2-1.1-.1-.9-1.7.1-1.6 0 0 3.3.3 5.3.3 2.1 0 5.3-.3 5.3-.3 1.1-.1 1.2 1.5.1 1.6 0 0-1.1.1-2.3.2l7.2 21.6 2-6.7c.9-2.8 1.6-4.9 1.6-6.5zm-13.4 2.7l-6 17.5c1.8.5 3.7.8 5.7.8 2.3 0 4.6-.4 6.7-1.1-.1-.1-.1-.2-.2-.3l-6.2-16.9zm17.7-9.6c.1.7.1 1.4.1 2.2 0 2.2-.4 4.7-1.7 7.8l-6.7 19.3c6.5-3.8 10.9-10.8 10.9-18.9 0-3.7-.9-7.2-2.6-10.4z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'shopify':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M48.5 16.4c-.1-.7-.7-1.1-1.2-1.1-.5 0-4.2-.1-4.2-.1s-3.3-3.2-3.7-3.5c-.4-.4-1.1-.3-1.4-.2l-1.9.6c-1.1-3.2-3.1-6.1-6.5-6.1h-.3c-.9-1.2-2.1-1.7-3.1-1.7-7.7 0-11.4 9.6-12.5 14.5l-5.7 1.8c-1.7.5-1.8.6-2 2.2C5.8 24 2 53.2 2 53.2l36.8 6.8 19.2-4.2S48.6 17.1 48.5 16.4z"
            fill="#95BF47"
          />
          <path
            d="M47.3 15.3c-.5 0-4.2-.1-4.2-.1s-3.3-3.2-3.7-3.5c-.1-.1-.3-.2-.5-.2V60l19.1-4.2S48.6 17.1 48.5 16.4c-.1-.7-.7-1.1-1.2-1.1z"
            fill="#5E8E3E"
          />
          <path
            d="M29.4 13.7c0-1-.2-2-.5-2.8-1.9.4-3.7 1.1-5.1 2.4-.9.9-1.6 2-2.1 3.3l4.6-1.4c1-.3 2.1-.9 3.1-1.5z"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />
          <path
            d="M32.4 26.8l-2 6s-1.8-.9-3.9-.8c-3.1.2-3.1 2.2-3.1 2.7.2 2.7 7.3 3.3 7.7 9.6.3 5-2.6 8.4-6.9 8.6-5.1.3-7.9-2.7-7.9-2.7l1.1-4.6s2.8 2.1 5 2c1.4-.1 2-1.3 1.9-2.2-.2-3.5-6-3.3-6.4-9.1-.3-4.9 2.9-9.8 10.1-10.3 2.8-.2 4.4.6 4.4.6z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'webflow':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4" width="56" height="56" rx="14" fill="#146EF5" />
          <path
            d="M49.5 21L41.8 43h-7.2l3.2-10.2h-.1C34.9 38.4 29.8 42.1 23.1 43v-7.5c4.2-.8 7.5-3.4 9.5-7H22.8v-7.5h13.5l-1.3 4.8h.1c2.2-3 5.7-4.8 9.9-4.8h4.5z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'wix':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="14" width="56" height="36" rx="10" fill="#16161D" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.5" />
          <path
            d="M12.5 24l3.5 16h2.8l2.4-10.1L23.6 40h2.8l3.5-16h-2.9l-2.1 10.7L22.5 24h-2.6l-2.4 10.7L15.4 24h-2.9zm21.4 0v16h2.9V24h-2.9zm5.9 0l4.6 7.8L39.6 40h3.3l3.1-5.5L49.1 40h3.4l-4.9-8.2 4.6-7.8h-3.3l-2.9 5.1-2.9-5.1h-3.3z"
            fill="#FFFFFF"
          />
          <circle cx="35.35" cy="20.6" r="1.5" fill="#FACC15" />
        </svg>
      );
    case 'framer':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M16 10h32v16H32L16 10z" fill="#00AAFF" />
          <path d="M16 26h16l16 16H16V26z" fill="#0055FF" />
          <path d="M16 42h16v14L16 42z" fill="#0033CC" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M23 54a8 8 0 0 0 8-8v-8h-8a8 8 0 0 0 0 16z" fill="#0ACF83" />
          <path d="M15 30a8 8 0 0 1 8-8h8v16h-8a8 8 0 0 1-8-8z" fill="#A259FF" />
          <path d="M15 14a8 8 0 0 1 8-8h8v16h-8a8 8 0 0 1-8-8z" fill="#F24E1E" />
          <path d="M31 6h8a8 8 0 1 1 0 16h-8V6z" fill="#FF7262" />
          <path d="M47 30a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" fill="#1ABCFE" />
        </svg>
      );
  }
};
