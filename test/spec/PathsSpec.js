var should = require('should');
var Path = require('../../index.js').Path;
var Paths = require('../../index.js').Paths;

describe('Paths', function () {
    var paths;

    before(function () {
        var _paths = ['/users', {path: '/users/:id', params: {makeDir: true}}];
        paths = new Paths({paths: _paths});
    });

    describe('#match', function () {
        it('should match path', function () {
            var result = paths.match('/users');
            result.should.be.true;
        });

        it('should not match invalid path', function () {
            var result = paths.match('/user');
            result.should.be.false;
        });

        it('should match path with parameter ok', function () {
            var result = paths.match('/users/boycook');
            result.should.be.true;
        });

        it('should not match invalid path with param', function () {
            var result = paths.match('/user/boycook');
            result.should.be.false;
        });
    });
});
