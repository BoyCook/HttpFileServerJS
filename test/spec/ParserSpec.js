var should = require('should');
var Parser = require('../../lib/parser').Parser;

describe('Parser', function () {
    describe('#asXML', function () {
        it('should list as XML properly', function () {
            var xml = Parser.asXML('items', 'item', ['1', '2', '3']);
            xml.should.eql('<items><item>1</item><item>2</item><item>3</item></items>');
        });
    });
    describe('#asJSON', function () {
        it('should list as JSON properly', function () {
            var json = Parser.asJSON('item', ['1', '2', '3']);
            json.should.eql({ "item": ['1', '2', '3'] });
        });
    });
    describe('#resourceJSON', function () {
        it('should list as JSON properly', function () {
            var json = Parser.resourceJSON({data: ['1', '2', '3']});
            json.should.eql(JSON.stringify({ "resources": ['1', '2', '3'] }));
        });
    });
    describe('#resourceXML', function () {
        it('should list as XML properly', function () {
            var xml = Parser.resourceXML({data: ['1', '2', '3']});
            xml.should.eql('<resources><resource>1</resource><resource>2</resource><resource>3</resource></resources>');
        });
    });
    describe('#resourceHTML', function () {
        it('should list as HTML properly', function () {
            var expected = '<div><div><a href="1">1</a></div><div><a href="2">2</a></div><div><a href="3">3</a></div></div>';
            var html = Parser.resourceHTML({data: ['1', '2', '3']});
            html.should.eql(expected);
        });
    });
});
