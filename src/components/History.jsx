const History = ({history, moveTo, currentMove}) => {
return (
    <div className="history-wrapper">
        <ul className="history">
            {history.map((_, index) => (
                <li key={index}> {/*when you use .map inside jsx markup to map an array element to jsx you need to always pass the key prop for the element*/}
                    <button 
                    type="button" 
                    className={`btn-move ${currentMove === index ? 'active' : ''}`} 
                    onClick={() => moveTo(index)}
                    >
                        {index === 0 ? 'Go to game Start' : `Go to move #${index}`}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
};

export default History;