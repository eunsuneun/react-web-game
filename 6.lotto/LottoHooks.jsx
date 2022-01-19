import React,{ useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  console.log('getWinNumbers : ' + [...winNumbers, bonusNumber]);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumber = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumber);
  const [balls, setBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [replay, setReplay] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      })
    };
  },[timeouts.current]);

  const runTimeouts = () => {
    console.log('runtimeouts');
    // 당첨볼
    for(let i = 0; i < winNumbers.length - 1; i++){
      timeouts.current[i] = setTimeout(() => {
        setBalls((prevBalls) => [...prevBalls, winNumbers[i]] );
      }, (i + 1) * 1000);
    };
    // 보너스볼
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setReplay(true);
    }, 7000);
  };
  
  const onClickReplay = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setBalls([]);
    setBonus(null);
    setReplay(false);
    timeouts.current = [];
  }, []);
  return( 
    <>
      <p>hooks</p>
      <p>당첨 볼 !</p>
      <div>{ balls.map((v) => <Ball key={v} number={v} />) }</div>
      <p>보너스 볼 !</p>
      {bonus && <Ball number={bonus}/> }
      {replay && <button onClick={onClickReplay}>한 번 더</button>}
    </>
  )
}

export default Lotto;