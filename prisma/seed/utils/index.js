"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrlPaths = exports.lowercaseFirstChars = exports.generateSKU = void 0;
var generateSKU = function (productName, categoryId) {
    var prefix = categoryId.substring(0, 3).toUpperCase();
    var namePart = productName.substring(0, 3).toUpperCase();
    var uniquePart = Math.floor(1000 + Math.random() * 9000);
    return "".concat(prefix, "-").concat(namePart, "-").concat(uniquePart);
};
exports.generateSKU = generateSKU;
var lowercaseFirstChars = function (data) {
    return data
        .split(" ")
        .map(function (part) { return part.charAt(0).toLowerCase() + part.slice(1); })
        .join(" ");
};
exports.lowercaseFirstChars = lowercaseFirstChars;
var generateUrlPaths = function (data) {
    return data.split(" ").join("_");
};
exports.generateUrlPaths = generateUrlPaths;
