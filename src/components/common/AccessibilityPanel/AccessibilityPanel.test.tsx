import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AccessibilityPanel from './AccessibilityPanel';
import { AccessibilityProvider } from '../../../contexts/AccessibilityContext';

// Mock the AccessibilityContext
const mockAccessibilityContext = {
  fontSize: 1,
  increaseFontSize: vi.fn(),
  decreaseFontSize: vi.fn(),
  resetFontSize: vi.fn(),
  highContrast: false,
  toggleHighContrast: vi.fn(),
  reducedMotion: false,
  toggleReducedMotion: vi.fn(),
  dyslexicFont: false,
  toggleDyslexicFont: vi.fn(),
  lineSpacing: 1.5,
  increaseLineSpacing: vi.fn(),
  decreaseLineSpacing: vi.fn(),
  resetLineSpacing: vi.fn(),
};

// Wrap component with context provider for testing
const renderWithAccessibilityContext = (ui: React.ReactElement) => {
  return render(
    <AccessibilityProvider value={mockAccessibilityContext}>
      {ui}
    </AccessibilityProvider>
  );
};

describe('AccessibilityPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders nothing when isOpen is false', () => {
    const { container } = renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={false} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders the panel when isOpen is true', () => {
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} />
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Accessibility Settings')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} onClose={handleClose} />
    );
    
    fireEvent.click(screen.getByLabelText('Close accessibility panel'));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when footer close button is clicked', () => {
    const handleClose = vi.fn();
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} onClose={handleClose} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls context methods when font size buttons are clicked', () => {
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} />
    );
    
    fireEvent.click(screen.getByLabelText('Increase text size'));
    expect(mockAccessibilityContext.increaseFontSize).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Decrease text size'));
    expect(mockAccessibilityContext.decreaseFontSize).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Reset text size'));
    expect(mockAccessibilityContext.resetFontSize).toHaveBeenCalledTimes(1);
  });

  test('calls context methods when line spacing buttons are clicked', () => {
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} />
    );
    
    fireEvent.click(screen.getByLabelText('Increase line spacing'));
    expect(mockAccessibilityContext.increaseLineSpacing).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Decrease line spacing'));
    expect(mockAccessibilityContext.decreaseLineSpacing).toHaveBeenCalledTimes(1);
    
    // Use the specific aria-label attribute instead of just "Reset"
    fireEvent.click(screen.getByLabelText('Reset line spacing'));
    expect(mockAccessibilityContext.resetLineSpacing).toHaveBeenCalledTimes(1);
  });

  test('calls context methods when toggle inputs are clicked', () => {
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} />
    );
    
    fireEvent.click(screen.getByLabelText('High Contrast'));
    expect(mockAccessibilityContext.toggleHighContrast).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Reduced Motion'));
    expect(mockAccessibilityContext.toggleReducedMotion).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByLabelText('Dyslexia-friendly Font'));
    expect(mockAccessibilityContext.toggleDyslexicFont).toHaveBeenCalledTimes(1);
  });

  test('closes when escape key is pressed', async () => {
    const handleClose = vi.fn();
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} onClose={handleClose} />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  test('closes when clicking outside the panel', async () => {
    const handleClose = vi.fn();
    renderWithAccessibilityContext(
      <AccessibilityPanel isOpen={true} onClose={handleClose} />
    );
    
    // Find the overlay and click it
    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      fireEvent.mouseDown(overlay);
    }
    
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});