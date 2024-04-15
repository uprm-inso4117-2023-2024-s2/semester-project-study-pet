import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import MiniGame from '../components/eatingMinigame';
import Pet, { loadHunger } from '../components/Pet';

export default function App() {
  const p = new Pet();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [hunger, setHunger] = useState(p.state.hunger);

  useEffect(() => {
    const fetchHunger = async () => {
      const hungerValue = await loadHunger();
      setHunger(hungerValue);
    };

    fetchHunger();
  }, []);

  const [loadedFont] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  useEffect(() => {
    if (loadedFont) {
      setIsFontLoaded(true);
    }
  }, [loadedFont]);

  if (!isFontLoaded) {
    return null;
  }

  if (p.state.hunger <= 10) {
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
