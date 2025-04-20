import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import './AccessibilityPanel.scss';

export interface AccessibilityPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen = false,
  onClose,
  className = '',
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(isOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    dyslexicFont,
    toggleDyslexicFont,
    lineSpacing,
    increaseLineSpacing,
    decreaseLineSpacing,
    resetLineSpacing,
  } = useAccessibility();

  // Sync with parent's isOpen prop
  useEffect(() => {
    setIsPanelOpen(isOpen);
  }, [isOpen]);

  // Handle clicks outside the panel
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  // Handle ESC key to close the panel
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isPanelOpen]);

  const handleClose = () => {
    setIsPanelOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isPanelOpen) return null;

  return (
    <div className={`accessibility-panel-overlay ${className}`}>
      <div
        className="accessibility-panel"
        ref={panelRef}
        role="dialog"
        aria-labelledby="accessibility-title"
        aria-modal="true"
      >
        <div className="accessibility-panel__header">
          <h2 id="accessibility-title">Accessibility Settings</h2>
          <button
            className="accessibility-panel__close-button"
            onClick={handleClose}
            aria-label="Close accessibility panel"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="accessibility-panel__content">
          <section className="accessibility-panel__section">
            <h3>Text Size</h3>
            <div className="accessibility-panel__controls">
              <button
                onClick={decreaseFontSize}
                aria-label="Decrease text size"
                className="accessibility-panel__button"
                disabled={fontSize <= 0.8}
              >
                A-
              </button>
              <button
                onClick={resetFontSize}
                aria-label="Reset text size"
                className="accessibility-panel__button"
              >
                Reset
              </button>
              <button
                onClick={increaseFontSize}
                aria-label="Increase text size"
                className="accessibility-panel__button"
                disabled={fontSize >= 1.5}
              >
                A+
              </button>
            </div>
          </section>

          <section className="accessibility-panel__section">
            <h3>Line Spacing</h3>
            <div className="accessibility-panel__controls">
              <button
                onClick={decreaseLineSpacing}
                aria-label="Decrease line spacing"
                className="accessibility-panel__button"
                disabled={lineSpacing <= 1}
              >
                <span className="line-spacing-icon line-spacing-decrease" aria-hidden="true">
                  |||
                </span>
              </button>
              <button
                onClick={resetLineSpacing}
                aria-label="Reset line spacing"
                className="accessibility-panel__button"
              >
                Reset
              </button>
              <button
                onClick={increaseLineSpacing}
                aria-label="Increase line spacing"
                className="accessibility-panel__button"
                disabled={lineSpacing >= 2}
              >
                <span className="line-spacing-icon line-spacing-increase" aria-hidden="true">
                  |||
                </span>
              </button>
            </div>
          </section>

          <section className="accessibility-panel__section">
            <h3>Display Options</h3>
            <div className="accessibility-panel__toggle-options">
              <div className="accessibility-panel__toggle-option">
                <label htmlFor="highContrast" className="toggle-switch">
                  <input
                    type="checkbox"
                    id="highContrast"
                    checked={highContrast}
                    onChange={toggleHighContrast}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">High Contrast</span>
                </label>
              </div>
              
              <div className="accessibility-panel__toggle-option">
                <label htmlFor="reducedMotion" className="toggle-switch">
                  <input
                    type="checkbox"
                    id="reducedMotion"
                    checked={reducedMotion}
                    onChange={toggleReducedMotion}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Reduced Motion</span>
                </label>
              </div>
              
              <div className="accessibility-panel__toggle-option">
                <label htmlFor="dyslexicFont" className="toggle-switch">
                  <input
                    type="checkbox"
                    id="dyslexicFont"
                    checked={dyslexicFont}
                    onChange={toggleDyslexicFont}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Dyslexia-friendly Font</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        <div className="accessibility-panel__footer">
          <p>These settings will be saved for your next visit.</p>
          <button
            className="accessibility-panel__button accessibility-panel__button--primary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;