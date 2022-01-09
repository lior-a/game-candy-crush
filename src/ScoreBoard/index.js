import { getScoreBoardList, getScoreBoardSortByHighScoreList } from './scoreBoardSlice';
import { useSelector, useDispatch, Provider } from "react-redux";

const ScoreBoard = () => {
    const scoreBoardList = useSelector(getScoreBoardSortByHighScoreList);

    return (
        <div className="content-card score-board no-rotate">
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