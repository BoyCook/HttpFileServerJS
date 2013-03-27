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
        "text/plain": "txt",
        "text/html": "html",
        "application/json": "json",
        "application/xml": "xml"
    }
}

HttpServer.prototype.listen = function () {
    var context = this;
    http.createServer(function (req, res) {
        var path = context.getPath(req);
        var accept = req.headers.accept.split(',');
        var contentType = context.matchKey(context.accepts, accept);
        var data = fs.getData(context.baseDir + path, context.accepts[contentType]);
        console.log('Path [%s] Accept [%s]', path, accept);
        if (Object.isDefined(data)) {
            //TODO: map response contentType properly
            if (data.type === 'dir') {
                var dirContentType = context.matchKey(context.directoryParsers, accept);
                console.log('Listing contents of dir [%s]', path);
                context.sendResponse(res, 200, dirContentType, context.parseDirectory(dirContentType, {data: data.data, path: context.addPathSuffix(path)}));
            } else if (data.type === 'file') {
                console.log('Rendering file [%s] [%s]', path, contentType);
                context.sendResponse(res, 200, contentType, data.data);
            }
        }
        res.writeHead(404);
        res.end('404 - invalid path');
    }).listen(this.port);
    console.log('Server started at [%s]', this.port);
};

HttpServer.prototype.sendResponse = function (res, code, contentType, data) {
//typeof {} === "object"
    console.log('Sending response [%s]-[%s]', code, contentType);
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
};


HttpServer.prototype.getPath = function (req) {
    return url.parse(req.url).pathname;
};

HttpServer.prototype.addPathSuffix = function (path) {
    if (path.charAt(path.length - 1) !== '/') {
        path += '/';
    }
    return path;
};

HttpServer.prototype.parseDirectory = function (contentType, data) {
    var fn = this.directoryParsers[contentType];
    return fn(data);
};

HttpServer.prototype.matchKey = function (object, accept) {
    for (var i = 0, len = accept.length; i < len; i++) {
        var key = this.getKey(object, accept[i]);
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
