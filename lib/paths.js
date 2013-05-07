
var Path = require('./path').Path;
var Object = require('object-utils');

function Paths(params) {
    this._paths = params.paths;
    this.paths = [];
    this.generatePathObjects();
}

Paths.prototype.generatePathObjects = function () {
    for (var i = 0, len = this._paths.length; i < len; i++) {
        var path = this._paths[i];
        if (Object.isObject(path)) {
            this.paths.push(new Path(path.path, {makeDir: path.makeDir}));
        } else {
            this.paths.push(new Path(path));
        }
    }
};

Paths.prototype.match = function (currentPath) {
    for (var i = 0, len = this.paths.length; i < len; i++) {
        var path = this.paths[i];
        var match = path.match(currentPath);
        if (match) {
            return match;
        }
    }
    return undefined;
};

Paths.prototype.isMatch = function (currentPath) {
    return this.match(currentPath);
};

exports.Paths = Paths;
