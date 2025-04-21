// src/components/common/Typography/Paragraph.tsx
import React from 'react';
import './Typography.scss';

export type ParagraphSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ParagraphAlignment = 'left' | 'center' | 'right' | 'justify';
export type ParagraphWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export interface ParagraphProps {
  /**
   * Font size variant
   */
  size?: ParagraphSize;
  /**
   * Text alignment
   */
  alignment?: ParagraphAlignment;
  /**
   * Font weight
   */
  weight?: ParagraphWeight;
  /**
   * Line height multiplier
   */
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /**
   * Whether the paragraph should have margin bottom
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
   * Optional emphasized text (displayed in a highlighted style)
   */
  emphasized?: boolean;
  /**
   * Custom data-testid for testing
   */
  'data-testid'?: string;
  /**
   * Additional props to spread to the paragraph element
   */
  [x: string]: any;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  alignment = 'left',
  weight = 'regular',
  lineHeight = 'normal',
  withMargin = true,
  className = '',
  children,
  emphasized = false,
  'data-testid': dataTestId,
  ...rest
}) => {
  const classes = [
    'readra-paragraph',
    `readra-paragraph--${size}`,
    `readra-paragraph--${alignment}`,
    `readra-paragraph--${weight}`,
    `readra-paragraph--${lineHeight}`,
    withMargin ? 'readra-paragraph--with-margin' : '',
    emphasized ? 'readra-paragraph--emphasized' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <p
      className={classes}
      data-testid={dataTestId || 'paragraph'}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Paragraph;