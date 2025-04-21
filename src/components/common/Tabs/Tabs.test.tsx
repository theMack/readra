// src/components/common/Tabs/Tabs.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

describe('Tabs Component', () => {
  const tabItems = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
  ];

  it('renders correctly with default props', () => {
    render(<Tabs items={tabItems} />);
    
    // Check if all tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check if first tab is active by default
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    
    // Check if first tab panel is visible
    expect(screen.getByText('Content 1')).toBeVisible();
    
    // Check if other tab panels are hidden
    expect(screen.queryByText('Content 2')).not.toBeVisible();
    expect(screen.queryByText('Content 3')).not.toBeVisible();
  });

  it('renders with a specified default active tab', () => {
    render(<Tabs items={tabItems} defaultActiveId="tab2" />);
    
    // Check if the specified tab is active
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    
    // Check if the corresponding panel is visible
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('changes the active tab when clicked', async () => {
    render(<Tabs items={tabItems} />);
    
    // Click on the second tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    
    // Check if the second tab is now active
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    
    // Check if the second panel is now visible
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('calls onChange when tab is changed', async () => {
    const handleChange = vi.fn();
    render(<Tabs items={tabItems} onChange={handleChange} />);
    
    // Click on the second tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    
    // Check if onChange was called with the correct ID
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('skips disabled tabs when clicked', async () => {
    render(<Tabs items={tabItems} />);
    
    // Click on the disabled tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));
    
    // Check if the first tab is still active
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
  });

  it('handles keyboard navigation correctly', async () => {
    render(<Tabs items={tabItems} />);
    
    // Focus on the first tab
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();
    
    // Press right arrow key to navigate to the next tab
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowRight' });
    
    // Check if the second tab has focus and is active
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    
    // Press right arrow key again (should skip the disabled third tab and wrap to the first)
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowRight' });
    
    // Check if the first tab has focus and is active
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Tabs items={tabItems} variant="default" />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--default');
    
    rerender(<Tabs items={tabItems} variant="pill" />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--pill');
    
    rerender(<Tabs items={tabItems} variant="underline" />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--underline');
  });

  it('renders with different orientations', () => {
    const { rerender } = render(<Tabs items={tabItems} orientation="horizontal" />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--horizontal');
    
    rerender(<Tabs items={tabItems} orientation="vertical" />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--vertical');
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Tabs items={tabItems} fullWidth />);
    expect(screen.getByTestId('tabs-component')).toHaveClass('readra-tabs--full-width');
  });
});