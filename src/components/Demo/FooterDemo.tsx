// src/components/Demo/FooterDemo.tsx
import React, { useState } from 'react';
import { Container } from '../common/Layout';
import { Footer, FooterColumn, SocialLink } from '../common/Footer';
import { Heading, Paragraph, Text } from '../common/Typography';
import './FooterDemo.scss';

const FooterDemo: React.FC = () => {
  // Sample footer columns with links
  const [columns, setColumns] = useState<FooterColumn[]>([
    {
      title: 'Platform',
      links: [
        { text: 'Features', url: '/features' },
        { text: 'Pricing', url: '/pricing' },
        { text: 'Roadmap', url: '/roadmap' },
        { text: 'Beta Program', url: '/beta' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', url: '/blog' },
        { text: 'Documentation', url: '/docs' },
        { text: 'Guides', url: '/guides' },
        { text: 'API', url: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', url: '/about' },
        { text: 'Careers', url: '/careers' },
        { text: 'Contact', url: '/contact' },
        { text: 'Press Kit', url: '/press' }
      ]
    }
  ]);

  // Sample social links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { name: 'Twitter', url: 'https://twitter.com', icon: 'icon-twitter' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'icon-facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'icon-instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'icon-linkedin' }
  ]);

  // For demo purposes
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [customCopyright, setCustomCopyright] = useState('');

  return (
    <>
      <Container>
        <div className="footer-demo-controls">
          <Heading level={1}>Footer Component Demo</Heading>
          <Paragraph>
            This page demonstrates the Footer component for the Readra platform.
            You can toggle various options below to see different configurations.
          </Paragraph>

          <div className="demo-options">
            <Heading level={3} variant="subtitle">Footer Options</Heading>
            
            <div className="option-row">
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={showNewsletter}
                  onChange={() => setShowNewsletter(!showNewsletter)}
                />
                <Text>Show Newsletter Section</Text>
              </label>
            </div>
            
            <div className="option-row">
              <label className="option-label">
                <Text>Custom Copyright Text:</Text>
                <input
                  type="text"
                  value={customCopyright}
                  onChange={(e) => setCustomCopyright(e.target.value)}
                  placeholder="Leave empty for default copyright text"
                  className="text-input"
                />
              </label>
            </div>
          </div>

          <Paragraph>
            Scroll to the bottom of the page to see the footer in action.
          </Paragraph>
        </div>
      </Container>
      
      {/* Add some spacing to simulate page content */}
      <div className="content-spacer"></div>
      
      {/* Render the Footer component */}
      <Footer
        columns={columns}
        socialLinks={socialLinks}
        showNewsletter={showNewsletter}
        copyrightText={customCopyright || undefined}
      />
    </>
  );
};

export default FooterDemo;