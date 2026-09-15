import React from 'react';

interface TouchCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'white' | 'sand' | 'sage' | 'urgent';
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const TouchCard: React.FC<TouchCardProps> = ({
  children,
  onClick,
  variant = 'white',
  padding = '20px',
  className = '',
  style,
  ariaLabel,
}) => {
  let bg = '#FFFFFF';
  let border = '2px solid #E2DDD5';

  if (variant === 'sand') {
    bg = '#F4F1E9';
    border = '2px solid #DCD6CC';
  } else if (variant === 'sage') {
    bg = '#EAF4F4';
    border = '2px solid #C4DEDB';
  } else if (variant === 'urgent') {
    bg = '#FEF3F2';
    border = '2px solid #FECDCA';
  }

  const isClickable = Boolean(onClick);

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={className}
      style={{
        backgroundColor: bg,
        border,
        borderRadius: '20px',
        padding,
        boxShadow: 'var(--shadow-card)',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
