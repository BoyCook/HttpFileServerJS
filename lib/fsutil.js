var fs = require('fs');
var Object = require('object-utils');

function FSUtil() {
    //Not using prototype, don't want to store state
}

FSUtil.isDir = function (path) {
    if (fs.existsSync(path)) {
        return fs.statSync(path).isDirectory();
    }
    return false;
};

FSUtil.isNotDir = function (path) {
    return !FSUtil.isDir(path);
};

FSUtil.getDir = function (path) {
    if (FSUtil.isDir(path)) {
        return fs.readdirSync(path);
    }
    return undefined;
};

FSUtil.getFile = function (path) {
    if (fs.existsSync(path) && FSUtil.isNotDir(path)) {
        return fs.readFileSync(path);
    }
    return undefined;
};

FSUtil.delete = function (path) {
    fs.unlinkSync(path)
};

FSUtil.save = function (fileName, data) {
    fs.writeFileSync(fileName, data);
};

FSUtil.getData = function (path, extension) {
    var data = undefined;
    if (FSUtil.isDir(path)) {
        data = {};
        data.data = fs.readdirSync(path);
        data.type = 'dir';
    } else if (Object.isDefined(extension) && fs.existsSync(path + '.' + extension)) {
        data = {};
        data.data = fs.readFileSync(path + '.' + extension);
        data.type = 'file';
        data.extension = extension;
    } else if (fs.existsSync(path)) {
        data = {};
        data.data = fs.readFileSync(path);
        data.type = 'file';
    }
    return data;
};

exports.FSUtil = FSUtil;
