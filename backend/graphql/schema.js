const {
  GraphQLSchema
} = require("graphql");

const RootQueryType = require("./root.js");

const schema = new GraphQLSchema({
    query: RootQueryType
});

module.exports = schema;