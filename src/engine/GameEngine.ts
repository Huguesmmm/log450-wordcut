/**
 * GameEngine — logique pure du jeu WordCut.
 *
 * Aucune dépendance UI. Toutes les fonctions sont pures et testables isolément.
 *
 * Règles :
 *  - Le joueur retire 1, 2 ou 3 lettres du mot courant.
 *  - Les lettres restantes (dans n'importe quel ordre) doivent former un mot valide.
 *  - P1 : 1 lettre retirée → 3pts | 2 → 2pts | 3 → 1pt
 *  - P2 : si l'ordre des lettres restantes a changé → +2pts
 *  - Victoire : atteindre un mot de 1, 2 ou 3 lettres.
 */

import { isWord, normalize } from '../services/DictionaryService';

export interface MoveResult {
  valid: boolean;
  pointsP1: number;
  pointsP2: number;
  reason?: string;
}

/**
 * Vérifie que toutes les lettres de `child` (avec leurs fréquences)
 * sont présentes dans `parent`.
 * Exemple : isLetterSubset("MATELAS", "METAL") → true
 */
function isLetterSubset(parent: string, child: string): boolean {
  const freq: Record<string, number> = {};
  for (const c of parent) {
    freq[c] = (freq[c] ?? 0) + 1;
  }
  for (const c of child) {
    if (!freq[c] || freq[c] === 0) return false;
    freq[c]--;
  }
  return true;
}

/**
 * Vérifie si `sub` est une sous-séquence de `str` (même ordre de lettres).
 * Si vrai → pas de réordonnancement (P2 = 0).
 * Si faux → réordonnancement détecté (P2 = +2).
 *
 * Exemple :
 *   isSubsequence("AME", "LAME")    → true  (ordre conservé)
 *   isSubsequence("METAL", "MATELAS") → false (E avant T dans METAL, mais T avant E dans MATELAS)
 */
function isSubsequence(sub: string, str: string): boolean {
  let i = 0;
  for (let j = 0; j < str.length && i < sub.length; j++) {
    if (str[j] === sub[i]) i++;
  }
  return i === sub.length;
}

/**
 * Valide un coup et calcule les points obtenus.
 * @param currentWord - Mot affiché au joueur (ex: "MATELAS")
 * @param nextWord    - Mot proposé par le joueur (ex: "METAL")
 */
export function validateMove(currentWord: string, nextWord: string): MoveResult {
  const current = normalize(currentWord);
  const next = normalize(nextWord);

  if (next.length === 0) {
    return { valid: false, pointsP1: 0, pointsP2: 0, reason: 'Entrez un mot.' };
  }

  const removed = current.length - next.length;

  if (removed < 1 || removed > 3) {
    return {
      valid: false, pointsP1: 0, pointsP2: 0,
      reason: `Retirez 1, 2 ou 3 lettres (vous en retirez ${removed}).`,
    };
  }

  if (!isLetterSubset(current, next)) {
    return {
      valid: false, pointsP1: 0, pointsP2: 0,
      reason: 'Les lettres ne proviennent pas du mot actuel.',
    };
  }

  if (!isWord(next)) {
    return {
      valid: false, pointsP1: 0, pointsP2: 0,
      reason: `"${next}" n'est pas un mot valide.`,
    };
  }

  const pointsP1 = 4 - removed; // 1 retiré→3pts, 2→2pts, 3→1pt
  const pointsP2 = !isSubsequence(next, current) ? 2 : 0;

  return { valid: true, pointsP1, pointsP2 };
}

/**
 * Vérifie si la partie est gagnée (mot ≤ 3 lettres atteint).
 */
export function isGameWon(word: string): boolean {
  return word.trim().length <= 3;
}
