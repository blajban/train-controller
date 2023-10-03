import { useState, useEffect } from 'react'

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Button from '../../utility/Button';

import { API_KEY, API_URL } from '../../config';


function UserConsole() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <>
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
            <Button onClick={() => setIsLoginOpen(true)}>Logga in</Button>
            {isLoginOpen && 
              <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                setIsLoggedIn={setIsLoggedIn}
              />
            }

            <Button onClick={() => setIsRegisterOpen(true)}>Registrera dig</Button>
            {isRegisterOpen && 
              <Register
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
              />}
        </div>
      }

      
      
      
    </>
  );
}

export default UserConsole;
