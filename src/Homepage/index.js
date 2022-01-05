import { Link } from "react-router-dom";

const Homepage = () => {
    return (
      <div className="Homepage">
        <ul className="menu">
          <li>
            <Link to="/game-play">
              Start Game
            </Link>
          </li>
          <li>
            <Link to="/score-board">
            Score Board
            </Link>
          </li>
          <li>
            <Link to="/how-to-play">
            How To Play
            </Link>
          </li>
          <li>
            <Link to="/about">
            About
            </Link>
          </li>
        </ul>
      </div>
    )
}

export default Homepage;