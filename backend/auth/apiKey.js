const { scrypt, randomBytes, timingSafeEqual } = require('crypto');
const { promisify } = require('util');
const database = require('../db/db');

const scryptAsync = promisify(scrypt);

const collectionName = 'apiKeys';

const apiKey = {
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
      const db = await database.getDb(collectionName);
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
    const db = await database.getDb(collectionName);
    const allKeys = await db.collection.find({}).toArray();
    return allKeys;
  },

  generate: async () => {
    try {
      const key = apiKey.newKey();
      const hash = await apiKey.newHash(key);
      await apiKey.storeKey(hash);
      return key;
    } catch (error) {
      throw new Error(error);
    }
  },

  isValid: async (suppliedKey) => {
    try {
      const storedKeys = await apiKey.getAllStoredKeys();
      for (const storedKey of storedKeys) {
        const same = await apiKey.compareKeys(storedKey.keyHash, suppliedKey);
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

module.exports = apiKey;
