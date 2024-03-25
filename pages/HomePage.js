import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert,AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import Pet from '../components/Pet';
import { petEventEmitter } from './EventEmitter';
import PetGoodbye from '../components/PetGoodbye';
import {loadIsAsleepFromStorage} from '../components/sleepScheduleStorage';
import { handlePermissionRequest, scheduleNotification } from './notifications';
import { Audio } from 'expo-av';  

const VerticalStripes = ({ numberOfStripes }) => {
  return (
    <View style={styles.stripesContainer}>
      {Array.from({ length: numberOfStripes }, (_, index) => (
        <View
          key={index}
          style={[
            styles.verticalStripe,
            { backgroundColor: index % 2 === 0 ? '#badeea' : '#e1e5f2' }, // Alternando colores
          ]}
        />
      ))}
    </View>
  );
};

/**
 * A simple button component. This component helps navigate to different pages.
 */
const HomePage = ({ navigation }) => {
  const [isdead, setIsdead] = useState(false);
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' && !notificationScheduled) {
        await scheduleNotification();
        setNotificationScheduled(true);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      
    };
  }, [notificationScheduled]);

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await handlePermissionRequest();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'You need to grant permission to receive notifications',
          [{ text: 'OK' }]
        );
      }
    };

    checkPermission();
  }, []);

  // Listen to the event petDeath and petAlive to verify if the pet is dead
  petEventEmitter.on('petDeath', () => {
    // Set the "isdead" state to true, so the buttons stop appearing"
    setIsdead(true);
  });

  petEventEmitter.on('petAlive', () => {
    // Set the "isdead" state to false, so the buttons appear"
    setIsdead(false);
  });

  const [goodbye, setGoodbye] = useState(false);
  const handleGoodbye = (newValue) => {
    setGoodbye(newValue);
  };
  
  const [isAsleep, setIsAsleep] = useState(false);

  useEffect(() => {
    loadIsAsleepFromStorage(setIsAsleep);

    const sleepInterval = setInterval(async () => {
      await loadIsAsleepFromStorage(setIsAsleep);
    }, 1000 * 60);

    return () => clearInterval(sleepInterval);
  }, [isAsleep]);

  const showSleepAlert = (action) => {
    Alert.alert(
      `${action} Not Allowed!`,
      'Your pet is sleeping and cannot be disturbed. Wait until it wakes up!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{flex: 1, paddingTop: 20, backgroundColor: '#f7ffe7', }}>
      <LinearGradient colors={['#f7ffe7', '#edf5ff']} style={styles.container}>
        
        {!isdead && (
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Mypets')} style={styles.iconButton}><Ionicons name="paw" size={30} color="#517fa4" /></TouchableOpacity> 
          <TouchableOpacity onPress={() => navigation.navigate('Stats')} style={styles.iconButton}><Ionicons name="stats-chart" size={30} color="#517fa4" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Flashcards')} style={styles.iconButton}><Ionicons name="book" size={30} color="#517fa4" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.iconButton}><Ionicons name="settings" size={30} color="#517fa4" /></TouchableOpacity>
        </View>)}

        {isdead && (<View style={styles.topButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Mypets')} style={styles.iconButton}><Ionicons name="paw" size={30} color="#517fa4" /></TouchableOpacity> 
        </View>)}

        <View style={styles.petContainer}>
          <VerticalStripes numberOfStripes={7} />
          {goodbye ? <PetGoodbye /> : <Pet onChange={handleGoodbye} />}
        </View>

        {!isdead && (  
        <View style={styles.bottomButtons}>

          <TouchableOpacity onPress={() => isAsleep ? showSleepAlert('Bath') : navigation.navigate('Bath')} style={styles.iconButton}><FontAwesome6 name="soap" size={30} color="#cdb4db" /></TouchableOpacity>
          <TouchableOpacity onPress={() => isAsleep ? showSleepAlert('Eat') : navigation.navigate('Eat')} style={styles.iconButton}><MaterialCommunityIcons name="cupcake" size={30} color="#ffafcc" /></TouchableOpacity>
          <TouchableOpacity onPress={() => isAsleep ? showSleepAlert('Play') : navigation.navigate('Game')} style={styles.iconButton}><Ionicons name="game-controller" size={30} color="#a2d2ff" /></TouchableOpacity>
          <TouchableOpacity onPress={() => isAsleep ? showSleepAlert('PlayerStats') : navigation.navigate('PlayerStats')} style={styles.iconButton}><Ionicons name="person-circle-outline" size={30} color="#87CEEB" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.iconButton}><Ionicons name="cart" size={30} color="#f7d794" /></TouchableOpacity>
        </View> 
        )}

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  petContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden', 
    position: 'relative',
  },
  stripesContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  verticalStripe: {
    flex: 1, 
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.7)', // A semi-transparent white for the icon button background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default HomePage;
