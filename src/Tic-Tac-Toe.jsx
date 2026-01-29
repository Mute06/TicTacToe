import { useState } from "react";

export default function Board(){

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i){
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext){
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function resetGame(){
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    const winner = calculateWinner(squares);
    const isDraw = !winner && !squares.includes(null);
    let status;
    if (winner){
        status = 'Winner: ' + winner;
    }
    else{
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        if (isDraw){
            status = 'Draw!';
        }
    }

    return(
        <>
        <div className="board">
        <h1>Tic Tac Toe</h1>
         <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
</canvas> 
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={ () => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={ () => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={ () => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={ () => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={ () => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={ () => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={ () => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={ () => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={ () => handleClick(8)} />
            </div>
        <ResetGame shouldDisplay={winner || isDraw} onClick={resetGame} />
        </div>
        
        </>
    );
}

function Square({value, onSquareClick}){


    return(
        <button className="square"
        onClick={onSquareClick}>
            {value}
        </button>
    );
}

function ResetGame({shouldDisplay , onClick}){
    if (!shouldDisplay) return null;
    return(
        <button className="play-again" onClick={onClick}>Play Again</button>
    );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
