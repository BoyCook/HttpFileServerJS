/*
    A simple hierarchical XML node object tree
 */
function XML(node, value) {
    this.node = node;
    this.value = value;
    this.children = [];
}

XML.prototype.addChild = function (child) {
    this.children.push(child);
};

XML.prototype.asString = function () {
    var result = this.getStartTag();
    if (this.value == undefined) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            result += this.children[i].asString();
        }
    } else {
        result += this.value;
    }
    result += this.getEndTag();
    return result;
};

XML.prototype.getStartTag = function () {
    return '<' + this.node + '>';
};

XML.prototype.getEndTag = function () {
    return '</' + this.node + '>';
};

exports.XML = XML;
