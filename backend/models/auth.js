const { scrypt, randomBytes, timingSafeEqual } = require('crypto');
const { promisify } = require('util');
const database = require('../db/db');

const scryptAsync = promisify(scrypt);

const apiKeysCollection = 'apiKeys';

const apiKeyModel = {
  newKey: () => {
    return randomBytes(32).toString('base64');
  },

  newHash: async (key) => {
    const salt = randomBytes(8).toString('hex');
    const buffer = await scryptAsync(key, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
  },

  storeKey: async (keyHash) => {
    try {
      const db = await database.getDb(apiKeysCollection);
      await db.collection.insertOne({
        keyHash,
        date: new Date()
      });
      await db.client.close();
    } catch (error) {
      throw new Error(error);
    }
  },

  compareKeys: async (storedKey, suppliedKey) => {
    const [hashedKey, salt] = storedKey.split('.');
    const buffer = await scryptAsync(suppliedKey, salt, 64);
    return timingSafeEqual(Buffer.from(hashedKey, 'hex'), buffer);
  },

  getAllStoredKeys: async () => {
    const db = await database.getDb(apiKeysCollection);
    const allKeys = await db.collection.find({}).toArray();
    return allKeys;
  },

  generate: async () => {
    try {
      const key = apiKeyModel.newKey();
      const hash = await apiKeyModel.newHash(key);
      await apiKeyModel.storeKey(hash);
      return key;
    } catch (error) {
      throw new Error(error);
    }
  },

  isValid: async (suppliedKey) => {
    try {
      const storedKeys = await apiKeyModel.getAllStoredKeys();
      for (const storedKey of storedKeys) {
        const same = await apiKeyModel.compareKeys(storedKey.keyHash, suppliedKey);
        if (same) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = { apiKeyModel };
