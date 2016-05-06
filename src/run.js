#! /usr/bin/env node
'use strict'

const fs      = require('fs')
const nearley = require('nearley')
const grammar = require('./grammar')
const parser  = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
const interp  = require('./interp')
const args    = process.argv.splice(2)

// TODO: add 'build' and stuff lolz

switch(args[0]) {
  default:
  const file   = args[0]
  const useDev = args[1] == 'true' ? true : false
  let results

  fs.readFile(file, 'utf8', (err, data) => {
    if(err) throw err
    
    data = data.replace(/[\n\r]+/g, '\n')
    results = parser.feed(data).results

    interp(results, useDev)
  })
}
