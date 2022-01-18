import React,{ Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state } = this.state;
    if(state === 'waiting'){
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.startTime = new Date();
        this.setState({
          state: 'now',
          message: '지금 클릭 !'
        });
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    }else if(state === 'ready'){ // 성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시네요ㅋ\n클릭해서 다시 시작하세요.',
      });
      setTimeout(()=>{
        document.querySelector('#screen').classList.add('waiting-again');
      },0)
    }else if(state === 'now'){ // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return{
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        }
      });
    }
  };
  renderAverage = () => {
    const {result} = this.state;
    return (
      result.length === 0 
      ? null 
      : <>
          <div>평균 시간: {result.reduce((a,c)=>a+c) / result.length}ms</div>
          <button onClick={this.onClickReset}>리셋</button>
        </>
    )
  };
  onClickReset = () => {
    this.setState({
      result: [],
    })
  }
  render(){
    const { state, message } = this.state;
    return(
      <>
        <div id='responsive-check'>
          <p>class</p>
          <div id='screen' className={state} onClick={this.onClickScreen}>
            {message}
          </div>
          {this.renderAverage()}
        </div>
      </>
    );
  }
}

export default ResponseCheck;