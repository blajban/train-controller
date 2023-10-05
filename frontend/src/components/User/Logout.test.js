import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Logout from './Logout';
import UserContext from '../../contexts/UserContext';
import { logoutUser } from './util';

jest.mock('./util', () => ({
  logoutUser: jest.fn(),
}));

describe('<Logout />', () => {

  it('renders the logout confirmation when isOpen is true', () => {
    const mockIsLoggedIn = true;
    const mockSetIsLoggedIn = jest.fn();

    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={true} />
      </UserContext.Provider>
    );

    expect(getByText('Vill du logga ut?')).toBeInTheDocument();
    expect(getByText('Ja, logga ut')).toBeInTheDocument();
  });

  it('does not render the logout confirmation when isOpen is false', () => {
    const mockIsLoggedIn = true;
    const mockSetIsLoggedIn = jest.fn();

    const { queryByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={false} />
      </UserContext.Provider>
    );

    expect(queryByText('Vill du logga ut?')).toBeNull();
    expect(queryByText('Ja, logga ut')).toBeNull();
  });

  it('calls the logout function and onClose callback on logout', () => {
    const mockIsLoggedIn = true;
    const mockSetIsLoggedIn = jest.fn();
    const mockOnClose = jest.fn();

    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={true} onClose={mockOnClose} />
      </UserContext.Provider>
    );

    const logoutButton = getByText('Ja, logga ut');

    act(() => {
      fireEvent.click(logoutButton);
    });

    expect(logoutUser).toHaveBeenCalled();
  });
});
