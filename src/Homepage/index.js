import { Link } from "react-router-dom";

const Homepage = () => {
    return (
      <div className="Homepage">
        <ul className="menu">
          <li>
            <Link to="/game-play" className="button-53">
              Start Game
            </Link>
          </li>
          <li>
            <Link to="/score-board" className="button-53 right-rotate">
            Score Board
            </Link>
          </li>
          <li>
            <Link to="/how-to-play" className="button-53">
            How To Play
            </Link>
          </li>
          <li>
            <Link to="/about" className="button-53 right-rotate">
            About
            </Link>
          </li>
        </ul>
      </div>
    )
}

export default Homepage;