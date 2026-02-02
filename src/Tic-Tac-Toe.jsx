import { useState } from "react";
import { AscendingIcon, DescendingIcon } from "./icons.jsx";

function Board({xIsNext, squares, onPlay}){


    function handleClick(i){
        if (squares[i] || calculateWinner(squares).winner) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext){
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        
        onPlay(nextSquares);
    }


    const { winner, winningSquares } = calculateWinner(squares);
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

    const size = 3;

    function renderSquare(i){
        return (
            <Square key = {i} value={squares[i]} onSquareClick={ () => handleClick(i)} isWinningSquare={winningSquares.includes(i)} />
        );
    }
    function renderRow(row){
        const squaresInRow = Array.from({length: size}, (_, col) =>
        {
            const i = row * size + col;
            return renderSquare(i);
        });

        return (
            <div className="board-row" key={row}>
                {squaresInRow}
            </div>
        );
    
    }

    const rows = Array.from({length: size}, (_, row) => renderRow(row));


    return(
        <>
        <div className="board">
        <h1>Tic Tac Toe</h1>
            <div className="status">{status}</div>
            {rows}
        </div>
        
        </>
    );
}

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [asc, setAsc] = useState(true);

    const xIsNext = (currentMove % 2) === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    function toggleSortOrder(){
        setAsc(!asc);
    }
    const historyCopy = asc ? history : [...history].reverse();
    
    const moves = historyCopy.map((squares, move) => {
        
        if (!asc){
            move = history.length - 1 - move;
        }
        let description;
        if (move > 0){
            description = 'Go to move #' + move;
        }
        else{
            description = 'Go to game start';
        }

        let posText = '';
        if (move > 0){
            const prev = history[move - 1];
            const changedIndex = prev.findIndex((v, i) => v !== squares[i]);
            if (changedIndex !== -1){

                const size = 3;
                const row = Math.floor(changedIndex / size) + 1; 
                const col = (changedIndex % size) + 1;           
                const player = (move % 2) === 1 ? 'X' : 'O';
                posText = ` — ${player} (${col},${row})`;
            }
        }

        if (move === currentMove){
            return (
            <li key = {move}>
                <div className="current-move">You are at move #{move}{posText}</div>
            </li>
            );
        }
        return (
            <li key = {move}>
                <button className="move-button" onClick={() => jumpTo(move)}>
                    {description} {posText}
                </button>
            </li>
        );
    });
    

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={toggleSortOrder}>
                    {asc ? <AscendingIcon /> : <DescendingIcon />}
                </button>
                <ol>{moves}</ol>

            </div>
        </div>
    );
}

function Square({value, onSquareClick, isWinningSquare}){


    return(
        <button className={`square ${isWinningSquare ? 'square-winning' : ''}`}
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
        const winner = squares[a];
        const winningSquares = lines[i];
        return {winner, winningSquares};
    }
  }
  return {winner: null, winningSquares: []};
}