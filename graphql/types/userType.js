const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');
const models = require('../../models');

const userType = new GraphQLObjectType({
  name: 'User',
  // Pentru a evita un crash din cauza dependintei circulare
  // intre userType si userType. Declaram proprietatea `fields` 
  // sub forma de functie care returneaza obiect.
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
});

module.exports = userType;