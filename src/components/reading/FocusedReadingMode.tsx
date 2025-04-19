// src/components/reading/FocusedReadingMode.tsx
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

export type ReadingTheme = 'light' | 'sepia' | 'dark' | 'custom';

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: ReadingTheme;
  backgroundColor?: string;
  textColor?: string;
  marginWidth: number;
  ambientAudio?: string;
  ambientVolume: number;
}

interface FocusedReadingModeProps {
  content: string;
  title: string;
  author: string;
  onExit: () => void;
  initialSettings?: Partial<ReadingSettings>;
  onSettingsChange?: (settings: ReadingSettings) => void;
  onProgressUpdate?: (progress: number) => void;
}

const defaultSettings: ReadingSettings = {
  fontSize: 18,
  lineHeight: 1.6,
  fontFamily: 'Georgia, serif',
  theme: 'light',
  marginWidth: 20,
  ambientVolume: 0.3,
};

const fontFamilyOptions = [
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: '"Helvetica Neue", sans-serif', label: 'Helvetica' },
  { value: 'Lora, serif', label: 'Lora' },
  { value: 'Merriweather, serif', label: 'Merriweather' },
  { value: '"Open Sans", sans-serif', label: 'Open Sans' },
];

const themeOptions = [
  { value: 'light' as ReadingTheme, label: 'Light', bg: '#ffffff', text: '#333333' },
  { value: 'sepia' as ReadingTheme, label: 'Sepia', bg: '#f8f2e4', text: '#5b4636' },
  { value: 'dark' as ReadingTheme, label: 'Dark', bg: '#1a1a1a', text: '#e6e6e6' },
  { value: 'custom' as ReadingTheme, label: 'Custom', bg: undefined, text: undefined },
];

