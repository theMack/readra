// src/components/Button/Button.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import Button from './Button';
import { ButtonGroup } from './';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button--primary', 'button--medium');
    expect(button).not.toHaveClass('button--full-width');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom variant and size', () => {
    render(<Button variant="accent" size="large">Custom Button</Button>);
    const button = screen.getByRole('button', { name: /custom button/i });

    expect(button).toHaveClass('button--accent', 'button--large');
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--full-width');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('displays loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    expect(document.querySelector('.button__loader')).toBeInTheDocument();
  });

  it('renders start and end icons', () => {
    const StartIcon = () => <span data-testid="start-icon" />;
    const EndIcon = () => <span data-testid="end-icon" />;

    render(<Button startIcon={<StartIcon />} endIcon={<EndIcon />}>Icons</Button>);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByText('Icons')).toBeInTheDocument();
  });

  it('does not render icons when loading', () => {
    const Icon = () => <span data-testid="icon" />;
    render(<Button startIcon={<Icon />} endIcon={<Icon />} loading>Load</Button>);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('renders icon-only button with aria-label', () => {
    const Icon = () => <span data-testid="icon" />;
    render(<Button icon={<Icon />} ariaLabel="icon button" />);
    const button = screen.getByRole('button', { name: /icon button/i });
    expect(button).toHaveClass('button--icon-only');
    expect(button).toHaveAttribute('aria-label', 'icon button');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('warns if icon-only button has no aria-label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const Icon = () => <span />;
    render(<Button icon={<Icon />} />);
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/ariaLabel/i));
    warn.mockRestore();
  });

  it('applies shape classes correctly', () => {
    const { rerender } = render(<Button shape="square">Shape</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--square');

    rerender(<Button shape="circle">Shape</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--circle');

    rerender(<Button shape="default">Shape</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('button--square');
    expect(screen.getByRole('button')).not.toHaveClass('button--circle');
  });
});

describe('ButtonGroup Component', () => {
  it('renders grouped buttons', () => {
    render(
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveClass('button--grouped', 'button--grouped-start');
    expect(buttons[1]).toHaveClass('button--grouped');
    expect(buttons[2]).toHaveClass('button--grouped', 'button--grouped-end');
  });

  it('applies group variant and size', () => {
    render(
      <ButtonGroup variant="secondary" size="small">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('button--secondary', 'button--small');
    });
  });

  it('respects individual button props over group props', () => {
    render(
      <ButtonGroup variant="secondary" size="small">
        <Button>Group</Button>
        <Button variant="accent">Accent</Button>
        <Button size="large">Large</Button>
      </ButtonGroup>
    );
    const [b1, b2, b3] = screen.getAllByRole('button');
    expect(b1).toHaveClass('button--secondary', 'button--small');
    expect(b2).toHaveClass('button--accent', 'button--small');
    expect(b3).toHaveClass('button--secondary', 'button--large');
  });

  it('renders vertical group', () => {
    render(
      <ButtonGroup vertical>
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group')).toHaveClass('button-group--vertical');
  });

  it('renders full-width group', () => {
    render(
      <ButtonGroup fullWidth>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group')).toHaveClass('button-group--full-width');
  });

  it('handles non-button children gracefully', () => {
    render(
      <ButtonGroup>
        <Button>Valid</Button>
        <div data-testid="custom-child">Custom</div>
      </ButtonGroup>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });
});
