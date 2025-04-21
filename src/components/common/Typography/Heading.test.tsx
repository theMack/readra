// src/components/common/Typography/Heading.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading Component', () => {
  it('renders the correct heading level', () => {
    render(<Heading level={1}>Heading 1</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Heading 1');
  });

  it('applies the correct CSS classes based on props', () => {
    render(
      <Heading 
        level={2} 
        variant="title" 
        alignment="center" 
        weight="semibold"
        data-testid="custom-heading"
      >
        Styled Heading
      </Heading>
    );
    
    const heading = screen.getByTestId('custom-heading');
    expect(heading).toHaveClass('readra-heading');
    expect(heading).toHaveClass('readra-heading--h2');
    expect(heading).toHaveClass('readra-heading--title');
    expect(heading).toHaveClass('readra-heading--center');
    expect(heading).toHaveClass('readra-heading--semibold');
    expect(heading).toHaveClass('readra-heading--with-margin');
  });

  it('uses the default variant based on level when variant is not specified', () => {
    const { rerender } = render(<Heading level={1}>Default H1</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('readra-heading--display');
    
    rerender(<Heading level={2}>Default H2</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('readra-heading--title');
    
    rerender(<Heading level={3}>Default H3</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('readra-heading--subtitle');
    
    rerender(<Heading level={4}>Default H4</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('readra-heading--section');
    
    rerender(<Heading level={5}>Default H5</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('readra-heading--regular');
  });

  it('applies custom className', () => {
    render(<Heading level={1} className="custom-class">With Custom Class</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('custom-class');
  });

  it('does not add margin when withMargin is false', () => {
    render(<Heading level={1} withMargin={false}>No Margin</Heading>);
    expect(screen.getByRole('heading')).not.toHaveClass('readra-heading--with-margin');
  });

  it('passes additional props to the heading element', () => {
    render(<Heading level={1} id="test-id" data-custom="value">With Extra Props</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('id', 'test-id');
    expect(heading).toHaveAttribute('data-custom', 'value');
  });
});