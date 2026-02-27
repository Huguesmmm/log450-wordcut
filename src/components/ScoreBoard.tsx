/**
 * ScoreBoard — affiche l'historique des coups et le score total.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameMove } from '../store/useGameStore';

interface Props {
  history: GameMove[];
  totalScore: number;
  startWord: string;
}

export function ScoreBoard({ history, totalScore, startWord }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.scoreTitle}>Score : {totalScore}</Text>

      {history.length > 0 && (
        <View style={styles.historyContainer}>
          {/* Mot de départ */}
          <View style={styles.row}>
            <Text style={styles.wordLabel}>{startWord}</Text>
            <Text style={styles.pointsLabel}>—</Text>
          </View>

          {history.map((move, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.wordLabel}>{move.word}</Text>
              <Text style={styles.pointsLabel}>
                +{move.pointsP1}
                {move.pointsP2 > 0 ? ` +${move.pointsP2}` : ''}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 24, marginTop: 8 },
  scoreTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  historyContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordLabel: { fontSize: 16, fontWeight: '600', color: '#374151', letterSpacing: 1 },
  pointsLabel: { fontSize: 14, color: '#6B7280' },
});
