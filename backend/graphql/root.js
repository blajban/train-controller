const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const ReasonCodeType = require('./codes');
const codes = require('../models/codes');

const DelayedTrainType = require('./delayed');
const delayed = require('../models/delayed');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    codes: { 
      type: new GraphQLList(ReasonCodeType),
      resolve: async () => {
        return await codes.getData();
      }
    },
    delayed: {
      type: new GraphQLList(DelayedTrainType),
      resolve: async () => {
        return await delayed.getData();
      }
    }
  }),
});


module.exports = RootQueryType;