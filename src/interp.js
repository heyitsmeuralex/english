'use strict'

const varsUtil = require('./variables')
const PLAIN    = require('./constants').PLAIN
let   interp   = {}

interp.interp = (tree, varNames, varValues, dev) => {
  if(dev) {
    console.log('Amount of results:', tree.length)
    console.log('Results:'); console.dir(tree, {depth:null})
  }

  varNames  = varsUtil.addBuiltinsToNames(varNames)
  varValues = varsUtil.addBuiltinsToValues(varValues)

  console.log(varNames, varValues)
  return interp.interpCommands(tree[0], varNames, varValues)
}

interp.interpCommands = function(commands, varNames, varValues) {
  commands.forEach(command => {
    let commandAndArgs = interp.findCommandAndArgs(command)
    command = commandAndArgs[0]
    let args = commandAndArgs[1]
    // command.call(args)
  })
}

interp.findCommandAndArgs = function(command, varNames, varValues) {
  return [null, null]
}

module.exports = interp