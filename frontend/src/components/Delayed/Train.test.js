import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Train from './Train';

jest.mock('./Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});

describe('<Train />', () => {
  it('renders train details and handles click', () => {
    const handleClick = jest.fn();

    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA',
      FromLocation: [{ LocationName: 'Start' }],
      ToLocation: [{ LocationName: 'End' }],
    };

    const { getByText } = render(<Train train={mockTrainData} onClick={handleClick} />);


    expect(getByText('12345')).toBeInTheDocument();
    expect(getByText('Mocked Delay')).toBeInTheDocument();
    expect(getByText('AA')).toBeInTheDocument();
    expect(getByText('Start -> End')).toBeInTheDocument();

    fireEvent.click(getByText('12345'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders nothing if no from and to', () => {
    const mockTrainData = {
      OperationalTrainNumber: '12345',
      LocationSignature: 'AA'
    };

    const { queryByText } = render(<Train train={mockTrainData} onClick={() => {}} />);

    expect(queryByText('Start ->')).toBeNull();
    expect(queryByText('End')).toBeNull();
  });
});
