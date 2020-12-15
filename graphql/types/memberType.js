const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');

const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    teamCaptain: { type: GraphQLBoolean },
  }
});

module.exports = memberType;