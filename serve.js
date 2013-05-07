var HttpServer = require('./lib/server').HttpServer;
new HttpServer({
    port: 8080,
    baseDir: '.',
    verbose: true,
    paths: [
        { path: '/test/:id', params: {makeDir: true}}
    ]
}).start();
