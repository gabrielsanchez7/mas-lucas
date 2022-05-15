/** Obtiene todos los hermanos posteriores de un elemento del DOM */
export function nextSibling(element, selector) {
  let sibling = element.nextElementSibling

  if(!selector) { return sibling }

  while(sibling) {
    if(sibling.matches(selector)) { return sibling }
    sibling = sibling.nextElementSibling
  }

  return sibling
}

/** Obtiene todos los hermanos anteriores de un elemento del DOM */
export function prevSibling(element, selector) {
  let sibling = element.previousElementSibling

  if(!selector) { return sibling }

  while(sibling) {
    if(sibling.matches(selector)) { return sibling }
    sibling = sibling.previousElementSibling
  }
  
  return sibling
}

/** Obtiene todos los hermanos de un elemento del DOM */
export function allSiblings(element, selector = null) {
  let siblings = []

  if(!element.parentNode) { return siblings }

  const allChilds = element.parentNode.children
  Array.from(allChilds, child => {
    if(child != element && !child.matches(selector)) { siblings.push(child) }
  })

  return siblings
}

/** Abre un modal */
export function openModal(selector, closeCallback = () => {}) {
  const modal = document.querySelector(selector)
  const modalContent = modal.querySelector('.modal-container')

  modal.style.display = 'flex'
  setTimeout(() => {
    modal.style.opacity = '1'
    setTimeout(() => {
      modalContent.style.transform = 'translateY(0)'
    }, 200)
  }, 100)

  const close = modal.querySelector('.modal__close')
  close.addEventListener('click', () => {
    modalContent.style.removeProperty('transform')
    setTimeout(() => {
      modal.style.removeProperty('opacity')
      setTimeout(() => modal.style.removeProperty('display'), 200)
    }, 100)

    closeCallback()
  })
}