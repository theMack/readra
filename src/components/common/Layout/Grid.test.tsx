import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid, { GridItem } from './Grid';

describe('Grid', () => {
  test('renders children correctly', () => {
    render(
      <Grid>
        <div data-testid="test-child">Test Content</div>
      </Grid>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('applies default classes', () => {
    const { container } = render(
      <Grid>
        <div>Test Content</div>
      </Grid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid--columns-12');
    expect(gridElement).toHaveClass('grid--gap-md');
  });
  
  test('applies columns classes correctly', () => {
    const { container: container3 } = render(
      <Grid columns={3}>
        <div>Test Content</div>
      </Grid>
    );
    expect((container3.firstChild as HTMLElement)).toHaveClass('grid--columns-3');
    
    const { container: container6 } = render(
      <Grid columns={6}>
        <div>Test Content</div>
      </Grid>
    );
    expect((container6.firstChild as HTMLElement)).toHaveClass('grid--columns-6');
    
    const { container: containerAuto } = render(
      <Grid columns="auto">
        <div>Test Content</div>
      </Grid>
    );
    expect((containerAuto.firstChild as HTMLElement)).toHaveClass('grid--columns-auto');
  });
  
  test('applies responsive column classes correctly', () => {
    const { container } = render(
      <Grid 
        columns={1}
        smColumns={2}
        mdColumns={4}
        lgColumns={6}
        xlColumns={12}
      >
        <div>Test Content</div>
      </Grid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('grid--columns-1');
    expect(gridElement).toHaveClass('grid--sm-columns-2');
    expect(gridElement).toHaveClass('grid--md-columns-4');
    expect(gridElement).toHaveClass('grid--lg-columns-6');
    expect(gridElement).toHaveClass('grid--xl-columns-12');
  });
  
  test('applies gap classes correctly', () => {
    const { container: containerXsGap } = render(
      <Grid gap="xs">
        <div>Test Content</div>
      </Grid>
    );
    expect((containerXsGap.firstChild as HTMLElement)).toHaveClass('grid--gap-xs');
    
    const { container: containerLgGap } = render(
      <Grid gap="lg">
        <div>Test Content</div>
      </Grid>
    );
    expect((containerLgGap.firstChild as HTMLElement)).toHaveClass('grid--gap-lg');
    
    const { container: containerWithRowGap } = render(
      <Grid rowGap="sm">
        <div>Test Content</div>
      </Grid>
    );
    expect((containerWithRowGap.firstChild as HTMLElement)).toHaveClass('grid--row-gap-sm');
    
    const { container: containerWithColumnGap } = render(
      <Grid columnGap="md">
        <div>Test Content</div>
      </Grid>
    );
    expect((containerWithColumnGap.firstChild as HTMLElement)).toHaveClass('grid--column-gap-md');
  });
  
  test('applies alignment classes correctly', () => {
    const { container } = render(
      <Grid 
        justifyItems="center"
        alignItems="end"
        justifyContent="space-between"
        alignContent="center"
      >
        <div>Test Content</div>
      </Grid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass('grid--justify-items-center');
    expect(gridElement).toHaveClass('grid--align-items-end');
    expect(gridElement).toHaveClass('grid--justify-content-space-between');
    expect(gridElement).toHaveClass('grid--align-content-center');
  });
  
  test('renders as different HTML element when specified', () => {
    const { container } = render(
      <Grid as="section">
        <div>Test Content</div>
      </Grid>
    );
    
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
  
  test('applies additional className', () => {
    const { container } = render(
      <Grid className="custom-class">
        <div>Test Content</div>
      </Grid>
    );
    
    expect((container.firstChild as HTMLElement)).toHaveClass('custom-class');
  });
  
  test('forwards additional props', () => {
    const dataTestId = 'test-grid';
    const { container } = render(
      <Grid data-testid={dataTestId}>
        <div>Test Content</div>
      </Grid>
    );
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});

describe('GridItem', () => {
  test('renders children correctly', () => {
    render(
      <GridItem>
        <div data-testid="test-child">Test Content</div>
      </GridItem>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('applies default classes', () => {
    const { container } = render(
      <GridItem>
        <div>Test Content</div>
      </GridItem>
    );
    
    const gridItemElement = container.firstChild as HTMLElement;
    expect(gridItemElement).toHaveClass('grid-item');
    expect(gridItemElement).toHaveClass('grid-item--span-1');
  });
  
  test('applies span classes correctly', () => {
    const { container: container3 } = render(
      <GridItem span={3}>
        <div>Test Content</div>
      </GridItem>
    );
    expect((container3.firstChild as HTMLElement)).toHaveClass('grid-item--span-3');
    
    const { container: container12 } = render(
      <GridItem span={12}>
        <div>Test Content</div>
      </GridItem>
    );
    expect((container12.firstChild as HTMLElement)).toHaveClass('grid-item--span-12');
  });
  
  test('applies responsive span classes correctly', () => {
    const { container } = render(
      <GridItem 
        span={1}
        smSpan={2}
        mdSpan={4}
        lgSpan={6}
        xlSpan={12}
      >
        <div>Test Content</div>
      </GridItem>
    );
    
    const gridItemElement = container.firstChild as HTMLElement;
    expect(gridItemElement).toHaveClass('grid-item--span-1');
    expect(gridItemElement).toHaveClass('grid-item--sm-span-2');
    expect(gridItemElement).toHaveClass('grid-item--md-span-4');
    expect(gridItemElement).toHaveClass('grid-item--lg-span-6');
    expect(gridItemElement).toHaveClass('grid-item--xl-span-12');
  });
  
  test('applies position classes correctly', () => {
    const { container } = render(
      <GridItem 
        startColumn={2}
        endColumn={5}
        rowSpan={2}
      >
        <div>Test Content</div>
      </GridItem>
    );
    
    const gridItemElement = container.firstChild as HTMLElement;
    expect(gridItemElement).toHaveClass('grid-item--start-2');
    expect(gridItemElement).toHaveClass('grid-item--end-5');
    expect(gridItemElement).toHaveClass('grid-item--row-span-2');
  });
  
  test('applies alignment classes correctly', () => {
    const { container } = render(
      <GridItem 
        justifySelf="center"
        alignSelf="end"
      >
        <div>Test Content</div>
      </GridItem>
    );
    
    const gridItemElement = container.firstChild as HTMLElement;
    expect(gridItemElement).toHaveClass('grid-item--justify-self-center');
    expect(gridItemElement).toHaveClass('grid-item--align-self-end');
  });
  
  test('renders as different HTML element when specified', () => {
    const { container } = render(
      <GridItem as="article">
        <div>Test Content</div>
      </GridItem>
    );
    
    expect(container.firstChild?.nodeName).toBe('ARTICLE');
  });
  
  test('applies additional className', () => {
    const { container } = render(
      <GridItem className="custom-class">
        <div>Test Content</div>
      </GridItem>
    );
    
    expect((container.firstChild as HTMLElement)).toHaveClass('custom-class');
  });
  
  test('forwards additional props', () => {
    const dataTestId = 'test-grid-item';
    const { container } = render(
      <GridItem data-testid={dataTestId}>
        <div>Test Content</div>
      </GridItem>
    );
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});