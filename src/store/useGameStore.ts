/**
 * useGameStore — état global du jeu via Zustand.
 *
 * Zustand est un store minimaliste : pas de boilerplate Redux,
 * pas de Provider, accès direct au state depuis n'importe quel composant.
 */

import { create } from 'zustand';
import { validateMove, isGameWon, MoveResult } from '../engine/GameEngine';
import { getRandomStartWord } from '../services/DictionaryService';

export interface GameMove {
  word: string;
  pointsP1: number;
  pointsP2: number;
}

interface GameState {
  startWord: string;
  currentWord: string;
  history: GameMove[];
  totalScore: number;
  isWon: boolean;
  lastError: string | null;

  newGame: () => void;
  resetGame: () => void;
  submitMove: (nextWord: string) => MoveResult;
}

export const useGameStore = create<GameState>((set, get) => ({
  startWord: '',
  currentWord: '',
  history: [],
  totalScore: 0,
  isWon: false,
  lastError: null,

  /** Lance une nouvelle partie avec un mot de départ aléatoire. */
  newGame: () => {
    const word = getRandomStartWord();
    set({ startWord: word, currentWord: word, history: [], totalScore: 0, isWon: false, lastError: null });
  },

  /** Réinitialise la partie courante avec le même mot de départ. */
  resetGame: () => {
    const { startWord } = get();
    set({ currentWord: startWord, history: [], totalScore: 0, isWon: false, lastError: null });
  },

  /** Soumet un coup et met à jour le state. Retourne le MoveResult pour feedback UI. */
  submitMove: (nextWord: string): MoveResult => {
    const { currentWord, history, totalScore } = get();
    const result = validateMove(currentWord, nextWord);

    if (!result.valid) {
      set({ lastError: result.reason ?? 'Coup invalide.' });
      return result;
    }

    const newWord = nextWord.toUpperCase().trim();
    set({
      currentWord: newWord,
      history: [...history, { word: newWord, pointsP1: result.pointsP1, pointsP2: result.pointsP2 }],
      totalScore: totalScore + result.pointsP1 + result.pointsP2,
      isWon: isGameWon(newWord),
      lastError: null,
    });

    return result;
  },
}));
