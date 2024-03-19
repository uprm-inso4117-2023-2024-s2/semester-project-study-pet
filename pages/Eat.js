import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import MiniGame from '../components/eatingMinigame';
import { loadHunger } from '../components/hungerStorage';

// TODO: Add happiness functionality
export default function App() {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null;
  }

  if (loadHunger() <= 100) {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: "Jua-Regular", fontSize: 40 }}>
          You are full!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.miniGameContainer}>
          <MiniGame />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8FECA9', // light green
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniGameContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 0,
  },
});
