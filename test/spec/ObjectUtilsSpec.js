Object = require('../../lib/objectutils');

describe('ObjectUtils', function () {

    it('should think defined is defined', function () {
        expect(Object.isDefined({})).toBeTruthy();
    });

    it('should not think undefined is defined', function () {
        expect(Object.isDefined(undefined)).toBeFalsy();
    });

    it('should think undefined is undefined', function () {
        expect(Object.isUndefined(undefined)).toBeTruthy();
    });
});
