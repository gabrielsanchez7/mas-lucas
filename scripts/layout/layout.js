/** Valida que los componentes principales se hayan cargado */
const layoutInterval = setInterval(() => {
	const header = document.querySelector('header')
	const footer = document.querySelector('footer')
	if (header != null && footer != null) {
		setTimeout(() => loadScripts(), 200)
		clearInterval(layoutInterval)
	}
}, 10)

// Obtiene sesión temporal
const logged = localStorage.getItem('login') != null

// Carga todos los scripts
const loadScripts = () => {

	headerConditional()
	footerConditional()
	loadUserMenu()
	login()
	chooseSubmenu()
	toggleSubmenu()
	chatbot()

}

/** Muestra el header dependiendo de la ubicación */
const headerConditional = () => {
	const header = document.querySelector('header')
	const headerType = document.querySelector('[data-header]')?.getAttribute('data-header')
	if(headerType != undefined) {
		header.classList.add('header-2')
	}

	const condition = headerType == 2 ? 'header-2' : 'header-1'
	const tag = document.querySelector(`[data-condition="${condition}"]`)
	tag.outerHTML = tag.innerHTML
}

/** Muestra el footer dependiendo de la ubicación */
const footerConditional = () => {
	const footerType = document.querySelector('[data-footer]')?.getAttribute('data-footer')
	const condition = footerType == 2 ? 'footer-2' : 'footer-1'
	const tag = document.querySelector(`[data-condition="${condition}"]`)
	tag.outerHTML = tag.innerHTML
}

/** Muestra el menú dependiendo de la sesión */
const loadUserMenu = () => {
	const condition = logged ? 'logged' : 'unlogged'
	const tag = document.querySelector(`if[data-condition="${condition}"]`)
	const userHtml = tag?.innerHTML.trim()
	tag.outerHTML = userHtml
}

