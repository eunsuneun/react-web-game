const React = require('react');
const ReactDom = require('react-dom');

const RenderTest = require('./0.lecture/RenderTest');

const GugudanClass = require('./1.gugudan/GugudanClass');
const GugudanHooks = require('./1.gugudan/GugudanHooks');

const WordRelayClass = require('./2.wordRelay/WordRelayClass');
const WordRelayHooks = require('./2.wordRelay/WordRelayHooks');

import NumberBaseballClass from './3.numberBaseball/NumberBaseballClass';
import NumberBaseballHooks from './3.numberBaseball/NumberBaseballHooks';

import ResponseCheckClass from './4.ResponseCheck/ResponseCheckClass';
import ResponseCheckHooks from './4.ResponseCheck/ResponseCheckHooks';

import RockScssiorPaperClass from './5.rockScissorPaper/RockScssiorPaperClass';
import RockScssiorPaperHooks from './5.rockScissorPaper/RockScssiorPaperHooks';

ReactDom.render(<RockScssiorPaperHooks />, document.querySelector('#root'));