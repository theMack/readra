// src/components/common/Tabs/Tabs.tsx
import React, { useState, useRef } from 'react';
import './Tabs.scss';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pill' | 'underline';
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  onChange,
  orientation = 'horizontal',
  variant = 'default',
  fullWidth = false,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || (items[0]?.id || ''));
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabsCount = items.length;
    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % tabsCount;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + tabsCount) % tabsCount;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabsCount - 1;
        break;
      default:
        return;
    }

    // Skip disabled tabs
    while (items[nextIndex]?.disabled && nextIndex !== index) {
      nextIndex = (nextIndex + 1) % tabsCount;
    }

    if (nextIndex !== -1 && nextIndex !== index && !items[nextIndex]?.disabled) {
      const nextId = items[nextIndex].id;
      const nextTabEl = tabRefs.current.get(nextId);
      nextTabEl?.focus();
      setActiveId(nextId);
      onChange?.(nextId);
    }
  };

  const handleTabClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  // Set up class names based on props
  const tabsClassName = `readra-tabs readra-tabs--${variant} readra-tabs--${orientation} ${fullWidth ? 'readra-tabs--full-width' : ''} ${className}`.trim();

  return (
    <div 
      className={tabsClassName} 
      data-testid="tabs-component"
    >
      {/* Tab list */}
      {orientation === 'horizontal' ? (
        <div 
          className="readra-tabs__list"
          role="tablist"
          aria-orientation="horizontal"
        >
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            
            return isActive ? (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className="readra-tabs__tab readra-tabs__tab--active"
                role="tab"
                aria-selected="true"
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={0}
                onClick={() => !item.disabled && handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={item.disabled}
                ref={(el) => {
                  if (el) tabRefs.current.set(item.id, el);
                  else tabRefs.current.delete(item.id);
                }}
                data-testid={`tab-${item.id}`}
              >
                {item.label}
              </button>
            ) : (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className="readra-tabs__tab"
                role="tab"
                aria-selected="false"
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={-1}
                onClick={() => !item.disabled && handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={item.disabled}
                ref={(el) => {
                  if (el) tabRefs.current.set(item.id, el);
                  else tabRefs.current.delete(item.id);
                }}
                data-testid={`tab-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div 
          className="readra-tabs__list"
          role="tablist"
          aria-orientation="vertical"
        >
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            
            return isActive ? (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className="readra-tabs__tab readra-tabs__tab--active"
                role="tab"
                aria-selected="true"
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={0}
                onClick={() => !item.disabled && handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={item.disabled}
                ref={(el) => {
                  if (el) tabRefs.current.set(item.id, el);
                  else tabRefs.current.delete(item.id);
                }}
                data-testid={`tab-${item.id}`}
              >
                {item.label}
              </button>
            ) : (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                className="readra-tabs__tab"
                role="tab"
                aria-selected="false"
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={-1}
                onClick={() => !item.disabled && handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={item.disabled}
                ref={(el) => {
                  if (el) tabRefs.current.set(item.id, el);
                  else tabRefs.current.delete(item.id);
                }}
                data-testid={`tab-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
      
      {/* Tab panels */}
      <div className="readra-tabs__content">
        {items.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <div
              key={item.id}
              id={`tabpanel-${item.id}`}
              className={`readra-tabs__panel ${isActive ? 'readra-tabs__panel--active' : ''}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              tabIndex={0}
              hidden={!isActive}
              data-testid={`tabpanel-${item.id}`}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;