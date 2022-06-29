"use strict";
exports.__esModule = true;
exports.selectParserFor = void 0;
var spotify_text_parser_1 = require("./spotify-text-parser");
var spotify_html_parser_class_1 = require("./spotify-html-parser-class");
var empty_playlist_error_1 = require("../errors/empty-playlist-error");
var invalid_playlist_error_1 = require("../errors/invalid-playlist-error");
var traktor_xml_parser_1 = require("./traktor-xml-parser");
var virtualdj_xml_parser_1 = require("./virtualdj-xml-parser");
var artist_title_by_line_text_parser_1 = require("./artist-title-by-line-text-parser");
var tune_my_music_csv_parser_1 = require("./tune-my-music-csv-parser");
function selectParserFor(rawPlaylist) {
    if (rawPlaylist.length === 0) {
        throw new empty_playlist_error_1.EmptyPlaylistError();
    }
    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return traktor_xml_parser_1.TraktorXmlParser;
    }
    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return spotify_text_parser_1.SpotifyTextParser;
    }
    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return spotify_html_parser_class_1.SpotifyHtmlParser;
    }
    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('<VirtualDJ_Database')) {
        return virtualdj_xml_parser_1.VirtualDjXmlParser;
    }
    if (rawPlaylist.includes('Name,Track Name')) {
        return artist_title_by_line_text_parser_1.ArtistTitleByLineParser;
    }
    if (rawPlaylist.startsWith('Track name, Artist name, Album, Playlist name')) {
        return tune_my_music_csv_parser_1.TuneMyMusicCsvParser;
    }
    throw new invalid_playlist_error_1.InvalidPlaylistError();
}
exports.selectParserFor = selectParserFor;
