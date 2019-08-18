const { GraphQLObjectType } = require('graphql')

function visitFieldsOfType (type, callback, visitedTypes) {
  const { name } = type
  if (!visitedTypes.has(name)) {
    visitedTypes.add(name)
    const fields = type.getFields()
    Object
      .values(fields)
      .forEach(field => {
        const fieldType = field.type
        if (fieldType instanceof GraphQLObjectType) {
          visitFieldsOfType(fieldType, callback, visitedTypes)
        }
        callback(field, type)
      })
  }
}

function visitFields (schema, callback) {
  const visitedTypes = new Set()
  Object
    .keys(schema.getTypeMap())
    .filter(typeName => !typeName.startsWith('__'))
    .map(typeName => schema.getType(typeName))
    .filter(type => type instanceof GraphQLObjectType)
    .forEach(type => visitFieldsOfType(type, callback, visitedTypes))
}

module.exports = { visitFields }
