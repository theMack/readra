// src/components/filters/ReadingTimeFilter/ReadingTimeFilter.tsx
import React, { useState } from 'react';
import './ReadingTimeFilter.scss';

export interface ReadingTimeOption {
  id: string;
  label: string;
  minMinutes: number;
  maxMinutes?: number;
  icon?: string;
}

interface ReadingTimeFilterProps {
  options: ReadingTimeOption[];
  selectedOptionId?: string;
  onOptionSelect: (optionId: string) => void;
  className?: string;
}

const ReadingTimeFilter: React.FC<ReadingTimeFilterProps> = ({
  options,
  selectedOptionId,
  onOptionSelect,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const selectedOption = options.find(option => option.id === selectedOptionId);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`reading-time-filter ${className}`}>
      <button 
        className="reading-time-filter__toggle"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="reading-time-options"
      >
        <span className="reading-time-filter__label">
          {selectedOption ? `Reading time: ${selectedOption.label}` : 'Reading time'}
        </span>
        <span className="reading-time-filter__arrow">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>
      
      {isExpanded && (
        <div 
          id="reading-time-options"
          className="reading-time-filter__options"
        >
          {options.map((option) => (
            <button
              key={option.id}
              className={`reading-time-filter__option ${
                selectedOptionId === option.id ? 'reading-time-filter__option--selected' : ''
              }`}
              onClick={() => {
                onOptionSelect(option.id);
                setIsExpanded(false);
              }}
              aria-pressed={selectedOptionId === option.id}
            >
              {option.icon && (
                <span className="reading-time-filter__option-icon">{option.icon}</span>
              )}
              <span className="reading-time-filter__option-label">{option.label}</span>
              <span className="reading-time-filter__option-minutes">
                {option.maxMinutes 
                  ? `${option.minMinutes}-${option.maxMinutes} min`
                  : `${option.minMinutes}+ min`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingTimeFilter;