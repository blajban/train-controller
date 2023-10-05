import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
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

    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );

    expect(getByPlaceholderText('Förnamn')).toBeInTheDocument();
    expect(getByPlaceholderText('Efternamn')).toBeInTheDocument();
    expect(getByPlaceholderText('E-post')).toBeInTheDocument();
    expect(getByPlaceholderText('Lösenord')).toBeInTheDocument();
  });

  it('updates form fields when typing', () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const { getByPlaceholderText } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );

    const firstNameInput = getByPlaceholderText('Förnamn');
    const lastNameInput = getByPlaceholderText('Efternamn');
    const emailInput = getByPlaceholderText('E-post');
    const passwordInput = getByPlaceholderText('Lösenord');

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
    
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );
    const button = getByRole('button', { name: /Registrera/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Fyll i all information för att registrera dig')).toBeInTheDocument();
  });

  it('handles error when status is 409', async () => {
    const mockIsLoggedIn = false;
    const mockSetIsLoggedIn = jest.fn();

    const response = {
      status: 409,
      json: jest.fn().mockResolvedValueOnce({ status: 409 })
    };
    fetch.mockResolvedValueOnce(response);
    
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} />
      </UserContext.Provider>
    );
    const button = getByRole('button', { name: /Registrera/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('En användare med den här e-postadressen finns redan registrerad')).toBeInTheDocument();
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

    const { getByRole } = render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn, setIsLoggedIn: mockSetIsLoggedIn }}>
        <Register isOpen={true} setUserName={mockSetUserName} />
      </UserContext.Provider>
    );
    const button = getByRole('button', { name: /Registrera/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(loginUser).toHaveBeenCalled();
  });

});
