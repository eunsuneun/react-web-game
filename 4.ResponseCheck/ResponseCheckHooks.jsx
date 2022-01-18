import React, { useState,useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  const onClickScreen = () => {
    if(state === 'waiting'){
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        startTime.current = new Date();
        setState('now');
        setMessage('지금 클릭 !');
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    }else if(state === 'ready'){ // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시네요ㅋ\n클릭해서 다시 시작하세요.');
      setTimeout(()=>{
        document.querySelector('#screen').classList.add('waiting-again');
      },0)
    }else if(state === 'now'){ // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]
      });
    }
  };
  const renderAverage = () => {
    return (
      result.length === 0 
      ? null 
      : <>
          <div>평균 시간: {result.reduce((a,c)=>a+c) / result.length}ms</div>
          <button onClick={onClickReset}>리셋</button>
        </>
    )
  };
  const onClickReset = () => {
    setResult([]);
  };
  return(
    <>
      <div id='responsive-check'>
        <p>hooks</p>
        <div id='screen' className={state} onClick={onClickScreen}>
          {message}
        </div>
        {renderAverage()}
      </div>
    </>
  );
}

export default ResponseCheck;