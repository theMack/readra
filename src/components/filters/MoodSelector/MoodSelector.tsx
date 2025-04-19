// src/components/filters/MoodSelector/MoodSelector.tsx
import React from 'react';
import './MoodSelector.scss';

export interface Mood {
  id: string;
  emoji: string;
  label: string;
}

interface MoodSelectorProps {
  moods: Mood[];
  selectedMood?: string;
  onMoodSelect: (moodId: string) => void;
  className?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  moods,
  selectedMood,
  onMoodSelect,
  className = '',
}) => {
  return (
    <div className={`mood-selector ${className}`}>
      <div className="mood-selector__scroll-container">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-selector__mood ${
              selectedMood === mood.id ? 'mood-selector__mood--selected' : ''
            }`}
            onClick={() => onMoodSelect(mood.id)}
            aria-pressed={selectedMood === mood.id}
          >
            <span className="mood-selector__emoji" role="img" aria-label={mood.label}>
              {mood.emoji}
            </span>
            <span className="mood-selector__label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;