const FocusedReadingMode: React.FC<FocusedReadingModeProps> = ({
  content,
  title,
  author,
  onExit,
  initialSettings,
  onSettingsChange,
  onProgressUpdate,
}) => {
  const [settings, setSettings] = useState<ReadingSettings>({
    ...defaultSettings,
    ...initialSettings,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Handle scroll to track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      const roundedProgress = Math.min(Math.round(progress * 100), 100);
      
      setReadingProgress(roundedProgress);
      
      if (onProgressUpdate) {
        onProgressUpdate(roundedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onProgressUpdate]);

  // Update settings and notify parent component
  const updateSettings = (updatedSettings: Partial<ReadingSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  // Toggle ambient audio
  const toggleAmbientAudio = () => {
    setIsAmbientPlaying(!isAmbientPlaying);
    // Actual audio implementation would go here
  };

  // Get current theme colors
  const getThemeColors = () => {
    const theme = themeOptions.find(t => t.value === settings.theme);
    return {
      backgroundColor: settings.theme === 'custom' ? settings.backgroundColor : theme?.bg,
      textColor: settings.theme === 'custom' ? settings.textColor : theme?.text,
    };
  };

  const { backgroundColor, textColor } = getThemeColors();
  
  // Helper function to determine if dark theme is active
  const isDarkTheme = () => {
    return settings.theme === 'dark';
  };

  // Dynamic styles based on settings
  const contentStyle = {
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.lineHeight,
    fontFamily: settings.fontFamily,
    backgroundColor,
    color: textColor,
    maxWidth: `${100 - (settings.marginWidth * 2)}%`,
    margin: `0 ${settings.marginWidth}%`,
  };

  return (
    <div 
      className="focused-reading-mode"
      style={{ 
        backgroundColor,
        color: textColor,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        overflow: 'auto',
        padding: '0 0 4rem',
      }}
    >
      {/* Reading progress bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1060,
        }}
      >
        <div 
          style={{
            height: '100%',
            backgroundColor: '#4a6cf7',
            width: `${readingProgress}%`,
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>
      
      {/* Top controls */}
      <div 
        style={{
          position: 'fixed',
          top: '10px',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1.5rem',
          zIndex: 1060,
        }}
      >
        <Button 
          onClick={onExit}
          aria-label="Exit reading mode"
        >
          Exit
        </Button>
        
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 500,
        }}>
          {readingProgress}% read
        </div>
        
        <Button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          aria-expanded={isSettingsOpen}
          aria-controls="reading-settings"
          aria-label="Reading settings"
        >
          Settings
        </Button>
      </div>
      
      {/* Settings panel */}
      {isSettingsOpen && (
        <div 
          id="reading-settings"
          style={{
            position: 'fixed',
            top: '60px',
            right: '1.5rem',
            width: '320px',
            backgroundColor: isDarkTheme() ? '#2a2a2a' : 'white',
            color: isDarkTheme() ? '#e6e6e6' : '#333333',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            padding: '1.5rem',
            zIndex: 1060,
          }}
        >
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: '0 0 1.25rem',
          }}>Reading Settings</h3>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
              Font Size
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <button 
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isDarkTheme() ? '#3a3a3a' : '#f8f9fa',
                    color: isDarkTheme() ? '#e6e6e6' : '#333333',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => updateSettings({ fontSize: Math.max(12, settings.fontSize - 2) })}
                  aria-label="Decrease font size"
                >
                  -
                </button>
                <span style={{ margin: '0 0.75rem', minWidth: '3rem', textAlign: 'center' }}>
                  {settings.fontSize}px
                </span>
                <button 
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isDarkTheme() ? '#3a3a3a' : '#f8f9fa',
                    color: isDarkTheme() ? '#e6e6e6' : '#333333',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => updateSettings({ fontSize: Math.min(32, settings.fontSize + 2) })}
                  aria-label="Increase font size"
                >
                  +
                </button>
              </div>
            </label>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
              Line Height
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <button 
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isDarkTheme() ? '#3a3a3a' : '#f8f9fa',
                    color: isDarkTheme() ? '#e6e6e6' : '#333333',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => updateSettings({ lineHeight: Math.max(1.2, settings.lineHeight - 0.1) })}
                  aria-label="Decrease line height"
                >
                  -
                </button>
                <span style={{ margin: '0 0.75rem', minWidth: '3rem', textAlign: 'center' }}>
                  {settings.lineHeight.toFixed(1)}
                </span>
                <button 
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isDarkTheme() ? '#3a3a3a' : '#f8f9fa',
                    color: isDarkTheme() ? '#e6e6e6' : '#333333',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => updateSettings({ lineHeight: Math.min(2.2, settings.lineHeight + 0.1) })}
                  aria-label="Increase line height"
                >
                  +
                </button>
              </div>
            </label>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
              Font Family
              <select 
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${isDarkTheme() ? '#555555' : '#dee2e6'}`,
                  backgroundColor: isDarkTheme() ? '#3a3a3a' : 'white',
                  color: isDarkTheme() ? '#e6e6e6' : '#333333',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  marginTop: '0.5rem',
                }}
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
              >
                {fontFamilyOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
              Theme
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '0.5rem', 
                marginTop: '0.5rem'
              }}>
                {themeOptions.map((theme) => (
                  <button
                    key={theme.value}
                    style={{
                      padding: '0.5rem',
                      textAlign: 'center',
                      borderRadius: '8px',
                      backgroundColor: theme.bg,
                      color: theme.text,
                      border: settings.theme === theme.value 
                        ? `2px solid #4a6cf7` 
                        : '2px solid transparent',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                    }}
                    onClick={() => updateSettings({ theme: theme.value })}
                    aria-label={`${theme.label} theme`}
                    aria-pressed={settings.theme === theme.value}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </label>
          </div>
          
          {settings.theme === 'custom' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
                Custom Colors
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Background</span>
                    <input 
                      type="color"
                      value={settings.backgroundColor || '#ffffff'}
                      onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                      aria-label="Background color"
                      style={{
                        width: '100%',
                        height: '36px',
                        border: `1px solid ${isDarkTheme() ? '#555555' : '#dee2e6'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Text</span>
                    <input 
                      type="color"
                      value={settings.textColor || '#333333'}
                      onChange={(e) => updateSettings({ textColor: e.target.value })}
                      aria-label="Text color"
                      style={{
                        width: '100%',
                        height: '36px',
                        border: `1px solid ${isDarkTheme() ? '#555555' : '#dee2e6'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </label>
            </div>
          )}
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
              Margins
              <input
                type="range"
                min="0"
                max="30"
                value={settings.marginWidth}
                onChange={(e) => updateSettings({ marginWidth: parseInt(e.target.value) })}
                aria-label="Margin width"
                style={{
                  width: '100%',
                  marginTop: '0.75rem',
                  cursor: 'pointer',
                }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Button 
              onClick={() => setSettings(defaultSettings)}
              variant="secondary"
            >
              Reset Defaults
            </Button>
            <Button 
              onClick={() => setIsSettingsOpen(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
      
      {/* Reading content */}
      <div style={{
        ...contentStyle,
        padding: '5rem 0 3rem',
        margin: `0 ${settings.marginWidth}%`,
        maxWidth: `${100 - (settings.marginWidth * 2)}%`,
      }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 700, 
            margin: '0 0 0.75rem',
            lineHeight: 1.2,
           }}>{title}</h1>
          <div style={{ 
            fontSize: '1.125rem',
            color: isDarkTheme() ? 'rgba(255, 255, 255, 0.7)' : '#666666',
           }}>by {author}</div>
        </header>
        
        <div 
          style={{ lineHeight: 'inherit' }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};

export default FocusedReadingMode;