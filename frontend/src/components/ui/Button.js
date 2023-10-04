import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  color: white;
  padding: 11px 18px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ $variant }) => ($variant === 'secondary' ? '#7D919E' : '#0062CC')};
  margin: 0.1rem;

  &:hover {
    background: ${({ $variant }) => ($variant === 'secondary' ? '#607883' : '#004699')};
  }
`;
function Button({ children, type, onClick, variant = 'primary' }) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
}

export default Button;
