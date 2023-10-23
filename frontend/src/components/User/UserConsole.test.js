import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserConsole from './UserConsole';
import UserContext from '../../contexts/UserContext';
import * as util from './util';
import { AllProviders } from '../../setupTests';

util.getUserName = jest.fn();
util.getUserToken = jest.fn();

global.fetch = jest.fn();

describe('<UserConsole />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message and logout when logged in', () => {
    const mockIsLoggedIn = true;
    const mockUserInfo = {  
      firstName: "erik", 
      lastName: "testare",
      email: "test@test.se"
    };
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, userInfo: mockUserInfo}}>
        <UserConsole />
      </UserContext.Provider>
    , { wrapper: AllProviders });

    expect(screen.getByText(/Välkommen/)).toBeInTheDocument();
    expect(screen.getByText(/Logga ut/)).toBeInTheDocument();
  });

  it('renders login and register when not logged in', () => {
    const mockIsLoggedIn = false;
    const mockUserInfo = {  
      firstName: "erik", 
      lastName: "testare",
      email: "test@test.se"
    };
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, userInfo: mockUserInfo}}>
        <UserConsole />
      </UserContext.Provider>
    , { wrapper: AllProviders });

    expect(screen.getByText('Logga in eller registrera dig för att hantera ärenden.')).toBeInTheDocument();
    expect(screen.getByText('Logga in')).toBeInTheDocument();
    expect(screen.getByText('Registrera dig')).toBeInTheDocument();
  });

  it('shows the Login when the login button is clicked', () => {
    const mockIsLoggedIn = false;
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    , { wrapper: AllProviders });

    const loginButton = screen.getByText('Logga in');
    fireEvent.click(loginButton);

    expect(screen.getByText('Tillbaka')).toBeInTheDocument();
  });

  it('shows the Register component when the register button is clicked', () => {
    const mockIsLoggedIn = false;
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    , { wrapper: AllProviders });

    const registerButton = screen.getByText('Registrera dig');
    fireEvent.click(registerButton);

    expect(screen.getByText('Tillbaka')).toBeInTheDocument();
  });

  it('verifies the user token on component mount', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();
    const mockUserInfo = {  
      firstName: "erik", 
      lastName: "testare",
      email: "test@test.se"
    };

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
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn, userInfo: mockUserInfo, setUserInfo: () => {} }}>
        <UserConsole />
      </UserContext.Provider>
    );

    expect(fetch).toHaveBeenCalled();
    expect(util.getUserToken).toHaveBeenCalled();
  });

  it('closes the Register component when the Tillbaka button is clicked', () => {
    const mockIsLoggedIn = false;
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <UserConsole />
      </UserContext.Provider>
    , { wrapper: AllProviders });

    const registerButton = screen.getByText('Registrera dig');
    fireEvent.click(registerButton);
    
    const backButton = screen.getByText('Tillbaka');
    fireEvent.click(backButton);

    expect(screen.queryByText('Tillbaka')).toBeNull();
    expect(screen.getByText('Registrera dig')).toBeInTheDocument();
  });

});
