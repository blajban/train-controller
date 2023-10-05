import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserConsole from './UserConsole';
import UserContext from '../../contexts/UserContext';
import * as util from './util';

util.getUserName = jest.fn();
util.getUserToken = jest.fn();

global.fetch = jest.fn();

describe('<UserConsole />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message and logout when logged in', () => {
    const mockIsLoggedIn = true;
    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    expect(getByText('Välkommen')).toBeInTheDocument();
    expect(getByText('Logga ut')).toBeInTheDocument();
  });

  it('renders login and register when not logged in', () => {
    const mockIsLoggedIn = false;
    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    expect(getByText('Logga in eller registrera dig för att hantera ärenden.')).toBeInTheDocument();
    expect(getByText('Logga in')).toBeInTheDocument();
    expect(getByText('Registrera dig')).toBeInTheDocument();
  });

  it('shows the Login when the login button is clicked', () => {
    const mockIsLoggedIn = false;
    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    const loginButton = getByText('Logga in');
    fireEvent.click(loginButton);

    expect(getByText('Tillbaka')).toBeInTheDocument();
  });

  it('shows the Register component when the register button is clicked', () => {
    const mockIsLoggedIn = false;
    const { getByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    const registerButton = getByText('Registrera dig');
    fireEvent.click(registerButton);

    expect(getByText('Tillbaka')).toBeInTheDocument();
  });

  it('verifies the user token on component mount', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const mockResponseData = {
      data: { valid: true }
    };
    
    const response = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData)
    };
    fetch.mockResolvedValueOnce(response);

    util.getUserToken.mockReturnValueOnce('sample_token');

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    expect(fetch).toHaveBeenCalled();
    expect(util.getUserToken).toHaveBeenCalled();
  });

  it('closes the Register component when the Tillbaka button is clicked', () => {
    const mockIsLoggedIn = false;
    const { getByText, queryByText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    );

    const registerButton = getByText('Registrera dig');
    fireEvent.click(registerButton);
    
    const backButton = getByText('Tillbaka');
    fireEvent.click(backButton);

    expect(queryByText('Tillbaka')).toBeNull();
    expect(getByText('Registrera dig')).toBeInTheDocument();
  });

});
