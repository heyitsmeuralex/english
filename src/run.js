'use strict'

const fs      = require('fs'),
      nearley = require('nearley'),
      grammar = require('./grammar'),
      parser  = new nearley.Parser(grammar.ParserRules, grammar.ParserStart),
      interp  = require('./interp'),
      args    = process.argv.splice(2),
      file    = args[0],
      useDev  = args[1]

let results

fs.readFile(file, 'utf8', (err, data) => {
  if(err) throw err
  
  results = parser.feed(data).results
  
  if(useDev) {
    console.log('Amount of results:', results.length)
    console.log('Results:')
    console.dir(results, { depth: null })
  }

  interp.interp(results)
})