/** Click en login */
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

						const resets = ['.reset-options', '.reset-phone', '.reset-mail', '.reset-code', '.reset-confirm']
						resets.forEach(rst => {
							rst = modal.querySelector(rst)
							rst.removeAttribute('style')
						})
					}, 300)
				})
			})

			const tooltip = document.querySelector('#modal-auth .tooltip')
			tooltip.innerHTML = '<b>&iexcl;Hola te estaba esperando!</b> para seguir ganando platita extra juntos.'

			const messageTag = document.querySelector('.auth-form--reset .auth-form__subtitle')
			messageTag.innerHTML = 'Selecciona la opci&oacute;n con la que deseas <br> restablecer tu contrase&ntilde;a'

			const inputs = document.querySelectorAll('.auth-form--reset .reset-code__input-val')
			inputs.forEach(it => it.value = '')

			openForm('signup')
			openForm('reset')

			toggleCheckbox()

		})
	})

	// Abre otros formularios dentro del modal de autenticación
	const openForm = (form) => {
		const fromBtn = document.querySelector(`#modal-auth #btn-${form}`)
		const fromForm = fromBtn.closest('.auth-form')
		const toForm = document.querySelector(`#modal-auth .auth-form--${form}`)

		fromBtn.addEventListener('click', _ => {
			fromForm.style.transform = 'translateY(-100vh)'
			
			setTimeout(() => {
				fromForm.style.removeProperty('opacity')
				fromForm.style.removeProperty('display')
				toForm.style.opacity = '1'
				toForm.style.transform = 'translateY(0)'
			}, 100)
	
			let tooltipMessage
			if(form == 'signup') {
				tooltipMessage = '<b>&iexcl;Excelente!</b> est&aacute;s a un paso de empezar a ganar platita extra de la forma m&aacute;s sencilla.'
			} else if(form == 'login') {
				tooltipMessage = '<b>&iexcl;Hola te estaba esperando!</b> para seguir ganando platita extra juntos.'
			} else if(form == 'reset') {
				tooltipMessage = '<b>&iexcl;Hola! &iquest;Olvidaste tu contrase&ntilde;a?</b> No te preocupes, cambiarlo es facilito.'
			}
	
			const tooltip = document.querySelector('#modal-auth .tooltip')
			tooltip.innerHTML = tooltipMessage
		})

		// Cambia el contenido del modal de reseteo de contraseña dependiendo de la acción del usuario
		if(form == 'reset') {
			let currentMethod = ''
			const resetMethod = (method) => {
				let caller = toForm.querySelectorAll(method != 'code' ? `.reset-option--${method}` : '.reset__send')
				caller = method == 'confirm' ? toForm.querySelectorAll('.reset__confirm') : caller
				
				caller.forEach(it => {
					it.removeEventListener('click', null)
					it.addEventListener('click', _ => {
						let opts = toForm.querySelector(method != 'code' ? '.reset-options' : `.reset-${currentMethod}`)
						opts = method == 'confirm' ? toForm.querySelector('.reset-code') : opts
						const optResume = toForm.querySelector(method != 'code' ? `.reset-${method}` : '.reset-code')
						opts.style.opacity = '0'
						
						setTimeout(() => {
							optResume.style.display = 'flex'
							opts.style.display = 'none'
							setTimeout(() => optResume.style.opacity = '1', 50)
						}, 350)
						
						let formMessage = ''
						const receive = currentMethod == 'phone' ? 'mensaje de texto' : 'correo electr&oacute;nico'
						const via = method == 'phone' ? 'n&uacute;mero' : 'correo'
						
						if(['phone', 'mail'].includes(method)) { formMessage = `Te enviaremos un c&oacute;digo a tu ${via} registrado.` }
						else if(method == 'code') {
							formMessage = `Ingresa el c&oacute;digo que te enviamos por ${receive}.`
							enterCode()
						}
						else if(method == 'confirm') { formMessage = 'Ingresa una contrase&ntilde;a nueva' }
	
						const messageTag = toForm.querySelector('.auth-form__subtitle')
						messageTag.innerHTML = formMessage
						
						currentMethod = method
					})
				})
			}

			resetMethod('phone')
			resetMethod('mail')
			resetMethod('code')
			resetMethod('confirm')

			// Función de lectura de código OTP
			const enterCode = () => {
				const code = Array(5)
				console.log(code)
				const inputs = toForm.querySelectorAll('.reset-code__input-val')

				inputs.forEach((it, key) => {
					let keyCode = -1
					setTimeout(() => {
						if(it.previousElementSibling == null) { it.focus() }
					}, 350)
					it.addEventListener('keydown', e => {
						const t = e.target
						keyCode = e.keyCode
						if(t.value.length > 0 && keyCode != 8) { e.preventDefault() }
					})
					it.addEventListener('input', e => {
						const t = e.target
						code[key] = t.value
						if(it.nextElementSibling != null && keyCode != 8) {
							it.nextElementSibling.focus()
						}
						// TODO: Usar código OTP
						console.log({code: code.join('')})
					})
				})
			}
		}
	}

	const btnLogin = document.querySelector('#btn-login')
	btnLogin?.addEventListener('click', () => {
		localStorage.setItem('login', 'true')
		location.reload()
	})

}

/** Click en cierre de sesión */
const chooseSubmenu = () => {
	const logout = document.querySelector('.header .submenu__item--logout')
	logout.addEventListener('click', _ => {
		localStorage.removeItem('login')
		location.reload()
	})
}

/** Muestra u oculta el submenú */
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

		// Click fuera del submenú
		const body = document.querySelector('body')
		body.addEventListener('click', e => {
			const t = e.target
			const parent = t.closest('.header__user')
			const visible = window.getComputedStyle(submenu).display != 'none'

			if(parent == null && visible) { toggle() }
		})
	}
	
}

/** Toggle checkbox */
const toggleCheckbox = () => {
	const checkboxes = document.querySelectorAll('.checkbox')
	checkboxes.forEach(it => {
		const input = it.querySelector('input[type="checkbox"]')
		input.addEventListener('change', e => {
			const icon = it.querySelector('.checkbox__icon img')
			if(e.target.checked) { icon.removeAttribute('hidden') }
			else { icon.setAttribute('hidden', '') }
		})
	})
}

/** Chatbot */
const chatbot = () => {
	const caller = document.querySelector('.chat-bot__preview')
	caller?.addEventListener('click', () => {
		const chat = document.querySelector('.chat-bot__chat')
		const close = chat.querySelector('.chat__close')

		chat.style.transform = 'translateY(0)'
		close.addEventListener('click', () => chat.removeAttribute('style'))
	})
}