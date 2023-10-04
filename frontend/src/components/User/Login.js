import { useState, useEffect, useContext } from 'react'

import { API_KEY, API_URL } from '../../config';
import Button from '../../utility/Button';
import UserContext from '../../contexts/UserContext';
import Foldout from './Foldout';
import StyledInput from '../../utility/StyledInput';

function Login({ isOpen, onClose, setUserName }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

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

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'content-type': 'application/json',
          'x-api-key': API_KEY,
          'x-access-token': token
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('name', `${result.data.firstName} ${result.data.lastName}`);
        setUserName(`${result.data.firstName} ${result.data.lastName}`);
        setIsLoggedIn(true);
        console.log('Successfully logged in');
        onClose(); // Handle registered successfully
      }
    } catch (error) {
      // Handle errors gracefully
      //console.error('Error:', error);
    }
    
  };

  return (
    <Foldout isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <StyledInput name='email' type='email' value={formData.email} onChange={handleChange} placeholder='E-post' />
        <StyledInput name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Lösenord' />
        <Button type='submit'>Logga in</Button>
      </form>
    </Foldout>
  );
}

export default Login;
