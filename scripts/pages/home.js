/** Valida que los componentes principales se hayan cargado */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		setTimeout(() => loadScripts(), 200)
		clearInterval(layoutInterval)
	}
}, 10)

const loadScripts = () => {

	scrollButton()

}

/** [HOME] Click en el botón de scroll en el banner principal */
const scrollButton = () => {
	const icon = document.querySelector('.banner__scroll')
	const heroSize = document.querySelector('.banner').clientHeight
	icon?.addEventListener('click', _ => {
		scroll({
			top: heroSize + 1,
			behavior: "smooth"
		})
	})
}