import { useState, useEffect } from "react";
import RedCandy from "./images/red-candy-transparent.png";
import OrangeCandy from "./images/orange-candy-png.png";
import GreenCandy from "./images/green-candy.jpg";
import BlueCandy from "./images/blue-candy.jpg";
import YellowCandy from "./images/yellow-candy.jpg";
import PurpleCandy from "./images/purple-candy.jpg";
import BlankImage from "./images/blank-image.jpg";
import ScoreBoard from "./components/Scoreboard";

const width = 8;
const candyColor = [
  RedCandy,
  OrangeCandy,
  GreenCandy,
  BlueCandy,
  YellowCandy,
  PurpleCandy,
];

const App = () => {
  const [currentColorArrange, setCurrentColorArrange] = useState([]);
  const [squareDragging, setSquareDragging] = useState(null);
  const [squareReplace, setSquareReplace] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkColThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnThree = [i, i + width, i + width * 2];
      const printColor = currentColorArrange[i];
      const isBlank = currentColorArrange[i] === BlankImage;

      if (
        columnThree.every(
          (square) => currentColorArrange[square] === printColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnThree.forEach(
          (square) => (currentColorArrange[square] = BlankImage)
        );
        return true;
      }
    }
  };

  const checkColFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3];
      const printColor = currentColorArrange[i];
      const isBlank = currentColorArrange[i] === BlankImage;

      if (
        columnFour.every(
          (square) => currentColorArrange[square] === printColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnFour.forEach(
          (square) => (currentColorArrange[square] = BlankImage)
        );
        return true;
      }
    }
  };

  const checkRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2];
      const printColor = currentColorArrange[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrange[i] === BlankImage;

      if (notValid.includes(i)) continue;

      if (
        rowThree.every(
          (square) => currentColorArrange[square] === printColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowThree.forEach(
          (square) => (currentColorArrange[square] = BlankImage)
        );
        return true;
      }
    }
  };

  const checkRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3];
      const printColor = currentColorArrange[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrange[i] === BlankImage;

      if (notValid.includes(i)) continue;

      if (
        rowFour.every(
          (square) => currentColorArrange[square] === printColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowFour.forEach((square) => (currentColorArrange[square] = BlankImage));
        return true;
      }
    }
  };

  const moveSquare = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isInFirstRow = firstRow.includes(i);

      if (isInFirstRow && currentColorArrange[i] === BlankImage) {
        let randomNumb = Math.floor(Math.random() * candyColor.length);
        currentColorArrange[i] = candyColor[randomNumb];
      }

      if (currentColorArrange[i + width] === BlankImage) {
        currentColorArrange[i + width] = currentColorArrange[i];
        currentColorArrange[i] = BlankImage;
      }
    }
  };

  const dragStart = (e) => {
    console.log("Click and Drag Starting");
    setSquareDragging(e.target);
  };

  const dragDrop = (e) => {
    console.log("Click and Drag Dropping");
    setSquareReplace(e.target);
  };

  console.log(scoreDisplay);

  const dragEnd = () => {
    console.log("Click and Drag Ending!");

    const squareDraggingID = parseInt(squareDragging.getAttribute("data-id"));
    const squareReplaceId = parseInt(squareReplace.getAttribute("data-id"));

    currentColorArrange[squareReplaceId] = squareDragging.getAttribute("src");
    currentColorArrange[squareDraggingID] = squareReplace.getAttribute("src");

    const legalMoves = [
      squareDraggingID - 1,
      squareDraggingID - width,
      squareDraggingID + 1,
      squareDraggingID + width,
    ];

    const legalMove = legalMoves.includes(squareReplaceId);

    const isColFour = checkColFour();
    const isRowFour = checkRowFour();
    const isColThree = checkColThree();
    const isRowThree = checkRowThree();

    if (
      squareReplaceId &&
      legalMove &&
      (isRowThree || isRowFour || isColThree || isColFour)
    ) {
      setSquareDragging(null);
      setSquareReplace(null);
    } else {
      currentColorArrange[squareReplaceId] = squareReplace.getAttribute("src");
      currentColorArrange[squareDraggingID] =
        squareDragging.getAttribute("src");
      setCurrentColorArrange([...currentColorArrange]);
    }
  };

  const createBoard = () => {
    const randomColorArrange = [];

    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColor[Math.floor(Math.random() * candyColor.length)];
      randomColorArrange.push(randomColor);
    }

    setCurrentColorArrange(randomColorArrange);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColFour();
      checkRowFour();
      checkColThree();
      checkRowThree();
      moveSquare();
      setCurrentColorArrange([...currentColorArrange]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkColFour,
    checkRowFour,
    checkColThree,
    checkRowThree,
    moveSquare,
    currentColorArrange,
  ]);

  console.log(currentColorArrange);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrange.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
        ;
      </div>

      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;
