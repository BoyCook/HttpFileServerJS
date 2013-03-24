/*
 A simple hierarchical XML node object tree
 */

var StringBuilder = require('string-builder').StringBuilder;

function XML(node, value) {
    this.node = node;
    this.value = value;
    this.children = [];
}

XML.prototype.addChild = function (child) {
    this.children.push(child);
};

XML.prototype.asString = function () {
    var builder = new StringBuilder();
    builder.append(this.getStartTag());
    if (this.value == undefined) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            builder.append(this.children[i].asString());
        }
    } else {
        builder.append(this.value);
    }
    builder.append(this.getEndTag());
    return builder.toString();
};

XML.prototype.getStartTag = function () {
    return '<' + this.node + '>';
};

XML.prototype.getEndTag = function () {
    return '</' + this.node + '>';
};

exports.XML = XML;
