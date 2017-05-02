import $ from 'jquery'
import MarkdownEditor from './components/markdown-editor'
import React from 'react'
import ReactDOM from 'react-dom'
import 'select2'
//require('isomorphic-fetch')
import './styles/index.scss'

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

  form.addEventListener('submit', form => {
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
  $(selector).select2({
    theme: 'bootstrap',
  })
  onChange && $(selector).on('select2:select', onChange)
}

function markdownEditor() {
  const textareas = document.querySelectorAll('.markdown-editor')
  Array.from(textareas).map(textarea => {
    textarea.style.display = 'none'
    const editor = document.createElement('div')
    textarea.parentNode.insertBefore(editor, textarea.nextSibling)
    ReactDOM.render(
      <MarkdownEditor
        textarea={textarea}
        value={textarea.value}
      />,
      editor
    )
  })
}

markdownEditor()

module.exports = {
  selectSearch,
  stripeCheckout,
}
