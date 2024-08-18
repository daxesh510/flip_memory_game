import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const gridOptions = [
  { size: 4, pairs: 8 },
  { size: 6, pairs: 18 },
  { size: 8, pairs: 32 },
];

const Home: React.FC = () => {
  const [customSize, setCustomSize] = useState<string | ''>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 10)) {
      if (Number(value) === 1 || Number(value) % 2 === 0) {
        setCustomSize(value);
        setErrorMessage(null);
      } else {
        setErrorMessage('Please enter an even number.');
      }
    } else {
      setErrorMessage('Please enter a number between 1 and 10.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to the Memory Game!</h1>
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h2 className="text-2xl font-semibold mb-4">Choose a Grid Size</h2>
          <ul className="space-y-4">
            {gridOptions.map((option, index) => (
              <li
                key={option.size}
                className="border border-white p-4 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to={`/${option.size}`} className="text-xl font-semibold">
                  {index + 1}. {option.size * option.size} cards ({option.pairs} pairs) (
                  {option.size + 'X' + option.size})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Custom Grid Option</h2>
          <div className="mb-4">
            <label className="block text-lg mb-2 text-gray-700">Grid Size:</label>
            <input
              type="number"
              value={customSize}
              onChange={handleCustomSizeChange}
              className="border p-2 rounded w-full"
              placeholder="Enter grid size (e.g., 4 for 4x4)"
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
          <Link
            to={`/${customSize}`}
            className={`text-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded ${
              !customSize ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Start Game with Custom Grid
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
