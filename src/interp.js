'use strict'

const constants  = require('./constants')
const variables  = require('./variables')
const prims      = require('./primitives')
const plain      = constants.PLAIN

let interp = {}

interp.interp = (tree, dev) => {
  /*let scope = [
    {
      type: 'script',
      identifier: [[plain, 'print'], 'any'],
      value: x => {
        if(x[0] === 'plain') x = scope.filter(k => k.identifier === x[1])[0]
        console.log(x.value)
      }
    },
    {
      type: 'script',
      identifier: [[plain, 'define'], 'any'],
      value: (identifier, scope) => {
        scope.push({
          type: identifier[0],
          identifier: identifier[1],
          value: undefined
        })
        return identifier[1]
      }
    },
    {
      type: 'script',
      identifier: [[plain, 'set'], 'any', [plain, 'to'], 'any'],
      value: (identifier, value, scope) => {
        let v = scope.filter(s => s.identifier == identifier[1])[0]
        v.value = value[1]
        v.type = value[0]
        return identifier[1]
      }
    },
  ]*/
  let scopes = []
  scopes.push(new Scope)
  scopes[0].addVars(vars.BUILTIN)
  let currentScope = 0

  return interp.interpCommands(tree[0], scope)
}

interp.interpCommands = (commands, scope) => {
  let latest = { type: 'plain', identifier: null, value: undefined }

  commands.forEach(command => {
    let commandAndArgs = interp.findCommandAndArgs(command, scope)
    command = commandAndArgs[0]
    let args = commandAndArgs[1]
    args = args.map(arg => {
      if(arg == ['plain', 'it']) arg = scope.filter(k => k.identifier === latest)[0]
      return arg
    })
    args.push(scope)
    latest = command.apply(this, args)
  })
}

interp.findCommandAndArgs = (what, scope) => {
  let args = []
  let cmds = scope.filter(some => some.type === 'script').filter(script => {
    let ok = null

    script.identifier.forEach((part, i) => {
      let suppose = what[i] // argument to test against

      if(typeof part === 'function' || ok === false) return
      else if(part === 'any') { ok = true; args.push(suppose) }
      else if(part[0] === suppose[0] && part[1].toLowerCase() == suppose[1].toLowerCase()) ok = true
      else ok = false
    })

    return ok
  })

  if(cmds.length === 0) throw ('Nothing found matching ' + what)
  // else if(cmds.length > 1) throw ('Too much found matching ' + what) -- this should be allowed.
  else var cmd = cmds[0].value

  return [cmd, args]
}

module.exports = interp