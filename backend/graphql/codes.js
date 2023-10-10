const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ReasonCodeType = new GraphQLObjectType({
  name: 'ReasonCode',
  description: 'Representation of Reason Codes',
  fields: () => ({
    Code: { type: GraphQLString },
    Level1Description: { type: GraphQLString },
    Level2Description: { type: GraphQLString },
    Level3Description: { type: GraphQLString }
  })
});

module.exports = ReasonCodeType;
