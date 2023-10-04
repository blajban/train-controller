import { useContext } from 'react'

import Button from '../ui/Button';
import UserContext from '../../contexts/UserContext';
import Foldout from './Foldout';
import { logoutUser } from './util';

function Logout({ isOpen, onClose }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser(setIsLoggedIn);
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
