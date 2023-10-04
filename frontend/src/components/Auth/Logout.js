import { useState, useEffect, useContext } from 'react'

import Button from '../../utility/Button';
import UserContext from '../../contexts/UserContext';
import Foldout from './Foldout';

function Logout({ isOpen, onClose }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // refactor to use state?
    onClose();
  };

  return (
    <Foldout isOpen={isOpen}>
      <h2>Vill du logga ut?</h2>
      <Button type='submit' onClick={handleLogout}>Ja, logga ut</Button>
      <Button type='submit' onClick={onClose}>Nej, fortsätt arbeta</Button>
    </Foldout>
  );
}

export default Logout;
