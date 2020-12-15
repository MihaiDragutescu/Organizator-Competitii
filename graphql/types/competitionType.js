const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const matchType = require('./matchType');

const competitionType = new GraphQLObjectType({
  name: 'Competition',
  fields: {
    id: { type: GraphQLInt },
    competitionName: { type: GraphQLString },
    type: { type: GraphQLString },
    format: { type: GraphQLString },
    numberOfTeams: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    competitionMatches: {
      type: new GraphQLList(matchType),
      resolve: async (parent) => {
        return await parent.getMatches();
      }
    }
  }
});

module.exports = competitionType;