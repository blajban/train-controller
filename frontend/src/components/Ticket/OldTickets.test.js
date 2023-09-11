import React from 'react';
import { render } from '@testing-library/react';
import OldTickets from './OldTickets';

describe('<OldTickets />', () => {
  it('should render old tickets', () => {

    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    const { getByText } = render(<OldTickets oldTickets={mockOldTickets}/>);

    expect(getByText(/6789/)).toBeInTheDocument();
  });

  it('should return early if no old tickets', () => {

    const mockOldTickets = null;

    const { getByText } = render(<OldTickets oldTickets={mockOldTickets}/>);

    expect(getByText("Loading tickets...")).toBeInTheDocument();
  });

});
