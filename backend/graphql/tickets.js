const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  description: 'Represents a ticket',
  fields: () => ({
    _id: { type: GraphQLID },
    code: { type: GraphQLString },
    trainnumber: { type: GraphQLString },
    traindate: { type: GraphQLString }
  })
});

const TicketInputType = new GraphQLInputObjectType({
  name: 'TicketInput',
  description: 'Input type for a ticket',
  fields: () => ({
    code: { type: new GraphQLNonNull(GraphQLString) },
    trainnumber: { type: new GraphQLNonNull(GraphQLString) },
    traindate: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const TicketUpdateType = new GraphQLInputObjectType({
  name: 'TicketUpdate',
  description: 'Update type for a ticket',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    code: { type: GraphQLString }
  })
});

module.exports = { TicketType, TicketInputType, TicketUpdateType };
