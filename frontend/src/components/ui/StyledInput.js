import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid ${({theme}) => theme.secondary};
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  margin: 0.1rem 0;
  background: ${({theme}) => theme.backgroundDarker};

  &:focus {
    border-color: ${({theme}) => theme.primaryDarker};
    box-shadow: 0 0 5px rgba(0, 98, 204, 0.5);
  }

  &::placeholder {
    color: ${({theme}) => theme.placeholderText};
  }
`;

export default StyledInput;
