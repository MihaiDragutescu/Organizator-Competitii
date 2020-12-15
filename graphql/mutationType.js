const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const competitionType = require('./types/competitionType');
const competitionInputType = require('./inputTypes/competitionInputType');
const teamType = require('./types/teamType');
const teamInputType = require('./inputTypes/teamInputType');
const memberType = require('./types/memberType');
const memberInputType = require('./inputTypes/memberInputType');
const matchType = require('./types/matchType');
const matchInputType = require('./inputTypes/matchInputType');
const jwt = require('jsonwebtoken');
const config = require('../config/config1');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, { email, password }) => {
        const user = await models.User.findOne({
          where: {
            email,
            password,
          }
        });

        if (user) {
          // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
          const token = jwt.sign({ userId: user.id }, config.JWTSECRET);
          return token;
        }

        return null;
      },
    },
    createCompetition: {
      type: competitionType,
      args: {
        competitionInput: {
          type: GraphQLNonNull(competitionInputType)
        },
      },
      resolve: async (_, { competitionInput }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        if (!user) {
          return null;
        }

        const competition = await models.Competition.create(competitionInput);

        return competition;
      },
    },
    createTeam: {
      type: teamType,
      args: {
        teamInput: {
          type: GraphQLNonNull(teamInputType)
        },
      },
      resolve: async (_, { teamInput }, context) => {
        const { user } = context;

        if (!user) {
          return null;
        }

        const team = await models.Team.create(teamInput);

        return team;
      },
    },
    createMember: {
      type: memberType,
      args: {
        memberInput: {
          type: GraphQLNonNull(memberInputType)
        },
        teamId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { memberInput, teamId }, context) => {
        const { user } = context;

        if (!user) {
          return null;
        }

        const team = await models.Team.findByPk(teamId);
        const member = await team.createMember(memberInput);

        return member;
      },
    },
    createMatch: {
      type: matchType,
      args: {
        matchInput: {
          type: GraphQLNonNull(matchInputType)
        },
        competitionId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        teamId1: {
          type: GraphQLNonNull(GraphQLInt)
        },
        teamId2: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { matchInput, competitionId, teamId1, teamId2 }, context) => {
        const { user } = context;

        if (!user) {
          return null;
        }

        const competition = await models.Competition.findByPk(competitionId);
        const match = await competition.createMatch(matchInput);

        const team1 = await models.Team.findByPk(teamId1);
        const team2 = await models.Team.findByPk(teamId2);

        await match.addTeams([team1, team2]);

        return match;
      },
    },
  },
});

module.exports = mutationType;