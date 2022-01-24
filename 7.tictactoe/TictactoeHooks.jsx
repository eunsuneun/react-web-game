import React, { useReducer, useEffect } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  recentCell: [-1, -1],
};
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      }
    }
    case CHANGE_TURN: 
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
        winner: action.winner
      }
    default:
      return state;
  }
};
const Tictactoe = () => {
  console.log('tictactoe 렌더링')
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, turn, recentCell } = state;
  useEffect(() => {
    const [row, cell] = recentCell;
    let win = false;
    if(row < 0){ return; }
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if(win) { // 승리
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAME, winner: turn});
      return;
    }else { 
      // 무승부 검사
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell) {
            all = false;
          }
        })
      })
      if(all) { // 무승부
        dispatch({type: RESET_GAME, winner: '무승부'});
      }else{
        dispatch({type: CHANGE_TURN});
      }
    }
  },[recentCell]);
  return(
    <>
      <div id='tictactoe'>
        <h1>틱택토 게임</h1>
        <Table tableData={tableData} dispatch={dispatch} />
        {winner && <div>{winner}{winner === 'O' || winner === 'X' ? '님의 승리' : ''}</div>}
      </div>
    </>
  )
};

export default Tictactoe;