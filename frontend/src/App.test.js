import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./components/Delayed/DelayedTrains", () => {
  return function MockedDelayedTrains() {
    return <div>DelayedTrains mock</div>;
  };
});

describe('App', () => {
  it('renders DelayedTrains component', () => {
    render(<App />);
    const delayedTrainsElement = screen.getByText('DelayedTrains mock');
    expect(delayedTrainsElement).toBeInTheDocument();
  });

  it('renders map placeholder', () => {
    render(<App />);
    const mapPlaceholderElement = screen.getByText('Här ska kartan in');
    expect(mapPlaceholderElement).toBeInTheDocument();
  });

});
