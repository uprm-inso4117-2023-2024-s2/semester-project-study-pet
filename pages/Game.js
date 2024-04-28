import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import MiniGame from '../components/minigame'; // Import the Minigame component
import { useFonts } from "expo-font";


export default function App({ route }) {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  const [backgroundColor, setBackgroundColor] = useState('#FFBBE0');

  // Variable to indicate whether to perform usability testing
  const usabilityTesting = true;

  useEffect(() => {
    if (usabilityTesting) {
      const randomNumber = Math.floor(Math.random() * 10);
      // If the random number is less or equal than 4, change the background color
      if (randomNumber <= 4) {
        setBackgroundColor('#FFE4E7');
      }
    }
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Choose all correct. Good Luck!</Text>
      </View>
      <View style={styles.miniGameContainer}>
        <MiniGame isAsleep={route.params?.isAsleep} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
