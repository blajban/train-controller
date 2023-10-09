import { API_KEY, API_URL } from '../config';
import { getUserToken } from '../components/User/util';


const graphQlQuery = async (query, tokenRequired = false) => {
  const token = tokenRequired ? getUserToken() : null;

  const response = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'x-access-token': token
    },
    body: JSON.stringify({
      query: query
    })
  });

  const result = await response.json();

  return result;
};

const getReasonCodes = async () => {
  const query = `
    {
      codes {
        Code
        Level3Description
      }
    }
  `;

  try {
    const result = await graphQlQuery(query);
    return result.data.codes;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getDelayed = async () => {
  const query = `
    {
      delayed {
        OperationalTrainNumber
        LocationSignature
        AdvertisedTimeAtLocation
        EstimatedTimeAtLocation
        LocationSignature
        FromLocation {
          LocationName
        }
        ToLocation {
          LocationName
        }
      }
    }
  `;

  try {
    const result = await graphQlQuery(query);
    return result.data.delayed;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getTickets = async () => {
  const query = `
    {
      tickets {
        _id
        code
        trainnumber
        traindate
      }
    }
  `;

  try {
    const result = await graphQlQuery(query, true);
    return result.data.tickets;
  } catch (error) {
    console.error('Error:', error);
  }
}

const addTicket = async (ticketData) => {
  const { code, trainnumber, traindate } = ticketData;

  const query = `
    mutation {
      addTicket(input: {
        code: "${code}",
        trainnumber: "${trainnumber}",
        traindate: "${traindate}"
      }) {
        _id,
        code,
        traindate,
        trainnumber
      }
    }
  `;

  try {
    const result = await graphQlQuery(query, true);
    return result.data.addTicket;
  } catch (error) {
    console.error('Error:', error);
  }
}

export { getReasonCodes, getDelayed, getTickets, addTicket };
