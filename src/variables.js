'use strict'

const PLAIN = require('./constants').PLAIN
let variables = {}

variables.builtinNames  = []
variables.builtinValues = []

variables.addBuiltinsToNames = function(names) {
  names.push(...variables.builtinNames)
  return names
}
variables.addBuiltinsToValues = function(values) {
  values.push(...variables.builtinValues)
  return values
}

variables.addBuiltinAsArray = function(builtin, value) {
  variables.builtinNames.push(builtin)
  // TODO: make actual primitive types and replace that undefined with it.
  variables.builtinValues.push(value || undefined)
}

variables.addBuiltinAsArray(
  [[PLAIN, "log"], ["any"], [PLAIN, "three"], [PLAIN, "times"]]
)

module.exports = variables