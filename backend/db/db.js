const mongo = require("mongodb").MongoClient;

const database = {
  getDb: async (collectionName) => {
    let dsn = `mongodb://localhost:27017/train-controller`;
    
    if (process.env.NODE_ENV === 'test') {
      dsn = "mongodb://localhost:27017/test";
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
  }
};

module.exports = database;