import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AccessibilityPanel from './AccessibilityPanel';
import { AccessibilityProvider } from '../../../contexts/AccessibilityContext';
import './storybookStyles.scss'; // Import a separate SCSS file for styles

// Define a mock AccessibilityContext for Storybook
const mockAccessibilityState = {
  fontSize: 1,
  increaseFontSize: () => console.log('Increase font size'),
  decreaseFontSize: () => console.log('Decrease font size'),
  resetFontSize: () => console.log('Reset font size'),
  highContrast: false,
  toggleHighContrast: () => console.log('Toggle high contrast'),
  reducedMotion: false,
  toggleReducedMotion: () => console.log('Toggle reduced motion'),
  dyslexicFont: false,
  toggleDyslexicFont: () => console.log('Toggle dyslexic font'),
  lineSpacing: 1.5,
  increaseLineSpacing: () => console.log('Increase line spacing'),
  decreaseLineSpacing: () => console.log('Decrease line spacing'),
  resetLineSpacing: () => console.log('Reset line spacing'),
};

// Interactive mock context for Storybook
const InteractiveContext = () => {
  const [fontSize, setFontSize] = useState(1);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  const context = {
    fontSize,
    increaseFontSize: () => setFontSize(prev => Math.min(prev + 0.1, 1.5)),
    decreaseFontSize: () => setFontSize(prev => Math.max(prev - 0.1, 0.8)),
    resetFontSize: () => setFontSize(1),
    highContrast,
    toggleHighContrast: () => setHighContrast(prev => !prev),
    reducedMotion,
    toggleReducedMotion: () => setReducedMotion(prev => !prev),
    dyslexicFont,
    toggleDyslexicFont: () => setDyslexicFont(prev => !prev),
    lineSpacing,
    increaseLineSpacing: () => setLineSpacing(prev => Math.min(prev + 0.1, 2)),
    decreaseLineSpacing: () => setLineSpacing(prev => Math.max(prev - 0.1, 1)),
    resetLineSpacing: () => setLineSpacing(1.5),
  };

  return context;
};

const meta: Meta<typeof AccessibilityPanel> = {
  title: 'Common/AccessibilityPanel',
  component: AccessibilityPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);
      const context = InteractiveContext();
      
      // Apply dynamic classes based on context values
      const sampleTextClasses = [
        'story-sample-text',
        context.highContrast ? 'high-contrast' : '',
        context.dyslexicFont ? 'dyslexic-font' : '',
        context.reducedMotion ? 'reduced-motion' : '',
      ].filter(Boolean).join(' ');
      
      // Use CSS custom properties for dynamic values
      document.documentElement.style.setProperty('--preview-font-size', `${context.fontSize}rem`);
      document.documentElement.style.setProperty('--preview-line-spacing', context.lineSpacing.toString());
      
      return (
        <AccessibilityProvider value={context}>
          <div className="story-container">
            <button className="story-button" onClick={() => setIsOpen(true)}>
              Open Accessibility Panel
            </button>
            <Story args={{ isOpen, onClose: () => setIsOpen(false) }} />
            
            <div className="story-preview">
              <h3>Current Settings:</h3>
              <ul className="story-settings-list">
                <li>Font Size: {context.fontSize.toFixed(1)}</li>
                <li>Line Spacing: {context.lineSpacing.toFixed(1)}</li>
                <li>High Contrast: {context.highContrast ? 'On' : 'Off'}</li>
                <li>Reduced Motion: {context.reducedMotion ? 'On' : 'Off'}</li>
                <li>Dyslexic Font: {context.dyslexicFont ? 'On' : 'Off'}</li>
              </ul>
              
              <div>
                <p className={sampleTextClasses}>
                  This is a sample text that demonstrates the accessibility settings. 
                  The panel allows users to customize their reading experience 
                  according to their needs and preferences. The settings affect 
                  the font size, line spacing, contrast, motion, and font family.
                </p>
              </div>
            </div>
          </div>
        </AccessibilityProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AccessibilityPanel>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const OpenPanel: Story = {
  args: {
    isOpen: true,
  },
};

// Mobile view story
export const MobileView: Story = {
  args: {
    isOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};