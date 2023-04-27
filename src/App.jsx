import { useState } from 'react'
import './style.scss'
import Board from './components/Board'

function App() {
  const [counter, setCounter] = useState(1);

  const onBtnClick = () => {
    setCounter(currentCounter => {
      return currentCounter + 1;
    });
  };

  return (
    <div className="app">
      <Board />
      <div>
        <button onClick={onBtnClick}>Click me</button>
        <div>{counter}</div>
      </div>
    </div>
  );
}

export default App;
