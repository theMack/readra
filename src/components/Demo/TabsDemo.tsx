// src/components/Demo/TabsDemo.tsx
import React, { useState } from 'react';
import { Tabs } from '../common/Tabs';
import { Container } from '../common/Layout';

const TabsDemo: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState('default');
  
  const basicTabItems = [
    { 
      id: 'features', 
      label: 'Features', 
      content: (
        <div>
          <h3>Platform Features</h3>
          <p>Readra provides an unparalleled reading experience with advanced features for both readers and creators.</p>
          <ul>
            <li>Immersive reading mode</li>
            <li>Customizable typography</li>
            <li>Bookmarking and annotations</li>
            <li>Interactive elements</li>
          </ul>
        </div>
      ) 
    },
    { 
      id: 'creators', 
      label: 'For Creators', 
      content: (
        <div>
          <h3>Creator Tools</h3>
          <p>Readra empowers creators with powerful tools to publish and monetize their content.</p>
          <ul>
            <li>Rich text editor</li>
            <li>Content analytics</li>
            <li>Audience engagement metrics</li>
            <li>Fair compensation model</li>
          </ul>
        </div>
      ) 
    },
    { 
      id: 'pricing', 
      label: 'Pricing', 
      content: (
        <div>
          <h3>Subscription Options</h3>
          <p>Choose the plan that fits your needs.</p>
          <ul>
            <li>Free tier: Basic reading features</li>
            <li>Reader Plus: $5.99/month - Enhanced reading experience</li>
            <li>Creator: $9.99/month - Full publishing tools</li>
            <li>Creator Pro: $15.99/month - Advanced analytics and premium features</li>
          </ul>
        </div>
      ) 
    },
    { 
      id: 'roadmap', 
      label: 'Roadmap', 
      content: (
        <div>
          <h3>Coming Soon</h3>
          <p>Exciting new features on our development roadmap:</p>
          <ul>
            <li>AR/VR reading experiences</li>
            <li>AI-powered content recommendations</li>
            <li>Social reading communities</li>
            <li>Cross-platform sync</li>
          </ul>
        </div>
      ),
      disabled: true 
    }
  ];

  const handleVariantChange = (id: string) => {
    setActiveVariant(id);
  };

  const variantTabItems = [
    { id: 'default', label: 'Default Variant', content: null },
    { id: 'pill', label: 'Pill Variant', content: null },
    { id: 'underline', label: 'Underline Variant', content: null }
  ];

  const orientationTabItems = [
    { 
      id: 'horizontal', 
      label: 'Horizontal', 
      content: (
        <Tabs 
          items={basicTabItems}
          orientation="horizontal"
          variant={activeVariant as 'default' | 'pill' | 'underline'}
        />
      ) 
    },
    { 
      id: 'vertical', 
      label: 'Vertical', 
      content: (
        <Tabs 
          items={basicTabItems}
          orientation="vertical"
          variant={activeVariant as 'default' | 'pill' | 'underline'}
        />
      ) 
    }
  ];

  return (
    <Container>
      <h1>Tabs Component Demo</h1>
      
      <section>
        <h2>Variant Selection</h2>
        <Tabs 
          items={variantTabItems} 
          defaultActiveId="default"
          onChange={handleVariantChange}
          variant="pill"
        />
      </section>
      
      <section>
        <h2>Orientation Examples</h2>
        <p className="demo-description">
          The tabs below demonstrate both horizontal and vertical orientations with the currently selected {activeVariant} variant.
        </p>
        <Tabs 
          items={orientationTabItems}
          defaultActiveId="horizontal"
          variant="underline"
        />
      </section>
      
      <section>
        <h2>Full Width Example</h2>
        <Tabs 
          items={basicTabItems}
          fullWidth
          variant={activeVariant as 'default' | 'pill' | 'underline'}
        />
      </section>
    </Container>
  );
};

export default TabsDemo;