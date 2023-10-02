import { useState, useEffect } from 'react'

import styled from "styled-components";
import Overlay from './Overlay';

function Login({ isOpen, onClose }) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <h2>Logga in</h2>
    </Overlay>
  );
}

export default Login;
