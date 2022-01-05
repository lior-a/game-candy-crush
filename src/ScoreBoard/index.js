const ScoreBoard = ({scoreBoardList}) => {
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
                {scoreBoardList.length === 0 && <tr>
                    <td colSpan="3">No Scores Yet!</td>    
                </tr>}
                {scoreBoardList?.map((score, index) => <tr key={index}>
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