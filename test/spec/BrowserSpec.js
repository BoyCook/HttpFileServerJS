var assert = require("assert");
var should = require('should');
var HttpServer = require('../../index.js').HttpServer;
var Browser = require("zombie");
var url = 'http://localhost:8080';

describe("Browsing", function () {
    var browser;
    var server;

    before(function (done) {
        browser = new Browser();
        server = new HttpServer({port: 8080, baseDir: '.'}).start(done);
    });

    after(function (done) {
        server.stop(done);
    });

    it("should list the test directory", function (done) {
        browser.visit(url + '/test').then(function () {
            browser.location.pathname.should.eql('/test');
//            assert.equal(browser.text('a'), 'spec');
//            browser.document.querySelectorAll('div').length.should.eql(2);
//            browser.queryAll('div').length.should.eql(2);
//            browser.queryAll('a').length.should.eql(1);
        }).then(done, done);
    });

    it("should get the file", function (done) {
        browser.visit(url + '/test/spec/BrowserSpec.js').then(function () {
            browser.location.pathname.should.eql('/test/spec/BrowserSpec.js');
        }).then(done, done);
    });
});
