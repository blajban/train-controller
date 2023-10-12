import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
`;

export const THead = styled.thead`
  background-color: ${({theme}) => theme.primaryDarker};
  color: ${({theme}) => theme.white};

  th { 
    color: ${({theme}) => theme.white};
  }
`;

export const Tr = styled.tr`
  &:nth-of-type(2n) {
    background-color: ${({theme}) => theme.tableNthRow};
  }
`;

export const Th = styled.th`
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid ${({theme}) => theme.primaryDarker};
  text-align: left;
`;

export const TBody = styled.tbody`
  background-color: ${({theme}) => theme.background};
`;

export const Td = styled.td`
  border: 1px solid ${({theme}) => theme.secondary};
  padding: 10px 15px;
  font-size: 14px;
`;




