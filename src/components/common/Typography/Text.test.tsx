// src/components/common/Typography/Text.tsx
import React from 'react';
import './Typography.scss';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
export type TextVariant = 'default' | 'code' | 'caption' | 'quote' | 'label';
export type TextDecoration = 'none' | 'underline' | 'line-through';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type TextElement = 'span' | 'strong' | 'em' | 'mark' | 'code' | 'del' | 'ins' | 'label' | 'time' | 'p';

export interface TextProps {
  /**
   * Font size variant
   */
  size?: TextSize;
  /**
   * Font weight
   */
  weight?: TextWeight;
  /**
   * Visual style variant
   */
  variant?: TextVariant;
  /**
   * Text decoration (underline, etc.)
   */
  decoration?: TextDecoration;
  /**
   * Text transformation (uppercase, etc.)
   */
  transform?: TextTransform;
  /**
   * Whether text should wrap or truncate with ellipsis
   */
  truncate?: boolean;
  /**
   * Optional color variant (from design tokens)
   */
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info';
  /**
   * Optional custom className
   */
  className?: string;
  /**
   * HTML element to render
   */
  as?: TextElement;
  /**
   * Child elements or text
   */
  children: React.ReactNode;
  /**
   * Custom data-testid for testing
   */
  'data-testid'?: string;
  /**
   * Additional props to spread to the text element
   */
  [x: string]: any;
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  weight = 'regular',
  variant = 'default',
  decoration = 'none',
  transform = 'none',
  truncate = false,
  color,
  className = '',
  as = 'span',
  children,
  'data-testid': dataTestId,
  ...rest
}) => {
  // Determine appropriate element based on variant if not explicitly specified
  const Element = determineElement(as, variant);

  const classes = [
    'readra-text',
    `readra-text--${size}`,
    `readra-text--${weight}`,
    `readra-text--${variant}`,
    `readra-text--decoration-${decoration}`,
    `readra-text--transform-${transform}`,
    truncate ? 'readra-text--truncate' : '',
    color ? `readra-text--color-${color}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Element
      className={classes}
      data-testid={dataTestId || 'text'}
      {...rest}
    >
      {children}
    </Element>
  );
};

// Helper to determine appropriate element based on variant and explicitly requested element
function determineElement(requested: TextElement, variant: TextVariant): keyof JSX.IntrinsicElements {
  // If explicitly requested, use that
  if (requested !== 'span') {
    return requested;
  }
  
  // Otherwise, use semantic default based on variant
  switch (variant) {
    case 'code': return 'code';
    case 'caption': return 'span';
    case 'quote': return 'em';
    case 'label': return 'label';
    default: return 'span';
  }
}

export default Text;