import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid #004699;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  margin: 0.1rem 0;

  &:focus {
    border-color: #0062CC;
    box-shadow: 0 0 5px rgba(0, 98, 204, 0.5);
  }

  &::placeholder {
    color: #666;
  }
`;

export default StyledInput;
