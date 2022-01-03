import { useState, useEffect } from 'react';

const ScoreBoard = ({scoreBoard}) => {
        // console.log('scorre props:', score,  ' :scoreBoard: ' , scoreBoard)


// console.log('scoreBoard: ' , scoreBoard)
    return (
        <div className="score-board">
            <h2>Game Score Board</h2>
            <table>
                <thead>
                <tr>
                    <td>Date</td>
                    <td>Score</td>
                    <td>Moves</td>
                </tr>
                </thead>
                <tbody>
                {scoreBoard.length === 0 && <tr>
                    <td colSpan="3">No Scores Yet!</td>    
                </tr>}
                {scoreBoard?.map((score) => <tr>
                    <td>{score.date}</td>
                    <td>{score.score}</td>
                    <td>{score.moves}</td>
                </tr>)}
                </tbody>
            </table>
      </div>
    )
}

export default ScoreBoard;