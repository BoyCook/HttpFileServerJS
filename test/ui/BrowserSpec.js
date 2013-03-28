var casper = require('casper').create();

casper.start('http://localhost:8080/', function () {
//    this.test.assertVisible('.main-content');
//    this.test.assertNotVisible('.game-remote');
    this.test.assertExists('div', 'divs are found');
    this.test.assertExists('a', 'anchors are found');
});

casper.then(function () {
//    this.click('.show-login');
//    this.test.assertVisible('.login');
});

casper.then(function () {
//    casper.evaluate(function(username, password) {
//        document.querySelector('#username').value = username;
//        document.querySelector('#password').value = password;
//    }, 'BoyCook', 'password');
//
//    this.test.assertField('username', 'BoyCook');
//    this.test.assertField('password', 'password');
});

casper.run(function () {
    this.test.renderResults(true, 0, 'reports/TEST-UISpec.xml');
    this.test.done(5); // checks that 5 assertions have been executed
    this.test.renderResults(true);
});
