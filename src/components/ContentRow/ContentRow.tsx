// src/components/ContentRow/ContentRow.tsx
import React, { useRef } from 'react';
import './ContentRow.scss';
import Card from '../Card';
import Button from '../Button';

export interface ContentItem {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  readingTime?: number;
  genre?: string;
  mood?: string;
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  showMoreLink?: string;
  onItemClick?: (item: ContentItem) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({
  title,
  items,
  showMoreLink,
  onItemClick,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="content-row">
      <div className="content-row__header">
        <h2 className="content-row__title">{title}</h2>
        {showMoreLink && (
          <a href={showMoreLink} className="content-row__more-link">
            See all
          </a>
        )}
      </div>
      
      <div className="content-row__scroll-container">
        <Button 
          variant="secondary" 
          onClick={scrollLeft} 
          className="content-row__scroll-button content-row__scroll-button--left"
          aria-label="Scroll left"
        >
          ←
        </Button>
        
        <div className="content-row__items-container" ref={rowRef}>
          {items.map((item) => (
            <div key={item.id} className="content-row__item">
              <Card
                title={item.title}
                image={item.coverImage}
                onClick={() => onItemClick && onItemClick(item)}
                footer={
                  <div className="content-row__item-meta">
                    <span className="content-row__item-author">{item.author}</span>
                    {item.readingTime && (
                      <span className="content-row__item-reading-time">
                        {item.readingTime} min read
                      </span>
                    )}
                    {item.genre && (
                      <span className="content-row__item-genre">{item.genre}</span>
                    )}
                  </div>
                }
              >
                {/* Card content can be empty or contain a description if needed */}
                <div className="content-row__item-content"></div>
              </Card>
            </div>
          ))}
        </div>
        
        <Button 
          variant="secondary" 
          onClick={scrollRight} 
          className="content-row__scroll-button content-row__scroll-button--right"
          aria-label="Scroll right"
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default ContentRow;