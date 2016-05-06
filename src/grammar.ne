@{%
  
var C = require('./constants.js')

var parseIntData = function(int, doParseInt) {
  var ret = ''
  if(int[0]) ret += '-'
  ret += int[1]
  return doParseInt ? parseInt(ret) : ret
}

%}

@builtin "whitespace.ne"

Program -> _ (_program _):? {% function(d) { return d[1] ? d[1][0] : [] } %}
_program -> Command CommandSeperator:+ __ _program {% function(d, _, reject) { if(d[0][0][0] !== C.PLAIN) return reject; return [d[0], ...d[d.length - 1]] } %}
          | Command CommandSeperator:+ {% function(d, _, reject) { if(d[0][0][0] !== C.PLAIN) return reject; return [d[0]] } %}
          | Command

Command -> CommandPart __ Command {% function(d) { return [d[0][0], ...d[d.length - 1]] } %}
         | CommandPart {% function(d) { return d[0] } %}
CommandPart -> Plain
             | String
             | Number
CommandSeperator -> __ "and" | __ "then" | _ "." | _ ","

String -> _string {% function(d) { return [C.STRING, d[0][1]] } %}
_string -> "\"" StringDoubleContents "\""
         | "'"  StringSingleContents  "'"

StringDoubleContents -> StringDoubleCharacter:* {% function(d) { return d[0].join('') } %}
StringDoubleCharacter -> EscapeCode
                       | Character {% function(data, _, reject) {
                       if(data[0][0] === '"') return reject
                       return data[0][0]
                       } %}
                       | "\n"

StringSingleContents -> StringSingleCharacter:* {% function(d) { return d[0].join('') } %}
StringSingleCharacter -> EscapeCode
                       | Character {% function(data, _, reject) {
                       if(data[0][0] === "'") return reject
                       return data[0][0]
                       } %}
                       | "\n"
Number -> _number {% function(d) { return [C.NUMBER, d[0][0]] } %}
_number -> Int | Float

Float -> _int:? "." _intdigits {% function(d) {
  var ret = '',
      int = d[0] || [null, '0']
  ret += parseIntData(int)
  ret += d[1] + d[2]
  return parseFloat(ret)
} %}

Int -> _int {% function(d) {
  return parseIntData(d[0], true)
} %}

_int -> "-":? _intdigits
_intdigits -> [0-9]:+ {% function(d) { return d[0].join('') } %}

Plain -> _plainchar:+ {% function(data, _, reject) {
      var identifier = data[0].join('')
      if(/[0-9]/.test(identifier.charAt(0)) || C.KEYWORDS.indexOf(identifier) !== -1)
        return reject
      return [C.PLAIN, identifier]
      } %}
_plainchar -> Character {% function(data, _, reject) {
            if(data[0] && C.SPECIAL_CHARS.indexOf(data[0]) === -1)
              return data[0]
            return reject
            } %}

Character -> .
EscapeCode -> "\\" . {% function(d) { return d[1] } %}