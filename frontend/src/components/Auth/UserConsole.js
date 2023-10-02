import { useState, useEffect } from 'react'

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Button from '../../utility/Button';




function UserConsole() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);



  return (
    <>
      {isLoggedIn && 
        <div>
          <Button onClick={() => setIsLogoutOpen(true)}>Logga ut</Button>
          {isLogoutOpen &&
            <Logout 
              isOpen={isLogoutOpen}
              onClose={() => setIsLogoutOpen(false)}
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
