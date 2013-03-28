var Browser = require("zombie");
var assert = require("assert");

describe("visit", function() {
    before(function(done) {
        this.browser = new Browser();
        this.browser
            .visit("/test")
            .then(done, done);
    });

    it("should list the test directory", function() {
        assert.equal(this.browser.location.pathname, "/test");
    });
});
