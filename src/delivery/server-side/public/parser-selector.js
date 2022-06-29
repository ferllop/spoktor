
const Parser = {
    TraktorXmlParser: 'TraktorXmlParser',
    SpotifyTextParser: 'SpotifyTextParser',
    SpotifyHtmlParser: 'SpotifyHtmlParser',
    VirtualDjXmlParser: 'VirtualDjXmlParser',
    ArtistTitleByLineParser: 'ArtistTitleByLineParser',
    TuneMyMusicCsvParser: 'TuneMyMusicCsvParser',
}

export function selectParserForOld(/**string*/ rawPlaylist) {
    if (rawPlaylist.length === 0) {
        throw new EmptyPlaylistError()
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return Parser.TraktorXmlParser
    }

    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return Parser.SpotifyTextParser
    }

    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return Parser.SpotifyHtmlParser
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('<VirtualDJ_Database')) {
        return Parser.VirtualDjXmlParser
    }

    if (rawPlaylist.includes('Name,Track Name')) {
        return Parser.ArtistTitleByLineParser
    }

    if (rawPlaylist.startsWith('Track name, Artist name, Album, Playlist name')) {
        return Parser.TuneMyMusicCsvParser
    }

    throw new InvalidPlaylistError()
}

export async function selectParserFor(/**string*/ rawPlaylist) {
    if (rawPlaylist.length === 0) {
        // throw new EmptyPlaylistError()
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return import('./traktor-xml-parser.js')
    }

    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return import('./spotify-text-parser.js')
    }

    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return import('./spotify-html-parser-class.js')
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('<VirtualDJ_Database')) {
        return import('./virtualdj-xml-parser.js')
    }

    if (rawPlaylist.includes('Name,Track Name')) {
        return import('./artist-title-by-line-text-parser.js')
    }

    if (rawPlaylist.startsWith('Track name, Artist name, Album, Playlist name')) {
        return import('./tune-my-music-csv-parser.js')
    }

    // throw new InvalidPlaylistError()
}
