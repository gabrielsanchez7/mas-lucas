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