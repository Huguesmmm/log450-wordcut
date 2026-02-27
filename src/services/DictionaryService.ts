/**
 * DictionaryService — gestion du dictionnaire de mots.
 *
 * Le dictionnaire (~318k mots français) est chargé une seule fois au démarrage.
 * Toutes les entrées sont normalisées : majuscules, sans accents (NFD strip).
 * Les lookups sont en O(1) grâce à un Set.
 *
 * Normalisation : "ÉLÉPHANT" → "ELEPHANT", "ÂME" → "AME"
 * L'input joueur est normalisé de la même façon avant lookup.
 */

import frWords from '../../assets/dictionaries/fr.json';

let wordSet: Set<string> | null = null;
let startWords: string[] | null = null;

/**
 * Normalise un mot : majuscules + suppression des accents (NFD).
 * Utilisé à la fois pour construire le Set et pour les lookups.
 */
export function normalize(word: string): string {
  return word
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Initialise le dictionnaire en mémoire.
 * Doit être appelé une fois au démarrage de l'app (App.tsx).
 */
export function loadDictionary(): void {
  const words: string[] = frWords.map((w: string) => normalize(w));

  wordSet = new Set(words);

  // Mots de départ : 5 à 12 lettres (jouables, pas trop longs)
  startWords = words.filter((w) => w.length >= 5 && w.length <= 12);
}

/**
 * Vérifie si un mot existe dans le dictionnaire.
 * L'input est normalisé automatiquement.
 */
export function isWord(word: string): boolean {
  if (!wordSet) throw new Error('Dictionary not loaded — call loadDictionary() first.');
  return wordSet.has(normalize(word));
}

/**
 * Retourne un mot aléatoire de 5 à 12 lettres pour commencer une partie.
 */
export function getRandomStartWord(): string {
  if (!startWords || startWords.length === 0)
    throw new Error('Dictionary not loaded — call loadDictionary() first.');
  return startWords[Math.floor(Math.random() * startWords.length)];
}
