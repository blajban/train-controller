import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
`;

export const THead = styled.thead`
  background-color: #004699;
  color: #fff;
`;

export const Tr = styled.tr`
  &:nth-of-type(2n) {
    background-color: #eee;
  }
`;

export const Th = styled.th`
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid #004699;
  text-align: left;
`;

export const TBody = styled.tbody`
  background-color: #fff;
  color: #000;
`;

export const Td = styled.td`
  border: 1px solid #004699;
  padding: 10px 15px;
  font-size: 14px;
`;




