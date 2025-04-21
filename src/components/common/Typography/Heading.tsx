// src/components/common/Typography/Heading.tsx
import React from 'react';
import './Typography.scss';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'display' | 'title' | 'subtitle' | 'section' | 'regular';
export type HeadingAlignment = 'left' | 'center' | 'right';
export type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export interface HeadingProps {
  /**
   * The heading level (h1-h6) which determines semantic meaning
   */
  level: HeadingLevel;
  /**
   * Visual style variant which can be different from semantic level
   */
  variant?: HeadingVariant;
  /**
   * Text alignment within the heading
   */
  alignment?: HeadingAlignment;
  /**
   * Font weight
   */
  weight?: HeadingWeight;
  /**
   * Whether to add bottom margin
   */
  withMargin?: boolean;
  /**
   * Optional custom className
   */
  className?: string;
  /**
   * Child elements or text
   */
  children: React.ReactNode;
  /**
   * Custom data-testid for testing
   */
  'data-testid'?: string;
  /**
   * Additional props to spread to the heading element
   */
  [x: string]: any;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  variant,
  alignment = 'left',
  weight = 'bold',
  withMargin = true,
  className = '',
  children,
  'data-testid': dataTestId,
  ...rest
}) => {
  // If variant is not specified, default to semantic equivalent
  const headingVariant = variant || getDefaultVariantForLevel(level);

  const classes = [
    'readra-heading',
    `readra-heading--h${level}`,
    `readra-heading--${headingVariant}`,
    `readra-heading--${alignment}`,
    `readra-heading--${weight}`,
    withMargin ? 'readra-heading--with-margin' : '',
    className,
  ].filter(Boolean).join(' ');

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag 
      className={classes} 
      data-testid={dataTestId || `heading-h${level}`}
      {...rest}
    >
      {children}
    </HeadingTag>
  );
};

// Helper to determine default variant based on heading level
function getDefaultVariantForLevel(level: HeadingLevel): HeadingVariant {
  switch (level) {
    case 1: return 'display';
    case 2: return 'title';
    case 3: return 'subtitle';
    case 4: return 'section';
    default: return 'regular';
  }
}

export default Heading;