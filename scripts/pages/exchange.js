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
    const tab = document.querySelector('#exchange .step--active')
    const bounds = tab.getBoundingClientRect()
    const container = document.querySelector('.container')
    const boundsContainer = container.getBoundingClientRect()
    const indicator = document.querySelector('#exchange .step-indicator__position')
    indicator.style.left = `${bounds.left - boundsContainer.left + (bounds.width / 2) - 15}px`
  }

  moveIndicator()

  const tabs = document.querySelectorAll('#exchange .step') 
  tabs.forEach(it => {
    it.addEventListener('click', e => {
      const t = e.target
      const sibs = Functions.allSiblings(t)
      
      t.classList.add('step--active')
      sibs.forEach(sib => sib.classList.remove('step--active'))
      moveIndicator()

      const step = t.getAttribute('data-step')
      const currentContent = document.querySelector('.content--active')
      const content = document.querySelector(`[data-content="${step}"]`)

      currentContent.style.opacity = '0'
      setTimeout(() => {
        currentContent.style.display = 'none'
        currentContent.classList.remove('content--active')
        content.style.display = 'block'
        setTimeout(() => {
          content.style.opacity = '1', 100
          content.classList.add('content--active')
        })
      }, 250)

    })
  })
  
}