const template = document.createElement('template')
template.innerHTML = `
<style>
form {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
}

fieldset:not(:last-child) {
    margin-bottom: 1.5em;
}

input[type="submit"] {
    padding: 1em;
}
</style>
<form action="">
        <fieldset>
            <label for="needles">Spotify Playlist:</label>
            <input type="file" id="needles">
        </fieldset>

        <fieldset>
            <label for="haystack">Traktor Collection:</label>
            <input type="file" id="haystack">
        </fieldset>

        <input type="submit" value="Intersect">
    </form>
`

export class Form extends HTMLElement {
    private shadow: ShadowRoot
    private needlesInput: HTMLInputElement
    private haystackInput: HTMLInputElement
    private submit: HTMLInputElement

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))
        this.needlesInput = this.shadow.getElementById('needles') as HTMLInputElement
        this.haystackInput = this.shadow.getElementById('haystack') as HTMLInputElement
        this.submit = this.shadow.querySelector('input[type="submit"]') as HTMLInputElement
    }

    connectedCallback() {
        window.addEventListener('load', this.handleInitialLoad.bind(this))
        this.needlesInput.addEventListener('change', this.handleNeedlesInputChange())
        this.haystackInput.addEventListener('change', this.handleHaystackInputChange())
        this.submit.addEventListener('click', this.handleSubmit.bind(this))
    }

    disconnectedCallback() {
        window.removeEventListener('load', this.handleInitialLoad.bind(this))
        this.needlesInput.removeEventListener('change', this.handleNeedlesInputChange())
        this.haystackInput.removeEventListener('change', this.handleHaystackInputChange())
        this.submit.removeEventListener('click', this.handleSubmit)
    }

    private handleNeedlesInputChange() {
        return handleInputChange('needles-load', this.needlesInput, loadFileContent)
    }

    private handleHaystackInputChange() {
        return handleInputChange('haystack-load', this.haystackInput, loadFileContent)
    }

    private handleSubmit(event: Event) {
        event.preventDefault()
        if (!this.needlesInput.value || !this.haystackInput.value) {
            return
        }
        this.shadow.dispatchEvent(new Event('intersect', {
            bubbles: true,
            composed: true,
        }))
    }

    private handleInitialLoad() {
            if (this.needlesInput.value) {
                loadFileContent(this.needlesInput, this.needlesInput, 'needles-load')
            }
            if (this.haystackInput.value) {
                loadFileContent(this.haystackInput, this.needlesInput, 'haystack-load')
            }
    }
}

type FileContentLoader = (el: HTMLInputElement, dispatcher: HTMLElement, eventName: string) => void

function handleInputChange(eventName: string, dispatcher: HTMLElement, loaderFunction: FileContentLoader) {
    return (event: Event) => loaderFunction(event.target as HTMLInputElement, dispatcher, eventName)
}

function loadFileContent(inputElement: HTMLInputElement, dispatcher: HTMLElement, loadEventNameToDispatch: string) {
    if (!inputElement.files?.[0]) {
        return
    }
    const fr = new FileReader()
    fr.addEventListener('load', () => {
        dispatcher.dispatchEvent(new CustomEvent(loadEventNameToDispatch, {
            bubbles: true,
            composed: true,
            detail: fr.result as string,
        }))
    })
    fr.readAsText(inputElement.files[0])
}
