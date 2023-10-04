import styled from "styled-components";
import Button from './Button';

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80vh;
  overflow-y: auto;
`;

function Overlay({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledOverlay>
      <Content>
      <Button onClick={onClose}>Stäng</Button>
        {children}
      </Content>
    </StyledOverlay>
  );
}

export default Overlay;
