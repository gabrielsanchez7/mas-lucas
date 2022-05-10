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
			const modal = document.querySelector('#modal-auth')
			const caller = document.querySelector('.header__user')
			const form = document.querySelector('#modal-auth .auth-form')
			const closeBtn = document.querySelectorAll('#modal-auth .modal__close')
			
			modal.style.display = 'flex'
			caller.style.zIndex = '101'
			form.style.display = 'block'

			setTimeout(() => {
				modal.style.opacity = '1'
				form.style.opacity = '1'
				form.style.transform = 'translateY(0)'
			}, 100)

			closeBtn.forEach(it => {
				it.removeEventListener('click', null)
				it.addEventListener('click', _ => {
					const currentForm = it.closest('.auth-form')
					currentForm.style.removeProperty('transform')
					currentForm.style.removeProperty('opacity')
					modal.style.removeProperty('opacity')
					setTimeout(() => {
						modal.style.removeProperty('display')
						const allForms = document.querySelectorAll('#modal-auth .auth-form')
						allForms.forEach(f => f.removeAttribute('style'))
					}, 300)
				})
			})

			openOtherAction('login', 'signup')
		})
	})

	const openOtherAction = (from, to) => {
		const fromForm = document.querySelector(`#modal-auth .auth-form--${from}`)
		const toForm = document.querySelector(`#modal-auth .auth-form--${to}`)
		const fromBtn = fromForm.querySelector('.auth-form__other-action')

		fromBtn.addEventListener('click', _ => {
			fromForm.style.transform = 'translateY(-100vh)'
			
			setTimeout(() => {
				fromForm.style.removeProperty('opacity')
				fromForm.style.removeProperty('display')
				toForm.style.opacity = '1'
				toForm.style.transform = 'translateY(0)'
			}, 100)
	
			let tooltipMessage
			if(to == 'signup') {
				tooltipMessage = '<b>&iexcl;Excelente!</b> est&aacute;s a un paso de empezar a ganar platita extra de la forma m&aacute;s sencilla.'
			} else if(to == 'login') {
				tooltipMessage = '<b>&iexcl;Hola te estaba esperando!</b> para seguir ganando platita extra juntos.'
			}
	
			console.log({tooltipMessage})
			const tooltip = document.querySelector('#modal-auth .tooltip')
			tooltip.innerHTML = tooltipMessage
		})
	}

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