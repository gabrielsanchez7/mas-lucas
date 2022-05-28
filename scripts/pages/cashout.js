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

	carouselProducts()
	confirmCash()

}

const carouselProducts = () => {
  const slides = document.querySelector('.glide.option__products')
  if(slides != null) {
		new Glide('.glide.option__products', {
			autoplay: 4000,
			type: 'carousel',
      perView: 3,
      startAt: 1,
      focusAt: 'center'
		}).mount()
	}
}

const confirmCash = () => {
	const btn = document.querySelector('.exchange button')
	btn.addEventListener('click', () => {
		Functions.openModal('#modal-confirm-lucas', () => {
			const cancelBtn = document.querySelector('#modal-confirm-lucas .actions__cancel')
			cancelBtn.addEventListener('click', () => {
				
			})
		})
	})
}