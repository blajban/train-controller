import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Button from '../../utility/Button';
import UserContext from '../../contexts/UserContext';

import { API_KEY, API_URL } from '../../config';

const UserConsoleContainer = styled.div`
  position: relative; 
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
`;

function UserConsole() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        const token = localStorage.getItem('token');
  
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
  
          // Handle errors
        }
      } catch (error) {
        // Handle errors gracefully
        //console.error('Error:', error);
      }
    }

    verifyToken();
  });



  return (
    <UserConsoleContainer>
      {isLoggedIn && 
        <div>
          <Button onClick={() => setIsLogoutOpen(true)}>Logga ut</Button>
          {isLogoutOpen &&
            <Logout 
              isOpen={isLogoutOpen}
              onClose={() => setIsLogoutOpen(false)}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        </div>
      }
      
      {!isLoggedIn && 
        <div>
          <p>Logga in eller registrera dig för att hantera ärenden.</p>

          {!isRegisterOpen && (
            isLoginOpen ? (
              <>
                <Button onClick={() => setIsLoginOpen(false)}>Tillbaka</Button>
                <Login
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </>
            ) : (
              <Button onClick={() => setIsLoginOpen(true)}>Logga in</Button>
            )
          )}

          {!isLoginOpen && (
            isRegisterOpen ? (
              <>
                <Button onClick={() => setIsRegisterOpen(false)}>Tillbaka</Button>
                <Register
                  isOpen={isRegisterOpen}
                  onClose={() => setIsRegisterOpen(false)}
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