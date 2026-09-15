import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'urgent' | 'sand' | 'ghost';
export type ButtonSize = 'normal' | 'senior-primary' | 'senior-critical' | 'sos';

interface SangamButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const SangamButton: React.FC<SangamButtonProps> = ({
  variant = 'primary',
  size = 'senior-primary',
  icon,
  children,
  ariaLabel,
  style,
  className = '',
  ...rest
}) => {
  let bg = '#17324D';
  let color = '#FFFFFF';
  let border = 'none';
  let minHeight = '56px';
  let fontSize = '18px';
  let fontWeight = 700;
  let padding = '14px 24px';
  let borderRadius = '16px';
  let boxShadow = 'var(--shadow-card)';

  if (variant === 'secondary') {
    bg = '#197278';
    color = '#FFFFFF';
  } else if (variant === 'urgent') {
    bg = '#B42318';
    color = '#FFFFFF';
    boxShadow = 'var(--shadow-urgent)';
  } else if (variant === 'sand') {
    bg = '#F4F1E9';
    color = '#17324D';
    border = '2px solid #E2DDD5';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = '#17324D';
    border = '2px solid #17324D';
    boxShadow = 'none';
  }

  if (size === 'normal') {
    minHeight = '44px';
    fontSize = '16px';
    padding = '10px 18px';
    borderRadius = '12px';
  } else if (size === 'senior-critical') {
    minHeight = '64px';
    fontSize = '20px';
    padding = '16px 28px';
    borderRadius = '20px';
  } else if (size === 'sos') {
    minHeight = '72px';
    fontSize = '22px';
    padding = '18px 32px';
    borderRadius = '24px';
    bg = '#B42318';
    color = '#FFFFFF';
    boxShadow = '0 6px 24px rgba(180, 35, 24, 0.4)';
  }

  return (
    <button
      {...rest}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className={`touch-target-senior ${className}`}
      style={{
        backgroundColor: bg,
        color,
        border,
        minHeight,
        fontSize,
        fontWeight,
        padding,
        borderRadius,
        boxShadow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        cursor: rest.disabled ? 'not-allowed' : 'pointer',
        opacity: rest.disabled ? 0.6 : 1,
        width: size === 'sos' || size === 'senior-critical' ? '100%' : undefined,
        ...style,
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
