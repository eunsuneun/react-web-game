const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random()*9));
  const [second, setSecond] = useState(Math.ceil(Math.random()*9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef(null);
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      setFirst(Math.ceil(Math.random()*9));
      setSecond(Math.ceil(Math.random()*9));
      setValue('');
      setResult('정답');
      inputEl.current.focus();
    }else{
      setValue('');
      setResult('땡!');
      inputEl.current.focus();
    };
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return(
    <>
      <h2>{first} 곱하기 {second} 는?</h2>
      <form onSubmit={onSubmitForm}>
        <input 
          type="number" 
          ref={inputEl} 
          value={value} 
          onChange={onChangeInput}
        />
        <button type='submit'>확인</button>
      </form>
      <p>{result}</p>
    </>
  );
}

module.exports = Gugudan;