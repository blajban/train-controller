require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// middleware
const verifyApiKey = require('./middleware/verifyApiKey');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');

// routes
const apiKey = require('./routes/api-key');
const delayed = require('./routes/delayed');
const tickets = require('./routes/tickets');
const codes = require('./routes/codes');
const login = require('./routes/login');
const register = require('./routes/register');


const app = express();

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    data: 'Train Controller',
    description: 'Generate API key at /api-key'
  });
});

// Generate API key
app.use('/api-key', apiKey)

// Check API key
app.use(verifyApiKey);

// Routes
app.use('/delayed', delayed);
app.use('/tickets', tickets);
app.use('/codes', codes);
app.use('/login', login);
app.use('/register', register);

// Handle not found
app.use(notFound);

// Handle all errors
// eslint-disable-next-line
app.use(handleErrors);

module.exports = app;
