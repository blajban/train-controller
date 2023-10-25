import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Train from './Train';
import UserContext from '../../contexts/UserContext';
import DelayedContext from '../../contexts/DelayedContext';

jest.mock('./Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});

describe('<Train />', () => {
  it('renders train details and handles click to open ticket', () => {
    const handleClick = jest.fn();
    const mockIsLoggedIn = true;

    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA',
      FromLocation: [{ LocationName: 'Start' }],
      ToLocation: [{ LocationName: 'End' }],
    };

    render(
      <DelayedContext.Provider value={{ 
        delayedTrains: [], 
        setDelayedTrains: jest.fn(), 
        selectedTrain: null, 
        setSelectedTrain: jest.fn(), 
        trainsWithPosition: [], 
        setTrainsWithPosition: jest.fn() 
      }}>
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={handleClick} />
      </UserContext.Provider>
      </DelayedContext.Provider>
    );


    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Mocked Delay')).toBeInTheDocument();
    expect(screen.getByText('AA')).toBeInTheDocument();
    expect(screen.getByText('Start -> End')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders train details and handles click to show train on map', () => {
    let selectedTrain = null;
    const mockIsLoggedIn = true;

    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA',
      FromLocation: [{ LocationName: 'Start' }],
      ToLocation: [{ LocationName: 'End' }],
    };

    render(
      <DelayedContext.Provider value={{ 
        delayedTrains: [], 
        setDelayedTrains: jest.fn(), 
        selectedTrain: selectedTrain, 
        setSelectedTrain: (arg) => { selectedTrain = arg; },
        trainsWithPosition: [ '12345'], 
        setTrainsWithPosition: jest.fn() 
      }}>
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={() => {}} />
      </UserContext.Provider>
      </DelayedContext.Provider>
    );

    expect(screen.getByText(/Visa på karta/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Visa på karta/));
    expect(selectedTrain).toBe(mockTrainData);
  });

  it('renders train details and handles click to show all trains on map', () => {
    const mockIsLoggedIn = true;
    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA',
      FromLocation: [{ LocationName: 'Start' }],
      ToLocation: [{ LocationName: 'End' }],
    };

    let selectedTrain = mockTrainData;

    render(
      <DelayedContext.Provider value={{
        delayedTrains: [], 
        setDelayedTrains: jest.fn(), 
        selectedTrain: selectedTrain, 
        setSelectedTrain: (arg) => { selectedTrain = arg; },
        trainsWithPosition: [ '12345'], 
        setTrainsWithPosition: jest.fn() 
      }}>
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={() => {}} />
      </UserContext.Provider>
      </DelayedContext.Provider>
    );

    expect(screen.getByText(/Visa alla/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Visa alla/));
    expect(selectedTrain).toBe(null);
  });

  it('renders train details and handles click', () => {
    const handleClick = jest.fn();
    const mockIsLoggedIn = true;

    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA',
      FromLocation: [{ LocationName: 'Start' }],
      ToLocation: [{ LocationName: 'End' }],
    };

    render(
      <DelayedContext.Provider value={{ 
        delayedTrains: [], 
        setDelayedTrains: jest.fn(), 
        selectedTrain: null, 
        setSelectedTrain: jest.fn(), 
        trainsWithPosition: [], 
        setTrainsWithPosition: jest.fn() 
      }}>
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={handleClick} />
      </UserContext.Provider>
      </DelayedContext.Provider>
    );


    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Mocked Delay')).toBeInTheDocument();
    expect(screen.getByText('AA')).toBeInTheDocument();
    expect(screen.getByText('Start -> End')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders nothing if no from and to', () => {
    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA'
    };
    const mockIsLoggedIn = true;

    render(
      <DelayedContext.Provider value={{ 
        delayedTrains: [], 
        setDelayedTrains: jest.fn(), 
        selectedTrain: null, 
        setSelectedTrain: jest.fn(), 
        trainsWithPosition: [], 
        setTrainsWithPosition: jest.fn() 
      }}>
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={() => {}} />
      </UserContext.Provider>
      </DelayedContext.Provider>
    );


    expect(screen.queryByText('Start ->')).toBeNull();
    expect(screen.queryByText('End')).toBeNull();
  });
});
