const React = require('react');
const ReactDom = require('react-dom');
const Gugudan = require('./1.gugudan/Gugudan');
const WordRelay = require('./2.wordRelay/WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));