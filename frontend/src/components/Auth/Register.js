import { useState, useEffect } from 'react'
import styled from "styled-components";

import Overlay from './Overlay';

const API_URL = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

const API_KEY = process.env.NODE_ENV !== 'test'
  ? process.env.REACT_APP_API_KEY
  : 'testkey';

function Register({ isOpen, onClose }) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <h2>Registrera</h2>
    </Overlay>
  );
}

export default Register;
