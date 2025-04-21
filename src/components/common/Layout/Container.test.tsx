import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  test('renders children correctly', () => {
    render(
      <Container>
        <div data-testid="test-child">Test Content</div>
      </Container>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('applies default classes', () => {
    const { container } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('container');
    expect(containerElement).toHaveClass('container--lg');
    expect(containerElement).toHaveClass('container--padding');
    expect(containerElement).toHaveClass('container--centered');
  });
  
  test('applies maxWidth classes correctly', () => {
    const { container: containerSm } = render(
      <Container maxWidth="sm">
        <div>Test Content</div>
      </Container>
    );
    expect((containerSm.firstChild as HTMLElement)).toHaveClass('container--sm');
    
    const { container: containerMd } = render(
      <Container maxWidth="md">
        <div>Test Content</div>
      </Container>
    );
    expect((containerMd.firstChild as HTMLElement)).toHaveClass('container--md');
    
    const { container: containerXl } = render(
      <Container maxWidth="xl">
        <div>Test Content</div>
      </Container>
    );
    expect((containerXl.firstChild as HTMLElement)).toHaveClass('container--xl');
    
    const { container: containerFluid } = render(
      <Container maxWidth="fluid">
        <div>Test Content</div>
      </Container>
    );
    expect((containerFluid.firstChild as HTMLElement)).toHaveClass('container--fluid');
  });
  
  test('applies padding classes correctly', () => {
    const { container: containerWithPadding } = render(
      <Container padding={true}>
        <div>Test Content</div>
      </Container>
    );
    expect((containerWithPadding.firstChild as HTMLElement)).toHaveClass('container--padding');
    
    const { container: containerWithoutPadding } = render(
      <Container padding={false}>
        <div>Test Content</div>
      </Container>
    );
    expect((containerWithoutPadding.firstChild as HTMLElement)).not.toHaveClass('container--padding');
  });
  
  test('applies centered class correctly', () => {
    const { container: centeredContainer } = render(
      <Container centered={true}>
        <div>Test Content</div>
      </Container>
    );
    expect((centeredContainer.firstChild as HTMLElement)).toHaveClass('container--centered');
    
    const { container: nonCenteredContainer } = render(
      <Container centered={false}>
        <div>Test Content</div>
      </Container>
    );
    expect((nonCenteredContainer.firstChild as HTMLElement)).not.toHaveClass('container--centered');
  });
  
  test('renders as different HTML element when specified', () => {
    const { container } = render(
      <Container as="section">
        <div>Test Content</div>
      </Container>
    );
    
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
  
  test('applies additional className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test Content</div>
      </Container>
    );
    
    expect((container.firstChild as HTMLElement)).toHaveClass('custom-class');
  });
  
  test('forwards additional props', () => {
    const dataTestId = 'test-container';
    const { container } = render(
      <Container data-testid={dataTestId}>
        <div>Test Content</div>
      </Container>
    );
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});