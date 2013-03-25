var XML = require('./xmlobject.js').XML;

function Parser() {
    //Not using prototype, don't want to store state
}

Parser.resourceJSON = function (list) {
    return JSON.stringify(Parser.asJSON('resources', list));
};

Parser.resourceXML = function (list) {
    return Parser.asXML('resources', 'resource', list);
};

Parser.resourceHTML = function (list) {
    var parent = new XML('div');
    for (var i = 0, len = list.length; i < len; i++) {
        var a = new XML('a', list[i]);
        a.addAttribute({key: 'href', value: list[i] });
        parent.addChild(new XML('div').addChild(a));
    }
    return parent.asString();
};

Parser.asJSON = function (items, list) {
    var result = {};
    result[items] = [];
    for (var i = 0, len = list.length; i < len; i++) {
        result[items].push(list[i]);
    }
    return result;
};

Parser.asXML = function (items, item, list) {
    var parent = new XML(items);
    for (var i = 0, len = list.length; i < len; i++) {
        parent.addChild(new XML(item, list[i]));
    }
    return parent.asString();
};

exports.Parser = Parser;
