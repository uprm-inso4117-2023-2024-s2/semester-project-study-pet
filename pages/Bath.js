import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Pet from '../components/Pet';

const Bath = ({ navigation }) => {
  const [poopCount, setPoopCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (poopCount < 3) {
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

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#f7ffe7', '#edf5ff']} style={styles.container}>
        <View style={styles.petContainer}>
          <View style={styles.whiteBackground}></View>
          <View style={styles.blueBackground}></View>
          <Pet />
        </View>
      </LinearGradient>
      <TouchableOpacity onPress={handlePoopPress} style={styles.poopButton}>
        <Text style={styles.poopIcon}>💩</Text>
        {poopCount > 0 && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{poopCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    margin: 20,
  },
  whiteBackground: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: 'white',
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

export default Bath;
