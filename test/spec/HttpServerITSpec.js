var should = require('should');
var request = require('request');
var url = 'http://localhost:8080';
var HttpServer = require('../../index.js').HttpServer;
var expected = {
    dir: {
        json: {"resources":["spec","ui"]},
        xml: '<resources><resource>spec</resource><resource>ui</resource></resources>',
        html: '<div><div><a href="/test/spec">spec</a></div><div><a href="/test/ui">ui</a></div></div>'
    }
};

describe('HttpServer', function () {
    var service;

    before(function(done) {
        service = new HttpServer({port: 8080, baseDir: '.'}).listen();
        done();
    });

    describe('#getDir', function () {
        it('should list directory contents as HTML by default', function (done) {
            request(url + '/test', function (error, response, body) {
                response.statusCode.should.eql(200);
                body.should.eql(expected.dir.html);
                done();
            });
        });

        it('should list directory contents as HTML ok', function (done) {
            request({url: url + '/test', headers: { Accept: 'text/html'}}, function (error, response, body) {
                response.statusCode.should.eql(200);
                body.should.eql(expected.dir.html);
                done();
            });
        });

        it('should list directory contents as JSON ok', function (done) {
            request({url: url + '/test', headers: { Accept: 'application/json'}}, function (error, response, body) {
                response.statusCode.should.eql(200);
                var json = JSON.parse(body);
                json.should.eql(expected.dir.json);
                done();
            });
        });

        it('should list directory contents as XML ok', function (done) {
            request({url: url + '/test', headers: { Accept: 'application/xml'}}, function (error, response, body) {
                response.statusCode.should.eql(200);
                body.should.eql(expected.dir.xml);
                done();
            });
        });
    });

    describe('#getFile', function () {
        it('should get file ok', function (done) {
            request(url + '/test/spec/HttpServerITSpec.js', function (error, response, body) {
                response.statusCode.should.eql(200);
//                body = JSON.parse(body);
                //TODO: finish assertions
                done();
            });
        });
    });
});
