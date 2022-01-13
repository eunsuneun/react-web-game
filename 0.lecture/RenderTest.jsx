const React = require('react');
const { Component } = React;

class RenderTest extends Component {
  state = {
    counter: 0,
  }
  shouldComponentUpdate(nextProps, nextState, nextContext){
    if(this.state.counter !== nextState.counter){
      return true;
    }
    return false;
  }
  onClickButton = () => {
    this.setState((prevState) => {
      return {

      }
    })
  }
  render(){
    console.log('렌더링', this.state)
    return(
      <>
        <p>{this.state.counter}</p>
        <button onClick={this.onClickButton}>증가</button>
      </>
    )
  }
}

module.exports = RenderTest;