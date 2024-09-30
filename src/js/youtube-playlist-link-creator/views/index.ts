import { createLink } from "../domain/create-link.js"

const youtubeFormEl = document.querySelector('.yt-form') as HTMLFormElement
youtubeFormEl.querySelector('input[type="submit"]')
    ?.addEventListener('click', handleYoutubeLinkSubmit(youtubeFormEl))

export function handleYoutubeLinkSubmit(form: HTMLFormElement) {
    return (event: Event) => {
        console.log(form)
        event.preventDefault()
        const links = form.querySelector('textarea')!
        
        const template = document.createElement('template')
        template.innerHTML = 
            `<a href="${createLink(links.value)}" target="_blank" rel="noopener">Go to playlist</a>`
            
        form.appendChild(template.content)
    }
}