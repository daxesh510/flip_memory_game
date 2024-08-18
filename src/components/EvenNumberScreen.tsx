import React from 'react';
import { useNavigate } from 'react-router-dom';

const EvenGridSizeScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Not found Grid</h2>
        <p className="text-lg mb-4">You have selected a wrong grid size.</p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-3"
          >
            <i className="fas fa-home text-lg"></i>
            <span className="hidden md:inline">Go back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvenGridSizeScreen;
