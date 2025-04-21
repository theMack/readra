// src/components/common/Typography/Paragraph.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './Paragraph';

describe('Paragraph Component', () => {
  it('renders a paragraph with default props', () => {
    render(<Paragraph>Test paragraph</Paragraph>);
    const paragraph = screen.getByTestId('paragraph');
    
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('Test paragraph');
    expect(paragraph.tagName).toBe('P');
    
    // Check default classes
    expect(paragraph).toHaveClass('readra-paragraph');
    expect(paragraph).toHaveClass('readra-paragraph--md');
    expect(paragraph).toHaveClass('readra-paragraph--left');
    expect(paragraph).toHaveClass('readra-paragraph--regular');
    expect(paragraph).toHaveClass('readra-paragraph--normal');
    expect(paragraph).toHaveClass('readra-paragraph--with-margin');
  });

  it('applies the correct CSS classes based on props', () => {
    render(
      <Paragraph 
        size="lg" 
        alignment="justify" 
        weight="bold"
        lineHeight="loose"
        data-testid="custom-paragraph"
      >
        Styled Paragraph
      </Paragraph>
    );
    
    const paragraph = screen.getByTestId('custom-paragraph');
    expect(paragraph).toHaveClass('readra-paragraph--lg');
    expect(paragraph).toHaveClass('readra-paragraph--justify');
    expect(paragraph).toHaveClass('readra-paragraph--bold');
    expect(paragraph).toHaveClass('readra-paragraph--loose');
  });

  it('applies emphasized styling when specified', () => {
    render(<Paragraph emphasized>Emphasized paragraph</Paragraph>);
    expect(screen.getByTestId('paragraph')).toHaveClass('readra-paragraph--emphasized');
  });

  it('does not add margin when withMargin is false', () => {
    render(<Paragraph withMargin={false}>No margin paragraph</Paragraph>);
    expect(screen.getByTestId('paragraph')).not.toHaveClass('readra-paragraph--with-margin');
  });

  it('applies custom className', () => {
    render(<Paragraph className="custom-class">With custom class</Paragraph>);
    expect(screen.getByTestId('paragraph')).toHaveClass('custom-class');
  });

  it('passes additional props to the paragraph element', () => {
    render(<Paragraph id="test-id" data-custom="value">With extra props</Paragraph>);
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveAttribute('id', 'test-id');
    expect(paragraph).toHaveAttribute('data-custom', 'value');
  });
});