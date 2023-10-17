import { useState, useEffect } from 'react'

import Delay from '../Delayed/Delay';
import Button from '../ui/Button';
import StyledSelect from '../ui/StyledSelect';

import TicketConfirmation from './TicketConfirmation';

import { useTickets } from '../../contexts/TicketContext';

function LocationString({trainData}) {
  return (
    <>
      {trainData.FromLocation && 
        <h3>Tåg från {trainData.FromLocation[0].LocationName} till {trainData.ToLocation[0].LocationName}. Just nu i {trainData.LocationSignature}.</h3>
      }
    </>
  )
}


function NewTicketForm({ reasonCodes, setIsModalOpen }) {
  const [reasonCode, setReasonCode] = useState(reasonCodes ? reasonCodes[0].Code : '');

  const { addNewTicket } = useTickets();


  if (!reasonCodes) return "Loading reason codes...";

  const handleSubmit = async (event) => {
    event.preventDefault();
    addNewTicket(reasonCode);
    setIsModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reasonCode">Orsakskod</label><br />
      <StyledSelect id="reasonCode"
        value={reasonCode}
        onChange={e => setReasonCode(e.target.value)}
      >
        {reasonCodes.map((code, index) => (
          <option key={index} value={code.Code}>
            {code.Code} - {code.Level3Description}
          </option>
        ))}
        </StyledSelect><br /><br />
        <Button type="submit">Skapa nytt ärende</Button><br /><br />
    </form>
  )

}

function NewTicket({invokeMock, trainData, reasonCodes}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h1>Nytt ärende</h1>
      <LocationString trainData={trainData} />
      <div><strong>Försenad:</strong> <Delay train={trainData}/></div>
      <NewTicketForm 
        trainData={trainData}
        reasonCodes={reasonCodes}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen &&
        <TicketConfirmation onClose={() => setIsModalOpen(false)}/>
      }
    </div>
  )
}

export default NewTicket;


