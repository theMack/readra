import React from 'react';
import Button, { ButtonGroup } from './components/Button';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Readra Button Component</h1>
      
      <section className="section">
        <h2>Basic Buttons</h2>
        <div className="button-showcase">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Text</Button>
        </div>
      </section>
      
      <section className="section">
        <h2>Button Sizes</h2>
        <div className="button-showcase">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>
      
      <section className="section">
        <h2>Button States</h2>
        <div className="button-showcase">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      </section>
      
      <section className="section">
        <h2>Buttons with Icons</h2>
        <div className="button-showcase">
          <Button startIcon={<span>➡️</span>}>
            Start Icon
          </Button>
          <Button endIcon={<span>⬅️</span>}>
            End Icon
          </Button>
          <Button 
            startIcon={<span>⭐</span>}
            endIcon={<span>⭐</span>}
          >
            Both Icons
          </Button>
        </div>
      </section>
      
      <section className="section">
        <h2>Icon-Only Buttons</h2>
        <div className="button-showcase">
          <Button 
            icon={<span>🔍</span>}
            ariaLabel="Search"
          />
          <Button 
            icon={<span>❤️</span>}
            ariaLabel="Like"
            variant="accent"
          />
          <Button 
            icon={<span>📤</span>}
            ariaLabel="Share"
            variant="outline"
          />
          <Button 
            icon={<span>⚙️</span>}
            ariaLabel="Settings"
            variant="text"
          />
        </div>
      </section>
      
      <section className="section">
        <h2>Icon-Only Button Shapes</h2>
        <div className="button-showcase">
          <Button 
            icon={<span>📤</span>}
            ariaLabel="Share"
            shape="default"
          />
          <Button 
            icon={<span>📤</span>}
            ariaLabel="Share"
            shape="square"
          />
          <Button 
            icon={<span>📤</span>}
            ariaLabel="Share"
            shape="circle"
          />
        </div>
      </section>
      
      <section className="section">
        <h2>Button Groups</h2>
        <div className="button-showcase">
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
        
        <div className="button-showcase">
          <ButtonGroup variant="outline">
            <Button>Day</Button>
            <Button>Week</Button>
            <Button>Month</Button>
            <Button>Year</Button>
          </ButtonGroup>
        </div>
        
        <div className="button-showcase">
          <ButtonGroup variant="secondary" size="small">
            <Button icon={<span>◀️</span>} ariaLabel="Previous" />
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button icon={<span>▶️</span>} ariaLabel="Next" />
          </ButtonGroup>
        </div>
      </section>
      
      <section className="section">
        <h2>Vertical Button Groups</h2>
        <div className="button-showcase">
          <ButtonGroup vertical>
            <Button>Top</Button>
            <Button>Middle</Button>
            <Button>Bottom</Button>
          </ButtonGroup>
        </div>
      </section>
      
      <section className="section">
        <h2>Full Width Button Group</h2>
        <div className="button-showcase">
          <ButtonGroup fullWidth>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
};

export default App;