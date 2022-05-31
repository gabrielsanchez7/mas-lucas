import * as Functions from '../commons/functions.js'

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
	priceSelector()
	loadProducts()

}

/** Carrusel */
const carousel = () => {
	new Glide('.glide', {
		autoplay: 4000,
		type: 'carousel'
	}).mount()
}

/** Selector de rango de precio */
const priceSelector = () => {
	const slider = document.querySelector('.store__range-slider')
	noUiSlider.create(slider, {
		start: [150, 520],
		connect: true,
		tooltips: true,
		format: {
			from: v => v,
			to: v => parseInt(v)
		},
		range: {
			min: 50,
			max: 650
		}
	})
}

/** Carga de productos */
const loadProducts = async () => {
	const data = await fetch('../../data/products.json').then(res => res.json())
	data.forEach(async (it, key) => {
		let template = await fetch('../../views/commons/product.html').then(res => res.text())
		const container = document.querySelector('.store__products')
		template = template.replace(/{{price}}/, it.price)
		template = template.replace(/{{image}}/, it.image)
		template = template.replace(/{{name}}/g, it.name)
		template = template.replace(/{{code}}/, it.code)
		container.innerHTML += template

		if(key == data.length - 1) {
			handleProductModals()
		}
	})
}

/** Muestra el modal dependiendo de la acción del usuario */
const handleProductModals = () => {
	const options = document.querySelectorAll('.product__option, .product__action')
	options.forEach(opt => {
		opt.addEventListener('click', e => {
			const t = e.target
			const action = t.getAttribute('data-action')

			if(action == 'expand') {
				location.href = '../../views/pages/product-detail.html'
			} else {
				const conditionContainer = document.querySelector(`.modal-product .modal-container`)
				const def = conditionContainer.innerHTML
				const conditionTag = conditionContainer.querySelector(`[data-condition="${action}"]`)
				if(conditionTag != null) {
					conditionTag.outerHTML = conditionTag.innerHTML
				}
	
				Functions.openModal('#modal-product', () => {
					conditionContainer.innerHTML = def
				})
			}

		})
	})
}