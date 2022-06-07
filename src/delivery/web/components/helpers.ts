export function templateWithContent(content: string) {
    const template = document.createElement('template')
    template.innerHTML = content
    return template
}
