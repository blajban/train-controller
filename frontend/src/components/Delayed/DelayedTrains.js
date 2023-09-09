import { useState, useEffect } from 'react'

import styled from "styled-components";

import Train from './Train';
import Ticket from '../Ticket/Ticket';

const DelayedTrainsList = styled.div`
  display: flex;
  flex-direction: column;
`;


function DelayedTrains() {
  const [delayedTrains, setDelayedTrains] = useState(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [currentTrain, setCurrentTrain] = useState(null);

  const handleTrainClick = (trainData) => {
    setCurrentTrain(trainData);
    setIsTicketOpen(true);
  };

  const handleCloseTicket = () => {
    setIsTicketOpen(false);
    setCurrentTrain(null);
  };

  useEffect(() => {
    const fetchDelayedTrains = async () => {
      try {
        const response = await fetch('http://localhost:1337/delayed');
        const result = await response.json();
        setDelayedTrains(result.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDelayedTrains();
  }, []);

  if (!delayedTrains) return "Loading...";

  return (
    <>
      {isTicketOpen && 
        <Ticket
          isOpen={isTicketOpen}
          onClose={handleCloseTicket}
          trainData={currentTrain}
      />}

      <h1>Försenade tåg</h1>
      <DelayedTrainsList>
        {delayedTrains.map((train, index) => (
          <Train 
            key={index}
            train={train}
            onClick={() => handleTrainClick(train)}
          />
        ))}
        
      </DelayedTrainsList>
  </>
  );
}

export default DelayedTrains;