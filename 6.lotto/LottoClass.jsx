import React, { PureComponent } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  console.log([...winNumbers, bonusNumber]);
  return [...winNumbers, bonusNumber];
}

class Lotto extends PureComponent {
  state = {
    winNumbers: getWinNumbers(),
    balls: [],
    bonus: null,
    replay: false,
  };

  timeouts = [];
  
  runTimeouts = () => {
    const { winNumbers } = this.state;
    // 당첨볼
    for(let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            balls: [...prevState.balls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000)
    };
    // 보너스볼
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        replay: true,
      });
    },7000);
  };
  onClickReplay = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      balls: [],
      bonus: null,
      replay: false,
    });
    this.timeouts = [];
    // setTimeout(() => {
    //   this.runTimeouts();
    // }, 0);
  };
  componentDidMount() {
    this.runTimeouts();
  };
  componentDidUpdate() {
    if (this.state.balls.length === 0) {
      console.log('로또 숫자를 다시 생성합니다.');
      this.runTimeouts();
    }
  };
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearInterval(v);
    })
  };
  render(){
    const { balls, bonus, replay } = this.state;
    return(
      <>
        <p>class</p>
        <p>당첨 볼 !</p>
        <div>{ balls.map((v) => <Ball key={v} number={v} />) }</div>
        <p>보너스 볼 !</p>
        {bonus && <Ball number={bonus}/> }
        {replay && <button onClick={this.onClickReplay}>한 번 더</button>}
      </>
    )
  }
}

export default Lotto;