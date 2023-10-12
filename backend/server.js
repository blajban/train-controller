const http = require('http');
const app = require('./app');
const { fetchTrainPositions } = require('./models/trains');
const tickets = require('./models/tickets');

const httpServer = http.createServer(app);

// eslint-disable-next-line
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://www.student.bth.se/~ersb21/train-controller/'],
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 1337;

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

io.on('connection', async (socket) => {
  console.log('a user connected');

  if (process.env.NODE_ENV === 'production') {
    const key = socket.handshake.query['x-api-key'];
    const isValid = await apiKey.isValid(key);

    if (!isValid) {
      console.log('Authentication error');
      socket.disconnect();
      return;
    }
  }


  fetchTrainPositions(socket);
  tickets.lockTicketsSocketConnection(socket);
});



