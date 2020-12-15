const express = require('express');
const app = express();
const port = 3000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');

const authenticationMiddleware = require('./middlewares/authenticationMiddleware');

app.use('/graphql', authenticationMiddleware, graphqlHTTP({
  schema,
}));

app.listen(port, function () {
  console.log('server started');
});