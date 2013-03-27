var should = require('should');
var fs = require('../../index.js').FSUtil;

describe('FSUtil', function () {
    describe('#isDir', function () {
        it('should be true for directory', function () {
            var result = fs.isDir('./test');
            result.should.be.true;
        });
        it('should be false for invalid path', function () {
            var result = fs.isDir('./XXXXXXX');
            result.should.be.false;
        });
        it('should be false for file', function () {
            var result = fs.isDir('./test/spec/FSUtilSpec.js');
            result.should.be.false;
        });
    });

    describe('#getDir', function () {
        it('should return result for valid directory', function () {
            var result = fs.getDir('./test');
            should.exist(result);
        });
        it('should not return result for invalid directory', function () {
            var result = fs.getDir('./XXXXXXX');
            should.not.exist(result);
        });
        it('should not return result for a file', function () {
            var result = fs.getDir('./test/spec/FSUtilSpec.js');
            should.not.exist(result);
        });
    });

    describe('#getFile', function () {
        it('should return result for valid file', function () {
            var result = fs.getFile('./test/spec/FSUtilSpec.js');
            should.exist(result);
        });
        it('should not return result for invalid file', function () {
            var result = fs.getFile('./XXXXXXX');
            should.not.exist(result);
        });
        it('should not return result for a directory', function () {
            var result = fs.getFile('./test');
            should.not.exist(result);
        });
    });

    describe('#getData', function () {
        it('should return result for a valid directory', function () {
            var result = fs.getData('./test');
            should.exist(result);
        });
        it('should return result for valid file', function () {
            var result = fs.getData('./test/spec/FSUtilSpec.js');
            should.exist(result);
        });
        it('should return result for valid file with extension', function () {
            var result = fs.getData('./test/spec/FSUtilSpec', 'js');
            should.exist(result);
        });
    });
});
