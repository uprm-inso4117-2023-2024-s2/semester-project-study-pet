import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import MiniGame from '../components/eatingMinigame';
import { useNavigation } from '@react-navigation/native';

// TODO: Add happiness functionality
export default function Eat({ route }) {
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  const numQuestions = route.params?.numQuestions;
  
  if (!isFontLoaded) {
    return null;
  }

  return (

    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Choose all correct. Good Luck!</Text>
      </View>
      <ScrollView>
        <View style={styles.miniGameContainer}>
          <MiniGame numQuestions={numQuestions} />
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
