// src/components/Card/Card.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { vi } from 'vitest'; // Use vitest instead of jest

describe('Card Component', () => {
  // Basic rendering tests
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  // ...other tests...

  // Interaction tests
  it('calls onClick handler when clicked and interactive', () => {
    const handleClick = vi.fn(); // Use vi.fn() instead of jest.fn()
    render(
      <Card interactive onClick={handleClick}>
        Interactive Card
      </Card>
    );
    
    fireEvent.click(screen.getByText('Interactive Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when not interactive', () => {
    const handleClick = vi.fn(); // Use vi.fn() instead of jest.fn()
    render(
      <Card onClick={handleClick}>
        Non-Interactive Card
      </Card>
    );
    
    fireEvent.click(screen.getByText('Non-Interactive Card'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onClick handler when pressing Enter on interactive card', () => {
    const handleClick = vi.fn(); // Use vi.fn() instead of jest.fn()
    render(
      <Card interactive onClick={handleClick}>
        Interactive Card
      </Card>
    );
    
    const card = screen.getByText('Interactive Card').closest('.card');
    fireEvent.keyDown(card!, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler when pressing Space on interactive card', () => {
    const handleClick = vi.fn(); // Use vi.fn() instead of jest.fn()
    render(
      <Card interactive onClick={handleClick}>
        Interactive Card
      </Card>
    );
    
    const card = screen.getByText('Interactive Card').closest('.card');
    fireEvent.keyDown(card!, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ...other tests...
});