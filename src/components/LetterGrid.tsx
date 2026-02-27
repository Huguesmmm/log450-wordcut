/**
 * LetterGrid — affiche le mot courant lettre par lettre
 * et permet au joueur de saisir son prochain mot.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  currentWord: string;
  onSubmit: (word: string) => void;
  errorMessage: string | null;
}

export function LetterGrid({ currentWord, onSubmit, errorMessage }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onSubmit(trimmed.toUpperCase());
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Mot courant : chaque lettre dans une tuile */}
      <View style={styles.wordRow}>
        {currentWord.split('').map((letter, i) => (
          <View key={i} style={styles.letterBox}>
            <Text style={styles.letterText}>{letter}</Text>
          </View>
        ))}
      </View>

      {/* Champ de saisie */}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(t) => setInput(t.toUpperCase())}
        placeholder="Entrez votre mot..."
        placeholderTextColor="#9CA3AF"
        autoCapitalize="characters"
        autoCorrect={false}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 16, width: '100%' },
  wordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  letterBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  letterText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  input: {
    borderWidth: 2,
    borderColor: '#1D4ED8',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  error: { color: '#DC2626', fontSize: 14, textAlign: 'center', paddingHorizontal: 16 },
});
