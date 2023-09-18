import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./components/Delayed/DelayedTrains", () => {
  return function MockedDelayedTrains() {
    return <div>DelayedTrains mock</div>;
  };
});

jest.mock("./components/Map/TrainMap", () => {
  return function MockedTrainMap() {
    return <div>TrainMap mock</div>;
  };
});

describe('App', () => {
  it('renders DelayedTrains component', () => {
    render(<App />);
    expect(screen.getByText('DelayedTrains mock')).toBeInTheDocument();
  });

  it('renders map placeholder', () => {
    render(<App />);
    expect(screen.getByText('TrainMap mock')).toBeInTheDocument();
  });

});
