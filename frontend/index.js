const $ = require('jquery')
require('select2')
//require('isomorphic-fetch')
//const React = require('react')
//const ReactDOM = require('react-dom')
require('./styles/index.scss')

console.log('Frontend loaded with environment:', process.env.NODE_ENV)

//const editor = document.querySelector('.markdown-editor')
//if (editor) {
  //ReactDOM.render(<h1>hi</h1>, editor)
//}

function stripeCheckout({
  amount,
  description,
  email,
  emailField,
  form,
  key,
  name,
  tokenField,
}) {

  const handler = StripeCheckout.configure({
    key,
    //image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token(token) {
      console.log('token', token)
      tokenField.value = token.id
      emailField.value = token.email
      form.submit()
    },
  })

  form.addEventListener('submit', (form) => {
    form.preventDefault()
    handler.open({
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      name,
      description,
      email,
      amount,
    })
  })
}

function selectSearch(selector, onChange) {
  $(selector).select2()
  $(selector).on('select2:select', onChange)
}

module.exports = {
  selectSearch,
  stripeCheckout,
}
