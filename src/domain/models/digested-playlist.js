"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DigestedPlaylist = void 0;
var digest_1 = require("./digest");
var EMPTY = [];
function digestsPresentIn(digests, comparator) {
    return function (checkingDigest) { return digests.some(function (digest) { return comparator(digest, checkingDigest); }); };
}
function getNeedlesFromHaystack(needles, haystack, comparator) {
    return haystack.filter(digestsPresentIn(needles, comparator));
}
function insertCoincidencesIntoDigests(needles, receivingDigests, comparator) {
    return receivingDigests.map(function (receivingDigest) { return (__assign(__assign({}, receivingDigest), { coincidences: recordPosition(needles).filter(function (needle) { return comparator(receivingDigest, needle); }) })); });
}
function intersect(needles, haystack) {
    var comparator = digest_1.Digest.areFuzzyEqual;
    var coincidences = exports.DigestedPlaylist.getNeedlesFromHaystack(needles, haystack, comparator);
    return exports.DigestedPlaylist.insertCoincidencesIntoDigests(coincidences, needles, comparator);
}
function recordPosition(digests) {
    return digests.map(function (digest, index) { return (__assign(__assign({}, digest), { position: index })); });
}
exports.DigestedPlaylist = {
    EMPTY: EMPTY,
    getNeedlesFromHaystack: getNeedlesFromHaystack,
    insertCoincidencesIntoDigests: insertCoincidencesIntoDigests,
    recordPosition: recordPosition,
    intersect: intersect
};
