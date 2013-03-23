# Description
A simple file based HTTP server in node.js. It will serve up content from the filesystem based upon the URL path provided.

# Usage

    var server = new HttpServer({port: 8080});
    server.listen();

## Tests

    jasmine-node test/spec --junitreport --forceexit
