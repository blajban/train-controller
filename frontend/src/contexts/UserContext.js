import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  setUserInfo: () => {}
});

export default UserContext;
