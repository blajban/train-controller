const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    test: {
      name: 'Testing',
      type: GraphQLString,
      resolve: () => 'Test'
    }
  }), 
});


module.exports = RootQueryType;