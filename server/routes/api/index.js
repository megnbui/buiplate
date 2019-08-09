const path = require('path')
import graphqlHTTP from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'User',
    fields: {
      firstName: {
        type: GraphQLString,
        resolve: () => 'Megan'
      },
      lastName: {
        type: GraphQLString,
        resolve: () => 'Buoy'
      }
    }
  })
})

module.exports = (app) => {
  app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));
}
