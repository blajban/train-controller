export const getUserToken = () => {
  return localStorage.getItem('token');
}

export const getUserName = () => {
  return localStorage.getItem('name') || '';
}

export const loginUser = (token, setUserName, setIsLoggedIn, firstName, lastName) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', `${firstName} ${lastName}`);
  setUserName(`${firstName} ${lastName}`);
  setIsLoggedIn(true);
}

export const logoutUser = (setIsLoggedIn) => {
  setIsLoggedIn(false);
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}