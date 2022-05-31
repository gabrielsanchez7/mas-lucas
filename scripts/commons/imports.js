const include = (selector) => {

	const tag = document.querySelector(`[data-include="${selector}"]`)

	if(tag == null) {
		return false
	}

	if (selector.startsWith('common-')) {
		const path = selector.split('common-')[1]
		fetch(`../../views/commons/${path}.html`)
			.then(file => file.text())
			.then(text => tag.outerHTML = text)
	} else if (selector != 'router') {
		fetch(`../../views/layout/${selector}.html`)
			.then(file => file.text())
			.then(text => {
				tag.outerHTML = text
				const headerTag = document.querySelector('header')
				const paths = location.pathname.split('/')
				const fileName = paths[paths.length - 1].split('.html')[0]
				const currentPage = headerTag.querySelector(`.header__menu-item a[data-menu="${fileName}"] .shape__box`)
				const currentSubpage = headerTag.querySelector(`.submenu [data-menu="${fileName}"] .icon-bird`)
				currentPage?.removeAttribute('hidden')
				currentSubpage?.removeAttribute('hidden')
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