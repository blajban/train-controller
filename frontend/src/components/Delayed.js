import { useState, useEffect } from 'react'

import styled from "styled-components";

import Train from './Train';

/*

fetch("http://localhost:1337/delayed")
        .then((response) => response.json())
        .then(function(result) {
            return renderDelayedTable(result.data, delayed);
        });


}
*/

const DelayedTrains = styled.div`
  display: flex;
  flex-direction: column;
  }
`;


// Placeholder data
const train1 = {
  OperationalTrainNumber: "Tåg 1",
  LocationSignature: "H",
  FromLocation: [
    {
      LocationName: "från..."
    }
  ],
  ToLocation: [
    {
      LocationName: "till..."
    }
  ]
};

const train2 = {
  OperationalTrainNumber: "Tåg 2",
  LocationSignature: "H",
  FromLocation: [
    {
      LocationName: "från..."
    }
  ],
  ToLocation: [
    {
      LocationName: "till..."
    }
  ]
};

const train3 = {
  OperationalTrainNumber: "Tåg 2",
  LocationSignature: "H",
  FromLocation: [
    {
      LocationName: "från..."
    }
  ],
  ToLocation: [
    {
      LocationName: "till..."
    }
  ]
};

function Delayed() {
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
      <DelayedTrains>
        {delayedTrains.map((train, index) => (
          <Train train={train} />
        ))}
      </DelayedTrains>
  </div>
  );
}

export default Delayed;
