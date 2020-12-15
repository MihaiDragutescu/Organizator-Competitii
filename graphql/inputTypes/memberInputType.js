const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean } = require('graphql');

const memberInputType = new GraphQLInputObjectType({
  name: 'MemberInput',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    teamCaptain: { type: GraphQLBoolean },
  }
});

module.exports = memberInputType;