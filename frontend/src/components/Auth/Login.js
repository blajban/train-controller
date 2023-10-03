import { useState, useEffect } from 'react'

import styled from "styled-components";

import { API_KEY, API_URL } from '../../config';
import Overlay from './Overlay';
import Button from '../../utility/Button';

function Login({ isOpen, onClose, setIsLoggedIn }) {
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
    <Overlay isOpen={isOpen} onClose={onClose}>
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <input name='email' type='email' value={formData.email} onChange={handleChange} placeholder='E-post' />
        <input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Lösenord' />
        <Button type='submit'>Registrera</Button>
      </form>
    </Overlay>
  );
}

export default Login;
