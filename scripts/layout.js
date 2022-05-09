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

		btn.removeEventListener('click', null)
		btn.addEventListener('click', _ => {
			const modal = document.querySelector('#modal-login')
			const caller = document.querySelector('.header__user')
			const form = document.querySelector('#modal-login .form')
			const closeBtn = document.querySelector('#modal-login .modal__close')
			
			modal.style.display = 'flex'
			caller.style.zIndex = '101'
			setTimeout(() => {
				modal.style.opacity = '1'
				form.style.opacity = '1'
				form.style.transform = 'translateY(0)'
			}, 100)

			closeBtn.removeEventListener('click', null)
			closeBtn.addEventListener('click', _ => {
				form.style.removeProperty('transform')
				form.style.removeProperty('opacity')
				modal.style.removeProperty('opacity')
				setTimeout(() => {
					modal.style.removeProperty('display')
				}, 300)
			})
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
		})
	}

}