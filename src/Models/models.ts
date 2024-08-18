export interface Cards {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Cards[];
  flippedIndices: number[];
  matchesFound: number;
}
