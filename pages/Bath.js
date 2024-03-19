import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BathGame from '../components/bathing'; // Changed import

const Bath = ({ navigation }) => {
  return (
    <LinearGradient colors={['#D4F1F4', '#b3d9ff']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Let's take a Bath</Text>
      </View>
      <View style={styles.miniGameContainer}>
        <BathGame /> 
      </View>
      <View style={{ flex: 1 }} />
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
});

export default Bath
