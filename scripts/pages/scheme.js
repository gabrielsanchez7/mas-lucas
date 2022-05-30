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

  innerTabs()

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

const innerTabs = () => {
  const tabs = document.querySelectorAll('.content__tab')
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      const t = e.target
      const container = t.closest('.content')
      const idx = t.getAttribute('data-inner-content')
      const currentContent = container.querySelector('.content__tabs__content--active')
      const newContent = container.querySelector(`.content__tabs__content[data-inner-content="${idx}"]`)

      t.classList.add('content__tab--active')
      const sibs = Functions.allSiblings(t)
      console.log(sibs)
      sibs.forEach(sib => sib.classList.remove('content__tab--active'))
      
      currentContent.style.opacity = '0'
      setTimeout(() => {
        currentContent.style.display = 'none'
        currentContent.classList.remove('content__tabs__content--active')
        newContent.style.display = 'block'
        newContent.classList.add('content__tabs__content--active')
        setTimeout(() => newContent.style.opacity = '1', 100)
      }, 250)
    })
  })
}