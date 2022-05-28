const include = (selector) => {

	const tag = document.querySelector(`[data-include="${selector}"]`)

	if(tag == null) {
		return false
	}

	if (selector.startsWith('common-')) {
		const path = selector.split('common-')[1]
		fetch(`/views/commons/${path}.html`)
			.then(file => file.text())
			.then(text => tag.outerHTML = text)
	} else if (selector != 'router') {
		fetch(`/views/layout/${selector}.html`)
			.then(file => file.text())
			.then(text => {
				tag.outerHTML = text
				const headerTag = document.querySelector('header')
				const pathname = location.pathname == "/" ? '/home' : location.pathname
				const currentPage = headerTag.querySelector(`.header__menu-item a[href="${pathname}"] .shape__box`)
				currentPage?.removeAttribute('hidden')
			})
	} else {
		const pathname = location.pathname.split('/')[1]
		const view = pathname == "" ? `/views/pages/home.html` : `/views/pages/${pathname}.html`

		fetch(view)
			.then(file => file.text())
			.then(text => {
				tag.innerHTML = text
				const headerH = document.querySelector('header')?.clientHeight
				const start = tag.querySelector('[data-start]')
				
				if(start != null) {
					start.style.paddingTop = `${headerH}px`
				}

				const currentPage = document.querySelector(`.submenu__item a[href="/${pathname}"]`)
				const icon = currentPage?.previousElementSibling.querySelector('i')
				icon?.removeAttribute('hidden')

				createScriptTag(pathname)
			})
	}

}

include('header')
include('router')
include('footer')

/** Check if layout has loaded */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		loadImports()
		clearInterval(layoutInterval)
	}
}, 10)

const loadImports = () => {
	include('common-modal-auth')
	include('common-chat-bot')
	include('common-modal-product')
	include('common-modal-confirm-lucas')
}

const createScriptTag = (path) => {
	path = path == '' ? 'home' : path
	const scriptTag = document.createElement('script')
	scriptTag.setAttribute('type', 'module')
	scriptTag.setAttribute('src', `/scripts/pages/${path}.js`)
	document.head.appendChild(scriptTag)
}