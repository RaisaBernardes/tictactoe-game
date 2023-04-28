import { useState } from 'react'
import './style.scss'
import Board from './components/Board'
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';

const NEW_GAME = [{squares: Array(9).fill(null), isXNext: false}]; //since this is static and we don't need to create a rerender, we keep it outside of app()

function App() {

  const[history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove]

  const {winner, winningSquares} = calculateWinner(gamingBoard.squares);

  console.log({history, currentMove});
  
  const handleSquareClick = clickedPosition => {
    if(gamingBoard.squares[clickedPosition] || winner){
        return;
    }
    setHistory(currentHistory => {

      const isTraversing = currentMove + 1 !== currentHistory.lenght;

      const lastGamingState = isTraversing 
      ? currentHistory[currentMove] 
      : currentHistory[currentHistory.length - 1];
      
      const nextSquaresState =  lastGamingState.squares.map((squareValue, position) => {
            if(clickedPosition === position){
                return lastGamingState.isXNext ? 'X' : 'O';
            }
            return squareValue;
        });

        const base = isTraversing 
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

        return base.concat({
          squares: nextSquaresState, 
          isXNext: !lastGamingState.isXNext
        });
    });
    setCurrentMove(move => move + 1); //"move" represents the current/actual move.
  };

  //function to move to a certain time of the game history
  const moveTo = move => {
    setCurrentMove(move);
  }

  const onNewGameStart = () =>{
    setHistory(NEW_GAME);
    setCurrentMove(0);
  }

  return (
    <div className="app">
      <h1>TIC <span className='text-green'>TAC</span> TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard}/>
      <Board 
      squares={gamingBoard.squares} 
      handleSquareClick={handleSquareClick} 
      winningSquares={winningSquares}
      />
      
      <button 
      type='button' 
      onClick={onNewGameStart} 
      className={`btn-reset ${winner ? 'active' : ''}`}>
      Start new game
      </button>

      <h2 style={{
        fontWeight: 'normal',
      }}>Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>

      <div className='bg-balls'></div>
    </div>
  );
}

export default App;
