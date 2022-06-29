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
exports.SpotifyTextParser = void 0;
function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor);
}
var dataExtractor = {
    extractTracks: function (rawPlaylist) {
        return TrackExtractor.extractFrom(rawPlaylist);
    },
    extractArtist: function (track) {
        return ArtistExtractor.extractFrom(track);
    },
    extractSong: function (track) {
        var _a;
        return (_a = track.split('\n')[2]) !== null && _a !== void 0 ? _a : '';
    },
    extractLocation: function () {
        return 'spotify';
    },
    extractPlaylistName: function (rawPlaylist) {
        var _a, _b;
        var arr = rawPlaylist.split('\n');
        var hashtagIndex = arr.findIndex(function (line) {
            var cleaned = line.replace(/\s/g, '');
            return cleaned === '#';
        });
        return (_b = (_a = arr[hashtagIndex - 5]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    }
};
var TrackExtractor = {
    extractFrom: function (playlist) {
        var tracks = this.separateTracks(playlist.replace(/\r/g, ''));
        return this.cleanTracks(tracks);
    },
    cleanTracks: function (tracks) {
        return tracks.map(function (track) { return track.replace(/\r/g, '').replace(/^\n/, ''); }).filter(function (track) { return track.length > 0; });
    },
    separateTracks: function (playlist) {
        var headless = this.removeHead(playlist);
        var tailess = this.removeTail(headless);
        return tailess.split(/(?<=\d+:\d+)[\r\n]/);
    },
    removeHead: function (playlist) {
        var arr = playlist.split('\n');
        var index = arr.findIndex(function (line) {
            var cleaned = line.replace(/\s/g, '');
            return cleaned === '#';
        });
        return arr.slice(index + 5).join('\n');
    },
    removeTail: function (playlist) {
        var arr = playlist.split('\n').reverse();
        var tailIndex = arr.findIndex(function (_, index) {
            var _a;
            return /^\d+:\d+$/.test((_a = arr[index]) !== null && _a !== void 0 ? _a : '');
        });
        return arr.slice(tailIndex).reverse().join('\n');
    }
};
var ArtistExtractor = {
    extractFrom: function (track) {
        var artist = this.extractArtist(track);
        return this.cleanArtist(artist);
    },
    extractArtist: function (track) {
        var headerless = this.removeHead(track, 3);
        var tailess = this.removeTail(headerless, 3);
        return this.removeAlbum(tailess);
    },
    removeHead: function (track, lines) {
        return track.split('\n').slice(lines).join('\n');
    },
    removeTail: function (track, lines) {
        return track.split('\n').reverse().slice(lines).reverse().join('\n');
    },
    removeAlbum: function (track) {
        var _a;
        var reversed = track.split('\n').reverse();
        var albumURLPosition = reversed.findIndex(function (line) { return line.includes('<http'); });
        var isNextLineAlbumName = !((_a = reversed[albumURLPosition + 1]) === null || _a === void 0 ? void 0 : _a.includes('<http'));
        var albumless = reversed.slice(albumURLPosition + (isNextLineAlbumName ? 2 : 1));
        return albumless.reverse().join('\n');
    },
    cleanArtist: function (track) {
        return track.split(',')
            .map(function (line) { return line.replace(/<.*?>/g, ''); })
            .filter(function (line) { return line.length > 0; })
            .map(function (line) { return line.trim()
            .replace(/^,/, '')
            .replace(/,$/, '')
            .replace(/(?<=\w)\n(?=\w)/g, ' ')
            .trim(); })
            .join(', ');
    }
};
exports.SpotifyTextParser = __assign({ parse: parse }, dataExtractor);
