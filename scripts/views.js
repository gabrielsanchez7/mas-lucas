import * as Functions from './functions.js'

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

	scrollButton()
	changeTab()
	carousel()
	priceSelector()

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

/** [MIS LUCAS] Evento para cambiar de tabs */
const changeTab = () => {
	const tabs = document.querySelectorAll('.lucas__tab-btn')
	tabs.forEach(it => {
		it.addEventListener('click', e => {
			const t = e.target
			const parent = t.closest('.lucas__tab')
			parent?.classList.add('lucas__tab--active')

			const sibs = Functions.allSiblings(parent)
			sibs.forEach(sib => sib.classList.remove('lucas__tab--active'))

			const tab = parent.classList.contains('lucas__tab--accumulated') ? 'accumulated' : 'redeemed'
			const currentTable = document.querySelector(`.lucas-table--${tab}`)
			currentTable.classList.add('lucas-table--active')

			const tableSibs = Functions.allSiblings(currentTable)
			tableSibs.forEach(sib => sib.classList.remove('lucas-table--active'))
		})
	})
}

/** [PRODUCTOS] Carrusel */
const carousel = () => {
	// const items = document.querySelectorAll('.carousel__item')
	new Glide('.glide', {
		autoplay: 6000,
		type: 'carousel'
	}).mount()
}

/** [PRODUCTOS] Selector de rango de precio */
const priceSelector = () => {
	const slider = document.querySelector('.store__range-slider')
	noUiSlider.create(slider, {
		start: [20, 80],
		connect: true,
		tooltips: true,
		format: {
			from: v => v,
			to: v => parseInt(v)
		},
		range: {
			min: 0,
			max: 100
		}
	})
}