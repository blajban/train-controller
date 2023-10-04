import { useState, useEffect, useContext } from 'react'

import Button from '../ui/Button';
import UserContext from '../../contexts/UserContext';
import Foldout from './Foldout';

function Logout({ isOpen, onClose }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // refactor to use state?
    localStorage.removeItem('name');
    onClose();
  };

  return (
    <Foldout isOpen={isOpen}>
      <p>Vill du logga ut?</p>
      <Button type='submit' onClick={handleLogout}>Ja, logga ut</Button>
    </Foldout>
  );
}

export default Logout;
