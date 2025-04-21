// src/components/Demo/TypographyDemo.tsx
import React from 'react';
import { Container } from '../common/Layout';
import { Heading, Paragraph, Text } from '../common/Typography';
import './TypographyDemo.scss';

const TypographyDemo: React.FC = () => {
  return (
    <Container>
      <div className="typography-demo">
        <section className="typography-section">
          <Heading level={1}>Typography Components</Heading>
          <Paragraph>
            This page demonstrates the typography components available in the Readra platform.
            These components provide consistent text styling while maintaining semantic meaning.
          </Paragraph>
        </section>

        <section className="typography-section">
          <Heading level={2}>Heading Component</Heading>
          <Paragraph>
            The Heading component provides six levels of headings (h1-h6) with various visual variants.
          </Paragraph>

          <div className="demo-box">
            <Heading level={1}>Heading Level 1 (Display)</Heading>
            <Heading level={2}>Heading Level 2 (Title)</Heading>
            <Heading level={3}>Heading Level 3 (Subtitle)</Heading>
            <Heading level={4}>Heading Level 4 (Section)</Heading>
            <Heading level={5}>Heading Level 5 (Regular)</Heading>
            <Heading level={6}>Heading Level 6 (Regular)</Heading>
          </div>

          <Heading level={3} variant="subtitle">Heading Variants</Heading>
          <div className="demo-box">
            <Heading level={2} variant="display">Title with Display Variant</Heading>
            <Heading level={3} variant="title">Subtitle with Title Variant</Heading>
            <Heading level={4} variant="subtitle">Section with Subtitle Variant</Heading>
          </div>

          <Heading level={3} variant="subtitle">Heading Alignment</Heading>
          <div className="demo-box">
            <Heading level={4} alignment="left">Left Aligned Heading (Default)</Heading>
            <Heading level={4} alignment="center">Center Aligned Heading</Heading>
            <Heading level={4} alignment="right">Right Aligned Heading</Heading>
          </div>

          <Heading level={3} variant="subtitle">Heading Weights</Heading>
          <div className="demo-box">
            <Heading level={4} weight="light">Light Weight Heading</Heading>
            <Heading level={4} weight="regular">Regular Weight Heading</Heading>
            <Heading level={4} weight="medium">Medium Weight Heading</Heading>
            <Heading level={4} weight="semibold">Semibold Weight Heading</Heading>
            <Heading level={4} weight="bold">Bold Weight Heading (Default)</Heading>
          </div>
        </section>

        <section className="typography-section">
          <Heading level={2}>Paragraph Component</Heading>
          <Paragraph>
            The Paragraph component is used for blocks of text, with various size, alignment, 
            and style options to provide flexibility while maintaining consistent typography.
          </Paragraph>

          <Heading level={3} variant="subtitle">Paragraph Sizes</Heading>
          <div className="demo-box">
            <Paragraph size="xs">Extra Small Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
            <Paragraph size="sm">Small Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
            <Paragraph size="md">Medium Paragraph (Default) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
            <Paragraph size="lg">Large Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
            <Paragraph size="xl">Extra Large Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Paragraph Alignment</Heading>
          <div className="demo-box">
            <Paragraph alignment="left">Left Aligned Paragraph (Default) - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
            <Paragraph alignment="center">Center Aligned Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
            <Paragraph alignment="right">Right Aligned Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>
            <Paragraph alignment="justify">Justify Aligned Paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Paragraph Weights</Heading>
          <div className="demo-box">
            <Paragraph weight="light">Light Weight Paragraph</Paragraph>
            <Paragraph weight="regular">Regular Weight Paragraph (Default)</Paragraph>
            <Paragraph weight="medium">Medium Weight Paragraph</Paragraph>
            <Paragraph weight="semibold">Semibold Weight Paragraph</Paragraph>
            <Paragraph weight="bold">Bold Weight Paragraph</Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Paragraph Line Height</Heading>
          <div className="demo-box">
            <Paragraph lineHeight="tight">Tight Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
            <Paragraph lineHeight="normal">Normal Line Height (Default) - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
            <Paragraph lineHeight="relaxed">Relaxed Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
            <Paragraph lineHeight="loose">Loose Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Special Paragraph Styles</Heading>
          <div className="demo-box">
            <Paragraph emphasized>Emphasized Paragraph - This paragraph is highlighted to draw attention to important information.</Paragraph>
          </div>
        </section>

        <section className="typography-section">
          <Heading level={2}>Text Component</Heading>
          <Paragraph>
            The Text component is for inline text elements with various styling options.
            It can render different HTML elements based on the desired semantic meaning.
          </Paragraph>

          <Heading level={3} variant="subtitle">Text Variants</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text variant="default">Default Text</Text> | 
              <Text variant="code"> Code Text </Text> | 
              <Text variant="caption"> Caption Text </Text> | 
              <Text variant="quote"> Quote Text </Text> | 
              <Text variant="label"> Label Text </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text HTML Elements</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text as="span">Span Element (Default)</Text> | 
              <Text as="strong"> Strong Element </Text> | 
              <Text as="em"> Emphasis Element </Text> | 
              <Text as="mark"> Mark Element </Text> | 
              <Text as="code"> Code Element </Text> | 
              <Text as="del"> Deleted Text </Text> | 
              <Text as="ins"> Inserted Text </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Sizes</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text size="xs">Extra Small Text</Text> | 
              <Text size="sm"> Small Text </Text> | 
              <Text size="md"> Medium Text (Default) </Text> | 
              <Text size="lg"> Large Text </Text> | 
              <Text size="xl"> Extra Large Text </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Weights</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text weight="light">Light Weight</Text> | 
              <Text weight="regular"> Regular Weight (Default) </Text> | 
              <Text weight="medium"> Medium Weight </Text> | 
              <Text weight="semibold"> Semibold Weight </Text> | 
              <Text weight="bold"> Bold Weight </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Decorations</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text decoration="none">No Decoration (Default)</Text> | 
              <Text decoration="underline"> Underlined Text </Text> | 
              <Text decoration="line-through"> Line-through Text </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Transformations</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text transform="none">No Transformation (Default)</Text> | 
              <Text transform="uppercase"> UPPERCASE TEXT </Text> | 
              <Text transform="lowercase"> lowercase text </Text> | 
              <Text transform="capitalize"> Capitalized Text </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Colors</Heading>
          <div className="demo-box">
            <Paragraph>
              <Text>Default Color</Text> | 
              <Text color="primary"> Primary Color </Text> | 
              <Text color="secondary"> Secondary Color </Text> | 
              <Text color="tertiary"> Tertiary Color </Text> | 
              <Text color="error"> Error Color </Text> | 
              <Text color="success"> Success Color </Text> | 
              <Text color="warning"> Warning Color </Text> | 
              <Text color="info"> Info Color </Text>
            </Paragraph>
          </div>

          <Heading level={3} variant="subtitle">Text Truncation</Heading>
          <div className="demo-box truncation-container">
            <Text truncate>This is a very long text that should be truncated with an ellipsis when it reaches the end of its container.</Text>
          </div>
        </section>

        <section className="typography-section">
          <Heading level={2}>Typography in Context</Heading>
          <Paragraph>
            Below is an example of how these typography components work together in a realistic content block.
          </Paragraph>

          <div className="demo-box content-example">
            <Heading level={2}>The Future of Digital Reading</Heading>
            <Paragraph size="lg" weight="medium">
              As we embrace the digital era, reading experiences are being transformed through innovative platforms and technologies.
            </Paragraph>
            
            <Heading level={3} variant="subtitle">Personalized Reading Experiences</Heading>
            <Paragraph>
              Modern platforms like Readra are creating <Text weight="semibold">highly personalized</Text> reading experiences that adapt to individual preferences. From font size to background color, every aspect of the reading experience can be customized.
            </Paragraph>
            
            <Paragraph>
              Research shows that personalized reading environments can significantly improve:
            </Paragraph>
            
            <Paragraph>
              <Text as="strong">Reading Comprehension: </Text>
              <Text>Customized formats help readers absorb and retain information more effectively.</Text>
            </Paragraph>
            
            <Paragraph>
              <Text as="strong">Reading Duration: </Text>
              <Text>Comfortable environments encourage longer reading sessions.</Text>
            </Paragraph>
            
            <Paragraph>
              <Text as="strong">Reading Enjoyment: </Text>
              <Text>Personalization creates a more pleasurable reading experience.</Text>
            </Paragraph>
            
            <Paragraph emphasized>
              The key insight: When readers have control over their reading environment, they engage more deeply with content.
            </Paragraph>
            
            <Heading level={4}>Technical Innovations</Heading>
            <Paragraph>
              Several technologies are driving this revolution in digital reading:
            </Paragraph>
            
            <Paragraph>
              <Text as="mark">Adaptive Typography</Text>
              <Text> - Systems that automatically adjust text presentation based on reading conditions.</Text>
            </Paragraph>
            
            <Paragraph>
              <Text as="mark">Interactive Annotations</Text>
              <Text> - Tools that allow readers to engage with and expand upon text.</Text>
            </Paragraph>
            
            <Paragraph>
              <Text as="mark">Cross-device Synchronization</Text>
              <Text> - Seamless reading experiences across multiple devices.</Text>
            </Paragraph>
            
            <Paragraph>
              <Text variant="code">const future = "limitless";</Text>
            </Paragraph>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default TypographyDemo;