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

	const tabs = document.querySelectorAll('#scheme .tab')
  console.log({tabs})
  tabs.forEach(it => tabPosition(it))

}

/** Ubica el indicador de los tabs dependiendo del paso de canje seleccionado */
const tabPosition = (selector) => {
  
  const moveIndicator = () => {
    const tab = selector.querySelector('.tab__bar__btn--active')
    const bounds = tab.getBoundingClientRect()
    const container = document.querySelector('.container')
    const boundsContainer = container.getBoundingClientRect()
    const indicator = selector.querySelector('.tab__indicator')

    indicator.style.left = `${bounds.left - boundsContainer.left + (bounds.width / 2) - 15}px`
  }

  moveIndicator()

  const tabs = selector.querySelectorAll('.tab__bar__btn')
  tabs.forEach(it => {
    it.addEventListener('click', e => {
      const t = e.target
      const sibs = Functions.allSiblings(t)

      t.classList.add('tab__bar__btn--active')
      sibs.forEach(sib => sib.classList.remove('tab__bar__btn--active'))
      moveIndicator()

      const dataTab = t.getAttribute('data-tab')
      const currentContent = selector.querySelector('.content--active')
      const content = selector.querySelector(`.content[data-tab="${dataTab}"]`)

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