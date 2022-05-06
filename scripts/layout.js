/** Check if layout has loaded */
const layoutInterval = setInterval(() => {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    if(header != null && footer != null) {
        loadScripts()
        clearInterval(layoutInterval)
    }
}, 10)

const loadScripts = () => {

    loadUserMenu()
    login()

}

/** Show user menu options by login status */
const loadUserMenu = () => {
    const loginStatus = localStorage.getItem('login')
    const condition = loginStatus == null ? 'unlogged' : 'logged'
    const tag = document.querySelector(`if[data-condition="${condition}"]`)
    const userHtml = tag?.innerHTML.trim()
    tag.outerHTML = userHtml
}

function login() {
    const loginButton = document.querySelector('.header__user')
    loginButton.addEventListener('click', _ => {
        localStorage.setItem('login', 'true')
        location.reload()
    })
}
