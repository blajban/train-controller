import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Login from './Login';
import UserContext from '../../contexts/UserContext';
import { loginUser } from './util';

jest.mock('./util', () => ({
  getUserToken: jest.fn(),
  loginUser: jest.fn(),
}));

global.fetch = jest.fn();

describe('<Login />', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form when isOpen is true', () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} />
      </UserContext.Provider>
    );

    expect(getByPlaceholderText('E-post')).toBeInTheDocument();
    expect(getByPlaceholderText('Lösenord')).toBeInTheDocument();
});


  it('updates form fields when typing', () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} />
      </UserContext.Provider>
    );

    const emailInput = getByPlaceholderText('E-post');
    const passwordInput = getByPlaceholderText('Lösenord');

    act(() => {
      UserEvent.type(emailInput, 'test@test.se');
      UserEvent.type(passwordInput, 'password');
    });

    expect(emailInput.value).toBe('test@test.se');
    expect(passwordInput.value).toBe('password');
  });

  it('handles error when status is 400', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const response = {
      status: 400,
      json: jest.fn().mockResolvedValueOnce({ status: 400 })
    };
    fetch.mockResolvedValueOnce(response);
    
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} />
      </UserContext.Provider>);
    const button = getByRole('button', { name: /Logga in/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Användarnamn eller lösenord saknas')).toBeInTheDocument();
  });

  it('handles error when status is 401', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const response = {
      status: 401,
      json: jest.fn().mockResolvedValueOnce({ status: 401 })
    };
    fetch.mockResolvedValueOnce(response);
    
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} />
      </UserContext.Provider>
    );
    const button = getByRole('button', { name: /Logga in/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Felaktigt användarnamn eller lösenord')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();
    const mockSetUserName = jest.fn();

    const mockResponseData = {
      status: 200,
      data: {
        token: 'sample-token',
        firstName: 'Testare',
        lastName: 'Testaresson',
      }
    };
    
    const response = {
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockResponseData)
    };
    fetch.mockResolvedValueOnce(response);

    const { getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} setUserName={mockSetUserName} />
      </UserContext.Provider>
    );

    const button = getByRole('button', { name: /Logga in/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(loginUser).toHaveBeenCalled();
  });

  it('handles generic error', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    fetch.mockRejectedValueOnce(new Error('Generic Error'));
    
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Login isOpen={true} />
      </UserContext.Provider>
    );
    const button = getByRole('button', { name: /Logga in/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Generic Error')).toBeInTheDocument();
  });

});

