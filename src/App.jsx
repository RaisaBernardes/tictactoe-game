import { useState } from 'react'
import './style.scss'
import Board from './components/Board'
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';

function App() {

  const[history, setHistory] = useState([
    {squares: Array(9).fill(null), isXNext: false},
  ])

  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove]

  const winner = calculateWinner(gamingBoard.squares);

  console.log({history, currentMove}); //************************** 
  
  const handleSquareClick = clickedPosition => {
    if(gamingBoard.squares[clickedPosition] || winner){
        return;
    }
    setHistory(currentHistory => {

      const isTraversing = currentMove + 1 !== currentHistory.lenght;

      const lastGamingState = isTraversing ? currentHistory[currentMove] : currentHistory[currentHistory.length - 1];
      
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

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard}/>
      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} />
      <h3>Game History</h3>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
}

export default App;
