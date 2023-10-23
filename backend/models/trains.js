const fetch = require('node-fetch');
const EventSource = require('eventsource');

async function getSseurl() {
  const query = `<REQUEST>
    <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
    <QUERY sseurl="true" namespace="järnväg.trafikinfo" objecttype="TrainPosition" schemaversion="1.0" limit="1" />
  </REQUEST>`;

  const response = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
    method: 'POST',
    body: query,
    headers: { 'Content-Type': 'text/xml' }
  });

  const result = await response.json();
  return result.RESPONSE.RESULT[0].INFO.SSEURL;
}

function getTrainObject(changedPosition) {
  const matchCoords = /(\d*\.\d+|\d+),?/g;

  const position = changedPosition.Position.WGS84
    .match(matchCoords)
    .map(((t) => parseFloat(t)))
    .reverse();

  return {
    trainnumber: changedPosition.Train.OperationalTrainNumber,
    position: position,
    timestamp: changedPosition.TimeStamp,
    bearing: changedPosition.Bearing,
    status: !changedPosition.Deleted,
    speed: changedPosition.Speed,
  };
}

function setupSocket(socket, eventSource) {
  const trainPositions = {};

  // eslint-disable-next-line
  eventSource.onmessage = (e) => {
    try {
      const parsedData = JSON.parse(e.data);

      if (parsedData) {
        const changedPosition = parsedData.RESPONSE.RESULT[0].TrainPosition[0];
        const trainObject = getTrainObject(changedPosition);

        if (Object.prototype.hasOwnProperty.call(
          trainPositions,
          changedPosition.Train.OperationalTrainNumber
        )) {
          socket.emit('message', trainObject);
        }

        trainPositions[changedPosition.Train.OperationalTrainNumber] = trainObject;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

function setupEventSource(sseurl) {
  const eventSource = new EventSource(sseurl);
  eventSource.onopen = () => {
    console.log('Connection to server opened.');
  };

  eventSource.onerror = () => {
    console.log('EventSource failed.');
  };

  return eventSource;
}

async function fetchTrainPositions(socket) {
  const sseurl = await getSseurl();
  const eventSource = setupEventSource(sseurl);
  setupSocket(socket, eventSource);
}

module.exports = {
  getSseurl,
  setupSocket,
  getTrainObject,
  setupEventSource,
  fetchTrainPositions
};
