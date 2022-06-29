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
exports.ArtistTitleByLineParser = void 0;
function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor);
}
var lineSeparator = '\n';
var artistSongSeparator = ' , ';
var multipleArtistsSeparator = ';';
var dataExtractor = {
    extractTracks: function (rawPlaylist) {
        return rawPlaylist.split(lineSeparator).slice(1);
    },
    extractArtist: function (track) {
        var _a;
        return ((_a = track.split(artistSongSeparator)[0]) !== null && _a !== void 0 ? _a : '')
            .replaceAll(multipleArtistsSeparator, ',');
    },
    extractLocation: function () {
        return 'unknown';
    },
    extractSong: function (track) {
        var _a;
        return (_a = track.split(artistSongSeparator)[1]) !== null && _a !== void 0 ? _a : '';
    },
    extractPlaylistName: function () {
        return '';
    }
};
exports.ArtistTitleByLineParser = __assign({ parse: parse }, dataExtractor);
