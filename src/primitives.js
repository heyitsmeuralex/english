'use strict'

let prims = {}

let StringPrim, NumberPrim, UndefinedPrim, ScriptPrim

// StringPrim

StringPrim = function(value) {
  this.attributes = {}
  this.setValue(value || StringPrim.DEFAULT_VALUE)
}

StringPrim.prototype.getValue = function() {
  return this.value
}
StringPrim.prototype.setValue = function(value, strict) {
  this.value = value.asString().getValue()
  if(typeof this.value === 'undefined') this.value = value.getValue()
  if(typeof this.value === 'undefined') this.value = value
  return this.getValue()
}
StringPrim.prototype.asString = function() {
  return this
}
StringPrim.prototype.asNumber = function() {
  return new NumberPrim(Number(this.getValue()))
}

module.exports = StringPrim

// NumberPrim

NumberPrim = function(value) {
  this.attributes = {}
  this.setValue(value || NumberPrim.DEFAULT_VALUE)
}

NumberPrim.prototype.getValue = function() {
  return this.value
}
NumberPrim.prototype.setValue = function(value) {
  this.value = value.asNumber().getValue()
  if(typeof this.value === 'undefined') this.value = value.getValue()
  if(typeof this.value === 'undefined') this.value = value
  return this.getValue()
}

NumberPrim.prototype.asString = function() {
  return new StringPrim(String(this.getValue()))
}

NumberPrim.prototype.asNumber = function() {
  return this
}
  
prims.NumberPrim = NumberPrim

// UndefinedPrim

UndefinedPrim = function() { this.attributes = {} }

UndefinedPrim.prototype.getValue = function() { return this }
UndefinedPrim.prototype.setValue = function() { throw 'Can\'t set the value of undefined.'}
UndefinedPrim.prototype.asString = function() { return '' }
UndefinedPrim.prototype.asNumber = function() { return 0 }

prims.UndefinedPrim = UndefinedPrim

// ScriptPrim

ScriptPrim = function(code, varNames, varValues) {
  this.attributes = {
    asString: this.asString,
    asNumber: this.asNumber
  }
  this.code = code
  this.varNames = varNames
  this.varValues = varValues
}

ScriptPrim.prototype.call = function(args, interp) {
  let result
  if(this.code instanceof Function)
    return [this.varNames, this.varValues, this.code(args)]
  else {
    return interp.interp(this.code, this.varNames, this.varValues)
  }
}

ScriptPrim.prototype.getValue = function() { return this.asString() }
ScriptPrim.prototype.setValue = function(value) { this.code = value }
ScriptPrim.prototype.asString = function() {
  if(this.code instanceof Function) return new StringPrim("JavaScript Function")
  return new StringPrim(this.code)
}
ScriptPrim.prototype.asNumber = function() { return 0 }

prims.ScriptPrim = ScriptPrim

prims.initConstants = function() {
  StringPrim.DEFAULT_VALUE = new UndefinedPrim
  NumberPrim.DEFAULT_VALUE = new UndefinedPrim
}

module.exports = prims