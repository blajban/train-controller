import styled from "styled-components";
import Button from '../../utility/Button';

const StyledFoldout = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  ${props => props.isOpen && `
    max-height: 300px; /* Or adjust based on your actual content size */
    padding: 10px;
  `}
`;



function Foldout({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledFoldout isOpen={isOpen}>
        {children}
    </StyledFoldout>
  );
}

export default Foldout;
