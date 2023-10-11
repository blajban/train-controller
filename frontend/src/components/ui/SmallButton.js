import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  color: white;
  padding: 7px 12px;
  font-size: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ $variant }) => ($variant === 'secondary' ? '#7D919E' : '#0062CC')};
  margin: 0.1rem;

  &:hover {
    background: ${({ $variant }) => ($variant === 'secondary' ? '#607883' : '#004699')};
  }
`;
function SmallButton({ children, type, onClick, variant = 'primary' }) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
}

export default SmallButton;
