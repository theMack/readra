// src/components/common/Footer/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

// Import from Typography components we created earlier
import { Heading, Text } from '../Typography';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  text: string;
  url: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  /**
   * Columns of links to display in the footer
   */
  columns?: FooterColumn[];
  /**
   * Social media links
   */
  socialLinks?: SocialLink[];
  /**
   * Company logo URL
   */
  logoUrl?: string;
  /**
   * Copyright notice
   */
  copyrightText?: string;
  /**
   * Additional legal links at the bottom
   */
  legalLinks?: FooterLink[];
  /**
   * Newsletter subscription enabled
   */
  showNewsletter?: boolean;
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Custom data-testid attribute
   */
  'data-testid'?: string;
}

/**
 * Footer component for the Readra platform
 */
export const Footer: React.FC<FooterProps> = ({
  columns = [],
  socialLinks = [],
  logoUrl = '/logo.svg',
  copyrightText = `© ${new Date().getFullYear()} Readra. All rights reserved.`,
  legalLinks = [
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
    { text: 'Cookie Policy', url: '/cookies' }
  ],
  showNewsletter = true,
  className = '',
  'data-testid': dataTestId = 'footer',
}) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would call an API endpoint
      console.log(`Subscribing email: ${email}`);
      setSubscribed(true);
      setEmail('');
    }
  };

  const renderNewsletterSection = () => {
    if (!showNewsletter) return null;

    return (
      <div className="readra-footer__newsletter">
        <Heading level={3} variant="subtitle">
          Stay Updated
        </Heading>
        <Text as="span" size="sm">
          Subscribe to get the latest updates on new features and content.
        </Text>
        {subscribed ? (
          <div className="readra-footer__subscribe-success">
            <Text as="span" color="success">
              Thanks for subscribing!
            </Text>
          </div>
        ) : (
          <form className="readra-footer__subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="readra-footer__email-input"
              required
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="readra-footer__subscribe-button"
              aria-label="Subscribe"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    );
  };

  const renderFooterLink = (link: FooterLink, index: number) => {
    const linkProps = {
      key: `footer-link-${index}`,
      className: 'readra-footer__link',
    };

    if (link.isExternal) {
      return (
        <a 
          {...linkProps}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text}
        </a>
      );
    }

    return (
      <Link {...linkProps} to={link.url}>
        {link.text}
      </Link>
    );
  };

  return (
    <footer
      className={`readra-footer ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="readra-footer__container">
        <div className="readra-footer__top">
          <div className="readra-footer__brand">
            <Link to="/" className="readra-footer__logo-link">
              <img 
                src={logoUrl} 
                alt="Readra Logo" 
                className="readra-footer__logo"
              />
            </Link>
            <Text as="span" size="sm">
              Creating the world's most advanced platform for independent writers and readers.
            </Text>
            <div className="readra-footer__social">
              {socialLinks.map((social, index) => (
                <a
                  key={`social-${index}`}
                  href={social.url}
                  className="readra-footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <i className={`readra-footer__social-icon ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column, colIndex) => (
            <div 
              key={`footer-column-${colIndex}`} 
              className="readra-footer__column"
            >
              <Heading level={3} variant="subtitle">
                {column.title}
              </Heading>
              <nav className="readra-footer__nav">
                <ul className="readra-footer__links">
                  {column.links.map((link, linkIndex) => (
                    <li key={`footer-link-${colIndex}-${linkIndex}`}>
                      {renderFooterLink(link, linkIndex)}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}

          {renderNewsletterSection()}
        </div>

        <div className="readra-footer__bottom">
          <Text as="span" size="xs" className="readra-footer__copyright">
            {copyrightText}
          </Text>
          
          <nav className="readra-footer__legal-nav">
            <ul className="readra-footer__legal-links">
              {legalLinks.map((link, index) => (
                <li key={`legal-link-${index}`}>
                  {renderFooterLink(link, index)}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;