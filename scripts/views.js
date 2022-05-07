/** Check if layout has loaded */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		loadScripts()
		clearInterval(layoutInterval)
	}
}, 10)

const loadScripts = () => {

    scrollButton()
    
}

/** Click on scroll icon in the hero */
const scrollButton = () => {
    const icon = document.querySelector('.banner__scroll')
    const heroSize = document.querySelector('.banner').clientHeight
    icon.addEventListener('click', _ => {
        scroll({
            top: heroSize + 1,
            behavior: "smooth"
        })
    })
}