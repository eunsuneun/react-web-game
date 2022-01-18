import React,{ memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return(
    <>
      <li>
        <p>{tryInfo.try}</p>
        <p>{tryInfo.result}</p>
      </li>
    </>
  )
});

export default Try;