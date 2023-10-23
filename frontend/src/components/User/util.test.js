import { getUserToken, loginUser, logoutUser } from './util';

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



  it('should login user and set token and name in localStorage', () => {
    const mockSetUserInfo = jest.fn();
    const mockSetIsLoggedIn = jest.fn();
    const mockUserInfo = { 
      firstName: 'Testare', 
      lastName: 'Testaresson',
      email: 'test@test.se'
    };

    loginUser('test-token', mockSetIsLoggedIn, mockSetUserInfo, mockUserInfo.firstName, mockUserInfo.lastName, mockUserInfo.email);

    expect(localStorage.getItem('token')).toBe('test-token');

    expect(mockSetUserInfo).toHaveBeenCalledWith(mockUserInfo);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
  });

  it('should logout user and remove token and name from localStorage', () => {
    const mockSetIsLoggedIn = jest.fn();
    const mockSetUserInfo = jest.fn();

    localStorage.setItem('token', 'test-token');


    logoutUser(mockSetIsLoggedIn, mockSetUserInfo);

    expect(localStorage.getItem('token')).toBe(null || undefined);
    expect(mockSetUserInfo).toHaveBeenCalledWith(null);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });

});
