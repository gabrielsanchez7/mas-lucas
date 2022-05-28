import * as Functions from './functions.js'

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
	textfield()
	dropdown()
	radio()

}

/** Carrusel */
const carousel = () => {
	const slides = document.querySelector('.glide:not(.glide--custom)')
	if(slides != null) {
		new Glide('.glide:not(.glide--custom)', {
			autoplay: 4000,
			type: 'carousel'
		}).mount()
	}
}

/** Textfield */
const textfield = () => {
	const fields = document.querySelectorAll('.textfield__input')
	fields.forEach(it => {
		it.addEventListener('focusin', e => {
			const t = e.target
			const parent = t.closest('.textfield')
			parent.classList.add('textfield--focused')
		})

		it.addEventListener('focusout', e => {
			const t = e.target
			const parent = t.closest('.textfield')
			const input = parent.querySelector('.textfield__input')
			
			if(input.value.trim().length == 0) {
				parent.classList.remove('textfield--focused')
			}
		})
	})
}

/** Dropdown */
const dropdown = () => {
	const cbos = document.querySelectorAll('.dropdown__caller')
	cbos.forEach(it => {
		it.addEventListener('click', e => {
			const t = e.target
			const parent = t.closest('.dropdown')
			const droplist = parent.querySelector('.dropdown__list-container')
			const isOpened = parent.classList.contains('dropdown--opened')

			if(!isOpened) {
				closeOthers(parent)
				parent.classList.add('dropdown--opened')
				droplist.style.display = 'block'
			} else {
				parent.classList.remove('dropdown--opened')
				droplist.style.display = 'none'
			}

			const items = parent.querySelectorAll('.dropdown__item')
			const input = parent.querySelector('.dropdown__input')
			items.forEach(item => {
				item.addEventListener('click', e => {
					input.value = e.target.innerHTML
					parent.classList.add('dropdown--selected')
				})
			})
		})
	})

	document.body.addEventListener('click', e => {
		const t = e.target
		const isDropdown = t.closest('.dropdown') != null
		const drops = document.querySelectorAll('.dropdown')
		if(!isDropdown) {
			drops.forEach(it => {
				it.classList.remove('dropdown--opened')
				const list = it.querySelector('.dropdown__list-container')
				list.style.display = 'none'
			})
		}
	})

	const closeOthers = (it) => {
		const drops = document.querySelectorAll('.dropdown')
		drops.forEach(drop => {
			if(drop != it) {
				drop.classList.remove('dropdown--opened')
				const list = drop.querySelector('.dropdown__list-container')
				list.style.display = 'none'
			}
		})
	}
}

/** Radio buttons */
const radio = () => {
	const radios = document.querySelectorAll('.radio [type="radio"]')
	radios.forEach(it => {
		it.addEventListener('change', e => {
			const t = e.target
			const parent = t.closest('.radio')
			parent.classList.add('radio--selected')

			const sibs = Functions.allSiblings(parent)
			sibs.forEach(sib => sib.classList.remove('radio--selected'))
		})
	})
}