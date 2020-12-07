const { buildSchema } = require('graphql');

const schema = buildSchema(`

scalar Date

type MyType {
   created: Date
}

type User {
  id: Int
  firstName: String
  lastName: String
  email: String
  admin: Boolean
}

type Competition {
  id: Int
  competitionName: String
  startDate: Date
  endDate: Date
  type: String
  format: String
  numberOfTeams: Int
}

type Team {
  id: Int
  teamName: String
  numberOfMembers: Int
}

type Member {
  id: Int
  firstName: String
  lastName: String
  teamId: Int
  dateOfBirth: Date
  teamCaptain: Boolean
}

type Match {
  id: Int
  dateOfMatch: Date
  competitionId: Int
  score: String
}

type Response {
  success: Boolean
  message: String
}

type Query {
 users: [User]
 user(userId: Int!): User
 competitions: [Competition]
 competition(competitionId: Int!): Competition
 teams: [Team]
 team(teamId: Int!): Team
 members: [Member]
 member(memberId: Int!): Member
 teamMembers(teamId: Int!): [Member]
 matches: [Match]
 match(matchId: Int!): Match
 competitionMatches(competitionId: Int!): [Match]
 teamMatches(teamId: Int!): [Match]
 matchTeams(matchId: Int!): [Team]
}

type Mutation {
  createUser(firstName: String!, lastName: String!, email: String!, admin: Boolean!): Response
  createCompetition(competitionName: String!, startDate: Date!, endDate: Date!, type: String!, format: String!, numberOfTeams: Int!): Response
  createTeam(teamName: String!, numberOfMembers: Int!): Response
  createMember(teamId: Int!, firstName: String!, lastName: String!, dateOfBirth: Date!, teamCaptain: Boolean!): Member
  createMatch(competitionId: Int!, teamId1: Int!, teamId2: Int!, dateOfMatch: Date!, score: String!): Match

  removeUser(userId: Int!): Response
  removeCompetition(competitionId: Int!): Response
  removeTeam(teamId: Int!): Response
  removeMember(memberId: Int!): Response
  removeMatch(matchId: Int!): Response

  updateUser(userId: Int!, email: String!): User
  updateCompetition(competitionId: Int!, endDate: Date!): Competition
  updateTeam(teamId: Int!, numberOfMembers: Int!): Team
  updateMember(memberId: Int!, teamCaptain: Boolean!): Member
  updateMatch(matchId: Int!, score: String!): Match
}
`);

module.exports = schema;
