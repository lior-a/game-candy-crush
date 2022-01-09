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
  const [currentColorBoard, setCurrentColorBoard2] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [movesDisplay, setMovesDisplay] = useState(0);
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const setCurrentColorBoard = (data, source) => {
    // console.log('data:' , data.length, 'source:', source);

    setCurrentColorBoard2(data)
  }
  
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
        setCurrentColorBoard([...currentColorBoard], 'drag end');
      }
      // console.timeLog('currentColorBoardV1', window.currentColorBoardV1, 'currentColorBoardV2:' , window.currentColorBoardV2)

      checkForMatch(1)
    }
  
    const createBoard = () => {
      let randomColorBoard = [];

      // todo: remove the mock. for some reason the mock doesn't work?!
      for(let a = 0; a < width * width; a ++) {
        const randNumber0to5 = Math.floor(Math.random() * candyColors.length);
        const randomColor = candyColors[randNumber0to5];
  
        randomColorBoard.push(randomColor);
      }
  
      // randomColorBoard = ["/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/red-candy.3658b37c743115db2a9a.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/blue-candy.73120c156936a4206714.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/purple-candy.ae25b8a55e061a50346f.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/green-candy.599f70161bdb3cadac66.png","/static/media/orange-candy.f106b2cdd163575a7c68.png","/static/media/yellow-candy.a3d87a9b362b5f969133.png","/static/media/red-candy.3658b37c743115db2a9a.png"];

      setCurrentColorBoard(randomColorBoard, 'createboard');
    }

    const checkForMatch = (cc) => {
      cc++;
      console.log('counter: ' , cc)
      let foundmatch = false;
      if(cc>=800)
        return false;

        //checkForColumnOfFour
        for (let i = 0; i <= 39; i++) {
          const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
          const decidedColor = currentColorBoard[i]
          const isBlank = currentColorBoard[i] === blankCandy
  
          if (columnOfFour.every(square => currentColorBoard[square] === decidedColor && !isBlank)) {
              setScoreDisplay((score) => score + 4)
              columnOfFour.forEach(square => currentColorBoard[square] = blankCandy)
              foundmatch = true
          }
      }
    
  
    /// checkForRowOfFour = () => {
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
    
  
    // checkForColumnOfThree = () => {
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
  
  
      // checkForRowOfThree = () => {
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
      // setCurrentColorBoard([...currentColorBoard], 'checkForMatch1')

      
      // debugger
      let blanks = currentColorBoard.filter((k,v) => {
        return k === blankCandy || k === undefined
      })


      // console.log('2checkForMatch: currentColorBoard', currentColorBoard.length);
      console.log('blanks:' , blanks.length , 'currentColorBoard.length: ' , currentColorBoard.length)

      // console.log('a',a,b,c,d, hasEmptyBlocks, JSON.stringify(currentColorBoard))
      // debugger
      // console.log('3checkForMatch: currentColorBoard', currentColorBoard.length);
      if(blanks.length > 0) {
        // console.log('clear blanks!! and call check for match again!')

        // debugger

        moveToSquareBelow();
        console.log('currentColorBoard: ' , currentColorBoard.length)
        
        setCurrentColorBoard([...currentColorBoard], 'checkForMatch2')
        checkForMatch(cc);
      } else {
        console.log('DONE!')
      }
      
    }

    useEffect(() => {
      createBoard();
      // checkForMatch(1);
    }, [])
  
    useEffect(() => {
      // setTimeout(() => checkForMatch(1), 2000)
      checkForMatch(1)
    }, [])

      
    // useEffect(() => {
    //   createBoard();

    // }, []);
    // todo: fix from execution every time to per user move. till solving the issue
    // todo: change to "checkForMatch"
    // todo fix: once loaded and cleared. move 14 green to the right and see how it clear on the left side too.
    // useEffect(() => {
    //   // createBoard();

    //   const timer = setInterval(() => {
    //     let a = checkForColumnOfFour();
    //     let b = checkForRowOfFour();
    //     let c = checkForColumnOfThree();
    //     let d = checkForRowOfThree();

    //     // console.log('a',a,b,c,d)
    //     moveToSquareBelow();
    //     setCurrentColorBoard([...currentColorBoard], 'use effect')
    //   }, 100);
  
    //   return () => clearInterval(timer);
    // }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveToSquareBelow, currentColorBoard]);
  
    const gameOver = () => {
      dispatch(addNewScoreToBoad({
        score: scoreDisplay,
        moves: movesDisplay,
        date: getDateString()
      }));

      navigate(`/score-board`);
    }

    // console.log('currentColorBoard : ' ,currentColorBoard)
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