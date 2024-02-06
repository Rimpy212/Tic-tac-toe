import './App.css';
import Player from './components/Player';
import Gameboard from './components/Gameboard';
import GameOver from './components/GameOver';
import { useState } from 'react';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './WINNING_COMBINATIONS';

const PLAYERS={
  X:'Player 1',
  O:'Player 2'
}

const INTIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard,players)
{
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];

    //Checking condition for all combinations
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol)
    {
        winner=players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
      if(gameTurns.length > 0 && gameTurns[0].player==='X')
      {
        currentPlayer='O';
      }
      return currentPlayer;
}


function deriveGameBoard(gameTurns)
{
  let gameBoard = [...INTIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [players,setPlayers]=useState(PLAYERS);

  const[gameTurns,setGameTurns]=useState([]);
  const[hasWinner,setHasWinner]=useState(false);

  //const [activePlayer,setActivePlayer]=useState('X');
  //Managing state here but this we can get this from player.currentPlayer so remove this with hepler function
  const activePlayer=deriveActivePlayer(gameTurns);

  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard, players);
  const hasDraw=gameTurns.length===9 && !winner;
  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((curActivePlayer) => curActivePlayer==='X' ? 'O' : 'X');
    setGameTurns(prevTurns =>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      // let currentPlayer='X';
      // //We are checking condition here because we are appending as first entry
      // if(prevTurns.length > 0 && prevTurns[0].player==='X')
      // {
      //   currentPlayer='O';
      // }
      const updatedTurns=[{square: {row:rowIndex,col:colIndex}, player:currentPlayer },...prevTurns];
      return updatedTurns;
    })
  }

  function reset()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName)
  {
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} handlePlayerNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} handlePlayerNameChange={handlePlayerNameChange}/>
        </ol>
        {
          (winner || hasDraw) && <GameOver winner={winner} reset={reset}/>
        }
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
