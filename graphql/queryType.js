
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql');
const models = require('../models');
const userType = require('./types/userType');
const competitionType = require('./types/competitionType');
const teamType = require('./types/teamType');
const memberType = require('./types/memberType');
const matchType = require('./types/matchType');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        currentUser: {
            type: userType,
            resolve: (parent, args, context) => {
                // Returneaza userul curent
                return context.user;
            }
        },
        users: {
            type: new GraphQLList(userType),
            args: {
            },
            resolve: async (_, { }) => {
                const users = await models.User.findAll();
                return users;
            }
        },
        user: {
            type: userType,
            args: {
                userId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, { userId }) => {
                const user = await models.User.findByPk(userId);
                return user;
            }
        },
        competitions: {
            type: new GraphQLList(competitionType),
            args: {
            },
            resolve: async (_, { }) => {
                const competitions = await models.Competition.findAll();
                return competitions;
            }
        },
        competition: {
            type: competitionType,
            args: {
                competitionId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, { competitionId }) => {
                const competition = await models.Competition.findByPk(competitionId);
                return competition;
            }
        },
        teams: {
            type: new GraphQLList(teamType),
            args: {
            },
            resolve: async (_, { }) => {
                const teams = await models.Team.findAll();
                return teams;
            }
        },
        team: {
            type: teamType,
            args: {
                teamId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, { teamId }) => {
                const team = await models.Team.findByPk(teamId);
                return team;
            }
        },
        members: {
            type: new GraphQLList(memberType),
            args: {
            },
            resolve: async (_, { }) => {
                const members = await models.Member.findAll();
                return members;
            }
        },
        member: {
            type: memberType,
            args: {
                memberId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, { memberId }) => {
                const member = await models.Member.findByPk(memberId);
                return member;
            }
        },
        matches: {
            type: new GraphQLList(matchType),
            args: {
            },
            resolve: async (_, { }) => {
                const matches = await models.Match.findAll();
                return matches;
            }
        },
        match: {
            type: matchType,
            args: {
                matchId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, { matchId }) => {
                const match = await models.Match.findByPk(matchId);
                return match;
            }
        },
    }
});

module.exports = queryType;