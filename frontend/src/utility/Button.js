import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  color: white;
  padding: 11px 18px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: #0062CC;
  margin: 0.1rem;

  &:hover {
    background: #004699;
  }
`;

function Button({ children, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
