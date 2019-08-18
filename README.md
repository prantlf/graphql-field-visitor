# graphql-field-visitor

[![NPM version](https://badge.fury.io/js/graphql-field-visitor.png)](http://badge.fury.io/js/graphql-field-visitor)
[![Build Status](https://travis-ci.org/prantlf/graphql-field-visitor.png)](https://travis-ci.org/prantlf/graphql-field-visitor)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/graphql-field-visitor/badge.svg?branch=master)](https://coveralls.io/github/prantlf/graphql-field-visitor?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e86a82b760b04b57fd27/maintainability)](https://codeclimate.com/github/prantlf/graphql-field-visitor/maintainability)
[![codebeat badge](https://codebeat.co/badges/e615bac8-23a2-4cb9-9e62-f6bf6556f053)](https://codebeat.co/projects/github-com-prantlf-graphql-field-visitor-master)
[![devDependency Status](https://david-dm.org/prantlf/graphql-field-visitor/dev-status.svg)](https://david-dm.org/prantlf/graphql-field-visitor#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM Downloads](https://nodei.co/npm/graphql-field-visitor.png?downloads=true&stars=true)](https://www.npmjs.com/package/graphql-field-visitor)

Iterates over all fields in all types declared in a GraphQL schema. It can be used for analysis, instrumentation or documentation of the schema.

## Synopsis

```js
const { visitFields } = require('graphql-field-visitor')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => { ... }
  })
})

// Prints all fields prefixed by their parent type.
visitFields(schema, (field, type) =>
  console.log(`${type.name}: ${field.name}`))
```

## Installation

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 8 or newer.

```sh
$ npm i graphql-field-visitor -S
```

```sh
$ yarn add graphql-field-visitor
```

## Description

### visitFields(schema, callback)

Iterates recursively over all fields in all types declared in a GraphQL schema. Each type is visited only once. Fields are visited using the depth-first strategy.

* `schema` has to be an object instance of the type `GraphQLSchema`
* `callback` has to be a function of the type `GraphQLSchema` receiving arguments:
  * `field` is the field configuration object
  * `type` is the parent type instance of the field

```js
const { visitFields } = require('graphql-field-visitor')

const schema = ...

visitFields(schema, (field, type) => ...)
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2019-08-18   v0.0.1   Initial release

## License

Copyright (c) 2019 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
