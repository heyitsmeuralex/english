// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  
var C = require('./constants.js')

var parseIntData = function(int, doParseInt) {
  var ret = ''
  if(int[0]) ret += '-'
  ret += int[1]
  return doParseInt ? parseInt(ret) : ret
}

var grammar = {
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "Program$ebnf$1$subexpression$1", "symbols": ["_program", "_"]},
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Program$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Program", "symbols": ["_", "Program$ebnf$1"], "postprocess": function(d) { return d[1] ? d[1][0] : [] }},
    {"name": "_program$ebnf$1", "symbols": ["CommandSeperator"]},
    {"name": "_program$ebnf$1", "symbols": ["CommandSeperator", "_program$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_program", "symbols": ["Command", "_program$ebnf$1", "_", "_program"], "postprocess": function(d, _, reject) { if(d[0][0][0] !== C.PLAIN) return reject; return [d[0], ...d[d.length - 1]] }},
    {"name": "_program$ebnf$2", "symbols": ["CommandSeperator"]},
    {"name": "_program$ebnf$2", "symbols": ["CommandSeperator", "_program$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_program", "symbols": ["Command", "_program$ebnf$2"], "postprocess": function(d, _, reject) { if(d[0][0][0] !== C.PLAIN) return reject; return [d[0]] }},
    {"name": "_program", "symbols": ["Command"], "postprocess": function(d, _, reject) { if(d[0][0][0] !== C.PLAIN) return reject; }},
    {"name": "Command", "symbols": ["CommandPart", "__", "Command"], "postprocess": function(d) { return [d[0][0], ...d[d.length - 1]] }},
    {"name": "Command", "symbols": ["CommandPart"], "postprocess": function(d) { return d[0] }},
    {"name": "CommandPart", "symbols": ["Plain"]},
    {"name": "CommandPart", "symbols": ["String"]},
    {"name": "CommandPart", "symbols": ["Number"]},
    {"name": "CommandSeperator$string$1", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CommandSeperator", "symbols": ["__", "CommandSeperator$string$1"]},
    {"name": "CommandSeperator$string$2", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CommandSeperator", "symbols": ["__", "CommandSeperator$string$2"]},
    {"name": "CommandSeperator", "symbols": ["_", {"literal":"."}]},
    {"name": "CommandSeperator", "symbols": ["_", {"literal":","}]},
    {"name": "String", "symbols": ["_string"], "postprocess": function(d) { return [C.STRING, d[0][1]] }},
    {"name": "_string", "symbols": [{"literal":"\""}, "StringDoubleContents", {"literal":"\""}]},
    {"name": "_string", "symbols": [{"literal":"'"}, "StringSingleContents", {"literal":"'"}]},
    {"name": "StringDoubleContents$ebnf$1", "symbols": []},
    {"name": "StringDoubleContents$ebnf$1", "symbols": ["StringDoubleCharacter", "StringDoubleContents$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "StringDoubleContents", "symbols": ["StringDoubleContents$ebnf$1"], "postprocess": function(d) { return d[0].join('') }},
    {"name": "StringDoubleCharacter", "symbols": ["EscapeCode"]},
    {"name": "StringDoubleCharacter", "symbols": ["Character"], "postprocess":  function(data, _, reject) {
        if(data[0][0] === '"') return reject
        return data[0][0]
        } },
    {"name": "StringDoubleCharacter", "symbols": [{"literal":"\n"}]},
    {"name": "StringSingleContents$ebnf$1", "symbols": []},
    {"name": "StringSingleContents$ebnf$1", "symbols": ["StringSingleCharacter", "StringSingleContents$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "StringSingleContents", "symbols": ["StringSingleContents$ebnf$1"], "postprocess": function(d) { return d[0].join('') }},
    {"name": "StringSingleCharacter", "symbols": ["EscapeCode"]},
    {"name": "StringSingleCharacter", "symbols": ["Character"], "postprocess":  function(data, _, reject) {
        if(data[0][0] === "'") return reject
        return data[0][0]
        } },
    {"name": "StringSingleCharacter", "symbols": [{"literal":"\n"}]},
    {"name": "Number", "symbols": ["_number"], "postprocess": function(d) { return [C.NUMBER, d[0][0]] }},
    {"name": "_number", "symbols": ["Int"]},
    {"name": "_number", "symbols": ["Float"]},
    {"name": "Float$ebnf$1", "symbols": ["_int"], "postprocess": id},
    {"name": "Float$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Float", "symbols": ["Float$ebnf$1", {"literal":"."}, "_intdigits"], "postprocess":  function(d) {
          var ret = '',
              int = d[0] || [null, '0']
          ret += parseIntData(int)
          ret += d[1] + d[2]
          return parseFloat(ret)
        } },
    {"name": "Int", "symbols": ["_int"], "postprocess":  function(d) {
          return parseIntData(d[0], true)
        } },
    {"name": "_int$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "_int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_int", "symbols": ["_int$ebnf$1", "_intdigits"]},
    {"name": "_intdigits$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "_intdigits$ebnf$1", "symbols": [/[0-9]/, "_intdigits$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_intdigits", "symbols": ["_intdigits$ebnf$1"], "postprocess": function(d) { return d[0].join('') }},
    {"name": "Plain$ebnf$1", "symbols": ["_plainchar"]},
    {"name": "Plain$ebnf$1", "symbols": ["_plainchar", "Plain$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Plain", "symbols": ["Plain$ebnf$1"], "postprocess":  function(data, _, reject) {
        var identifier = data[0].join('')
        if(/[0-9]/.test(identifier.charAt(0)) || C.KEYWORDS.indexOf(identifier) !== -1)
          return reject
        return [C.PLAIN, identifier]
        } },
    {"name": "_plainchar", "symbols": ["Character"], "postprocess":  function(data, _, reject) {
        if(data[0] && C.SPECIAL_CHARS.indexOf(data[0]) === -1)
          return data[0]
        return reject
        } },
    {"name": "Character", "symbols": [/./]},
    {"name": "EscapeCode", "symbols": [{"literal":"\\"}, /./], "postprocess": function(d) { return d[1] }}
]
  , ParserStart: "Program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
