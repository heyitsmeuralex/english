'use strict'

const prims  = require('./primitives')

let vars = {}

var Scope = function(vars, callee, extra) {
  this.vars = vars || []
  this.callee = callee || null
  for(let key in extra)
    this[key] = extra[key]
}

Scope.prototype.addVars = function(vars) {
  vars.forEach(function(var) {
    this.vars.push(var)
  })
}

Scope.prototype.getVar = function(identifier) {
  let i
  this.vars.some(function(var, index) {
    i = index
    if(var[0] === identifier) return true
  })
  return this.vars[i]
}

vars.Scope = Scope

var Variable = function(identifier, value) {
  this.identifier = identifier
  this.value      = value
}

vars.Variable = Variable

vars.BUILTINS = [
  new Variable(
    [[plain, 'print'], 'any'],
    new prims.ScriptPrim(function(scope) {
      console.log(scope.getVar('x').asString())
    })
  ),
  new Variable(
    [[plain, 'define'], 'any'],
    new prims.ScriptPrim(function(x) {
      scope.callee.vars.push(x)
    })
  )
]

module.exports = vars