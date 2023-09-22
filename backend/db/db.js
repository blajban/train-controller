const mongo = require("mongodb").MongoClient;


let mongoServer;

const database = {
  getDb: async (collectionName) => {
    let dsn = `mongodb://localhost:27017/train-controller`;
    
    if (process.env.NODE_ENV === 'test') {
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
      dsn = "mongodb://mongodb:27017/train-controller";
    }

    try {
      const client  = await mongo.connect(dsn);
      const db = client.db();
      const collection = db.collection(collectionName);

      return {
        collection: collection,
        client: client,
      };
    } catch (err) {
      new Error(err);
    }
  },

  closeDb: async () => {
    if (mongoServer) {
      await mongoServer.stop();
    }
  }

};

module.exports = database;