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

	changeTab()

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