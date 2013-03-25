# Description
A simple file based HTTP server in node.js. It will serve up content from the filesystem based upon the URL path provided
and the content type in 'Accept' header.

# How it works
It's quite simple, exactly as you'd expect an HTTP server like apache or nginx to work. The service uses the URL path
and the 'Accept' header to work out what to serve back. If the path is a directory it will serve back the contents,
if it's a file then it will serve the file back. If nothing is found a 404 is issued. The logic the server uses is:

* Check for directory 'path'
* Check for file 'path.{accept}'
* Check for file 'path'

# Examples

This will list contents of directory `cars`

    GET /cars

This will serve the file '/cars/bmw.html'

    GET /cars/bmw
    Accept text/html

This will serve the file '/cars/bmw.html'

    GET /cars/bmw.html

# Usage

    var server = new HttpServer({port: 8080, baseDir: '.'});
    server.listen();

## Tests

    jasmine-node test/spec --junitreport --forceexit
