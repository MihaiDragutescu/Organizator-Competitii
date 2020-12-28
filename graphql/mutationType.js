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
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

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
          }
        });

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
            const token = jwt.sign({ userId: user.id }, config.JWTSECRET);
            return token;
          }
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
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const competition = await models.Competition.create(competitionInput);

          return competition;
        }
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

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const team = await models.Team.create(teamInput);

          return team;
        }
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

        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const team = await models.Team.findByPk(teamId);
          const member = await team.createMember(memberInput);

          return member;
        }
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

        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const competition = await models.Competition.findByPk(competitionId);
          const match = await competition.createMatch(matchInput);

          const team1 = await models.Team.findByPk(teamId1);
          const team2 = await models.Team.findByPk(teamId2);

          await match.addTeams([team1, team2]);

          return match;
        }
      },
    },
    updateCompetition: {
      type: competitionType,
      args: {
        competitionId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        competitionInput: {
          type: GraphQLNonNull(competitionInputType)
        }
      },
      resolve: async (_, { competitionId, competitionInput }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const competition = await models.Competition.findByPk(competitionId);
          competition.update(competitionInput);

          return competition;
        }
      },
    },
    updateTeam: {
      type: teamType,
      args: {
        teamId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        teamInput: {
          type: GraphQLNonNull(teamInputType)
        },
      },
      resolve: async (_, { teamId, teamInput }, context) => {
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const team = await models.Team.findByPk(teamId);
          team.update(teamInput);

          return team;
        }
      },
    },
    updateMember: {
      type: memberType,
      args: {
        memberId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        memberInput: {
          type: GraphQLNonNull(memberInputType)
        },
      },
      resolve: async (_, { memberId, memberInput }, context) => {
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const member = await models.Member.findByPk(memberId);
          member.update(memberInput);

          return member;
        }
      },
    },
    updateMatch: {
      type: matchType,
      args: {
        matchId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        matchInput: {
          type: GraphQLNonNull(matchInputType)
        },
        teamId1: {
          type: GraphQLNonNull(GraphQLInt)
        },
        teamId2: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { matchId, matchInput, teamId1, teamId2 }, context) => {
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const match = await models.Match.findByPk(matchId);
          match.update(matchInput);

          const team1 = await models.Team.findByPk(teamId1);
          const team2 = await models.Team.findByPk(teamId2);

          await match.setTeams([]);
          await match.addTeams([team1, team2]);

          return match;
        }
      },
    },
    removeCompetition: {
      type: GraphQLString,
      args: {
        competitionId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { competitionId }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const competition = await models.Competition.findByPk(competitionId);
          await competition.setMatches([]);

          await models.Competition.destroy({
            where: {
              id: competitionId
            }
          });

          return "Competition removed successfully";
        }
      },
    },
    removeTeam: {
      type: GraphQLString,
      args: {
        teamId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { teamId }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const team = await models.Team.findByPk(teamId);
          await team.setMembers([]);
          await team.setMatches([]);

          await models.Team.destroy({
            where: {
              id: teamId
            }
          });

          return "Team removed successfully";
        }
      },
    },
    removeMember: {
      type: GraphQLString,
      args: {
        memberId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { memberId }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const member = await models.Member.findByPk(memberId);

          await models.Member.destroy({
            where: {
              id: memberId
            }
          });

          return "Member removed successfully";
        }
      },
    },
    removeMatch: {
      type: GraphQLString,
      args: {
        matchId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, { matchId }, context) => {
        // `user` vine din `authenticationMiddleware`
        const { user } = context;

        // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
        var result = await context.user;
        if (!user || !result.admin) {
          return null;
        } else {
          const match = await models.Match.findByPk(matchId);
          await match.setTeams([]);

          await models.Match.destroy({
            where: {
              id: matchId
            }
          });

          return "Match removed successfully";
        }
      },
    },
  },
});

module.exports = mutationType;