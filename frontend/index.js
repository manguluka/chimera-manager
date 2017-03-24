//require('isomorphic-fetch')
const React = require('react')
const ReactDOM = require('react-dom')
require('./styles/index.scss')

console.log('Hello World!')

const editor = document.querySelector('.markdown-editor')
if (editor) {
  ReactDOM.render(<h1>hi</h1>, editor)
}
