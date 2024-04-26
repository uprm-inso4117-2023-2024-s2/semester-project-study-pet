import React, { useState, useEffect } from 'react'; // Add useState to the import statement
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import BathGame from '../components/bathing'; // Changed import


const Bath = ({ navigation, route }) => {

  const [poopCount, setPoopCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (poopCount < 3 && !route.params?.isAsleep) {
        setPoopCount(prevCount => prevCount + 1);
      }
    }, 10000); // Increase count every 10 seconds

    return () => clearInterval(timer);
  }, [poopCount]);

  const handlePoopPress = () => {
    // Open pop-up with trivia question
    // You can implement this part according to your requirement
    // For now, I'll just reset the poop count
    setPoopCount(0);
  };
  const [isFontLoaded] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!isFontLoaded) {
    return null; // for now, render nothing
  }
  return (
    <LinearGradient colors={['#D4F1F4', '#b3d9ff']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Let's take a Bath</Text>
      </View>
      <View style={styles.miniGameContainer}>
        <BathGame isAsleep={route.params?.isAsleep} /> 
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={handlePoopPress} style={styles.poopButton}>
        <Text style={styles.poopIcon}>💩</Text>
        {poopCount > 0 && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{poopCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  titleContainer: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 32,
    fontFamily: 'Jua-Regular',
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
  },
  miniGameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  poopButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poopIcon: {
    fontSize: 30,
    color: 'brown',
  },
  counterContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Bath