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

	tabPosition()

}

/** Ubica el indicador de los tabs dependiendo del paso de canje seleccionado */
const tabPosition = () => {
  
  const moveIndicator = () => {
    const tab = document.querySelector('#offers .offer--active')
    const bounds = tab.getBoundingClientRect()
    const container = document.querySelector('.container')
    const boundsContainer = container.getBoundingClientRect()
    const indicator = document.querySelector('#offers .indicator__arrow')
    indicator.style.left = `${bounds.left - boundsContainer.left + (bounds.width / 2) - 15}px`
  }

  moveIndicator()

  const tabs = document.querySelectorAll('#offers .offer__action')
  tabs.forEach(it => {
    it.addEventListener('click', e => {
      const t = e.target
      const parent = t.closest('.offer')
      const sibs = Functions.allSiblings(parent)
      
      parent.classList.add('offer--active')
      sibs.forEach(sib => sib.classList.remove('offer--active'))
      moveIndicator()

      const step = t.getAttribute('data-offer')
      const currentContent = document.querySelector('.content--active')
      const content = document.querySelector(`.content[data-offer="${step}"]`)

      currentContent.style.opacity = '0'
      setTimeout(() => {
        currentContent.style.display = 'none'
        currentContent.classList.remove('content--active')
        content.style.display = 'block'
        content.classList.add('content--active')
        setTimeout(() => content.style.opacity = '1', 100)
      }, 250)

    })
  })
  
}