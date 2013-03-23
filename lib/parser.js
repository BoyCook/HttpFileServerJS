
function Parser() {}

Parser.resourceJSON = function(list) {
    return Parser.asJSON('resources', list);
};

Parser.asJSON = function(items, list) {
    var result = {};
    result[items] = [];
    for (var i=0, len=list.length; i<len; i++) {
        result[items].push(list[i]);
    }
    return result;
};

Parser.resourceXML = function(list) {
    console.log('Parsing XML [%s]', list);
    return Parser.asXML('resources', 'resource', list);
};

Parser.asXML = function(items, item, list) {
    var result = '<' + items + '>';
    for (var i=0, len=list.length; i<len; i++) {
        result += '<' + item + '>' + list[i] + '</' + item + '>';
    }
    result += '</' + items + '>';
    return result;
};

exports.Parser = Parser;
