const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const memberType = require('./memberType');
const matchType = require('./matchType');

const teamType = new GraphQLObjectType({
    name: 'Team',
    fields: {
        id: { type: GraphQLInt },
        teamName: { type: GraphQLString },
        numberOfMembers: { type: GraphQLInt },
        teamMembers: {
            type: new GraphQLList(memberType),
            resolve: async (parent) => {
                return await parent.getMembers();
            }
        },
        teamMatches: {
            type: new GraphQLList(matchType),
            resolve: async (parent) => {
                return await parent.getMatches();
            }
        },
    }
});

module.exports = teamType;