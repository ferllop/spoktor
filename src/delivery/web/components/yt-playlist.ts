import {createLink} from '../../../domain/models/youtube-playlist-link-creator'

const template = document.createElement('template')
template.innerHTML = `
<style>
form {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
}

input[type="submit"] {
    padding: 1em;
}
</style>
<form class="youtube-playlist" action="">
    <textarea></textarea>
    <input type="submit" value="Get Link">
    <section></section>
</form>`

export class YoutubePlaylistComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
        this.querySelector('input[type="submit"]')!
            .addEventListener('click', (event) => {
                event.preventDefault()
                const links = this.querySelector('textarea')!.value
                const anchor = `<a href="${createLink(links)}" target="_blank" rel="noopener">Go to playlist</a>`
                this.querySelector('section')!.innerHTML = anchor
            })
    }
}
