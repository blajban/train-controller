import { useState, useEffect } from 'react'

import styled from "styled-components";

import Train from './Train';
import Ticket from '../Ticket/Ticket';

import { getDelayed } from '../../models/models';

import { TicketProvider } from '../Ticket/TicketProvider';
import { useDelayed } from '../../contexts/DelayedContext';

const DelayedTrainsList = styled.div`
  display: flex;
  flex-direction: column;
`;


function DelayedTrains() {
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [currentTrain, setCurrentTrain] = useState(null);

  const { delayedTrains, setDelayedTrains, selectedTrain } = useDelayed();

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
        const data = await getDelayed();
        setDelayedTrains(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDelayedTrains();
    //eslint-disable-next-line
  }, []);

  if (!delayedTrains) return "Loading...";

  return (
    <>
      {isTicketOpen && 
      <TicketProvider>
        <Ticket
          isOpen={isTicketOpen}
          onClose={handleCloseTicket}
          trainData={currentTrain}
        />
      </TicketProvider>
      }

      <h1>Försenade tåg</h1>
      
      {selectedTrain
      ? (
        <Train 
          train={selectedTrain}
          onClick={() => handleTrainClick(selectedTrain)}
        />
      ) : (
        <DelayedTrainsList>
          {delayedTrains.map((train, index) => (
            <Train 
              key={index}
              train={train}
              onClick={() => handleTrainClick(train)}
            />
          ))}
        </DelayedTrainsList>
      )
      }
  </>
  );
}

export default DelayedTrains;
