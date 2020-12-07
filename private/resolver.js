const models = require('../models');

const resolver = {
  user: async ({ userId }) => {
    const user = await models.User.findByPk(userId);
    return user;
  },
  users: async () => {
    const users = await models.User.findAll();
    return users;
  },
  competition: async ({ competitionId }) => {
    const competition = await models.Competition.findByPk(competitionId);
    return competition;
  },
  competitions: async () => {
    const competitions = await models.Competition.findAll();
    return competitions;
  },
  team: async ({ teamId }) => {
    const team = await models.Team.findByPk(teamId);
    return team;
  },
  teams: async () => {
    const teams = await models.Team.findAll();
    return teams;
  },
  member: async ({ memberId }) => {
    const member = await models.Member.findByPk(memberId);
    return member;
  },
  members: async () => {
    const members = await models.Member.findAll();
    return members;
  },
  teamMembers: async ({ teamId }) => {
    const team = await models.Team.findByPk(teamId);
    const members = await team.getMembers();
    return members;
  },
  match: async ({ matchId }) => {
    const match = await models.Match.findByPk(matchId);
    return match;
  },
  matches: async () => {
    const matches = await models.Match.findAll();
    return matches;
  },
  competitionMatches: async ({ competitionId }) => {
    const competition = await models.Competition.findByPk(competitionId);
    const matches = await competition.getMatches();
    return matches;
  },
  teamMatches: async ({ teamId }) => {
    const team = await models.Team.findByPk(teamId);
    const matches = await team.getMatches();
    return matches;
  },
  matchTeams: async ({ matchId }) => {
    const match = await models.Match.findByPk(matchId);
    const teams = await match.getTeams();
    return teams;
  },
  createUser: async ({ firstName, lastName, email, admin }) => {
    await models.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      admin: admin
    });

    return {
      success: true,
      message: "Inserted successfully"
    };
  },
  createCompetition: async ({ competitionName, startDate, endDate, type, format, numberOfTeams }) => {
    await models.Competition.create({
      competitionName: competitionName,
      startDate: startDate,
      endDate: endDate,
      type: type,
      format: format,
      numberOfTeams: numberOfTeams
    });

    return {
      success: true,
      message: "Inserted successfully"
    };
  },
  createTeam: async ({ teamName, numberOfMembers }) => {
    await models.Team.create({
      teamName: teamName,
      numberOfMembers: numberOfMembers
    });

    return {
      success: true,
      message: "Inserted successfully"
    };
  },
  createMember: async ({ teamId, firstName, lastName, dateOfBirth, teamCaptain }) => {
    const team = await models.Team.findByPk(teamId);
    const member = await team.createMember({
      teamId,
      firstName,
      lastName,
      dateOfBirth,
      teamCaptain
    });

    return member;
  },
  createMatch: async ({ competitionId, teamId1, teamId2, dateOfMatch, score }) => {
    const competition = await models.Competition.findByPk(competitionId);
    const match = await competition.createMatch({
      competitionId,
      dateOfMatch,
      score,
    });

    const team1 = await models.Team.findByPk(teamId1);
    const team2 = await models.Team.findByPk(teamId2);

    await match.addTeams([team1, team2]);

    return match;
  },
  removeUser: async ({ userId }) => {
    await models.User.destroy({
      where: {
        id: userId
      }
    });

    return {
      success: true,
      message: "Removed successfully"
    };
  },
  removeCompetition: async ({ competitionId }) => {
    const competition = await models.Competition.findByPk(competitionId);
    await competition.setMatches([]);

    await models.Competition.destroy({
      where: {
        id: competitionId
      }
    });

    return {
      success: true,
      message: "Removed successfully"
    };
  },
  removeTeam: async ({ teamId }) => {
    const team = await models.Team.findByPk(teamId);
    await team.setMembers([]);
    await team.setMatches([]);

    await models.Team.destroy({
      where: {
        id: teamId
      }
    });

    return {
      success: true,
      message: "Removed successfully"
    };
  },
  removeMember: async ({ memberId }) => {
    await models.Member.destroy({
      where: {
        id: memberId
      }
    });

    return {
      success: true,
      message: "Removed successfully"
    };
  },
  removeMatch: async ({ matchId }) => {
    const match = await models.Match.findByPk(matchId);
    await match.setTeams([]);
    await models.Match.destroy({
      where: {
        id: matchId
      }
    });

    return {
      success: true,
      message: "Removed successfully"
    };
  },
  updateUser: async ({ userId, email }) => {
    await models.User.update({
      email: email
    }, {

      where: {
        id: userId
      }
    });

    const user = await models.User.findByPk(userId);

    return user;
  },
  updateCompetition: async ({ competitionId, endDate }) => {
    await models.Competition.update({
      endDate: endDate
    }, {

      where: {
        id: competitionId
      }
    });

    const competition = await models.Competition.findByPk(competitionId);

    return competition;
  },
  updateTeam: async ({ teamId, numberOfMembers }) => {
    await models.Team.update({
      numberOfMembers: numberOfMembers
    }, {

      where: {
        id: teamId
      }
    });

    const team = await models.Team.findByPk(teamId);

    return team;
  },
  updateMember: async ({ memberId, teamCaptain }) => {
    await models.Member.update({
      teamCaptain: teamCaptain
    }, {

      where: {
        id: memberId
      }
    });

    const member = await models.Member.findByPk(memberId);

    return member;
  },
  updateMatch: async ({ matchId, score }) => {
    await models.Match.update({
      score: score
    }, {

      where: {
        id: matchId
      }
    });

    const match = await models.Match.findByPk(matchId);

    return match;
  }
};

module.exports = resolver;