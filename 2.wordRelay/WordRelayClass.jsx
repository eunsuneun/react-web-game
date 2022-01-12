const React = require('react');
const { Component } = React;

class WordRelay extends Component{
  state = {
    word: '산기슭',
    value: '',
    result: ''
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
      this.setState({
        word: this.state.value,
        value: '',
        result: 'good !'
      });
      this.inputEl.focus();
    }else{
      this.setState({
        value: '',
        result: '땡'
      });
      this.inputEl.focus();
    }
  };
  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };
  inputEl;
  onRefInputEl = (c) => {this.inputEl = c};
  render(){
    return(
      <>
        <h2>{this.state.word}</h2>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" ref={this.onRefInputEl} value={this.state.value} onChange={this.onChangeInput} />
          <button>확인</button>
        </form>
        <p>{this.state.result}</p>
      </>
    );
  }
}

module.exports = WordRelay;