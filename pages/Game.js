import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import MiniGame from '../components/minigame'; // Import the Minigame component
import { useFonts } from "expo-font";


export default function App() {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null; // for now, render nothing
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Choose all correct. Good Luck!</Text>
      </View>
      <View style={styles.miniGameContainer}>
        <MiniGame />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 60,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20, 
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
    fontFamily: 'Jua-Regular',
    textAlign: 'center',
  },
  miniGameContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    marginTop: 0, 
  },
});
