import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlipMemoryGame from './components/FlipMemoryGame';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:number" element={<FlipMemoryGame />} />
      </Routes>
    </Router>
  );
}

export default App;
