import { useState, useEffect } from 'react'

import Delay from '../Delayed/Delay';
import Button from '../ui/Button';
import StyledSelect from '../ui/StyledSelect';

function LocationString({trainData}) {
  return (
    <>
      {trainData.FromLocation && 
        <h3>Tåg från {trainData.FromLocation[0].LocationName} till {trainData.ToLocation[0].LocationName}. Just nu i {trainData.LocationSignature}.</h3>
      }
    </>
  )
}


function NewTicketForm({ onAddNewTicket, reasonCodes }) {
  const [reasonCode, setReasonCode] = useState(reasonCodes ? reasonCodes[0].Code : '');


  if (!reasonCodes) return "Loading reason codes...";

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddNewTicket(reasonCode);
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

function NewTicket({invokeMock, trainData, onAddNewTicket, reasonCodes}) {
  return (
    <div>
      <h1>Nytt ärende</h1>
      <LocationString trainData={trainData} />
      <div><strong>Försenad:</strong> <Delay train={trainData}/></div>
      <NewTicketForm trainData={trainData} onAddNewTicket={onAddNewTicket} reasonCodes={reasonCodes}/>
    </div>
  )
}

export default NewTicket;


