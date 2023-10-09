import { useState, useEffect } from 'react'
import { getReasonCodes } from '../../models/models';

import Delay from '../Delayed/Delay';

function LocationString({trainData}) {
  return (
    <>
      {trainData.FromLocation && 
        <h3>Tåg från {trainData.FromLocation[0].LocationName} till {trainData.ToLocation[0].LocationName}. Just nu i {trainData.LocationSignature}.</h3>
      }
    </>
  )
}


function NewTicketForm({ onAddNewTicket }) {
  const [reasonCode, setReasonCode] = useState('');
  const [reasonCodes, setReasonCodes] = useState(null);

  useEffect(() => {
    const fetchReasonCodes = async () => {
      try {
        const data = await getReasonCodes();
        console.log(data);
        setReasonCodes(data);
        setReasonCode(data[0].Code);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReasonCodes();
  }, []);

  if (!reasonCodes) return "Loading reason codes...";

  const handleSubmit = async (event) => {
    event.preventDefault();
    onAddNewTicket(reasonCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reasonCode">Orsakskod</label><br />
      <select id="reasonCode"
        value={reasonCode}
        onChange={e => setReasonCode(e.target.value)}
      >
        {reasonCodes.map((code, index) => (
          <option key={index} value={code.Code}>
            {code.Code} - {code.Level3Description}
          </option>
        ))}
        </select><br /><br />
        <input type="submit" value="Skapa nytt ärende" /><br /><br />
    </form>
  )

}

function NewTicket({invokeMock, trainData, onAddNewTicket}) {
  return (
    <div>
      <h1>Nytt ärende</h1>
      <LocationString trainData={trainData} />
      <div><strong>Försenad:</strong> <Delay train={trainData}/></div>
      <NewTicketForm trainData={trainData} onAddNewTicket={onAddNewTicket}/>
    </div>
  )
}

export default NewTicket;


