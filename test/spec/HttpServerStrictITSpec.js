var should = require('should');
var request = require('request');
var url = 'http://localhost:8080';
var HttpServer = require('../../index.js').HttpServer;
var expected = {
    dir: {
        json: {"resources": ["spec"]},
        xml: '<resources><resource>spec</resource></resources>',
        html: '<div><div><a href="/test/spec">spec</a></div></div>'
    },
    file: {
        "data": "123"
    }
};
var server;

describe('HttpServer', function () {
    before(function (done) {
        server = new HttpServer({
            port: 8080,
            baseDir: '.',
            strictRoutes: true,
            routes: [
                '/test', '/test/spec/HttpServerStrictITSpec.js'
            ]
        }).start(done);
    });

    after(function (done) {
        server.stop(done);
    });

    describe('#getDir', function () {
        it('should list strict directory route ok',
            function (done) {
                request(url + '/test', function (error, response, body) {
                    response.statusCode.should.eql(200);
                    body.should.eql(expected.dir.html);
                    done();
                });
        });
        it('should not list non-strict directory route ok',
            function (done) {
                request(url + '/test/spec', function (error, response, body) {
                    response.statusCode.should.eql(404);
//                    body.should.eql(expected.dir.html);
                    done();
                });
        });
    });

    describe('#getFile', function () {
        it('should get strict file ok', function (done) {
            request(url + '/test/spec/HttpServerStrictITSpec.js',
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    //TODO: finish body assertions
                    done();
                });
        });

        it('should not get non-strict file ok', function (done) {
            request(url + '/test/spec/HttpServerITSpec.js',
                function (error, response, body) {
                    response.statusCode.should.eql(404);
                    //TODO: finish body assertions
                    done();
                });
        });
    });

    describe.skip('#createFile', function () {
        it('should create file ok', function (done) {
            request.put({
                    url: url + '/test/newfile',
                    headers: {'content-type': 'application/json', dataType: 'json'},
                    body: JSON.stringify(expected.file)
                },
                function (error, response, body) {
                    //TODO: assert dir and file on filesystem
                    body = JSON.parse(body);
                    response.statusCode.should.eql(201);
                    body.should.eql(expected.file);
                    done();
                });
        });
    });

    describe.skip('#deleteFile', function () {
        it('should create file ok', function (done) {
            request.del(url + '/test/newfile',
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });
    });
});
