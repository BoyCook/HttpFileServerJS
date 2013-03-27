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
});
