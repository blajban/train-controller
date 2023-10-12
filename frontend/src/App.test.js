import { render, screen } from '@testing-library/react';
import App from './App';
import { AllProviders } from './setupTests';

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
    render(<App />, { wrapper: AllProviders });
    expect(screen.getByText('DelayedTrains mock')).toBeInTheDocument();
  });

  it('renders map placeholder', () => {
    render(<App />, { wrapper: AllProviders });
    expect(screen.getByText('TrainMap mock')).toBeInTheDocument();
  });

});
