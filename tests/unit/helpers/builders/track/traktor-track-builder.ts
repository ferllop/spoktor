import { aTrack, MinimalTrackData } from "./track-builder.js"

export type TraktorTrackData = MinimalTrackData & {
    directory: string
    volume: string
    filename: string
}

export const toTraktorTrack = 
    (track: MinimalTrackData): TraktorTrackData => ({
        ...track,
        volume: '',
        directory: '',
        filename: '',
    })

export const aTraktorTrack = () => toTraktorTrack(aTrack)

export const withDirectory = 
    (directory: string) => (track: TraktorTrackData): TraktorTrackData => ({
        ...track,
        directory: '/:' + directory
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .replace(/\//g, '/:') + '/:',
    })

export const withFilename =
    (filename: string) => (track: TraktorTrackData): TraktorTrackData => 
    ({...track, filename})

export const withVolume =
    (volume: string) => (track: TraktorTrackData): TraktorTrackData =>
    ({
        ...track,
        volume: volume.replaceAll(':', '').toUpperCase() + ':',
    })

export const toTraktorEntry = (track: TraktorTrackData): string => {
    const artistAttribute = track.artist === null ? '' : `ARTIST="${track.artist}"`
    const titleAttribute = track.song === null ? '' : `TITLE="${track.song}"`
    return `
            <ENTRY 
            MODIFIED_DATE="2022/5/18" 
            MODIFIED_TIME="67805" AUDIO_ID="AOQAABJVRUVVRFVURnUzRAAAA==" 
            ${titleAttribute} 
            ${artistAttribute}>
            <LOCATION DIR="${track.directory}" 
            FILE="${track.filename}" VOLUME="${track.volume}" VOLUMEID="daa01b2e"></LOCATION>
<ALBUM TITLE="Lamborgini"></ALBUM>
<MODIFICATION_INFO AUTHOR_TYPE="user"></MODIFICATION_INFO>
<INFO BITRATE="245252" COVERARTID="020/UQQJSAD5XLQPSDMGCLPVCEA5WRBA" PLAYTIME="229" PLAYTIME_FLOAT="228.072006" IMPORT_DATE="2022/5/19" RELEASE_DATE="2018/1/1" FLAGS="12"></INFO>
<TEMPO BPM="104.000084" BPM_QUALITY="100.000000"></TEMPO>
<LOUDNESS PEAK_DB="-1.126354" PERCEIVED_DB="-0.835403" ANALYZED_DB="-0.835403"></LOUDNESS>
<MUSICAL_KEY VALUE="11"></MUSICAL_KEY>
<CUE_V2 NAME="AutoGrid" DISPL_ORDER="0" TYPE="4" START="138.631363" LEN="0.000000" REPEATS="-1" HOTCUE="0"></CUE_V2>
</ENTRY>`
}
