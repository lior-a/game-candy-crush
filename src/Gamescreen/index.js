import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNewScoreToBoad } from '../ScoreBoard/scoreBoardSlice';
import ClockCounter from './ClockCounter';
import blueCandy from '../images/blue-candy.png';
import greenCandy from '../images/green-candy.png';
import orangeCandy from '../images/orange-candy.png';
import purpleCandy from '../images/purple-candy.png';
import redCandy from '../images/red-candy.png';
import yellowCandy from '../images/yellow-candy.png';
import blankCandy from '../images/blank.png';
import { getDateString } from '../utils';
import { useNavigate } from 'react-router-dom';

const width = 8;

const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
];

const Gamescreen = () => {
  const [currentColorBoard, setCurrentColorBoard] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [movesDisplay, setMovesDisplay] = useState(0);
  
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorBoard[i]
        const isBlank = currentColorBoard[i] === blankCandy

        if (columnOfFour.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
            setScoreDisplay((score) => score + 4)
            columnOfFour.forEach(square => currentColorBoard[square] = blankCandy)
            return true
        }
    }
  }

  const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
          const rowOfFour = [i, i + 1, i + 2, i + 3];
          const decidedColor = currentColorBoard[i];
          const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
          const isBlank = currentColorBoard[i] === blankCandy;

          if (notValid.includes(i)) continue

          if (rowOfFour.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 4)
              rowOfFour.forEach(square => currentColorBoard[square] = blankCandy)
              return true
          }
      }
  }

  const checkForColumnOfThree = () => {
      for (let i = 0; i <= 47; i++) {
          const columnOfThree = [i, i + width, i + width * 2];
          const decidedColor = currentColorBoard[i];
          const isBlank = currentColorBoard[i] === blankCandy;

          if (columnOfThree.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 3);
              columnOfThree.forEach(square => currentColorBoard[square] = blankCandy);
              return true;
          }
      }
  }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorBoard[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorBoard[i] === blankCandy

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorBoard[square] = blankCandy)
                return true
            }
        }
    }
  
    const moveToSquareBelow = () => {
      for(let a = 0; a <= 55; a++) {
        const firstRow = [0,1,2,3,4,5,6,7];
        const isFirstRow = firstRow.includes(a);
        // create new element
        if(isFirstRow && currentColorBoard[a] === blankCandy) {
          let randomNumber = Math.floor(Math.random() * candyColors.length);
          currentColorBoard[a] = candyColors[randomNumber];
        }
  
        // push it down
        if((currentColorBoard[a + width]) === blankCandy) {
          currentColorBoard[a + width] = currentColorBoard[a];
          currentColorBoard[a] = blankCandy;
        }
      }
    }
  
    const dragStart = (e) => {
      setSquareBeingDragged(e.target);
    }
  
    const dragDrop = (e) => {
      setSquareBeingReplaced(e.target);
    }
  
    const dragEnd = (e) => {
      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
      const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));
      
      setMovesDisplay((prevMovesDisplay) => prevMovesDisplay+1);

      const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width,
      ];
      
      const validMove = validMoves.includes(squareBeingReplacedId);
      
      if(!validMove) {
        return false;
      }
      //fix: not using set state. why?
      // this is eaditing the data itself directly!
      currentColorBoard[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
      currentColorBoard[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');
  
      const isAColumnOfFour = checkForColumnOfFour();
      const isARowOfFour = checkForRowOfFour();
      const isAColumnOfThree = checkForColumnOfThree();
      const isARowOfThree = checkForRowOfThree();
  

      if(squareBeingReplaced && validMove && (
        (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
      )) {
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      } else {
        currentColorBoard[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
        currentColorBoard[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
        setCurrentColorBoard([...currentColorBoard]);
      }

      checkForMatch(1)
    }
  
    const createBoard = () => {
      let randomColorBoard = [];

      for(let a = 0; a < width * width; a ++) {
        const randNumber0to5 = Math.floor(Math.random() * candyColors.length);
        const randomColor = candyColors[randNumber0to5];
  
        randomColorBoard.push(randomColor);
      }
  
      setCurrentColorBoard(randomColorBoard);
    }

    const checkForMatch = (ReactFindMatchAlgoCounter) => {
      ReactFindMatchAlgoCounter++;
      
      // todo: add logger and log the perforemence metric: logger.report({ReactFindMatchAlgoCounter});

      let foundmatch = false;

      // checkForColumnOfFour
      for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorBoard[i]
        const isBlank = currentColorBoard[i] === blankCandy

        if (columnOfFour.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
            setScoreDisplay((score) => score + 4);
            columnOfFour.forEach(square => currentColorBoard[square] = blankCandy);
            foundmatch = true
        }
      }
    
      // checkForRowOfFour
      for (let i = 0; i < 64; i++) {
          const rowOfFour = [i, i + 1, i + 2, i + 3];
          const decidedColor = currentColorBoard[i];
          const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
          const isBlank = currentColorBoard[i] === blankCandy;

          if (notValid.includes(i)) continue

          if (rowOfFour.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 4)
              rowOfFour.forEach(square => currentColorBoard[square] = blankCandy)
              foundmatch =  true
          }
      }
    
      // checkForColumnOfThree
      for (let i = 0; i <= 47; i++) {
          const columnOfThree = [i, i + width, i + width * 2];
          const decidedColor = currentColorBoard[i];
          const isBlank = currentColorBoard[i] === blankCandy;

          if (columnOfThree.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 3);
              columnOfThree.forEach(square => currentColorBoard[square] = blankCandy);
              foundmatch = true;
          }
      }

      // checkForRowOfThree 
      for (let i = 0; i < 64; i++) {
          const rowOfThree = [i, i + 1, i + 2]
          const decidedColor = currentColorBoard[i]
          const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
          const isBlank = currentColorBoard[i] === blankCandy

          if (notValid.includes(i)) continue

          if (rowOfThree.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 3)
              rowOfThree.forEach(square => currentColorBoard[square] = blankCandy)
              foundmatch =  true
          }
      }

      let blanks = currentColorBoard.filter((k,v) => {
        return k === blankCandy || k === undefined
      })

      if(blanks.length > 0) {
        moveToSquareBelow();        
        setCurrentColorBoard([...currentColorBoard])
        checkForMatch(ReactFindMatchAlgoCounter);
      }
      
    }

    useEffect(() => {
      createBoard();
      checkForMatch(1)
    }, [])
      
    const gameOver = () => {
      dispatch(addNewScoreToBoad({
        score: scoreDisplay,
        moves: movesDisplay,
        date: getDateString()
      }));

      navigate(`/score-board`);
    }

    return (
        <div className="content-card no-rotate game-wrapper">
            <div className="game-info">
            <div className="score">
                <h2>Score: {scoreDisplay}</h2>
            </div>
            <div className="moves">
                <h2>Moves: {movesDisplay}</h2>
            </div>
            <ClockCounter gameOver={gameOver}/>
            </div>
            <div className="game-board">
            {currentColorBoard.map((candyColor, index) => (
                <img key={index}
                  data-id={index}
                  draggable={true}
                  alt={candyColor}
                  title={index}
                  onDragStart={dragStart}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                  src={candyColor}
                  style={{backgroundColor: candyColor}} />
                ))}
            </div>
        </div>
    )
}


export default Gamescreen;