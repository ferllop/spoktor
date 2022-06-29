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
exports.SpotifyHtmlParser = void 0;
function parse(playlist) {
    return PlaylistParser.parse(playlist, DataExtractor);
}
var DataExtractor = {
    extractTracks: function (rawPlaylist) {
        var _a;
        var regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm;
        return (_a = rawPlaylist.match(regex)) !== null && _a !== void 0 ? _a : [];
    },
    extractArtist: function (track) {
        var _a, _b;
        var regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractSong: function (track) {
        var _a, _b;
        var regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s;
        return (_b = (_a = track.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    },
    extractLocation: function () {
        return 'spotify';
    },
    extractPlaylistName: function (rawPlaylist) {
        var _a, _b;
        var regex = /<meta property="og:title" content="(.*?)" \/>/;
        return (_b = (_a = rawPlaylist.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    }
};
exports.SpotifyHtmlParser = __assign({ parse: parse }, DataExtractor);
