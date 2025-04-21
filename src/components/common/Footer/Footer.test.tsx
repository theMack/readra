// src/components/common/Footer/Footer.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

// Mock data for testing
const mockColumns = [
  {
    title: 'Explore',
    links: [
      { text: 'Features', url: '/features' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'Blog', url: '/blog' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Help Center', url: '/help' },
      { text: 'Contact Us', url: '/contact' },
      { text: 'FAQ', url: '/faq' }
    ]
  }
];

const mockSocialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/readra', icon: 'icon-twitter' },
  { name: 'Facebook', url: 'https://facebook.com/readra', icon: 'icon-facebook' },
  { name: 'Instagram', url: 'https://instagram.com/readra', icon: 'icon-instagram' }
];

// Helper to render the component within a Router
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Footer Component', () => {
  beforeEach(() => {
    // Reset mocks between tests
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    renderWithRouter(<Footer />);
    
    // Footer is present
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    
    // Logo is present
    const logo = screen.getByAltText('Readra Logo');
    expect(logo).toBeInTheDocument();
    
    // Copyright notice is present
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Readra. All rights reserved.`, { exact: false })).toBeInTheDocument();
    
    // Default legal links are present
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
    
    // Newsletter section is present
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address for newsletter')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders the correct number of columns and links', () => {
    renderWithRouter(<Footer columns={mockColumns} />);
    
    // Column titles are present
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    
    // Links from first column are present
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    
    // Links from second column are present
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    renderWithRouter(<Footer socialLinks={mockSocialLinks} />);
    
    // All social links are present
    const socialLinks = screen.getAllByRole('link', { name: /Twitter|Facebook|Instagram/i });
    expect(socialLinks).toHaveLength(3);
    
    // Correct external links
    expect(socialLinks[0]).toHaveAttribute('href', 'https://twitter.com/readra');
    expect(socialLinks[1]).toHaveAttribute('href', 'https://facebook.com/readra');
    expect(socialLinks[2]).toHaveAttribute('href', 'https://instagram.com/readra');
  });

  it('handles newsletter subscription', () => {
    // Mock console.log to verify subscription
    const consoleSpy = vi.spyOn(console, 'log');
    
    renderWithRouter(<Footer />);
    
    // Get form elements
    const emailInput = screen.getByLabelText('Email address for newsletter');
    const subscribeButton = screen.getByText('Subscribe');
    
    // Enter email and submit form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);
    
    // Check if console.log was called correctly
    expect(consoleSpy).toHaveBeenCalledWith('Subscribing email: test@example.com');
    
    // Success message should appear
    expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument();
    
    // Form should be hidden
    expect(screen.queryByLabelText('Email address for newsletter')).not.toBeInTheDocument();
  });

  it('hides newsletter section when showNewsletter is false', () => {
    renderWithRouter(<Footer showNewsletter={false} />);
    
    // Newsletter section should not be present
    expect(screen.queryByText('Stay Updated')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Email address for newsletter')).not.toBeInTheDocument();
  });

  it('applies custom className to the footer', () => {
    renderWithRouter(<Footer className="custom-footer" />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('readra-footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('supports external links with proper attributes', () => {
    const externalLink = {
      title: 'Resources',
      links: [
        { text: 'GitHub', url: 'https://github.com/', isExternal: true }
      ]
    };
    
    renderWithRouter(<Footer columns={[externalLink]} />);
    
    const link = screen.getByText('GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});