const fetch = require('node-fetch');

const codes = {
  getData: async () => {
    const query = `<REQUEST>
        <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
        <QUERY objecttype="ReasonCode" schemaversion="1">
              <INCLUDE>Code</INCLUDE>
              <INCLUDE>Level1Description</INCLUDE>
              <INCLUDE>Level2Description</INCLUDE>
              <INCLUDE>Level3Description</INCLUDE>
        </QUERY>
      </REQUEST>`;

    try {
      const response = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
        method: 'POST',
        body: query,
        headers: { 'Content-Type': 'text/xml' }
      });

      const result = await response.json();

      return result.RESPONSE.RESULT[0].ReasonCode;
    } catch (error) {
      throw new Error('Failed fetching reason codes');
    }
  },
  getCodes: async (req, res, next) => {
    try {
      const data = await codes.getData();
      res.json({
        data: data
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = codes;
