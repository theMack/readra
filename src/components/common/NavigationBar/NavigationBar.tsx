// src/components/common/NavigationBar/NavigationBar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../Button/Button';
import './NavigationBar.scss';

import logoLight from '../../../assets/images/readra_logo_light.svg';
import logoDark from '../../../assets/images/readra_logo_dark.svg';

export interface NavigationBarProps {
  onAccessibilityClick?: () => void;
  isLoggedIn?: boolean;
  userProfile?: {
    name: string;
    avatar?: string;
    isWriter?: boolean;
  };
  className?: string;
  theme?: 'light' | 'dark';
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onAccessibilityClick,
  isLoggedIn = false,
  userProfile,
  className = '',
  theme = 'light',
}) => {
  const location = useLocation();

  // Choose logo based on theme
  const logoSrc = theme === 'dark' ? logoLight : logoDark;

  // Dynamic nav class
  const navClasses = `navbar ${className} ${theme === 'dark' ? 'navbar--dark' : 'navbar--light'}`;

  return (
    <nav className={navClasses}>
      <div className="navbar__container">

        {/* Logo/Brand */}
        <div className="navbar__brand">
          <Link to="/" className="navbar__logo">
            <img src={logoSrc} alt="Readra logo" className="navbar__logo-image" />
            <span className="navbar__logo-text">Readra</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar__links">
          <Link to="/explore" className="navbar__link">Explore</Link>
          <Link to="/about" className="navbar__link">About</Link>

          {isLoggedIn ? (
            <>
              {userProfile?.isWriter && (
                <Link to="/dashboard" className="navbar__link">Dashboard</Link>
              )}
              <Link to="/profile" className="navbar__link navbar__profile">
                {userProfile?.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="navbar__avatar"
                  />
                ) : (
                  <span>{userProfile?.name}</span>
                )}
              </Link>
            </>
          ) : (
            <Link to="/login" className="navbar__link navbar__link--button">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Accessibility Button */}
        {onAccessibilityClick && (
          <button
            className="navbar__accessibility-btn"
            onClick={onAccessibilityClick}
            aria-label="Accessibility settings"
          >
            ♿
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
