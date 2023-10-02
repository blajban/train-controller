import { useState, useEffect } from 'react'

import styled from "styled-components";
import Overlay from './Overlay';

function Logout({ isOpen, onClose }) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <h2>Vill du logga ut?</h2>
    </Overlay>
  );
}

export default Logout;
