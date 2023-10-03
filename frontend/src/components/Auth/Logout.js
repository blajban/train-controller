import { useState, useEffect } from 'react'

import styled from "styled-components";
import Overlay from './Overlay';
import Button from '../../utility/Button';

function Logout({ isOpen, onClose, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // refactor to use state?
    onClose();
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <h2>Vill du logga ut?</h2>
      <Button type='submit' onClick={handleLogout}>Ja, logga ut</Button>
      <Button type='submit' onClick={onClose}>Nej, fortsätt arbeta</Button>
    </Overlay>
  );
}

export default Logout;
