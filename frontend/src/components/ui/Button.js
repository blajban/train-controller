import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  color: ${({theme}) => theme.white};
  padding: 11px 18px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ $variant, theme }) => $variant === 'secondary' ? theme.secondary : theme.primary};
  margin: 0.1rem;

  &:hover {
    background: ${({ $variant, theme }) => $variant === 'secondary' ? theme.secondaryDarker : theme.primaryDarker};
  }
`;

function Button({ children, type, onClick, variant = 'primary', ...restProps }) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
}

export default Button;
