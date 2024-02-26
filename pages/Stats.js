import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stats = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#fcf188', '#fffbcf']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <View style={styles.circle}></View>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Stats</Text>
      </View>
      
      {/* Dog Paw Icon */}
      <View style={styles.pawContainer}>
        <Ionicons name="paw" size={90} color="#3498db" />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#3498db' }]}>Pet Name:</Text>
          <Text style={[styles.statsValue, { color: '#3498db' }]}>Firulai</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#9b59b6' }]}>Subject:</Text>
          <Text style={[styles.statsValue, { color: '#9b59b6' }]}>Physics</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#e74c3c' }]}>Exam Date:</Text>
          <Text style={[styles.statsValue, { color: '#e74c3c' }]}>2024-02-22</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#2ecc71' }]}>Care Difficulty:</Text>
          <Text style={[styles.statsValue, { color: '#2ecc71' }]}>Easy</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#f39c12' }]}>Hunger:</Text>
          <Text style={[styles.statsValue, { color: '#f39c12' }]}>3%</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={[styles.statsLabel, { color: '#e67e22' }]}>Happiness:</Text>
          <Text style={[styles.statsValue, { color: '#e67e22' }]}>76%</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9c4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#3498db',
    position: 'absolute',
    left: 2,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginBottom: 10,
    marginRight: 60,
  },
  pawContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: -30,
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBox: {
  marginBottom: 10,
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#3498db',
  padding: 10,
  borderRadius: 10,
  width: '80%',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 1.80,
  elevation: 3,
},

  statsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsValue: {
    fontSize: 16,
  },
});

export default Stats;