import React from 'react';
import { Container, Flex, Grid, GridItem } from '../common/Layout';
import './LayoutDemo.scss';

type ColorBlockProps = { 
  color: string; 
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: 'w-30' | 'w-45' | 'w-50' | 'w-100';
  className?: string;
  children?: React.ReactNode 
};

const ColorBlock: React.FC<ColorBlockProps> = ({ 
  color, 
  height = 'md', 
  width,
  className = '',
  children 
}) => {
  const colorClass = `color-block--${color.replace('#', '')}`;
  const heightClass = `color-block--height-${height}`;
  const widthClass = width ? `color-block--${width}` : '';
  
  return (
    <div 
      className={`color-block ${colorClass} ${heightClass} ${widthClass} ${className}`}
    >
      {children}
    </div>
  );
};


const LayoutDemo: React.FC = () => {
  return (
    <div className="layout-demo">
      <h1 className="layout-demo__title">Layout Components Demo</h1>
      
      <section className="layout-demo__section">
        <h2 className="layout-demo__section-title">Container Component</h2>
        <p className="layout-demo__description">
          The Container component constrains content width and provides consistent padding.
        </p>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Default Container (lg)</h3>
          <Container>
            <ColorBlock color="#e9ecef">Default Container</ColorBlock>
          </Container>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Container Sizes</h3>
          <Container maxWidth="sm">
            <ColorBlock color="#ced4da">Small Container</ColorBlock>
          </Container>
          <Container maxWidth="md" className="mt-3">
            <ColorBlock color="#adb5bd">Medium Container</ColorBlock>
          </Container>
          <Container maxWidth="lg" className="mt-3">
            <ColorBlock color="#6c757d">Large Container</ColorBlock>
          </Container>
          <Container maxWidth="xl" className="mt-3">
            <ColorBlock color="#495057">Extra Large Container</ColorBlock>
          </Container>
          <Container maxWidth="fluid" className="mt-3">
            <ColorBlock color="#343a40">Fluid Container</ColorBlock>
          </Container>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Container with No Padding</h3>
          <Container padding={false}>
            <ColorBlock color="#e9ecef">No Padding Container</ColorBlock>
          </Container>
        </div>
      </section>
      
      <section className="layout-demo__section">
        <h2 className="layout-demo__section-title">Flex Component</h2>
        <p className="layout-demo__description">
          The Flex component uses flexbox to arrange content with flexible layout options.
        </p>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Default Flex (Row)</h3>
          <Flex gap="md">
            <ColorBlock color="#4961E7">Item 1</ColorBlock>
            <ColorBlock color="#6B4DE7">Item 2</ColorBlock>
            <ColorBlock color="#8C39E7">Item 3</ColorBlock>
          </Flex>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Flex Column</h3>
          <Flex direction="column" gap="sm">
            <ColorBlock color="#4961E7" height="xs">Item 1</ColorBlock>
            <ColorBlock color="#6B4DE7" height="xs">Item 2</ColorBlock>
            <ColorBlock color="#8C39E7" height="xs">Item 3</ColorBlock>
          </Flex>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Flex Alignment and Justification</h3>
          <Flex justifyContent="space-between" alignItems="center" gap="md">
            <ColorBlock color="#4961E7" height="sm">Left</ColorBlock>
            <ColorBlock color="#6B4DE7" height="md">Center</ColorBlock>
            <ColorBlock color="#8C39E7" height="sm">Right</ColorBlock>
          </Flex>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Flex Wrap</h3>
          <Flex wrap="wrap" gap="sm">
            <ColorBlock color="#4961E7" width="w-30">Item 1</ColorBlock>
            <ColorBlock color="#6B4DE7" width="w-30">Item 2</ColorBlock>
            <ColorBlock color="#8C39E7" width="w-30">Item 3</ColorBlock>
            <ColorBlock color="#4961E7" width="w-45">Item 4</ColorBlock>
            <ColorBlock color="#6B4DE7" width="w-45">Item 5</ColorBlock>
          </Flex>
        </div>
      </section>
      
      <section className="layout-demo__section">
        <h2 className="layout-demo__section-title">Grid Component</h2>
        <p className="layout-demo__description">
          The Grid component creates responsive grid layouts with precise control over item placement.
        </p>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Basic Grid</h3>
          <Grid columns={3} gap="md">
            <ColorBlock color="#4961E7">Column 1</ColorBlock>
            <ColorBlock color="#6B4DE7">Column 2</ColorBlock>
            <ColorBlock color="#8C39E7">Column 3</ColorBlock>
          </Grid>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">12-Column Grid with GridItem</h3>
          <Grid columns={12} gap="md">
            <GridItem span={12}>
              <ColorBlock color="#4961E7">Span 12</ColorBlock>
            </GridItem>
            <GridItem span={6}>
              <ColorBlock color="#6B4DE7">Span 6</ColorBlock>
            </GridItem>
            <GridItem span={6}>
              <ColorBlock color="#8C39E7">Span 6</ColorBlock>
            </GridItem>
            <GridItem span={4}>
              <ColorBlock color="#4961E7">Span 4</ColorBlock>
            </GridItem>
            <GridItem span={4}>
              <ColorBlock color="#6B4DE7">Span 4</ColorBlock>
            </GridItem>
            <GridItem span={4}>
              <ColorBlock color="#8C39E7">Span 4</ColorBlock>
            </GridItem>
            <GridItem span={3}>
              <ColorBlock color="#4961E7">Span 3</ColorBlock>
            </GridItem>
            <GridItem span={3}>
              <ColorBlock color="#6B4DE7">Span 3</ColorBlock>
            </GridItem>
            <GridItem span={3}>
              <ColorBlock color="#8C39E7">Span 3</ColorBlock>
            </GridItem>
            <GridItem span={3}>
              <ColorBlock color="#4961E7">Span 3</ColorBlock>
            </GridItem>
          </Grid>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Responsive Grid</h3>
          <Grid 
            columns={1} 
            smColumns={2}
            mdColumns={3}
            lgColumns={4}
            gap="md"
          >
            <ColorBlock color="#4961E7">Item 1</ColorBlock>
            <ColorBlock color="#6B4DE7">Item 2</ColorBlock>
            <ColorBlock color="#8C39E7">Item 3</ColorBlock>
            <ColorBlock color="#4961E7">Item 4</ColorBlock>
          </Grid>
          <p className="mt-3">Resize the browser to see the grid respond to different screen sizes.</p>
        </div>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Grid Item Placement</h3>
          <Grid columns={3} gap="md">
            <GridItem startColumn={1} endColumn={3}>
              <ColorBlock color="#4961E7">Start 1, End 3</ColorBlock>
            </GridItem>
            <GridItem>
              <ColorBlock color="#6B4DE7">Default</ColorBlock>
            </GridItem>
            <GridItem span={2}>
              <ColorBlock color="#8C39E7">Span 2</ColorBlock>
            </GridItem>
            <GridItem rowSpan={2}>
              <ColorBlock color="#4961E7" height="lg">Row Span 2</ColorBlock>
            </GridItem>
            <GridItem span={2}>
              <ColorBlock color="#6B4DE7">Span 2</ColorBlock>
            </GridItem>
          </Grid>
        </div>
      </section>
      
      <section className="layout-demo__section">
        <h2 className="layout-demo__section-title">Combining Layout Components</h2>
        <p className="layout-demo__description">
          These components can be combined to create complex, responsive layouts.
        </p>
        
        <div className="layout-demo__example">
          <h3 className="layout-demo__example-title">Sample Page Layout</h3>
          <Container>
            <Grid columns={12} gap="md">
              <GridItem span={12}>
                <ColorBlock color="#343a40">Header</ColorBlock>
              </GridItem>
              
              <GridItem span={12} mdSpan={8}>
                <ColorBlock color="#6c757d" height="xl">Main Content</ColorBlock>
              </GridItem>
              
              <GridItem span={12} mdSpan={4}>
                <Flex direction="column" gap="md">
                  <ColorBlock color="#adb5bd">Sidebar Item</ColorBlock>
                  <ColorBlock color="#ced4da">Sidebar Item</ColorBlock>
                  <ColorBlock color="#e9ecef">Sidebar Item</ColorBlock>
                </Flex>
              </GridItem>
              
              <GridItem span={12}>
                <Grid columns={3} gap="md">
                  <ColorBlock color="#4961E7">Feature 1</ColorBlock>
                  <ColorBlock color="#6B4DE7">Feature 2</ColorBlock>
                  <ColorBlock color="#8C39E7">Feature 3</ColorBlock>
                </Grid>
              </GridItem>
              
              <GridItem span={12}>
                <ColorBlock color="#343a40">Footer</ColorBlock>
              </GridItem>
            </Grid>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default LayoutDemo;