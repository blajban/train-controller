import { API_KEY, API_URL } from '../config';

const END_POINT = 'graphql';

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
    const response = await fetch(`${API_URL}/${END_POINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        query: query
      })
    });

    const result = await response.json();

    return result.data.codes;
  } catch (error) {
    console.error('Error:', error);
  }
};

export { getReasonCodes };
