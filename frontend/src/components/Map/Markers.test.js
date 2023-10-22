import { render } from '@testing-library/react';
import Markers from './Markers';
import useMapSocket from './mapSocket';
import DelayedContext from '../../contexts/DelayedContext';

jest.mock('react-leaflet', () => ({
  useMap: jest.fn()
}));

jest.mock("./mapSocket");

describe('<Markers />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('test test', () => {
    expect(true).toBe(true);
  });
});
