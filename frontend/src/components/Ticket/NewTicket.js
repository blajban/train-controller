import { useState, useEffect } from 'react'

import styled from "styled-components";
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


function NewTicketForm() {
  /*
  var newTicket = {
            code: reasonCodeSelect.value,
            trainnumber: item.OperationalTrainNumber,
            traindate: item.EstimatedTimeAtLocation.substring(0, 10),
        };

        fetch("http://localhost:1337/tickets", {
            body: JSON.stringify(newTicket),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((result) => {
                renderTicketView(item);
            });
  */
  const [reasonCode, setReasonCode] = useState('');
  const [reasonCodes, setReasonCodes] = useState(null);

  useEffect(() => {
    const fetchReasonCodes = async () => {
      try {
        const response = await fetch('http://localhost:1337/codes');
        const result = await response.json();
        setReasonCodes(result.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReasonCodes();
  }, []);

  if (!reasonCodes) return "Loading reason codes...";

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected reason code:', reasonCode);
  };

  const reasonOptions = [
    { value: '1', label: 'Reason 1' },
    { value: '2', label: 'Reason 2' },
    { value: '3', label: 'Reason 3' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label>Orsakskod</label><br />
      <select
        value={reasonCode}
        onChange={e => setReasonCode(e.target.value)}
      >
        {reasonCodes.map(code => (
          <option key={code.value} value={code.Code}>
            {code.Code} - {code.Level3Description}
          </option>
        ))}
        </select><br /><br />
        <input type="submit" value="Skapa nytt ärende" /><br /><br />
    </form>
  )

}

function NewTicket({trainData}) {
  return (
    <div class="ticket">
        
        <h1>Nytt ärende #3</h1>
        <LocationString trainData={trainData} />
        <p><strong>Försenad:</strong> <Delay train={trainData}/></p>
        <NewTicketForm />
        
      </div>
  )
}

export default NewTicket;


