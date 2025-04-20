import React, { useState, useEffect } from 'react';
import Card from '../../Card/Card';
import Button from '../../Button/Button';
import './HeroSection.scss';

// Define content types directly since external module isn't available
interface Author {
  id: string;
  name: string;
  avatar: string;
}

interface ContentType {
  id: string;
  title: string;
  description: string;
  author: Author;
  coverImage: string;
  publicationDate: string;
  readingTime: number;
  category: string;
  tags?: string[];
}

interface HeroSectionProps {
  /**
   * Featured content to display in the hero section
   */
  featuredContent: ContentType[];
  
  /**
   * Optional callback when a content item is selected
   */
  onContentSelect?: (contentId: string) => void;
  
  /**
   * Optional title for the hero section
   */
  title?: string;
  
  /**
   * Optional subtitle for the hero section
   */
  subtitle?: string;
  
  /**
   * Optional class name for additional styling
   */
  className?: string;
  
  /**
   * Auto-rotate through featured content
   * @default true
   */
  autoRotate?: boolean;
  
  /**
   * Time in milliseconds between rotations
   * @default 5000
   */
  rotationInterval?: number;
}

/**
 * HeroSection component
 * 
 * Displays featured content in a prominent hero section with
 * auto-rotation capabilities
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  featuredContent,
  onContentSelect,
  title = 'Featured Content',
  subtitle,
  className = '',
  autoRotate = true,
  rotationInterval = 5000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate || isHovered || !featuredContent || featuredContent.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuredContent.length);
    }, rotationInterval);
    
    return () => clearInterval(intervalId);
  }, [autoRotate, featuredContent, isHovered, rotationInterval]);
  
  // Handle empty content
  if (!featuredContent || !Array.isArray(featuredContent) || featuredContent.length === 0) {
    return (
      <div className={`hero-section hero-section--empty ${className}`}>
        <div className="hero-section__placeholder">
          <h2>No featured content available</h2>
        </div>
      </div>
    );
  }
  
  const activeContent = featuredContent[activeIndex] || featuredContent[0];
  
  const handleSelect = () => {
    if (onContentSelect && activeContent) {
      onContentSelect(activeContent.id);
    }
  };
  
  return (
    <div 
      className={`hero-section ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hero-section__content">
        {title && <h2 className="hero-section__title">{title}</h2>}
        {subtitle && <p className="hero-section__subtitle">{subtitle}</p>}
        
        <div className="hero-section__featured">
          <Card
            title={activeContent.title}
            image={activeContent.coverImage}
            onClick={handleSelect}
            className="hero-section__card"
          >
            <div className="hero-section__card-content">
              <p className="hero-section__author">By {activeContent.author.name}</p>
              <p className="hero-section__description">{activeContent.description}</p>
              <div className="hero-section__actions">
                <Button 
                  variant="primary" 
                  onClick={handleSelect}
                >
                  Read Now
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {/* Save for later functionality */}}
                >
                  Save for Later
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {featuredContent.length > 1 && (
          <div className="hero-section__indicators">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                className={`hero-section__indicator ${index === activeIndex ? 'hero-section__indicator--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View featured content ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;