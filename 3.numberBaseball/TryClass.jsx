import React, { PureComponent } from 'react';

class Try extends PureComponent{
  render(){
    const { tryInfo } = this.props;
    return(
      <>
        <li>
          <p>{tryInfo.try}</p>
          <p>{tryInfo.result}</p>
        </li>
      </>
    );
  }
}

export default Try;