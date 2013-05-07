var should = require('should');
var Path = require('../../index.js').Path;

describe('Path', function () {

    var path;
    var pathWithParam;

    before(function () {
        path = new Path('/users');
        pathWithParam = new Path('/users/:id');
    });

    describe('#match', function () {
        it('should match path', function () {
            should.exist(path.match('/users'));
        });

        it('should not match invalid path', function () {
            should.not.exist(path.match('/user'));
        });

        it('should match path with parameter ok', function () {
            should.exist(pathWithParam.match('/users/boycook'));
        });

        it('should not match invalid path with param', function () {
            should.not.exist(pathWithParam.match('/user/boycook'));
        });
    });
});
