// src/components/common/Tabs/Tabs.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
      defaultValue: 'horizontal',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'pill', 'underline'],
      description: 'Visual variant of the tabs',
      defaultValue: 'default',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether tabs should take full width',
      defaultValue: false,
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample tab content for stories
const tabItems = [
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

// Basic story
export const Default: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'features',
    orientation: 'horizontal',
    variant: 'default',
    fullWidth: false,
  },
};

// Pill variant story
export const PillVariant: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'creators',
    orientation: 'horizontal',
    variant: 'pill',
    fullWidth: false,
  },
};

// Underline variant story
export const UnderlineVariant: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'pricing',
    orientation: 'horizontal',
    variant: 'underline',
    fullWidth: false,
  },
};

// Vertical orientation story
export const VerticalOrientation: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'features',
    orientation: 'vertical',
    variant: 'default',
    fullWidth: false,
  },
};

// Full width story
export const FullWidth: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'features',
    orientation: 'horizontal',
    variant: 'default',
    fullWidth: true,
  },
};

// Story with disabled tab
export const WithDisabledTab: Story = {
  args: {
    items: tabItems,
    defaultActiveId: 'creators',
    orientation: 'horizontal',
    variant: 'default',
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The "Roadmap" tab is disabled and cannot be selected.',
      },
    },
  },
};

// Simple tabs for a minimal example
export const Simple: Story = {
  args: {
    items: [
      { id: 'tab1', label: 'First Tab', content: <p>Content for the first tab</p> },
      { id: 'tab2', label: 'Second Tab', content: <p>Content for the second tab</p> },
      { id: 'tab3', label: 'Third Tab', content: <p>Content for the third tab</p> },
    ],
    variant: 'default',
  },
};