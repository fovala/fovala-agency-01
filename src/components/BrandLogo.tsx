import React from 'react';

interface BrandLogoProps {
  className?: string;
  heightClass?: string;
  alt?: string;
  variant?: 'hero' | 'white' | 'lime-white';
}

/**
 * Full Fovala Lockup (Icon + Wordmark Text).
 * Reserved strictly for Header and Footer.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  heightClass = 'h-7 sm:h-8',
  alt = 'Fovala Digital Agency',
  variant = 'hero',
}) => {
  const srcMap: Record<NonNullable<BrandLogoProps['variant']>, string> = {
    hero: '/assets/fovala-lockup-hero.png',
    white: '/assets/fovala-lockup-white.png',
    'lime-white': '/assets/fovala-lockup.png',
  };

  return (
    <img
      src={srcMap[variant]}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`${heightClass} w-auto object-contain select-none ${className}`}
    />
  );
};

interface BrandIconProps {
  className?: string;
  sizeClass?: string;
  alt?: string;
  variant?: 'hero' | 'white' | 'lavender' | 'dark' | 'lime';
}

/**
 * Standalone Fovala Icon Mark (no text).
 * Used across sections, orbital hubs, loader, and modals.
 */
export const BrandIcon: React.FC<BrandIconProps> = ({
  className = '',
  sizeClass = 'w-8 h-8',
  alt = 'Fovala Icon',
  variant = 'hero',
}) => {
  const srcMap: Record<NonNullable<BrandIconProps['variant']>, string> = {
    hero: '/assets/fovala-icon-hero.png',
    white: '/assets/fovala-icon-white.png',
    lavender: '/assets/fovala-icon-lavender.png',
    dark: '/assets/fovala-icon-dark.png',
    lime: '/assets/fovala-icon-lime.png',
  };

  return (
    <img
      src={srcMap[variant]}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`${sizeClass} object-contain select-none ${className}`}
    />
  );
};
