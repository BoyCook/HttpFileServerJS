
function isUndefined(val) {
    return typeof val === "undefined";
}

exports.isDefined = function(val) {
    return !isUndefined(val);
};

exports.isUndefined = isUndefined;