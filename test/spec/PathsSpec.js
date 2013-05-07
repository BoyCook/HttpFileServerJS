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
            should.exist(paths.match('/users'));
        });

        it('should not match invalid path', function () {
            should.not.exist(paths.match('/user'));
        });

        it('should match path with parameter ok', function () {
            should.exist(paths.match('/users/boycook'));
        });

        it('should not match invalid path with param', function () {
            should.not.exist(paths.match('/user/boycook'));
        });
    });
});
