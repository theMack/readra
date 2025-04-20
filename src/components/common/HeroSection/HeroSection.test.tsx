import React from 'react';
import { render } from '@testing-library/react';
import HeroSection from './HeroSection';
import { ContentType } from '../../../types/content.types';

// Mock data
const mockFeaturedContent: ContentType[] = [
  {
    id: '1',
    title: 'Test Article',
    description: 'Test description',
    author: {
      id: 'author1',
      name: 'Test Author',
      avatar: '/test-avatar.jpg'
    },
    coverImage: '/test-cover.jpg',
    publicationDate: '2023-05-15T12:00:00Z',
    readingTime: 5,
    category: 'Test'
  }
];

describe('HeroSection Styling', () => {
  test('applies correct class names', () => {
    const { container } = render(
      <HeroSection 
        featuredContent={mockFeaturedContent}
        className="custom-class" 
      />
    );
    
    // Root element has hero-section class
    const heroSection = container.querySelector('.hero-section');
    expect(heroSection).toBeInTheDocument();
    
    // Custom class is applied
    expect(heroSection).toHaveClass('custom-class');
    
    // Check for content elements
    expect(container.querySelector('.hero-section__title')).toBeInTheDocument();
    expect(container.querySelector('.hero-section__featured')).toBeInTheDocument();
    expect(container.querySelector('.hero-section__card')).toBeInTheDocument();
    
    // No indicators for single item
    expect(container.querySelector('.hero-section__indicators')).not.toBeInTheDocument();
  });
  
  test('applies empty state styling when no content', () => {
    const { container } = render(<HeroSection featuredContent={[]} />);
    
    // Should have empty state class
    const emptyState = container.querySelector('.hero-section--empty');
    expect(emptyState).toBeInTheDocument();
    
    // Should have placeholder content
    expect(container.querySelector('.hero-section__placeholder')).toBeInTheDocument();
  });
  
  test('renders indicators for multiple content items', () => {
    const multipleContent = [...mockFeaturedContent, {
      ...mockFeaturedContent[0],
      id: '2',
      title: 'Second Test Article'
    }];
    
    const { container } = render(<HeroSection featuredContent={multipleContent} />);
    
    // Should have indicators
    const indicators = container.querySelector('.hero-section__indicators');
    expect(indicators).toBeInTheDocument();
    
    // Should have correct number of indicators
    const indicatorButtons = container.querySelectorAll('.hero-section__indicator');
    expect(indicatorButtons.length).toBe(2);
    
    // First indicator should be active
    expect(indicatorButtons[0]).toHaveClass('hero-section__indicator--active');
  });
});