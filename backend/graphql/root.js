const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const ReasonCodeType = require('./codes');
const codes = require('../models/codes');

const DelayedTrainType = require('./delayed');
const delayed = require('../models/delayed');

const { TicketType, TicketInputType } = require('./tickets');
const tickets = require('../models/tickets');

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
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve: async () => {
        return await tickets.getData();
      }
    }
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addTicket: {
      type: TicketType,
      description: 'Insert a new ticket',
      args: {
        input: { type: TicketInputType }
      },
      resolve: async (parent, args) => {
        const newTicket = args.input;
        return await tickets.insertTicketData(newTicket);
      }
    }
  })
});


module.exports = { RootQueryType, RootMutationType };