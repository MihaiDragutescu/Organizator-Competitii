const { GraphQLInputObjectType, GraphQLString } = require('graphql');

const matchInputType = new GraphQLInputObjectType({
  name: 'MatchInput',
  fields: {
    dateOfMatch: { type: GraphQLString },
    score: { type: GraphQLString },
  }
});

module.exports = matchInputType;