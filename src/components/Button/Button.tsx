// src/components/Button/Button.tsx
import React from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'default' | 'square' | 'circle';

export interface ButtonProps {
  /**
   * Button content
   */
  children?: React.ReactNode;
  
  /**
   * Button visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Button shape
   * @default 'default'
   */
  shape?: ButtonShape;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Function to call when button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * HTML button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Accessible label for the button (for screen readers)
   * Required if button is icon-only
   */
  ariaLabel?: string;
  
  /**
   * Icon to display before text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display after text
   */
  endIcon?: React.ReactNode;
  
  /**
   * Icon to use for icon-only button
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether this button is part of a button group
   * @default false
   */
  grouped?: boolean;
  
  /**
   * Button's position in a group (if part of a button group)
   */
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
  // Check if it's an icon-only button
  const isIconOnly = icon && !children;
  
  // Ensure aria-label is provided for icon-only buttons
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

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={isIconOnly ? ariaLabel : undefined}
      aria-busy={loading}
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