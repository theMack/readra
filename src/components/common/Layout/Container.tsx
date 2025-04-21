import React from 'react';
import './Container.scss';

export interface ContainerProps {
  /**
   * Content to be rendered inside the container
   */
  children: React.ReactNode;

  /**
   * Maximum width of the container
   * @default 'lg'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';

  /**
   * Add padding to the container
   * @default true
   */
  padding?: boolean;

  /**
   * Center the container horizontally
   * @default true
   */
  centered?: boolean;

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
 * Container component
 * 
 * A layout component that constrains content width and provides consistent
 * padding across different screen sizes.
 */
const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = true,
  centered = true,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const containerClasses = [
    'container',
    `container--${maxWidth}`,
    padding ? 'container--padding' : '',
    centered ? 'container--centered' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Container;