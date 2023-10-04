import { useState, useContext } from 'react'

import { API_KEY, API_URL } from '../../config';
import Button from '../ui/Button';
import UserContext from '../../contexts/UserContext';
import Foldout from './Foldout';
import StyledInput from '../ui/StyledInput';
import { getUserToken, loginUser } from './util';

function Login({ isOpen, onClose, setUserName }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'content-type': 'application/json',
          'x-api-key': API_KEY,
          'x-access-token': getUserToken()
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.status === 400) {
        setError('Användarnamn eller lösenord saknas');
        setIsError(true);
        return;
      }

      if (result.status === 401) {
        setError('Felaktigt användarnamn eller lösenord');
        setIsError(true);
        return;
      }

      if (result.data.token) {
        loginUser(result.data.token, setUserName, setIsLoggedIn, result.data.firstName, result.data.lastName);
        console.log('Successfully logged in');
        onClose();
      }
    } catch (error) {
      setError(error);
      setIsError(true);
    }
    
  };

  return (
    <Foldout isOpen={isOpen}>
      {isError && 
        <p style={{color: 'red'}}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <StyledInput name='email' type='email' value={formData.email} onChange={handleChange} placeholder='E-post' />
        <StyledInput name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Lösenord' />
        <Button type='submit'>Logga in</Button>
      </form>
    </Foldout>
  );
}

export default Login;
