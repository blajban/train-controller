import { useState, useEffect, useContext } from 'react'

import { API_KEY, API_URL } from '../../config';
import Button from '../../utility/Button';
import Foldout from './Foldout';
import StyledInput from '../../utility/StyledInput';
import UserContext from '../../contexts/UserContext';

function Register({ isOpen, onClose, setUserName }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 
          'content-type': 'application/json',
          'x-api-key': API_KEY 
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const result = await response.json();

      if (result.status === 409) {
        console.log('User already exists');
        return; // Handle user exists
      }

      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('name', `${result.data.firstName} ${result.data.lastName}`);
        setUserName(`${result.data.firstName} ${result.data.lastName}`);
        setIsLoggedIn(true);
        console.log('Registered successfully');
        onClose(); // Handle registered successfully
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error:', error);
    }
    
  };

  return (
    <Foldout isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <StyledInput name='firstName' type='text' value={formData.firstName} onChange={handleChange} placeholder='Förnamn' />
        <StyledInput name='lastName' type='text' value={formData.lastName} onChange={handleChange} placeholder='Efternamn' />
        <StyledInput name='email' type='email' value={formData.email} onChange={handleChange} placeholder='E-post' />
        <StyledInput name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Lösenord' />
        <Button type='submit'>Registrera</Button>
      </form>
    </Foldout>
  );
}

export default Register;
