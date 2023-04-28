const StatusMessage = ({ winner, gamingBoard }) => {
    
  const { squares, isXNext } = gamingBoard; //is the same as "const squares = gamingBoard.squares" for example.

  const nextPlayer = isXNext ? 'X' : 'O'; //derived value from latest state
  const noMovesLeft = squares.every(squareValue => squareValue !== null); //returns a boolean

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <div>Winner is {''} 
            <span className={winner === 'X' ? 'text-green' : 'text-orange'}>{winner}</span>
        </div>
      );
    }
    if (!winner && noMovesLeft) {
      return (
        <div>
            <span className="text-orange">O</span> and {''} 
            <span className="text-green">X</span> tied
        </div>
      );
    }
    if (!winner && !noMovesLeft) {
      return (
        <div className="status-message">Next player is {''} 
            <span className={isXNext ? 'text-green' : 'text-orange'}>{nextPlayer}</span>
        </div>
      );
    }
    return null;
  };

  return <div className="status-message">{renderStatusMessage()}</div>;
};

export default StatusMessage;
