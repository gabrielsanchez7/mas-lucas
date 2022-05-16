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

	carousel()
	infoTabs()

}

/** Carrusel */
const carousel = () => {
	new Glide('.glide', {
		autoplay: 4000,
		type: 'carousel'
	}).mount()
}

/** Abre y cierra los tabs de información */
const infoTabs = () => {
	const tabsHandler = document.querySelectorAll('.tab__handler')
	tabsHandler.forEach(it => {
		it.addEventListener('click', e => {
			const t = e.target
			const content = t.nextElementSibling
			const contentHeigh = content.querySelector('p').getBoundingClientRect().height

			content.style.maxHeight = `${contentHeigh + 40}px`
		})
	})
}