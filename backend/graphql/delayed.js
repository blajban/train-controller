const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  description: 'Representation of a Train Location',
  fields: () => ({
    LocationName: { type: GraphQLString },
    Priority: { type: GraphQLInt },
    Order: { type: GraphQLInt },
  }),
});

const DelayedTrainType = new GraphQLObjectType({
  name: 'Train',
  description: 'Represents a delayed train',
  fields: () => ({
    ActivityId: { type: GraphQLString },
    ActivityType: { type: GraphQLString },
    AdvertisedTimeAtLocation: { type: GraphQLString },
    AdvertisedTrainIdent: { type: GraphQLString },
    Canceled: { type: GraphQLBoolean },
    EstimatedTimeAtLocation: { type: GraphQLString },
    FromLocation: { type: new GraphQLList(LocationType) },
    LocationSignature: { type: GraphQLString },
    OperationalTrainNumber: { type: GraphQLString },
    ToLocation: { type: new GraphQLList(LocationType) },
    TrainOwner: { type: GraphQLString },
  }),
});

module.exports = DelayedTrainType;
