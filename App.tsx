/**
 * App.tsx — point d'entrée de l'application WordCut.
 *
 * Charge le dictionnaire de façon synchrone au démarrage,
 * puis lance une première partie automatiquement.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { loadDictionary } from './src/services/DictionaryService';
import { useGameStore } from './src/store/useGameStore';
import { GameScreen } from './src/screens/GameScreen';

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const newGame = useGameStore((s) => s.newGame);

  useEffect(() => {
    try {
      loadDictionary();
      newGame();
      setReady(true);
    } catch (e) {
      setError(String(e));
    }
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text style={styles.loadingText}>Chargement du dictionnaire...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <GameScreen />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
  },
  loadingText: { color: '#6B7280', fontSize: 14 },
  errorText: { color: '#DC2626', fontSize: 14, textAlign: 'center', padding: 24 },
});
