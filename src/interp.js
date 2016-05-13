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

  //console.log(varNames, varValues)
  return interp.interpCommands(tree[0], varNames, varValues)
}

interp.interpCommands = (commands, varNames, varValues) => {
  commands.forEach(command => {
    let commandAndArgs = interp.findCommandAndArgs(command, varNames, varValues)
    command = commandAndArgs[0]
    let args = commandAndArgs[1]
    command.apply(this, args)
  })
}

interp.findCommandAndArgs = (what, commands) => {
  let args = []
  let cmds = commands.filter(command => {
    let ok = 'idk'

    command.forEach((part, i) => {
      let suppose = what[i] // argument to test against

      if(typeof part === 'function' || ok === false) return
      else if(part === 'any') { ok = true; args.push(suppose) }
      else if(part[0] === suppose[0] && part[1].toLowerCase() == suppose[1].toLowerCase()) ok = true
      else ok = false
    
      console.log(part, 'vs', suppose)
    })

    return ok
  })

  if(cmds.length === 0) throw ('Nothing found matching '+what)
  else if(cmds.length > 1) throw ('Too much found matching '+what)
  else var cmd = cmds[0][cmds[0].length-1]

  return [cmd, args]
}

module.exports = interp