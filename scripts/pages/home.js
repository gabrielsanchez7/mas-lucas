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

	heroBanner()
	welcomeModal()
	scrollButton()

}

/** Animación de banner principal */
const heroBanner = () => {
	const banner = document.querySelector('.banner')
	const bannerCounter = banner.querySelectorAll('.banner__hero-text').length
	const dots = banner.querySelectorAll('.banner__dot')
	let counter = 0

	Functions.animationIn(1)

	setInterval(() => {
		if(counter < bannerCounter) {
			Functions.animationOut(counter + 1, () => {
				Functions.animationIn(counter == (bannerCounter - 1) ? 1 : counter + 2)
				counter++
				if(counter == bannerCounter) { counter = 0 }
				dots[counter].classList.add('banner__dot--active')
				const sibsDot = Functions.allSiblings(dots[counter])
				sibsDot.forEach(sib => sib.classList.remove('banner__dot--active'))
			})
		}
	}, 5000)
}

const welcomeModal = () => {
	Functions.openModal('#modal-hello')
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