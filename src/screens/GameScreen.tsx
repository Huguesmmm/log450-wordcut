/**
 * GameScreen — écran principal du jeu.
 *
 * Orchestre les composants LetterGrid et ScoreBoard,
 * et expose les actions newGame / resetGame.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { LetterGrid } from '../components/LetterGrid';
import { ScoreBoard } from '../components/ScoreBoard';

export function GameScreen() {
  const {
    startWord,
    currentWord,
    history,
    totalScore,
    isWon,
    lastError,
    newGame,
    resetGame,
    submitMove,
  } = useGameStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* En-tête */}
        <Text style={styles.title}>WordCut</Text>
        <Text style={styles.subtitle}>
          {isWon ? '🎉 Gagné !' : `Mot actuel (${currentWord.length} lettres)`}
        </Text>

        {/* Zone de jeu */}
        {isWon ? (
          <View style={styles.wonContainer}>
            <Text style={styles.wonText}>Score final : {totalScore} pts</Text>
          </View>
        ) : (
          <LetterGrid
            currentWord={currentWord}
            onSubmit={submitMove}
            errorMessage={lastError}
          />
        )}

        {/* Historique et score */}
        <ScoreBoard history={history} totalScore={totalScore} startWord={startWord} />

        {/* Boutons d'action */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnSecondary} onPress={resetGame} activeOpacity={0.8}>
            <Text style={styles.btnSecondaryText}>Réinitialiser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPrimary} onPress={newGame} activeOpacity={0.8}>
            <Text style={styles.btnPrimaryText}>Nouveau mot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flexGrow: 1, alignItems: 'center', paddingVertical: 32, gap: 24 },
  title: { fontSize: 36, fontWeight: '800', color: '#1D4ED8', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  wonContainer: { alignItems: 'center', gap: 8 },
  wonText: { fontSize: 24, fontWeight: '700', color: '#16A34A' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  btnSecondary: {
    borderWidth: 2,
    borderColor: '#6B7280',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnSecondaryText: { color: '#6B7280', fontWeight: '600', fontSize: 15 },
  btnPrimary: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
  },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
