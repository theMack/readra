import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  test('renders logo and navigation links', () => {
    render(<NavigationBar />);
    
    // Logo should be present
    expect(screen.getByAltText('Readra')).toBeInTheDocument();
    
    // Navigation links
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('My Library')).toBeInTheDocument();
  });

  test('toggles mobile menu when mobile toggle is clicked', () => {
    render(<NavigationBar />);
    
    // Mobile menu should not be visible initially
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Click to open menu
    const mobileToggle = screen.getByLabelText('Open menu');
    fireEvent.click(mobileToggle);
    
    // Mobile menu should now be visible
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Toggle label should now be "Close menu"
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    
    // Click to close menu
    fireEvent.click(screen.getByLabelText('Close menu'));
    
    // Mobile menu should be removed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  
  test('calls accessibility toggle when accessibility button is clicked', () => {
    const mockToggle = jest.fn();
    render(<NavigationBar onAccessibilityToggle={mockToggle} />);
    
    const accessibilityButton = screen.getByLabelText('Accessibility settings');
    fireEvent.click(accessibilityButton);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
  
  test('closes mobile menu when clicking outside', () => {
    const { container } = render(<NavigationBar />);
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Open menu');
    fireEvent.click(mobileToggle);
    
    // Verify menu is open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click outside the menu (on the body)
    fireEvent.mouseDown(document.body);
    
    // Menu should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
  
  test('closes mobile menu when escape key is pressed', () => {
    render(<NavigationBar />);
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Open menu');
    fireEvent.click(mobileToggle);
    
    // Verify menu is open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Press ESC key
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Menu should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});