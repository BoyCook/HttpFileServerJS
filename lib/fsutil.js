var fs = require('fs');

function FSUtil() {
    //Not using prototype, don't want to store state
}

FSUtil.isDir = function (path) {
    if (fs.existsSync(path)) {
        return fs.statSync(path).isDirectory();
    }
    return false;
};

FSUtil.getDir = function (path) {
    if (FSUtil.isDir(path)) {
        return fs.readdirSync(path);
    }
    return undefined;
};

FSUtil.getFile = function (path) {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path);
    }
    return undefined;
};

FSUtil.getData = function (path) {
    var data = undefined;
    if (FSUtil.isDir(path)) {
        data = {};
        data.data = fs.readdirSync(path);
        data.type = 'dir';
    } else if (fs.existsSync(path)) {
        data = {};
        data.data = fs.readFileSync(path);
        data.type = 'file';
    } else if (fs.existsSync(path + '.xml')) {
        data = {};
        data.data = fs.readFileSync(path + '.xml');
        data.type = 'file';
    }
    return data;
};

exports.FSUtil = FSUtil;
