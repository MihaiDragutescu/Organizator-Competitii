const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const matchType = new GraphQLObjectType({
  name: 'Match',
  fields: {
    id: { type: GraphQLInt },
    dateOfMatch: { type: GraphQLString },
    score: { type: GraphQLString },
  }
});

module.exports = matchType;