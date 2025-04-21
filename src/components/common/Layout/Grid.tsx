import React from 'react';
import './Grid.scss';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';

export interface GridProps {
  /**
   * Content to be rendered inside the grid container
   */
  children: React.ReactNode;

  /**
   * Number of columns in the grid
   * @default 12
   */
  columns?: GridColumns;

  /**
   * Number of columns in the grid on small screens
   */
  smColumns?: GridColumns;

  /**
   * Number of columns in the grid on medium screens
   */
  mdColumns?: GridColumns;

  /**
   * Number of columns in the grid on large screens
   */
  lgColumns?: GridColumns;

  /**
   * Number of columns in the grid on extra large screens
   */
  xlColumns?: GridColumns;

  /**
   * Space between grid items
   * @default 'md'
   */
  gap?: GridGap;

  /**
   * Space between grid rows
   */
  rowGap?: GridGap;

  /**
   * Space between grid columns
   */
  columnGap?: GridGap;

  /**
   * Horizontal alignment of grid items
   */
  justifyItems?: GridAlign;

  /**
   * Vertical alignment of grid items
   */
  alignItems?: GridAlign;

  /**
   * Horizontal distribution of columns
   */
  justifyContent?: GridJustify;

  /**
   * Vertical distribution of rows
   */
  alignContent?: GridJustify;

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
 * Grid component
 * 
 * A layout component that uses CSS Grid to create responsive layouts.
 * Supports different column configurations at different breakpoints.
 */
const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  smColumns,
  mdColumns,
  lgColumns,
  xlColumns,
  gap = 'md',
  rowGap,
  columnGap,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const gridClasses = [
    'grid',
    `grid--columns-${columns}`,
    smColumns ? `grid--sm-columns-${smColumns}` : '',
    mdColumns ? `grid--md-columns-${mdColumns}` : '',
    lgColumns ? `grid--lg-columns-${lgColumns}` : '',
    xlColumns ? `grid--xl-columns-${xlColumns}` : '',
    gap !== 'none' ? `grid--gap-${gap}` : '',
    rowGap ? `grid--row-gap-${rowGap}` : '',
    columnGap ? `grid--column-gap-${columnGap}` : '',
    justifyItems ? `grid--justify-items-${justifyItems}` : '',
    alignItems ? `grid--align-items-${alignItems}` : '',
    justifyContent ? `grid--justify-content-${justifyContent}` : '',
    alignContent ? `grid--align-content-${alignContent}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={gridClasses} {...rest}>
      {children}
    </Component>
  );
};

/**
 * GridItem component for individual items within a Grid
 */
export interface GridItemProps {
  /**
   * Content to be rendered inside the grid item
   */
  children: React.ReactNode;

  /**
   * Number of columns this item should span
   * @default 1
   */
  span?: number;

  /**
   * Number of columns this item should span on small screens
   */
  smSpan?: number;

  /**
   * Number of columns this item should span on medium screens
   */
  mdSpan?: number;

  /**
   * Number of columns this item should span on large screens
   */
  lgSpan?: number;

  /**
   * Number of columns this item should span on extra large screens
   */
  xlSpan?: number;

  /**
   * Starting column for this item
   */
  startColumn?: number;

  /**
   * Ending column for this item
   */
  endColumn?: number;

  /**
   * Row span
   */
  rowSpan?: number;

  /**
   * Horizontal alignment of this item
   */
  justifySelf?: GridAlign;

  /**
   * Vertical alignment of this item
   */
  alignSelf?: GridAlign;

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

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  smSpan,
  mdSpan,
  lgSpan,
  xlSpan,
  startColumn,
  endColumn,
  rowSpan,
  justifySelf,
  alignSelf,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const gridItemClasses = [
    'grid-item',
    `grid-item--span-${span}`,
    smSpan ? `grid-item--sm-span-${smSpan}` : '',
    mdSpan ? `grid-item--md-span-${mdSpan}` : '',
    lgSpan ? `grid-item--lg-span-${lgSpan}` : '',
    xlSpan ? `grid-item--xl-span-${xlSpan}` : '',
    startColumn ? `grid-item--start-${startColumn}` : '',
    endColumn ? `grid-item--end-${endColumn}` : '',
    rowSpan ? `grid-item--row-span-${rowSpan}` : '',
    justifySelf ? `grid-item--justify-self-${justifySelf}` : '',
    alignSelf ? `grid-item--align-self-${alignSelf}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={gridItemClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Grid;