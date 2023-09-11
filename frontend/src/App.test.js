import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./components/Delayed/DelayedTrains", () => {
  return function MockedDelayedTrains() {
    return <div>DelayedTrains mock</div>;
  };
});

describe('App', () => {
  it('renders DelayedTrains component', () => {
    const { getByText } = render(<App />);
    expect(getByText('DelayedTrains mock')).toBeInTheDocument();
  });

  it('renders map placeholder', () => {
    const { getByText } = render(<App />);
    expect(getByText('Här ska kartan in')).toBeInTheDocument();
  });

});
