import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";
import { Cards } from "../Models/models";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EvenGridSizeScreen from "./EvenNumberScreen";
import { RAW_IMAGES } from "../dummyData/Data";

const FlipMemoryGame: React.FC = () => {
  const { number } = useParams<{ number: string | undefined }>();
  const gridSize = parseInt(number || "0", 10);
  const navigate = useNavigate();

  const [cards, setCards] = useState<Cards[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);

  const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const initializeGame = () => {
    const images = shuffleArray([...RAW_IMAGES]);
    const shuffledCards = shuffleArray(
      Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => i).flatMap((i) => [
        { id: 2 * i, image: images[i % images.length], isFlipped: false, isMatched: false },
        { id: 2 * i + 1, image: images[i % images.length], isFlipped: false, isMatched: false },
      ])
    );
    preloadImages(images);
    setCards(shuffledCards);
    setFlippedIndices([]);
    setTurns(0);
    setCorrectMatches(0);
  };

  useEffect(() => {
    if (gridSize > 10 || gridSize < 0 || gridSize % 2 !== 0) {
      toast.error("Invalid grid size. Please choose an even number between 0 and 10.");
      return;
    }
    initializeGame();
  }, [gridSize]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedIndices = [...flippedIndices, index];
    const newCards = cards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card));

    setCards(newCards);
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setTurns(turns + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].image === newCards[secondIndex].image) {
        setCorrectMatches(correctMatches + 1);
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) => (i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card))
          );
          setFlippedIndices([]);

          if (correctMatches + 1 === (gridSize * gridSize) / 2) {
            toast.success("Congratulations! You found all matches!");
          }
        }, 1500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="pt-8 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="mx-6 mb-6 text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between sticky top-0 z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white ">Game Stats</h2>
        <div className="text-base md:text-lg text-white flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
          <p>
            <span className="font-semibold">Grid Size:</span> {gridSize} x {gridSize}
          </p>
          <p>
            <span className="font-semibold">Turns:</span> {turns}
          </p>
          <p>
            <span className="font-semibold">Correct Matches:</span> {correctMatches}
          </p>
        </div>
      </div>

      {/* <!-- Buttons Section --> */}
      <div className="flex justify-between mx-6 mb-6">
        <div className="relative group">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-3"
          >
            <i className="fas fa-home text-lg"></i>
          </button>
          <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Home
          </div>
        </div>
      </div>

      {/* <!-- Grid Section --> */}
      <div className="flex justify-center items-center px-6">
        {gridSize % 2 !== 0 ? (
          <EvenGridSizeScreen />
        ) : (
          <>
            <div
              className={`grid gap-4 p-6 bg-white rounded-lg shadow-lg mb-10`}
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
            >
              {cards.map((card, index) => (
                <Card key={index} card={card} onClick={() => handleCardClick(index)} grid={index + 1} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-6 right-6 z-20">
        <div className="relative group">
          <button
            onClick={initializeGame}
            className="bg-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <i className="fas fa-sync-alt text-lg"></i>
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipMemoryGame;
