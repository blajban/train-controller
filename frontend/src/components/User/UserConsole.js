import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Button from '../ui/Button';
import UserContext from '../../contexts/UserContext';

import { API_KEY, API_URL } from '../../config';
import { getUserName, getUserToken } from './util';
import ThemeToggle from '../../style/ThemeToggle';

const UserConsoleContainer = styled.div`
  position: relative; 
  border: 1px solid ${({theme}) => theme.secondary};
  padding: 10px;
  background-color: ${({theme}) => theme.backgroundDarker};
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
`;

function UserConsole() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [userName, setUserName] = useState(getUserName());

  useEffect(() => {
    async function verifyToken() {
      try {
        const token = getUserToken();
  
        if (token) {
          const response = await fetch(`${API_URL}/verify-token`, {
            method: 'POST',
            headers: { 
              'content-type': 'application/json',
              'x-api-key': API_KEY,
              'x-access-token': token
            }
          });
    
          const result = await response.json();
    
          if (result.data?.valid) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    verifyToken();
  });



  return (
    <UserConsoleContainer>
      {isLoggedIn && (
        isLogoutOpen ? (
          <>
            <Button variant="secondary" onClick={() => setIsLogoutOpen(false)}>Tillbaka</Button>
            <Logout 
              isOpen={isLogoutOpen}
              onClose={() => setIsLogoutOpen(false)}
              setUserName={setUserName}
            />
          </>
        ) : (
          <>
            <p>Välkommen {userName}</p>
            <ThemeToggle />
            <Button onClick={() => setIsLogoutOpen(true)}>Logga ut</Button>
          </>
        )
      )}
      
      {!isLoggedIn && 
        <div>
          <p>Logga in eller registrera dig för att hantera ärenden.</p>

          {!isRegisterOpen && (
            isLoginOpen ? (
              <>
                <Button variant="secondary" onClick={() => setIsLoginOpen(false)}>Tillbaka</Button>
                <Login
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                  setUserName={setUserName}
                />
              </>
            ) : (
              <Button onClick={() => setIsLoginOpen(true)}>Logga in</Button>
            )
          )}

          {!isLoginOpen && (
            isRegisterOpen ? (
              <>
                <Button variant="secondary" onClick={() => setIsRegisterOpen(false)}>Tillbaka</Button>
                <Register
                  isOpen={isRegisterOpen}
                  onClose={() => setIsRegisterOpen(false)}
                  setUserName={setUserName}
                />
              </>
            ) : (
              <Button onClick={() => setIsRegisterOpen(true)}>Registrera dig</Button>
            )
          )}
        </div>
      }
    </UserConsoleContainer>
  );
}

export default UserConsole;
