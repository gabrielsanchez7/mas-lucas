import * as Functions from '../../scripts/commons/functions.js'

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

	infoTabs()
	otherProducts()

}

/** Abre y cierra los tabs de información */
const infoTabs = () => {
	const tabsHandler = document.querySelectorAll('.tab__handler')
	tabsHandler.forEach(it => {
		it.addEventListener('click', e => {
			const t = e.target
			const icon = t.querySelector('.shape__text i')
			const content = t.nextElementSibling
			const contentHeigh = content.querySelector('p').getBoundingClientRect().height
			const isOpen = content.hasAttribute('data-open')

			if(!isOpen) {
				content.setAttribute('data-open', '')
				content.style.maxHeight = `${contentHeigh + 40}px`
				console.log(icon)
				icon.style.transform = 'rotate(180deg)'
			} else {
				content.removeAttribute('data-open')
				content.removeAttribute('style')
				icon.removeAttribute('style')
			}
		})
	})
}

/** Lista los productos de interes */
const otherProducts = async () => {
	const container = document.querySelector('.other__products')
	Functions.loadProduct(container, 4)
}