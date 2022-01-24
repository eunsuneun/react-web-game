import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch}) => {
  console.log('tr 렌더링')
  return(
    <tr>
      {Array(rowData.length).fill().map((td,i) => (
        <Td rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} key={i} dispatch={dispatch} />
      ))}
    </tr>
  )
});

export default Tr;