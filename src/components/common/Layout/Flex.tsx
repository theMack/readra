import React from 'react';
import './Flex.scss';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FlexProps {
  /**
   * Content to be rendered inside the flex container
   */
  children: React.ReactNode;

  /**
   * Direction of the flex items
   * @default 'row'
   */
  direction?: FlexDirection;

  /**
   * Whether items should wrap or not
   * @default 'nowrap'
   */
  wrap?: FlexWrap;

  /**
   * Horizontal alignment of items
   * @default 'flex-start'
   */
  justifyContent?: FlexJustify;

  /**
   * Vertical alignment of items
   * @default 'flex-start'
   */
  alignItems?: FlexAlign;

  /**
   * Alignment of multiple lines
   * @default 'stretch'
   */
  alignContent?: FlexAlign;

  /**
   * Space between items
   * @default 'none'
   */
  gap?: FlexGap;

  /**
   * Space between items horizontally
   * @default 'none'
   */
  rowGap?: FlexGap;

  /**
   * Space between items vertically
   * @default 'none'
   */
  columnGap?: FlexGap;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * HTML element to render
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Additional props to pass to the component
   */
  [key: string]: any;
}

/**
 * Flex component
 * 
 * A layout component that uses flexbox to arrange content.
 * Provides a simple API for common flexbox layouts.
 */
const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  alignContent = 'stretch',
  gap = 'none',
  rowGap = 'none',
  columnGap = 'none',
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const flexClasses = [
    'flex',
    `flex--direction-${direction}`,
    `flex--wrap-${wrap}`,
    `flex--justify-${justifyContent}`,
    `flex--align-items-${alignItems}`,
    `flex--align-content-${alignContent}`,
    gap !== 'none' ? `flex--gap-${gap}` : '',
    rowGap !== 'none' ? `flex--row-gap-${rowGap}` : '',
    columnGap !== 'none' ? `flex--column-gap-${columnGap}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={flexClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Flex;