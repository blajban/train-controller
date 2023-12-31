const mongo = require('mongodb').MongoClient;

let mongoServer;

const database = {
  getDb: async (collectionName) => {
    let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.jroihbh.mongodb.net/?retryWrites=true&w=majority`;

    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line
      const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
      if (!mongoServer) {
        mongoServer = new MongoMemoryServer();
        await mongoServer.start();
        dsn = await mongoServer.getUri();
      } else {
        dsn = await mongoServer.getUri();
      }
    }

    if (process.env.NODE_ENV === 'container') {
      dsn = 'mongodb://mongodb:27017/train-controller';
    }

    try {
      const client = await mongo.connect(dsn);
      const db = client.db();
      const collection = db.collection(collectionName);

      return {
        collection: collection,
        client: client,
      };
    } catch (err) {
      throw Error(err);
    }
  },

  closeDb: async () => {
    if (mongoServer) {
      await mongoServer.stop();
    }
  }

};

module.exports = database;
