// src/components/common/HeroSection/HeroSection.tsx
import React, { useState } from 'react';
import './HeroSection.scss';
import Button from '../../Button';
import { ContentItem } from '../../ContentRow';

interface HeroSectionProps {
  featuredContent: ContentItem[];
  onContentClick?: (item: ContentItem) => void;
  trendingTags?: string[];
  onTagClick?: (tag: string) => void;
  onSearch?: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  featuredContent,
  onContentClick,
  trendingTags = [],
  onTagClick,
  onSearch,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const activeContent = featuredContent[activeIndex];

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === featuredContent.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? featuredContent.length - 1 : prevIndex - 1
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleMoodSelection = (mood: string) => {
    // This would normally trigger a context change or navigation
    console.log(`Selected mood: ${mood}`);
  };

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😲', label: 'Surprised' },
    { emoji: '😍', label: 'Romantic' },
    { emoji: '🧠', label: 'Educational' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-section__featured">
        <div 
          className="hero-section__featured-background"
          style={{ backgroundImage: `url(${activeContent.coverImage})` }}
        >
          <div className="hero-section__featured-overlay"></div>
        </div>
        
        <div className="hero-section__featured-content">
          <div className="hero-section__featured-text">
            <div className="hero-section__featured-meta">
              <span className="hero-section__featured-genre">{activeContent.genre}</span>
              <span className="hero-section__featured-reading-time">
                {activeContent.readingTime} min read
              </span>
            </div>
            
            <h1 className="hero-section__featured-title">{activeContent.title}</h1>
            <p className="hero-section__featured-author">By {activeContent.author}</p>
            
            <Button 
              onClick={() => onContentClick && onContentClick(activeContent)}
              variant="primary"
            >
              Start Reading
            </Button>
          </div>
          
          <div className="hero-section__featured-controls">
            <Button 
              variant="secondary" 
              onClick={handlePrev}
              aria-label="Previous featured content"
              className="hero-section__featured-control"
            >
              ←
            </Button>
            
            <div className="hero-section__featured-indicators">
              {featuredContent.map((_, index) => (
                <button 
                  key={index}
                  className={`hero-section__featured-indicator ${
                    index === activeIndex ? 'hero-section__featured-indicator--active' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to featured content ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="secondary" 
              onClick={handleNext}
              aria-label="Next featured content"
              className="hero-section__featured-control"
            >
              →
            </Button>
          </div>
        </div>
      </div>
      
      <div className="hero-section__search-container">
        <form onSubmit={handleSearch} className="hero-section__search-form">
          <input 
            type="text"
            className="hero-section__search-input"
            placeholder="Search for stories, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
          <Button 
            type="submit" 
            variant="primary"
            className="hero-section__search-button"
          >
            Search
          </Button>
        </form>
        
        {trendingTags.length > 0 && (
          <div className="hero-section__trending-tags">
            <span className="hero-section__trending-label">Trending:</span>
            <div className="hero-section__tags">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  className="hero-section__tag"
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="hero-section__mood-selector">
        <h3 className="hero-section__mood-title">I'm in the mood for...</h3>
        <div className="hero-section__moods">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className="hero-section__mood"
              onClick={() => handleMoodSelection(mood.label)}
            >
              <span className="hero-section__mood-emoji">{mood.emoji}</span>
              <span className="hero-section__mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;