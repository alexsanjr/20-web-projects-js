const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement

  formControl.classList.remove('success')
  formControl.classList.add('error')

  const small = formControl.querySelector('small')
  small.innerText = message 
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.classList.add('success')
  formControl.classList.remove('error')
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(re.test(input.value)) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    console.log(input);
    if(input.value.trim() === '') {
      showError(input, `${capitalize(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input,`${capitalize(input)} must be at least ${min} characters`)
  }
  else if(input.value.length > max) {
    showError(input,`${capitalize(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input)
    return true
  }
}

// Check password match

function checkPasswordMatch(p1, p2) {
  if(p1.value !== p2.value) {
    showError(p2, 'Passwords do not match')
  }
}

// capitalization
function capitalize(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}


//Event listeners
form.addEventListener('submit',e => {
  e.preventDefault()

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordMatch(password, password2)
})

