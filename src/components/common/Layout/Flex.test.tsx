import React from 'react';
import { render, screen } from '@testing-library/react';
import Flex from './Flex';

describe('Flex', () => {
  test('renders children correctly', () => {
    render(
      <Flex>
        <div data-testid="test-child">Test Content</div>
      </Flex>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('applies default classes', () => {
    const { container } = render(
      <Flex>
        <div>Test Content</div>
      </Flex>
    );
    
    const flexElement = container.firstChild as HTMLElement;
    expect(flexElement).toHaveClass('flex');
    expect(flexElement).toHaveClass('flex--direction-row');
    expect(flexElement).toHaveClass('flex--wrap-nowrap');
    expect(flexElement).toHaveClass('flex--justify-flex-start');
    expect(flexElement).toHaveClass('flex--align-items-flex-start');
    expect(flexElement).toHaveClass('flex--align-content-stretch');
  });
  
  test('applies direction classes correctly', () => {
    const { container: containerRow } = render(
      <Flex direction="row">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerRow.firstChild as HTMLElement)).toHaveClass('flex--direction-row');
    
    const { container: containerColumn } = render(
      <Flex direction="column">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerColumn.firstChild as HTMLElement)).toHaveClass('flex--direction-column');
    
    const { container: containerRowReverse } = render(
      <Flex direction="row-reverse">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerRowReverse.firstChild as HTMLElement)).toHaveClass('flex--direction-row-reverse');
  });
  
  test('applies wrap classes correctly', () => {
    const { container: containerNowrap } = render(
      <Flex wrap="nowrap">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerNowrap.firstChild as HTMLElement)).toHaveClass('flex--wrap-nowrap');
    
    const { container: containerWrap } = render(
      <Flex wrap="wrap">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerWrap.firstChild as HTMLElement)).toHaveClass('flex--wrap-wrap');
  });
  
  test('applies justifyContent classes correctly', () => {
    const { container: containerStart } = render(
      <Flex justifyContent="flex-start">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerStart.firstChild as HTMLElement)).toHaveClass('flex--justify-flex-start');
    
    const { container: containerCenter } = render(
      <Flex justifyContent="center">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerCenter.firstChild as HTMLElement)).toHaveClass('flex--justify-center');
    
    const { container: containerBetween } = render(
      <Flex justifyContent="space-between">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerBetween.firstChild as HTMLElement)).toHaveClass('flex--justify-space-between');
  });
  
  test('applies alignItems classes correctly', () => {
    const { container: containerStart } = render(
      <Flex alignItems="flex-start">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerStart.firstChild as HTMLElement)).toHaveClass('flex--align-items-flex-start');
    
    const { container: containerCenter } = render(
      <Flex alignItems="center">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerCenter.firstChild as HTMLElement)).toHaveClass('flex--align-items-center');
  });
  
  test('applies gap classes correctly', () => {
    const { container: containerNoGap } = render(
      <Flex gap="none">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerNoGap.firstChild as HTMLElement)).not.toHaveClass('flex--gap-none');
    
    const { container: containerSmGap } = render(
      <Flex gap="sm">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerSmGap.firstChild as HTMLElement)).toHaveClass('flex--gap-sm');
    
    const { container: containerLgGap } = render(
      <Flex gap="lg">
        <div>Test Content</div>
      </Flex>
    );
    expect((containerLgGap.firstChild as HTMLElement)).toHaveClass('flex--gap-lg');
  });
  
  test('renders as different HTML element when specified', () => {
    const { container } = render(
      <Flex as="section">
        <div>Test Content</div>
      </Flex>
    );
    
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
  
  test('applies additional className', () => {
    const { container } = render(
      <Flex className="custom-class">
        <div>Test Content</div>
      </Flex>
    );
    
    expect((container.firstChild as HTMLElement)).toHaveClass('custom-class');
  });
  
  test('forwards additional props', () => {
    const dataTestId = 'test-flex';
    const { container } = render(
      <Flex data-testid={dataTestId}>
        <div>Test Content</div>
      </Flex>
    );
    
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});