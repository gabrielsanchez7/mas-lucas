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

  const close = modal.querySelector('.modal__close, .modal__cancel')
  close?.addEventListener('click', () => {
    modalContent.style.removeProperty('transform')
    setTimeout(() => {
      modal.style.removeProperty('opacity')
      setTimeout(() => modal.style.removeProperty('display'), 200)
    }, 100)

    closeCallback()
  })
}

/** Carga los productos y reemplaza la información */
export async function loadProduct(container, limit) {
  const data = await fetch('../../data/products.json').then(res => res.json())
  limit = limit == null ? data.length : limit
  data.forEach(async (it, key) => {
    if(key < limit) {
      let template = await fetch('../../views/commons/product.html').then(res => res.text())
      template = template.replace(/{{price}}/, it.price)
      template = template.replace(/{{image}}/, it.image)
      template = template.replace(/{{name}}/g, it.name)
      template = template.replace(/{{code}}/, it.code)

      container.innerHTML += template

      if(key == limit - 1) {
        const options = document.querySelectorAll('.product__option, .product__action')
        options.forEach(opt => {
          opt.addEventListener('click', e => {
            const t = e.target
            const action = t.getAttribute('data-action')

            if(action == 'expand') {
              location.href = '/product-detail'
            } else {
              const conditionContainer = document.querySelector(`.modal-product .modal-container`)
              const def = conditionContainer.innerHTML
              const conditionTag = conditionContainer.querySelector(`[data-condition="${action}"]`)
              if(conditionTag != null) {
                conditionTag.outerHTML = conditionTag.innerHTML
              }
        
              openModal('#modal-product', () => {
                conditionContainer.innerHTML = def
              })
            }

          })
        })
      }
    }
  })
}