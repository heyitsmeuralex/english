const varsUtil = require('./variables')
const PLAIN    = require('./constants').PLAIN
let   interp   = {}

interp.interp = (tree, varNames, varValues, dev) => {
  if(dev) {
    console.log('Amount of results:', tree.length)
    console.log('Results:'); console.dir(tree, {depth:null})
  }

  [varNames, varValues] = varsUtil.addBuiltinsTo(varNames, varValues)

  console.log(varNames, varValues)
  return interp.interpAll(tree[0], varNames, varValues)
}

interp.interpAll = function(commands, varNames, varValues) {
  commands.forEach(command => {
    // TODO
  })
}

module.exports = interp