const React = require('react');
const ReactDom = require('react-dom');
const RenderTest = require('./0.lecture/RenderTest');
const Gugudan = require('./1.gugudan/Gugudan');
const WordRelay = require('./2.wordRelay/WordRelay');
import NumberBaseball from './3.numberBaseball/NumberBaseball';

ReactDom.render(<NumberBaseball />, document.querySelector('#root'));