"use strict";
exports.__esModule = true;
exports.Digest = void 0;
function isValid(candidate) {
    return candidate.artist.length > 0
        || candidate.song.length > 0;
}
function areEqual(digestA, digestB) {
    return digestA.song === digestB.song
        && digestA.artist === digestB.artist;
}
function areFuzzyEqual(digestA, digestB) {
    return fuzzyCompare(digestA.song, digestB.song)
        && fuzzyCompare(digestA.artist, digestB.artist);
}
function fuzzyCompare(needleRaw, haystackRaw) {
    var clean = function (str) { return str.replace(/(.)\1+/g, '$1').replace(/[- '()_,.]/g, '-').replaceAll('&', 'and').toLowerCase(); };
    var needle = clean(needleRaw);
    var haystack = clean(haystackRaw);
    if (needle.length > haystack.length) {
        var tmp = haystack;
        haystack = needle;
        needle = tmp;
    }
    if (needle.length === 0 || haystack.length === 0) {
        return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < needle.length; i++) {
        var nch = needle.charCodeAt(i);
        while (j < haystack.length) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}
exports.Digest = {
    isValid: isValid,
    areEqual: areEqual,
    areFuzzyEqual: areFuzzyEqual
};
