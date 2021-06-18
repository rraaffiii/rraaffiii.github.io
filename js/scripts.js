window.addEventListener('DOMContentLoaded', (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav')
    if (!navbarCollapsible) {
      return
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }
  }

  // Shrink the navbar
  navbarShrink()

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink)

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav')
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 72,
    })
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler')
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  )
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click()
      }
    })
  })
})

//Form handling
let form = document.getElementById('contactForm')

let cname = form.elements['name']
let email = form.elements['email']
let message = form.elements['message']

let inputs = [cname, message]
let valid = false
let errors = []

const setError = (alertNode) => {
  errors.push(alertNode)
  valid = false
  alertNode.style.display = 'block'
}
const setSuccess = (alertNode) => {
  valid = true
  alertNode.style.display = 'none'
}

const checkEmptyField = (input) => {
  const alertNode =
    input.parentNode.getElementsByClassName('invalid-feedback')[0]
  if (input.value.trim() === '') {
    setError(alertNode)
  } else {
    setSuccess(alertNode)
  }
}

inputs.forEach((input) => {
  input.addEventListener('blur', (e) => {
    checkEmptyField(e.target)
  })
})

email.addEventListener('blur', (e) => {
  const alertNode =
    e.target.parentNode.getElementsByClassName('invalid-feedback')[0]
  if (e.target.value.trim() === '') {
    setError(alertNode)
  }
})

email.addEventListener('input', (e) => {
  const alertNode =
    e.target.parentNode.getElementsByClassName('invalid-feedback')[0]
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const validEmail = emailRegEx.test(e.target.value.trim())

  if (!validEmail) {
    setError(alertNode)
  } else {
    setSuccess(alertNode)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputs = [cname, email, message]
  inputs.forEach((input) => {
    checkEmptyField(input)
  })

  if (valid && errors.length == 0) {
    const url = '/mail.php'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: cname.value,
        email: email.value,
        message: message.value,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => {
        let successNode = document.getElementById('submitSuccessMessage')
        successNode.classList.remove('d-none')
      })
      .catch((err) => {
        let errorNode = document.getElementById('submitErrorMessage')
        errorNode.classList.remove('d-none')
      })
  } else {
    e.preventDefault()
  }
  errors = []
})
