require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { apiKeyModel } = require('./models/auth');

const apiKey = require('./routes/api-key');
const delayed = require('./routes/delayed');
const tickets = require('./routes/tickets');
const codes = require('./routes/codes');

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
app.use(async (req, res, next) => {
  try {
    const key = req.get('x-api-key');
    if (await apiKeyModel.isValid(key)) {
      next();
    } else {
      const error = new Error('Unauthorised');
      error.status = 401;
      error.message = 'API key did not match';
      next(error);
    }
  } catch (error) {
    next(error);
  }
  
});

// Routes
app.use('/delayed', delayed);
app.use('/tickets', tickets);
app.use('/codes', codes);

// Handle not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Handle all errors
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

module.exports = app;
