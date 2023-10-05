import { getUserName, getUserToken, loginUser, logoutUser } from './util';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('User utility functions', () => {

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should get user token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(getUserToken()).toBe('test-token');
  });

  it('should get user name from localStorage', () => {
    localStorage.setItem('name', 'Testare Testaresson');
    expect(getUserName()).toBe('Testare Testaresson');
  });

  it('should login user and set token and name in localStorage', () => {
    const mockSetUserName = jest.fn();
    const mockSetIsLoggedIn = jest.fn();

    loginUser('test-token', mockSetUserName, mockSetIsLoggedIn, 'Testare', 'Testaresson');

    expect(localStorage.getItem('token')).toBe('test-token');
    expect(localStorage.getItem('name')).toBe('Testare Testaresson');
    expect(mockSetUserName).toHaveBeenCalledWith('Testare Testaresson');
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
  });

  it('should logout user and remove token and name from localStorage', () => {
    const mockSetIsLoggedIn = jest.fn();

    localStorage.setItem('token', 'test-token');
    localStorage.setItem('name', 'Testare Testaresson');

    logoutUser(mockSetIsLoggedIn);

    expect(localStorage.getItem('token')).toBe(null || undefined);
    expect(localStorage.getItem('name')).toBe(null || undefined);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });

});
