import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components'; 
import Foldout from './Foldout';

describe('Foldout component', () => {

  it('should not render the component when isOpen is false', () => {
    const { container } = render(<Foldout isOpen={false}>Test</Foldout>);
    expect(container.firstChild).toBeNull();
  });

  it('should render the component when isOpen is true', () => {
    const { getByText } = render(<Foldout isOpen={true}>Test</Foldout>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should apply correct styles when isOpen is true', () => {
    const { container } = render(<Foldout isOpen={true}>Test</Foldout>);
    const styledFoldout = container.firstChild;
    expect(styledFoldout).toHaveStyleRule('max-height', '300px');
    expect(styledFoldout).toHaveStyleRule('padding', '10px');
  });

});

