import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Register from './Register';
import UserContext from '../../contexts/UserContext';
import { loginUser } from './util';

jest.mock('./util', () => ({
  loginUser: jest.fn(),
}));

global.fetch = jest.fn();

describe('<Register />', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the registration form when isOpen is true', () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );

    expect(screen.getByPlaceholderText('Förnamn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Efternamn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lösenord')).toBeInTheDocument();
  });

  it('updates form fields when typing', () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );

    const firstNameInput = screen.getByPlaceholderText('Förnamn');
    const lastNameInput = screen.getByPlaceholderText('Efternamn');
    const emailInput = screen.getByPlaceholderText('E-post');
    const passwordInput = screen.getByPlaceholderText('Lösenord');

    // eslint-disable-next-line
    act(() => {
      UserEvent.type(firstNameInput, 'Testare');
      UserEvent.type(lastNameInput, 'Testaresson');
      UserEvent.type(emailInput, 'test@register.se');
      UserEvent.type(passwordInput, 'password');
    });

    expect(firstNameInput.value).toBe('Testare');
    expect(lastNameInput.value).toBe('Testaresson');
    expect(emailInput.value).toBe('test@register.se');
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
    
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );
    const button = screen.getByRole('button', { name: /Registrera/i });

    // eslint-disable-next-line
    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText('Fyll i all information för att registrera dig')).toBeInTheDocument();
  });

  it('handles error when status is 409', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const response = {
      status: 409,
      json: jest.fn().mockResolvedValueOnce({ status: 409 })
    };
    fetch.mockResolvedValueOnce(response);
    
    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );
    const button = screen.getByRole('button', { name: /Registrera/i });

    // eslint-disable-next-line
    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByText('En användare med den här e-postadressen finns redan registrerad')).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
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

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} setUserName={mockSetUserName} />
      </UserContext.Provider>
    );
    const button = screen.getByRole('button', { name: /Registrera/i });

    // eslint-disable-next-line
    await act(async () => {
      fireEvent.click(button);
    });

    expect(loginUser).toHaveBeenCalled();
  });

});
