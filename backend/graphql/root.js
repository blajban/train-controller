const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const ReasonCodeType = require('./codes');
const codes = require('../models/codes');

const DelayedTrainType = require('./delayed');
const delayed = require('../models/delayed');

const { TicketType, TicketInputType, TicketUpdateType } = require('./tickets');
const tickets = require('../models/tickets');
const { AuthorizationError } = require('../errors');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    codes: {
      type: new GraphQLList(ReasonCodeType),
      // eslint-disable-next-line
      resolve: async () => await codes.getData()
    },
    delayed: {
      type: new GraphQLList(DelayedTrainType),
      // eslint-disable-next-line
      resolve: async () => await delayed.getData()
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthorizationError();
        }
        // eslint-disable-next-line
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
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthorizationError();
        }
        const newTicket = args.input;
        // eslint-disable-next-line
        return await tickets.insertTicketData(newTicket);
      }
    },
    updateTicket: {
      type: TicketType,
      description: 'Update a ticket',
      args: {
        input: { type: TicketUpdateType }
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new AuthorizationError();
        }
        const { _id, code } = args.input;
        // eslint-disable-next-line
        return await tickets.updateTicketCodeData({ _id, code });
      }
    }
  })
});

module.exports = { RootQueryType, RootMutationType };
