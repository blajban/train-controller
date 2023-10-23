import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
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

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={true} />
      </UserContext.Provider>
    );

    expect(screen.getByText('Vill du logga ut?')).toBeInTheDocument();
    expect(screen.getByText('Ja, logga ut')).toBeInTheDocument();
  });

  it('does not render the logout confirmation when isOpen is false', () => {
    const mockIsLoggedIn = true;
    const mockSetIsLoggedIn = jest.fn();

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={false} />
      </UserContext.Provider>
    );

    expect(screen.queryByText('Vill du logga ut?')).toBeNull();
    expect(screen.queryByText('Ja, logga ut')).toBeNull();
  });

  it('calls the logout function and onClose callback on logout', () => {
    const mockIsLoggedIn = true;
    const mockSetIsLoggedIn = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Logout isOpen={true} onClose={mockOnClose} />
      </UserContext.Provider>
    );

    const logoutButton = screen.getByText('Ja, logga ut');

    // eslint-disable-next-line
    act(() => {
      fireEvent.click(logoutButton);
    });

    expect(logoutUser).toHaveBeenCalled();
  });
});
