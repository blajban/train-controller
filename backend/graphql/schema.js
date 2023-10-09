const {
  GraphQLSchema
} = require("graphql");

const { RootQueryType, RootMutationType } = require("./root.js");

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;