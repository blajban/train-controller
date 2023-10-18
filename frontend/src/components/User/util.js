export const getUserToken = () => {
  return localStorage.getItem('token');
}

export const loginUser = (token, setIsLoggedIn, setUserInfo, firstName, lastName, email) => {
  localStorage.setItem('token', token);
  setUserInfo({ firstName, lastName, email });
  setIsLoggedIn(true);
}

export const logoutUser = (setIsLoggedIn, setUserInfo) => {
  setIsLoggedIn(false);
  setUserInfo(null);
  localStorage.removeItem('token');
}