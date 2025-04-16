// src/App.tsx
import React from 'react';
import Button, { ButtonGroup } from './components/Button';
import Card from './components/Card';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Readra UI Components</h1>
      
      {/* Button section can stay the same as before */}
      
      <section className="section">
        <h2>Card Component</h2>
        
        <div className="card-showcase">
          <Card 
            title="Basic Card"
            subtitle="With title and subtitle"
          >
            <p>This is a basic card with a title and subtitle.</p>
          </Card>
          
          <Card 
            title="Card with Image"
            subtitle="Images help draw attention"
            image="https://source.unsplash.com/random/800x600/?book"
            imageAlt="Random book image"
          >
            <p>Cards can include images at the top to create visual interest.</p>
          </Card>
          
          <Card 
            title="Interactive Card"
            subtitle="Click me!"
            interactive
            onClick={() => alert('Card clicked!')}
          >
            <p>Interactive cards can be clicked and have hover effects.</p>
          </Card>
          
          <Card 
            title="Card with Footer"
            subtitle="Footers can contain actions"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="outline" size="small">Cancel</Button>
                <Button size="small">Save</Button>
              </div>
            }
          >
            <p>Cards can have a footer section for actions or additional information.</p>
          </Card>
          
          <Card 
            title="Card with Header Actions"
            headerActions={
              <Button 
                variant="text" 
                size="small"
                icon={<span>⋮</span>}
                ariaLabel="More options"
              />
            }
          >
            <p>Cards can have actions in the header for options, closing, etc.</p>
          </Card>
          
          <Card 
            bordered
            elevated={false}
            title="Bordered Card"
            subtitle="No elevation, just borders"
          >
            <p>This card uses borders instead of elevation for definition.</p>
          </Card>
          
          <Card padding="large" title="Large Padding">
            <p>This card has extra padding for a more spacious feel.</p>
          </Card>
          
          <Card padding="small" title="Small Padding">
            <p>This card has less padding for a more compact look.</p>
          </Card>
          
          <Card 
            as="article" 
            title="Semantic HTML"
            subtitle="Using the proper HTML elements"
          >
            <p>This card renders as an article element for better semantics.</p>
          </Card>
        </div>
        
        <h3>Full-Width Card</h3>
        <Card 
          title="Full-Width Example"
          subtitle="This card spans the full width of its container"
          image="https://source.unsplash.com/random/1200x600/?library"
          imageAlt="Random library image"
        >
          <p>Full-width cards are useful for featured content or important information that should stand out.</p>
        </Card>
      </section>
    </div>
  );
};

export default App;