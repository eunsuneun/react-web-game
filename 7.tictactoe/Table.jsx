import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({onClickTable, tableData, dispatch}) => {
  console.log('table 렌더링')
  return(
    <table onClick={onClickTable}>
      <tbody>
        {Array(tableData.length).fill().map((tr,i) => (<Tr rowData={tableData[i]} rowIndex={i} key={i} dispatch={dispatch} />))}
      </tbody>
    </table>
  )
});

export default Table;