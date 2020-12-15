const { GraphQLInputObjectType, GraphQLString, GraphQLInt } = require('graphql');

const competitionInputType = new GraphQLInputObjectType({
  name: 'CompetitionInput',
  fields: {
    competitionName: { type: GraphQLString },
    type: { type: GraphQLString },
    format: { type: GraphQLString },
    numberOfTeams: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString }
  }
});

module.exports = competitionInputType;