import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  color: ${({theme}) => theme.white};
  padding: 7px 12px;
  font-size: 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ $variant, theme }) => $variant === 'secondary' ? theme.secondary : theme.primary};
  margin: 0.1rem;

  &:hover {
    background: ${({ $variant, theme }) => $variant === 'secondary' ? theme.secondaryDarker : theme.primaryDarker};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  ${({ disabled }) => disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

function SmallButton({ children, type, onClick, variant = 'primary', ...restProps}) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
}

export default SmallButton;
