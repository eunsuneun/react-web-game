import React, { useState, useRef, memo } from 'react';
import Try from './TryHooks';

function getNumbers() { 
  // this를 쓰지않는 함수는 밖으로 빼는게 좋다. 다른데서도 쓸 수 있도록
  // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i++){
    const selected = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(selected);
  }
  console.log(array);
  return array;
};

const NumberBaseball = memo(() => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')){
      setResult('홈런');
      setTries((prevState) => {
        return [...prevState, {try: value, result: '홈런'}]
      });
      setTimeout(() => {
        alert('게임을 다시 시작합니다.');
        setValue('');
        setResult('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      }, 1000)
    }else{
      const valueArr = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9){
        setResult(`10번 넘게 틀려서 실패 ! 답은 ${answer.join(',')}였습니다.`);
        setTimeout(() => {
          alert('게임을 다시 시작합니다.');
          setValue('');
          setResult('');
          setAnswer(getNumbers());
          setTries([]);
          inputEl.current.focus();
        }, 1000);
      }else{
        for(let i = 0; i < 4; i++){
          if(valueArr[i] === answer[i]){
            strike += 1;
          }else if(answer.includes(valueArr[i])){
             ball += 1;
          }
        };
        setValue('');
        setResult(`${ball}볼, ${strike}스트라이크`);
        setTries((prevState) => {
          return [...prevState, {try: value, result: `${ball}볼, ${strike}스트라이크`}];
        });
        inputEl.current.focus();
      }
    }
  }
  const onchangeInput = (e) => {setValue(e.target.value);}
  return(
    <>
      <p>hooks</p>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input type="text" maxLength={4} ref={inputEl} value={value} onChange={onchangeInput}/>
        <button>입력</button>
      </form>
      <div>
        <p>시도 : {tries.length}</p>
        <ul>
          {tries.map((v,i) => <Try key={`${i+1}차 시도`} tryInfo={v} /> )}
        </ul>
      </div>
    </>
  )
});

export default NumberBaseball;