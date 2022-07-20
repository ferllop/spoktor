export function buildSpotifyHtmlTrack(/** Track */ track) {
    return `
            <div data-testid="track-row" class="EntityRowV2__Container-sc-ayafop-0 bjLiWe">
    <button data-testid="entity-row-v2-button" aria-label="track Para No Verte Más" class="EntityRowV2__PlayPauseButton-sc-ayafop-1 erxMLK">
        <span class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk MestoBold-sc-16x8d2-0 EntityRowV2__RowNumber-sc-ayafop-7 lnpneL cEwA-dS">18</span>
        <div type="track" class="EntityRowV2__ContainerMiddle-sc-ayafop-3 bxCrYz">
            <div class="Row__Container-sc-brbqzp-0 jKreJT">
                <span class="Row__StyledBallad-sc-brbqzp-2 gcShsd">
                    <span dir="auto" class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk Ballad-sc-mm6z7p-0 eTJHwt">
                        <a href="https://open.spotify.com/track/19CmuECYssqkPWANF4nLWM" class="EntityRowV2__Link-sc-ayafop-8 cGmPqp">${track.song}</a>
                    </span>
                </span>
                <span dir="auto" class="Type__StyledComponent-sc-1ell6iv-0 bhCKIk Mesto-sc-1e7huob-0 Row__Subtitle-sc-brbqzp-1 hTPACX gmIWQx">
                    <a href="/artist/60nua3AsVSfADZtg5Hdz3W">${track.artist}</a>
                </span>
            </div>`
}

