var http = require('http');
var url = require('url');
var fs = require('./fsutil').FSUtil;
var Parser = require('./parser').Parser;
var Object = require('./objectutils');

function HttpServer(config) {
    this.port = config.port;
    this.path = config.path;
    this.contentTypes = {
        "application/xml": Parser.resourceXML,
        "application/json": Parser.resourceJSON
    };
}

HttpServer.prototype.listen = function () {
    var context = this;
    http.createServer(function (req, res) {
        var path = url.parse(req.url).pathname;
        var contentType = context.getContentType(req.headers.accept.split(','));
        var data = fs.getData('.' + path);

        if (Object.isDefined(data)) {
            if (data.type === 'dir') {
                console.log('Listing contents of dir [%s]', path);
                res.writeHead(200, {'Content-Type': contentType});
                res.end(context.matchAccept(contentType, data.data));
            } else if (data.type === 'file') {
                console.log('Rendering file [%s]', path);
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data.data);
            }
        }
        res.writeHead(404);
        res.end('404 - invalid path');
    }).listen(this.port);
    console.log('Server started at [%s]', this.port);
};

HttpServer.prototype.getContentType = function (accept) {
    var result = undefined;
    for (var i = 0, len = accept.length; i < len; i++) {
        var temp = this.checkAccept(accept[i]);
        if (temp !== undefined) {
            result = temp;
        }
    }
    return result;
};

HttpServer.prototype.checkAccept = function (accept) {
    for (var key in this.contentTypes) {
        if (accept.indexOf(key) === 0) {
            return key;
        }
    }
    return undefined;
};

HttpServer.prototype.matchAccept = function (contentType, data) {
    var fn = this.contentTypes[contentType];
    return fn(data);
};

exports.HttpServer = HttpServer;
