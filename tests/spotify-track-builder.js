export class SpotifyTrackBuilder {
    constructor() {
        this.song = ''
        this.artist = ''
    }

    withSong(song) {
        this.song = song
        return this
    }

    withArtist(artist) {
        this.artist = artist
        return this
    }

    build() {
        return `
            <div data-testid="track-row" class="EntityRowV2__Container-sc-ayafop-0 bjLiWe">
    <button data-testid="entity-row-v2-button" aria-label="track Para No Verte Más" class="EntityRowV2__PlayPauseButton-sc-ayafop-1 erxMLK">
        <span class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk MestoBold-sc-16x8d2-0 EntityRowV2__RowNumber-sc-ayafop-7 lnpneL cEwA-dS">18</span>
        <div type="track" class="EntityRowV2__ContainerMiddle-sc-ayafop-3 bxCrYz">
            <div class="Row__Container-sc-brbqzp-0 jKreJT">
                <span class="Row__StyledBallad-sc-brbqzp-2 gcShsd">
                    <span dir="auto" class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk Ballad-sc-mm6z7p-0 eTJHwt">
                        <a href="https://open.spotify.com/track/19CmuECYssqkPWANF4nLWM" class="EntityRowV2__Link-sc-ayafop-8 cGmPqp">${this.song}</a>
                    </span>
                </span>
                <span dir="auto" class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk Mesto-sc-1e7huob-0 Row__Subtitle-sc-brbqzp-1 hTPACX gmIWQx">
                    <a href="/artist/60nua3AsVSfADZtg5Hdz3W">${this.artist}</a>
                </span>
            </div>
        </div>
    </button>
    <span class="EntityRowV2__ContainerRight-sc-ayafop-4 hMpPYD">
        <button data-testid="context-menu-action-button" class="ButtonReset-sc-xvzwi7-0 EntityRowActions__EntityRowActionButton-sc-hznr4p-0 cndhzM kmFvBv">
            <svg role="img" height="24" width="24" aria-labelledby="more-icon" data-testid="more-icon" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 kVzeqZ">
                <title >more-icon-android</title>
                <path d='M10.5 4.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0 15a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0-7.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z'/>
            </svg>
        </button>
    </span>
</div>`
    }
}