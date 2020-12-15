const { GraphQLInputObjectType, GraphQLString, GraphQLInt } = require('graphql');

const teamInputType = new GraphQLInputObjectType({
  name: 'TeamInput',
  fields: {
    teamName: { type: GraphQLString },
    numberOfMembers: { type: GraphQLInt },
  }
});

module.exports = teamInputType;