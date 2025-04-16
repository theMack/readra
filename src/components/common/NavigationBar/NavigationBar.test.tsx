// src/components/common/NavigationBar/NavigationBar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

// Helper function to render with Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('NavigationBar Component', () => {
  it('renders the logo and navigation links', () => {
    renderWithRouter(<NavigationBar />);
    
    expect(screen.getByText('Readra')).toBeInTheDocument();
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Writers')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
  
  it('renders login and signup buttons when not logged in', () => {
    renderWithRouter(<NavigationBar isLoggedIn={false} />);
    
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
  
  it('renders user avatar when logged in', () => {
    renderWithRouter(
      <NavigationBar 
        isLoggedIn={true} 
        userProfile={{ name: 'John Doe', avatar: 'avatar.jpg' }} 
      />
    );
    
    const avatar = screen.getByAltText('John Doe\'s profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'avatar.jpg');
  });
  
  it('renders avatar placeholder with first letter when no avatar is provided', () => {
    renderWithRouter(
      <NavigationBar 
        isLoggedIn={true} 
        userProfile={{ name: 'John Doe' }} 
      />
    );
    
    expect(screen.getByText('J')).toBeInTheDocument();
  });
  
  it('calls onAccessibilityClick when accessibility button is clicked', () => {
    const handleAccessibilityClick = vi.fn();
    renderWithRouter(
      <NavigationBar onAccessibilityClick={handleAccessibilityClick} />
    );
    
    const accessibilityButton = screen.getByLabelText('Accessibility options');
    fireEvent.click(accessibilityButton);
    
    expect(handleAccessibilityClick).toHaveBeenCalledTimes(1);
  });
  
  it('toggles mobile menu when toggle button is clicked', () => {
    renderWithRouter(<NavigationBar />);
    
    // Initially menu should be closed
    const menu = document.querySelector('.navbar__menu');
    expect(menu).not.toHaveClass('navbar__menu--open');
    
    // Click the toggle button
    const toggleButton = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggleButton);
    
    // Menu should be open
    expect(menu).toHaveClass('navbar__menu--open');
    
    // Click toggle again
    fireEvent.click(toggleButton);
    
    // Menu should be closed again
    expect(menu).not.toHaveClass('navbar__menu--open');
  });
});