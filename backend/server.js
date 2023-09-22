const httpServer = require('./app');
const { fetchTrainPositions } = require('./models/trains');

// eslint-disable-next-line
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const port = 1337;

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

fetchTrainPositions(io);
