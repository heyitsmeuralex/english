#! /usr/bin/env node
'use strict'

const fs      = require('fs')
const nearley = require('nearley')
const grammar = require('./grammar')
const parser  = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
const interp  = require('./interp')
const args    = process.argv.splice(2)
const file    = args[0]
const useDev  = args[1]

let results

fs.readFile(file, 'utf8', (err, data) => {
  if(err) throw err
  
  results = parser.feed(data).results
  
  if(useDev) {
    console.log('Amount of results:', results.length)
    console.log('Results:')
    console.dir(results, { depth: null })
  }

  if(!results) throw 'O_o'

  interp(results)
})
