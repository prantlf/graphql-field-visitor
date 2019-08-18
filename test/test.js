const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean } = require('graphql')
const { visitFields } = require('..')
const test = require('ava')

const scalar = {
  type: GraphQLBoolean
}

const object = {
  type: new GraphQLObjectType({
    name: 'Object',
    fields: () => ({ child: scalar })
  })
}

function createSchema (fields) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => fields
    })
  })
}

function collectTypesAndFields (schema) {
  const visited = []
  visitFields(schema, (field, type) => visited.push(type.name, field.name))
  return visited
}

test('exports a function', test => test.is(typeof visitFields, 'function'))

test('visits fields', test => {
  const schema = createSchema({ scalar })
  const visited = collectTypesAndFields(schema)
  test.deepEqual(visited, ['Query', 'scalar'])
})

test('visits fields recursively', test => {
  const schema = createSchema({ object })
  const visited = collectTypesAndFields(schema)
  test.deepEqual(visited, ['Object', 'child', 'Query', 'object'])
})

test('does not visit the same type multiple times', test => {
  const schema = createSchema({ object1: object, object2: object })
  const visited = collectTypesAndFields(schema)
  test.deepEqual(visited, ['Object', 'child', 'Query', 'object1', 'Query', 'object2'])
})
