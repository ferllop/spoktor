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
exports.TraktorXmlParser = void 0;
function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor);
}
function renderFullFilePathFrom(rawTrack) {
    var volume = dataExtractor.extractVolume(rawTrack);
    var directoryPath = dataExtractor.extractDir(rawTrack);
    var filename = dataExtractor.extractFilename(rawTrack);
    return (volume + directoryPath + filename).replaceAll('/:', '\\');
}
var dataExtractor = {
    extractTracks: function (collection) {
        var _a;
        var regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm;
        return (_a = collection.match(regex)) !== null && _a !== void 0 ? _a : [];
    },
    extractArtist: function (track) {
        var _a, _b;
        var regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractSong: function (track) {
        var _a, _b, _c, _d;
        /* We don't capture the title directly to be sure that we don't
           capture the TITLE existing into the album field */
        var entryRegex = /<ENTRY(.*?)>/s;
        var entry = (_b = (_a = track.match(entryRegex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
        var titleRegex = /TITLE="(.*?)"/s;
        return (_d = (_c = entry.match(titleRegex)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : '';
    },
    extractLocation: function (track) {
        return renderFullFilePathFrom(track);
    },
    extractDir: function (track) {
        var _a, _b;
        var regex = /<LOCATION.*?DIR="(.*?)"/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractFilename: function (track) {
        var _a, _b;
        var regex = /<LOCATION.*?FILE="(.*?)"/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractVolume: function (track) {
        var _a, _b;
        var regex = /<LOCATION.*?VOLUME="(.*?)"/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractPlaylistName: function () {
        return '';
    }
};
exports.TraktorXmlParser = __assign({ parse: parse }, dataExtractor);
