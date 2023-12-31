import styled from "styled-components";

const StyledFoldout = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  ${props => props.$isOpen && `
    max-height: 300px;
    padding: 10px;
  `}
`;

function Foldout({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledFoldout $isOpen={isOpen}>
        {children}
    </StyledFoldout>
  );
}

export default Foldout;
