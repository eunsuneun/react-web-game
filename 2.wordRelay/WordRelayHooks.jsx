const React = require('react');
const { useState, useRef } = React;


const WordRelay = () => {
  const [word, setWord] = useState('토스트');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length - 1] === value[0]){
      setWord(value);
      setValue('');
      setResult('good !');
      inputRef.current.focus();
    }else{
      setValue('');
      setResult('땡 !');
      inputRef.current.focus();
    }
  }
  const onChangeInput = (e) => {setValue(e.target.value);}
  return(
    <>
      <h2>{word}</h2>
      <form onSubmit={onSubmitForm}>
        <input type="text" value={value} onChange={onChangeInput} ref={inputRef}/>
        <button>확인</button>
      </form>
      <p>{result}</p>
    </>
  )
}

module.exports = WordRelay;