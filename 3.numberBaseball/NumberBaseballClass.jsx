import React,{ Component, createRef } from 'react';
import Try from './TryClass';

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

class NumberBaseball extends Component {
  state = {
    value: '',
    result: '',
    answer: getNumbers(),
    tries: [],
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.value === this.state.answer.join('')){ // 정답
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, {try: this.state.value, result: '홈런!'}]
        }
      });
      setTimeout(() => {
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          result: '',
          answer: getNumbers(),
          tries: [],
        });
        this.refInput.current.focus();
      }, 1000)
    }else{
      const valueArr = this.state.value.split('').map((v) =>  parseInt(v));
      let strike = 0;
      let ball = 0;
      if(this.state.tries.length >= 9){ // 10번 넘게 시도해서 실패
        this.setState({
          result: `10번 넘게 틀려서 실패 ! 답은 ${this.state.answer.join(',')}였습니다.`
        });
        setTimeout(() => {
          alert('게임을 다시 시작합니다.');
          this.setState({
            value: '',
            result: '',
            answer: getNumbers(),
            tries: []
          });
          this.refInput.current.focus();
        }, 1000);
      }else{ 
        // 볼,스트라이크 계산
        for(let i = 0; i < 4; i++){
          if(valueArr[i] === this.state.answer[i]){
            strike += 1;
          }else if(this.state.answer.includes(valueArr[i])){
            ball += 1;
          };
        };
        this.setState((prevState) => {
          return {
            value: '',
            result: `${ball}볼, ${strike}스트라이크`,
            tries: [...prevState.tries, {try: this.state.value, result: `${ball}볼, ${strike}스트라이크`}]
          }
        });
        this.refInput.current.focus();
      }
    }
  };
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  refInput = createRef();

  render(){
    return(
      <>
        <p>class</p>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" maxLength={4} ref={this.refInput} value={this.state.value} onChange={this.onChangeInput}/>
          <button>입력</button>
        </form>
        <div>
          <p>시도 : {this.state.tries.length}</p>
          <ul>
            {this.state.tries.map((v,i) => {
              return(
                <Try key={`${i+1}차 시도`} tryInfo={v} />
              );
            })}
          </ul>
        </div>
      </>
    )
  }
}

export default NumberBaseball;

