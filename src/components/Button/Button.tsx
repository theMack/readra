import React from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'default' | 'square' | 'circle';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  grouped?: boolean;
  groupPosition?: 'start' | 'middle' | 'end';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'default',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  startIcon,
  endIcon,
  icon,
  loading = false,
  grouped = false,
  groupPosition,
}) => {
  const isIconOnly = icon && !children;

  if (isIconOnly && !ariaLabel) {
    console.warn('Icon-only buttons should have an ariaLabel for accessibility');
  }

  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    shape !== 'default' && `button--${shape}`,
    fullWidth ? 'button--full-width' : '',
    loading ? 'button--loading' : '',
    isIconOnly ? 'button--icon-only' : '',
    grouped ? 'button--grouped' : '',
    groupPosition && `button--grouped-${groupPosition}`,
    className
  ].filter(Boolean).join(' ');

  const ariaAttributes: React.AriaAttributes = {};

  if (isIconOnly && ariaLabel) {
    ariaAttributes['aria-label'] = ariaLabel;
  }

  if (loading) {
    ariaAttributes['aria-busy'] = true;
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...ariaAttributes}
    >
      {loading && <span className="button__loader" aria-hidden="true"></span>}

      {!loading && isIconOnly && (
        <span className="button__icon">{icon}</span>
      )}

      {!loading && !isIconOnly && (
        <>
          {startIcon && (
            <span className="button__icon button__icon--start">{startIcon}</span>
          )}

          <span className="button__text">{children}</span>

          {endIcon && (
            <span className="button__icon button__icon--end">{endIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
