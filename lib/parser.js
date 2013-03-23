
var XML = require('./xmlobject.js').XML;

function Parser() {}

Parser.resourceJSON = function(list) {
    return Parser.asJSON('resources', list);
};

Parser.resourceXML = function(list) {
    return Parser.asXML('resources', 'resource', list);
};

Parser.asJSON = function(items, list) {
    var result = {};
    result[items] = [];
    for (var i=0, len=list.length; i<len; i++) {
        result[items].push(list[i]);
    }
    return result;
};

Parser.asXML = function(items, item, list) {
    var parent = new XML(items);
    for (var i=0, len=list.length; i<len; i++) {
        parent.addChild(new XML(item, list[i]));
    }
    return parent.asString();
};

exports.Parser = Parser;
