import React from 'react';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('should use the default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should toggle theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      userEvent.click(screen.getByText('Toggle Theme'));
    });

    expect(screen.getByText('dark')).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByText('Toggle Theme'));
    });

    expect(screen.getByText('light')).toBeInTheDocument();

  });
});
