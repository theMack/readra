import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  // Font size
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  
  // High contrast
  highContrast: boolean;
  toggleHighContrast: () => void;
  
  // Reduced motion
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // Dyslexic font
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  
  // Line spacing
  lineSpacing: number;
  increaseLineSpacing: () => void;
  decreaseLineSpacing: () => void;
  resetLineSpacing: () => void;
}

// Default values
const defaultAccessibilityContext: AccessibilityContextType = {
  fontSize: 1,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
  
  highContrast: false,
  toggleHighContrast: () => {},
  
  reducedMotion: false,
  toggleReducedMotion: () => {},
  
  dyslexicFont: false,
  toggleDyslexicFont: () => {},
  
  lineSpacing: 1.5,
  increaseLineSpacing: () => {},
  decreaseLineSpacing: () => {},
  resetLineSpacing: () => {},
};

// Create context
const AccessibilityContext = createContext<AccessibilityContextType>(defaultAccessibilityContext);

// Constants
const STORAGE_KEY = 'readra-accessibility-settings';
const MIN_FONT_SIZE = 0.8;
const MAX_FONT_SIZE = 1.5;
const DEFAULT_FONT_SIZE = 1;
const FONT_SIZE_STEP = 0.1;

const MIN_LINE_SPACING = 1;
const MAX_LINE_SPACING = 2;
const DEFAULT_LINE_SPACING = 1.5;
const LINE_SPACING_STEP = 0.1;

interface AccessibilityProviderProps {
  children: ReactNode;
  value?: AccessibilityContextType; // For testing
}

// Provider component
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ 
  children,
  value,
}) => {
  // Use provided value (for testing) or create state
  if (value) {
    return (
      <AccessibilityContext.Provider value={value}>
        {children}
      </AccessibilityContext.Provider>
    );
  }

  // Font size
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const increaseFontSize = () => setFontSize(prev => 
    Math.min(prev + FONT_SIZE_STEP, MAX_FONT_SIZE)
  );
  const decreaseFontSize = () => setFontSize(prev => 
    Math.max(prev - FONT_SIZE_STEP, MIN_FONT_SIZE)
  );
  const resetFontSize = () => setFontSize(DEFAULT_FONT_SIZE);

  // High contrast
  const [highContrast, setHighContrast] = useState(false);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  // Dyslexic font
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const toggleDyslexicFont = () => setDyslexicFont(prev => !prev);

  // Line spacing
  const [lineSpacing, setLineSpacing] = useState(DEFAULT_LINE_SPACING);
  const increaseLineSpacing = () => setLineSpacing(prev => 
    Math.min(prev + LINE_SPACING_STEP, MAX_LINE_SPACING)
  );
  const decreaseLineSpacing = () => setLineSpacing(prev => 
    Math.max(prev - LINE_SPACING_STEP, MIN_LINE_SPACING)
  );
  const resetLineSpacing = () => setLineSpacing(DEFAULT_LINE_SPACING);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        
        // Apply saved settings
        if (parsedSettings.fontSize !== undefined) {
          setFontSize(parsedSettings.fontSize);
        }
        
        if (parsedSettings.highContrast !== undefined) {
          setHighContrast(parsedSettings.highContrast);
        }
        
        if (parsedSettings.reducedMotion !== undefined) {
          setReducedMotion(parsedSettings.reducedMotion);
        }
        
        if (parsedSettings.dyslexicFont !== undefined) {
          setDyslexicFont(parsedSettings.dyslexicFont);
        }
        
        if (parsedSettings.lineSpacing !== undefined) {
          setLineSpacing(parsedSettings.lineSpacing);
        }
      }
      
      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setReducedMotion(true);
      }
      
      // Check for prefers-contrast
      const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
      if (prefersHighContrast) {
        setHighContrast(true);
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    try {
      const settings = {
        fontSize,
        highContrast,
        reducedMotion,
        dyslexicFont,
        lineSpacing,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      
      // Apply settings to document
      document.documentElement.style.setProperty('--font-size-multiplier', fontSize.toString());
      document.documentElement.style.setProperty('--line-height-multiplier', lineSpacing.toString());
      
      // Apply high contrast mode
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      // Apply reduced motion
      if (reducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
      
      // Apply dyslexic font
      if (dyslexicFont) {
        document.documentElement.classList.add('dyslexic-font');
      } else {
        document.documentElement.classList.remove('dyslexic-font');
      }
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  }, [fontSize, highContrast, reducedMotion, dyslexicFont, lineSpacing]);

  // Context value
  const contextValue: AccessibilityContextType = {
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
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use the accessibility context
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
};

export default AccessibilityContext;