// src/components/ContentGrid/ContentGrid.tsx
import React from 'react';
import './ContentGrid.scss';
import Card from '../Card';
import { ContentItem } from '../ContentRow';

interface ContentGridProps {
  title?: string;
  items: ContentItem[];
  columns?: 2 | 3 | 4;
  showMoreLink?: string;
  onItemClick?: (item: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  title,
  items,
  columns = 3,
  showMoreLink,
  onItemClick,
}) => {
  return (
    <div className="content-grid">
      {title && (
        <div className="content-grid__header">
          <h2 className="content-grid__title">{title}</h2>
          {showMoreLink && (
            <a href={showMoreLink} className="content-grid__more-link">
              See all
            </a>
          )}
        </div>
      )}
      
      <div className={`content-grid__items content-grid__items--${columns}-col`}>
        {items.map((item) => (
          <div key={item.id} className="content-grid__item">
            <Card
              title={item.title}
              image={item.coverImage}
              onClick={() => onItemClick && onItemClick(item)}
              footer={
                <div className="content-grid__item-meta">
                  <span className="content-grid__item-author">{item.author}</span>
                  {item.readingTime && (
                    <span className="content-grid__item-reading-time">
                      {item.readingTime} min read
                    </span>
                  )}
                  {item.genre && (
                    <span className="content-grid__item-genre">{item.genre}</span>
                  )}
                  {item.mood && (
                    <span className="content-grid__item-mood">{item.mood}</span>
                  )}
                </div>
              }
            >
              {/* Card content can be empty or contain a description if needed */}
              <div className="content-grid__item-content"></div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;