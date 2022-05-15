/** Valida que los componentes principales se hayan cargado */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		setTimeout(() => loadScripts(), 100)
		clearInterval(layoutInterval)
	}
}, 10)

const loadScripts = () => {

	carousel()

}

/** Carrusel */
const carousel = () => {
	console.log('glide')
	new Glide('.glide', {
		autoplay: 4000,
		type: 'carousel'
	}).mount()
}