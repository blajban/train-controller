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

    return jwt.sign(payload, secret, { expiresIn: '1h' });
  },

  // eslint-disable-next-line
  verify: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);
      const user = await db.collection.findOne({ email: req.decoded.email });
      await db.client.close();
      return res.json({
        data: {
          valid: true,
          description: 'Token is valid',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line
  login: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);

      const { email, password } = req.body;

      if (!(email && password)) {
        await db.client.close();
        return next(new NotEnoughCredentialsError());
      }

      const lowerEmail = email.toLowerCase();
      const user = await db.collection.findOne({ email: lowerEmail });
      await db.client.close();

      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const token = users.addToken(lowerEmail);

          return res.json({
            data: {
              description: 'User logged in',
              firstName: user.firstName,
              lastName: user.lastName,
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

  // eslint-disable-next-line
  register: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);

      const {
        firstName,
        lastName,
        email,
        password
      } = req.body;

      if (!(firstName && lastName && email && password)) {
        await db.client.close();
        return next(new NotEnoughCredentialsError());
      }

      const lowerEmail = email.toLowerCase();
      const userAlreadyExists = await db.collection.findOne({ email: lowerEmail });

      if (userAlreadyExists) {
        await db.client.close();
        return next(new UserExistsError());
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      await db.collection.insertOne({
        firstName,
        lastName,
        email: lowerEmail,
        password: encryptedPassword
      });
      await db.client.close();

      const token = users.addToken(lowerEmail);

      return res.json({
        data: {
          description: 'User created',
          firstName,
          lastName,
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
