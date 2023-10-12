// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider } from './style/ThemeProvider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme } from './style/themes';

export const AllProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <StyledThemeProvider theme={lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

