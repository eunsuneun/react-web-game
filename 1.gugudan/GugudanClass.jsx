const React = require('react');
const {Component} = React;

class Gugudan extends Component{
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: ''
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(this.state.value) === this.state.first * this.state.second){
      this.setState((prevState) => {
        return{
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
          result: prevState.value + '(은)는 정답입니다.'
        }
      });
      this.inputEl.focus();
    }else{
      this.setState({
        value: '',
        result: '땡입니다.'
      });
      this.inputEl.focus();
    }
  };
  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };
  inputEl;
  onRefInput = (c) => {
    this.inputEl = c;
  };
  render(){
    return(
      <>
        <h2>{this.state.first} 곱하기 {this.state.second} 는?</h2>
        <form onSubmit={this.onSubmitForm}>
          <input type="number" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
          <button type='submit'>확인</button>
        </form>
        <p>{this.state.result}</p>
      </>
    );
  }
}

module.exports = Gugudan;