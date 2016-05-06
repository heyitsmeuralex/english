'use strict'

let moduleExports = {},
    addConstant   = function(constant, value) {
      moduleExports[constant] = (value === undefined ? constant : value)
    }

addConstant('PLAIN')
addConstant('STRING')
addConstant('NUMBER')

addConstant('KEYWORDS', ['and', 'then'])
addConstant('SPECIAL_CHARS', '"\'., ')

module.exports = moduleExports