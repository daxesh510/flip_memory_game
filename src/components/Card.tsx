import React from "react";
import { Cards } from "../Models/models";

interface CardProps {
  card: Cards;
  grid: number;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, grid, onClick }) => {
  return (
    <div onClick={onClick} className="relative w-full aspect-square h-32 cursor-pointer perspective-1000">
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-300 ${
          card.isFlipped ? "transform-rotate-y-180" : ""
        } ${card.isMatched ? "invisible opacity-0" : ""}`}
      >
        {/* Front Side of the Card */}
        <div className="absolute w-full h-full backface-hidden top-0 left-0 rounded-lg overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center border border-gray-600 shadow-lg">
          <span className="text-white text-2xl font-bold">{grid}</span>
        </div>
        {/* Back Side of the Card */}
        <div className="absolute w-full h-full backface-hidden top-0 left-0 rounded-lg overflow-hidden transform-rotate-y-180 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
          <img
            src={card.image}
            alt="card"
            className="w-full h-full object-cover rounded-lg border border-gray-900 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
