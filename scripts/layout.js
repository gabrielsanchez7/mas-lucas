/** Check if layout has loaded */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		loadScripts()
		clearInterval(layoutInterval)
	}
}, 10)

const logged = localStorage.getItem('login') != null

const loadScripts = () => {

	loadUserMenu()
	login()
	chooseSubmenu()
	toggleSubmenu()

}

/** Show user menu options by login status */
const loadUserMenu = () => {
	const condition = logged ? 'logged' : 'unlogged'
	const tag = document.querySelector(`if[data-condition="${condition}"]`)
	const userHtml = tag?.innerHTML.trim()
	tag.outerHTML = userHtml
}

/** Click on login button */
const login = () => {
	const callers = ['.header__user-action', '.header__user-icon']
	callers.forEach(it => {
		const btn = document.querySelector(it)
		btn.addEventListener('click', _ => {
			localStorage.setItem('login', 'true')
			location.reload()
		})
	})
}

/** Click on logout button */
const chooseSubmenu = () => {
	const logout = document.querySelector('.header .submenu__item--logout')
	logout.addEventListener('click', _ => {
		localStorage.removeItem('login')
		location.reload()
	})
}

/** Show or hide submenu */
const toggleSubmenu = () => {
	
	if(logged) {
		const submenu = document.querySelector('.header .submenu')
		
		const toggle = () => {
			const visible = window.getComputedStyle(submenu).display != 'none'
			if(!visible) { submenu.style.display = 'block' }
			else { submenu.style.display = 'none' }
		}
	
		const callers = ['.header__user-action', '.header__user-icon']
		callers.forEach(it => {
			const toggleButtons = document.querySelectorAll(it)
			toggleButtons.forEach(btns => btns.addEventListener('click', toggle))
		})

		// Click outside
		const body = document.querySelector('body')
		body.addEventListener('click', e => {
			const t = e.target
			const parent = t.closest('.header__user')
			const visible = window.getComputedStyle(submenu).display != 'none'

			if(parent == null && visible) { toggle() }
			// console.log(parent, callers.includes(parent?.getAttribute('class')), visible)
			// if(parent == null && callers.includes(parent?.getAttribute('class')) && visible) {
			// 	submenu.style.display = 'none'
			// }
		})
	}

}