const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const database = require('../db/db');

const {
  InvalidCredentialsError,
  NotEnoughCredentialsError,
  UserExistsError
} = require('../errors');

const collectionName = 'users';

const users = {
  addToken: (email) => {
    const payload = { email };
    const secret = process.env.JWT_SECRET;

    return jwt.sign(payload, secret, { expiresIn: '1h'});
  },

  login: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);

      const { email, password } = req.body;

      if (!(email && password)) {
        return next(new NotEnoughCredentialsError());
      }

      const lowerEmail = email.toLowerCase();
      const user = await db.collection.findOne({ email: lowerEmail });

      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const token = users.addToken(lowerEmail);

          return res.json({
            data: {
              description: 'User logged in',
              email: email.toLowerCase(),
              token
            }
          });
        }
      }

      return next(new InvalidCredentialsError());
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);

      const { firstName, lastName, email, password } = req.body;

      if (!(firstName && lastName && email && password)) {
        return next(new NotEnoughCredentialsError());
      }

      const lowerEmail = email.toLowerCase();
      const userAlreadyExists = await db.collection.findOne({ email: lowerEmail });

      if (userAlreadyExists) {
        return next(new UserExistsError());
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      await db.collection.insertOne({
        firstName,
        lastName,
        email: lowerEmail,
        password: encryptedPassword
      });

      // Add token and send to user
      const token = users.addToken(lowerEmail);

      return res.json({
        data: {
          description: 'User created',
          email: email.toLowerCase(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = users;