import React from 'react';
import './Card.scss';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Optional card title
   */
  title?: string;
  
  /**
   * Optional card subtitle
   */
  subtitle?: string;
  
  /**
   * Optional image URL for the card
   */
  image?: string;
  
  /**
   * Optional alt text for the image
   */
  imageAlt?: string;
  
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Make card interactive (with hover effects and pointer cursor)
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Make card elevated with shadow
   * @default true
   */
  elevated?: boolean;
  
  /**
   * Whether the card should be bordered
   * @default false
   */
  bordered?: boolean;
  
  /**
   * Click handler for the card (only works when interactive is true)
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Custom tag for the card element
   * @default 'div'
   */
  as?: React.ElementType;
  
  /**
   * Optional header actions (e.g., dropdown menu, close button)
   */
  headerActions?: React.ReactNode;
  
  /**
   * Whether the card content should take up full height
   * @default false
   */
  fullHeight?: boolean;
  
  /**
   * Optional extra padding
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
  
  /**
   * Optional data attributes for testing
   */
  'data-testid'?: string;
}

/**
 * Card component for displaying content in a contained unit.
 * 
 * Features:
 * - Optional title, subtitle, and image
 * - Interactive mode for clickable cards
 * - Customizable elevation and borders
 * - Flexible content areas (body and footer)
 * - Accessibility support
 */
const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  footer,
  interactive = false,
  elevated = true,
  bordered = false,
  onClick,
  className = '',
  as: Component = 'div',
  headerActions,
  fullHeight = false,
  padding = 'medium',
  'data-testid': testId,
}) => {
  const cardClasses = [
    'card',
    elevated ? 'card--elevated' : '',
    bordered ? 'card--bordered' : '',
    interactive ? 'card--interactive' : '',
    fullHeight ? 'card--full-height' : '',
    `card--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (interactive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const cardProps = {
    className: cardClasses,
    onClick: handleClick,
    ...(interactive && {
      role: 'button',
      tabIndex: 0,
      onKeyDown: handleKeyDown,
    }),
    ...(testId && { 'data-testid': testId }),
  };

  return (
    <Component {...cardProps}>
      {image && (
        <div className="card__image-container">
          <img 
            src={image} 
            alt={imageAlt || title || 'Card image'} 
            className="card__image" 
          />
        </div>
      )}
      
      {(title || subtitle || headerActions) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {headerActions && (
            <div className="card__header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="card__body">{children}</div>
      
      {footer && (
        <div className="card__footer">{footer}</div>
      )}
    </Component>
  );
};

export default Card;