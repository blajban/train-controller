import styled from 'styled-components';


const StatusBox = styled.div`
  background-color: ${({theme}) => theme.alertBackground};
  padding: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: ${({theme}) => theme.alertText};
`;

const CloseButton = styled.button`
  text-decoration: underline;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  margin-left: 10px;
  color: ${({theme}) => theme.alertText};
`;

function TicketConfirmation({ onClose }) {
  return (
    <StatusBox>
        Nytt ärende skapat
        <CloseButton onClick={onClose}>x</CloseButton>
    </StatusBox>

  )
}

export default TicketConfirmation;


