import { GraphQLSchema } from 'graphql'
const { ApolloServer } = require('apollo-server-express')

import generateSchema from './schema'

export default function generateApolloServer({
  graphqlSchemaDeclaration,
  customMutations,
  types,
  models,
  apolloServerOptions = {},
  pubSubInstance = null,
  globalPreCallback = () => null
}: any) {
  const graphqlSchema = new GraphQLSchema(
    generateSchema({
      graphqlSchemaDeclaration,
      customMutations,
      types,
      models,
      globalPreCallback,
      pubSubInstance
    })
  )

  return new ApolloServer({
    schema: graphqlSchema,
    cacheControl: false,
    ...apolloServerOptions
  })
}