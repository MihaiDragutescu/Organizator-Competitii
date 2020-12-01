const { buildSchema } = require('graphql');

const schema = buildSchema(`
type User {
  id: Int
  email: String
  password: String
  admin: Boolean
}

type Query {
 user(userId: Int!): User
}

`);

module.exports = schema;