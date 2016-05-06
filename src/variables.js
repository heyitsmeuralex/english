const PLAIN = require('./constants').PLAIN
let variables = {}

variables.builtinNames  = []
variables.builtinValues = []

variables.addBuiltinsTo = function(names, values) {
  names.push(...variables.builtinNames)
  values.push(...variables.builtinValues)
  return [names, values]
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