var http = require('http');
var fs = require('fs');
var url = require('url');

function HttpServer(config) {	
	this.port = config.port;
	this.contentTypes = {
	    "application/xml": this.resourceXML,
	    "application/json": this.resourceJSON
	};
}

HttpServer.prototype.listen = function() {
	var context = this;
	http.createServer(function (req, res) {
	 	var path = url.parse(req.url).pathname;

	//	console.log('Headers Accept [%s]', JSON.stringify(req.headers.accept));
	    var contentType = context.getContentType(req.headers.accept.split(','));
	    var dir = context.getDir('.' + path);
	    if (dir != undefined) {
	        res.writeHead(200, {'Content-Type': contentType});
	        res.end(context.matchAccept(contentType, dir));
	        return;
	    }
		var file = context.getFile('.' + path);
	    if (file != undefined) {
	        res.writeHead(200, {'Content-Type': contentType});
	        res.end(file);
	        return;
	    }
	    var xml = context.getFile('.' + path + '.xml');
	    if (xml != undefined) {
		  	res.writeHead(200, {'Content-Type': contentType});
	  		res.end(xml);
	        return;
	    }
	    res.writeHead(404);
	    res.end();
	    return;
	}).listen(this.port);
	console.log('Server started at [%s]', this.port);
};

HttpServer.prototype.sendResponse = function(req, res, code, data) {
    res.writeHead(code, {'Content-Type': 'application/xml'});
    res.end(data);
};

HttpServer.prototype.getDir = function(path) {
    console.log('Checking for dir [%s]', path);
    if (fs.existsSync(path)) {
        stats = fs.statSync(path);
        if (stats.isDirectory()) {
            return fs.readdirSync(path)
        }
    }
    return undefined;
};

HttpServer.prototype.getFile = function(path) {
    console.log('Checking for file [%s]', path);
	if (fs.existsSync(path)) {
        return fs.readFileSync(path);
	}
	return undefined;
};

HttpServer.prototype.getContentType = function(accept) {
    var result = undefined;
    for (var i= 0, len=accept.length; i<len; i++) {
        var temp = this.checkAccept(accept[i]);
        if (temp != undefined) {
            result = temp;
        }
    }
    return result;
};

HttpServer.prototype.checkAccept = function(accept) {
    for (var key in this.contentTypes) {
        if (accept.indexOf(key) == 0) {
            return key;
        }
    }
    return undefined;
};

HttpServer.prototype.matchAccept = function(contentType, data) {
    var fn = this.contentTypes[contentType];
    return fn.apply(this, data);
};

HttpServer.prototype.resourceJSON = function(list) {
    return this.asJSON('resources', list);
};

HttpServer.prototype.asJSON = function(items, list) {
    var result = {};
    result[items] = [];
    for (var i=0, len=list.length; i<len; i++) {
        result[items].push(list[i]);
    }
    return result;
};

HttpServer.prototype.resourceXML = function(list) {
    console.log('Parsing XML [%s]', list);
    return this.asXML('resources', 'resource', list);
};

HttpServer.prototype.asXML = function(items, item, list) {
	var result = '<' + items + '>';
	for (var i=0, len=list.length; i<len; i++) {
		result += '<' + item + '>' + list[i] + '</' + item + '>';
	}
	result += '</' + items + '>';
	return result;
};

exports.HttpServer = HttpServer;
