import React, { useState, useEffect, useRef } from 'react';
import './NavigationBar.scss';

// Simple interface for props
interface NavigationBarProps {
  className?: string;
  onAccessibilityToggle?: () => void;
}

// Create a simple functional component
const NavigationBar: React.FC<NavigationBarProps> = ({ 
  className = '',
  onAccessibilityToggle = () => console.log('Accessibility toggle clicked')
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  // Handle clicks outside the mobile menu to close it
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  // Handle ESC key to close the mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);
  
  return (
    <nav 
      className={`navbar ${className}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <a href="/" aria-label="Readra Home">
            <img src="/assets/images/readra_logo.svg" alt="Readra" />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="navbar__links">
          <a href="/explore" className="navbar__link">
            Explore
          </a>
          <a href="/categories" className="navbar__link">
            Categories
          </a>
          <a href="/my-library" className="navbar__link">
            My Library
          </a>
        </div>
        
        {/* Right Side Controls */}
        <div className="navbar__controls">
          {/* Search Button */}
          <button 
            className="navbar__search-button" 
            aria-label="Search"
          >
            <span className="visually-hidden">Search</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
          
          {/* Accessibility Button */}
          <button 
            className="navbar__accessibility-button" 
            aria-label="Accessibility settings"
            onClick={onAccessibilityToggle}
          >
            <span className="visually-hidden">Accessibility</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-5h10v2H7v-2zm3.33-8L12 9.33 13.67 7 17 10.33 15.33 12l-3.33-3.33L8.67 12 7 10.33 10.33 7z" />
            </svg>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`navbar__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            <span className="line" aria-hidden="true"></span>
            <span className="line" aria-hidden="true"></span>
            <span className="line" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="navbar__mobile-menu" 
          id="mobile-menu"
          role="menu"
          ref={mobileMenuRef}
        >
          <div className="navbar__mobile-links">
            <a href="/explore" className="navbar__mobile-link" role="menuitem">
              Explore
            </a>
            <a href="/categories" className="navbar__mobile-link" role="menuitem">
              Categories
            </a>
            <a href="/my-library" className="navbar__mobile-link" role="menuitem">
              My Library
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Export the component as default
export default NavigationBar;