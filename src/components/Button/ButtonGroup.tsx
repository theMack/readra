// src/components/Button/ButtonGroup.tsx
import React, { Children, cloneElement, isValidElement, ReactElement } from 'react';
import Button, { ButtonProps } from './Button';
import './ButtonGroup.scss';

export interface ButtonGroupProps {
  /**
   * Buttons to be grouped
   */
  children: React.ReactNode;
  
  /**
   * Button visual style variant (applies to all buttons in the group)
   */
  variant?: ButtonProps['variant'];
  
  /**
   * Button size (applies to all buttons in the group)
   */
  size?: ButtonProps['size'];
  
  /**
   * Whether the buttons should be displayed vertically
   * @default false
   */
  vertical?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Whether the button group should take full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  variant,
  size,
  vertical = false,
  className = '',
  fullWidth = false,
}) => {
  // Get valid Button children
  const buttonChildren = Children.toArray(children).filter(child => 
    isValidElement(child) && typeof child.type !== 'string'
  );
  
  const buttonCount = buttonChildren.length;
  
  // Map children to add grouped properties
  const groupedButtons = Children.map(children, (child, index) => {
    // Skip non-element children
    if (!isValidElement(child)) return child;
    
    // Apply grouped props only to components, not HTML elements
    if (typeof child.type === 'string') return child;
    
    // Try to cast to Button props type
    try {
      // Determine position in group
      let groupPosition: ButtonProps['groupPosition'];
      if (buttonCount === 1) {
        groupPosition = undefined; // Single button doesn't need position
      } else if (index === 0) {
        groupPosition = 'start';
      } else if (index === buttonCount - 1) {
        groupPosition = 'end';
      } else {
        groupPosition = 'middle';
      }
      
      // Add props to the element
      const additionalProps: Partial<ButtonProps> = {
        grouped: true,
        groupPosition,
        variant: child.props.variant || variant,
        size: child.props.size || size,
      };
      
      return cloneElement(child, additionalProps);
    } catch (e) {
      // If any issues occur, return the child unchanged
      return child;
    }
  });
  
  const groupClasses = [
    'button-group',
    vertical ? 'button-group--vertical' : '',
    fullWidth ? 'button-group--full-width' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses} role="group">
      {groupedButtons}
    </div>
  );
};

export default ButtonGroup;