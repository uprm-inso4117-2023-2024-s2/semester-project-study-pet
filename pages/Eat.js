import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import MiniGame from '../components/eatingMinigame';

// TODO: Add happiness functionality
export default function App() {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null;
  }
  const handleMinigameEnd = () => {
    setMinigameEnded(false);
  };

  const [minigameEnded, setMinigameEnded] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {minigameEnded && (
          <Text style={styles.titleText}>Choose all correct. Good Luck!</Text>
        )}
      </View>
      <ScrollView>
        <View style={styles.miniGameContainer}>
          <MiniGame onMinigameEnd={handleMinigameEnd} />
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
  titleContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Jua-Regular',
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  miniGameContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 0,
  },
});
