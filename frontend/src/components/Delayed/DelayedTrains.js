import { useState, useEffect } from 'react'

import styled from "styled-components";

import Train from './Train';

const DelayedTrainsList = styled.div`
  display: flex;
  flex-direction: column;
`;

function DelayedTrains() {
  const [delayedTrains, setDelayedTrains] = useState(null);

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
    <div class="delayed">
      <h1>Försenade tåg</h1>
      <DelayedTrainsList>
        {delayedTrains.map((train, index) => (
          <Train train={train} />
        ))}
      </DelayedTrainsList>
  </div>
  );
}

export default DelayedTrains;
