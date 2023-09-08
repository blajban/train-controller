import { useState, useEffect } from 'react'

import styled from "styled-components";

import Train from './Train';

/*

fetch("http://localhost:1337/delayed")
        .then((response) => response.json())
        .then(function(result) {
            return renderDelayedTable(result.data, delayed);
        });


        function renderDelayedTable(data, table) {
    data.forEach((item) => {
        let element = document.createElement("div");

        element.innerHTML = `
            <div class="train-number">
                ${item.OperationalTrainNumber}
            </div>
            <div class="current-station">
                <div>${item.LocationSignature}</div>
                <div>${item.FromLocation ? item.FromLocation[0].LocationName + " -> " : ""} ${item.ToLocation ? item.ToLocation[0].LocationName : ""}</div>
            </div>
            <div class="delay">
                ${outputDelay(item)}
            </div>`;

        element.addEventListener("click", function() {
            renderTicketView(item);
        });

        table.appendChild(element);
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
  return (
    <div class="delayed">
      <h1>Försenade tåg</h1>
      <DelayedTrains>
        <Train
          train={train1}
        />
        <Train
          train={train2}
        />
        <Train
          train={train3}
        />

      </DelayedTrains>
  </div>
  );
}

export default Delayed;
