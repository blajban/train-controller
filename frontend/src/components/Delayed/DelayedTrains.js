import { useState, useEffect, useContext } from 'react'

import styled from "styled-components";

import Train from './Train';
import Ticket from '../Ticket/Ticket';
import { SelectedTrainsContext } from '../../App';

const API_URL = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

const API_KEY = process.env.NODE_ENV !== 'test'
  ? process.env.REACT_APP_API_KEY
  : 'testkey';

const DelayedTrainsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d9d9d9;
  border-bottom: 2px solid #bbb;
  padding: 0.6rem;
  font-weight: bold;
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;



function DelayedTrains() {
  const [delayedTrains, setDelayedTrains] = useState(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [currentTrain, setCurrentTrain] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const { selectedTrains, setSelectedTrains } = useContext(SelectedTrainsContext);


  const handleTrainClick = (trainData) => {
    setCurrentTrain(trainData);
    setIsTicketOpen(true);
  };

  const handleCloseTicket = () => {
    setIsTicketOpen(false);
    setCurrentTrain(null);
  };

  const handleSelectAll = () => {
    if (selectAll) {
        setSelectedTrains([]);
    } else {
        setSelectedTrains(delayedTrains.map(train => train.OperationalTrainNumber));
    }
    setSelectAll(!selectAll); 
  };


  useEffect(() => {
    const fetchDelayedTrains = async () => {
      try {
        const response = await fetch(`${API_URL}/delayed`, {
          headers: {
            'x-api-key': API_KEY
          }
        });
        const result = await response.json();
        setDelayedTrains(result.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDelayedTrains();
  }, []);

  //Remove later
  useEffect(() => {
    console.log("Selected Trains:", selectedTrains);
  }, [selectedTrains]);


  if (!delayedTrains) return "Loading...";

  return (
    <>
      {isTicketOpen && 
        <Ticket
          isOpen={isTicketOpen}
          onClose={handleCloseTicket}
          trainData={currentTrain}
      />}

      <h1 style={{ marginBottom: '20px' }}>Försenade tåg</h1>
      <DelayedTrainsList>
      <HeaderRow>
        <HeaderItem>
            <div>Tågnummer</div>
            <div>(Publikt tågnummer)</div>
        </HeaderItem>
        <HeaderItem>
            <div>Station</div>
            <div>Från -&gt; Till</div>
        </HeaderItem>
        <HeaderItem>Försening</HeaderItem>
        <HeaderItem>
          <label>Välj Alla</label>
            <input 
                type="checkbox" 
                checked={selectAll} 
                onChange={handleSelectAll} 
            />
        </HeaderItem>
      </HeaderRow>

        {delayedTrains.map((train, index) => (
          <Train 
            key={index}
            train={train}
            onClick={() => handleTrainClick(train)}
            onCheckboxChange={() => {
              const trainNumber = train.OperationalTrainNumber;
              setSelectedTrains(prevSelected => 
                prevSelected.includes(trainNumber)
                  ? prevSelected.filter(item => item !== trainNumber)
                  : [...prevSelected, trainNumber]
              );
            }}
            isSelected={selectedTrains.includes(train.OperationalTrainNumber)}
          />
        ))}
      </DelayedTrainsList>
  </>
  );
}

export default DelayedTrains;
