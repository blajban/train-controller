import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Train from './Train';
import UserContext from '../../contexts/UserContext';

jest.mock('./Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});

describe('<Train />', () => {
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
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={handleClick} />
      </UserContext.Provider>
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
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <Train train={mockTrainData} onClick={() => {}} />
      </UserContext.Provider>
    );


    expect(screen.queryByText('Start ->')).toBeNull();
    expect(screen.queryByText('End')).toBeNull();
  });
});
