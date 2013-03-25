var http = require('http');
var url = require('url');
var fs = require('./fsutil').FSUtil;
var Parser = require('./parser').Parser;
var Object = require('object-utils');

function HttpServer(config) {
    this.port = config.port;
    this.baseDir = config.baseDir;
    this.defaultType = "text/plain";
    //Note - these are all in priority order
    this.directoryParsers = {
        "text/html": Parser.resourceHTML,
        "application/xml": Parser.resourceXML,
        "application/json": Parser.resourceJSON
    };
    this.accepts = {
        "text/html": "html",
        "text/plain": "txt",
        "application/json": "json",
        "application/xml": "xml"
    }
}

HttpServer.prototype.listen = function () {
    var context = this;
    http.createServer(function (req, res) {
        var path = url.parse(req.url).pathname;
        var accept = req.headers.accept.split(',');
        var extension = context.getExtension(accept);
        var contentType = context.getContentType(accept);
        var data = fs.getData(context.baseDir + path, context.accepts[extension]);
        if (Object.isDefined(data)) {
            //TODO: map response contentType properly
            if (data.type === 'dir') {
                console.log('Listing contents of dir [%s]', path);
                context.sendResponse(res, 200, contentType, context.parseDirectory(contentType, data.data))
            } else if (data.type === 'file') {
                console.log('Rendering file [%s] [%s]', path, extension);
                context.sendResponse(res, 200, contentType, data.data)
            }
        }
        res.writeHead(404);
        res.end('404 - invalid path');
    }).listen(this.port);
    console.log('Server started at [%s]', this.port);
};

HttpServer.prototype.sendResponse = function(res, code, contentType, data) {
//typeof {} === "object"
    console.log('Sending response [%s]-[%s]', code, contentType);
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
};

HttpServer.prototype.parseDirectory = function (contentType, data) {
    var fn = this.directoryParsers[contentType];
    return fn(data);
};

HttpServer.prototype.getAccept = function (req) {
    //This gets the 1st accept header value or defaults
    var accepts = req.headers.accept.split(',');
    if (accepts.length > 0) {
        var accept = accepts[0];
        var index = accept.indexOf(';');
        if (index > -1) {
            accept = accept.substring(0, index);
        }
        return accept;
    }
    return this.defaultType;
};

HttpServer.prototype.getContentType = function (accept) {
    for (var i = 0, len = accept.length; i < len; i++) {
        var key = this.getKey(this.directoryParsers, accept[i]);
        if (key !== undefined) {
            //Stopping at 1st match
            return key;
        }
    }
    return this.defaultType;
};

HttpServer.prototype.getExtension = function (accept) {
    for (var i = 0, len = accept.length; i < len; i++) {
        var object = accept[i];
        var key = this.getKey(this.accepts, object);
        if (Object.isDefined(key)) {
            //Stopping at 1st match
            return key;
        }
    }
    return this.defaultType;
};

HttpServer.prototype.getKey = function (object, value) {
    //Not using hasOwnProperty as doing loose check
    for (var key in object) {
        if (value.indexOf(key) === 0) {
            //Stopping at 1st match
            return key;
        }
    }
    return undefined;
};

exports.HttpServer = HttpServer;
