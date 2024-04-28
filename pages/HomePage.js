import React, {useEffect, useState} from 'react';
import {Alert, AppState, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Pet from '../components/Pet';
import {petEventEmitter} from './EventEmitter';
import PetGoodbye from '../components/PetGoodbye';
import {loadIsAsleepFromStorage} from '../components/sleepScheduleStorage';
import {scheduleNotification} from './notifications';
import * as Notifications from 'expo-notifications';
import {Audio} from 'expo-av';
import {
  callbacks,
  getBackground,
  KITCHEN_BACKGROUND,
  LIVING_ROOM_BACKGROUND,
  YARD_BACKGROUND
} from "../components/SettingsManagement";

const kitchenBackground = require("../assets/backgrounds/kitchen.jpg");
const livingRoomBackground = require("../assets/backgrounds/living_room.jpg");
const yardBackground = require("../assets/backgrounds/yard.jpg");

// sound objects

const soundObjects = {
  'bath': new Audio.Sound(),
  'button': new Audio.Sound(),
  'eat': new Audio.Sound(),
  'game': new Audio.Sound(),
  'shop': new Audio.Sound(),
};

// loads sound files 

const loadSoundFiles = async () => {
  try {
    await soundObjects.bath.loadAsync(require('../assets/sounds/bath.mp3'));
    await soundObjects.button.loadAsync(require('../assets/sounds/button.mp3'));
    await soundObjects.eat.loadAsync(require('../assets/sounds/eat.mp3'));
    await soundObjects.game.loadAsync(require('../assets/sounds/game.mp3'));
    await soundObjects.shop.loadAsync(require('../assets/sounds/shop.mp3'));
  } catch (error) {
    console.error('Error loading sound files', error);
  }
}

/**
 * A simple button component. This component helps navigate to different pages.
 */
const HomePage = ({ navigation }) => {
  const [isdead, setIsdead] = useState(false);
  const [notificationScheduled, setNotificationScheduled] = useState(false);
  const [goodbye, setGoodbye] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);

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
      try{
        let permission = await Notifications.getPermissionsAsync();
        let status = permission?.status || ''; // Use optional chaining to avoid accessing properties of undefined
        if (status !== 'granted') {
          Alert.alert(
            'Permission required',
            'You need to grant permission to receive notifications',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error checking permission:', error);
        // Handle error gracefully, e.g., show an error message to the user
      }
    };

    checkPermission();
  }, []);

  // load sound when component mounts

  useEffect(() => {
    loadSoundFiles();
  }, []);

  // play sounds

  const playSound = async (sound) => {
    try {
      await soundObjects[sound].replayAsync();
    } catch (error) {
      console.error('Error playing sound', error);
    }
  }

  // Unload sound files when component unmounts

  useEffect(() => {
    return () => {
      Object.values(soundObjects).forEach(async (soundObject) => {
        try {
          await soundObject.unloadAsync();
        } catch (error) {
          console.error('Error unloading sound', error);
        }
      });
    };
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
  
  useEffect(() => {
    loadIsAsleepFromStorage(setIsAsleep);
    
    const sleepInterval = setInterval(async () => {
      await loadIsAsleepFromStorage(setIsAsleep);
    }, 500);
    
    return () => clearInterval(sleepInterval);
  }, [isAsleep]);
  
  const showSleepAlert = (action) => {
    Alert.alert(
      `${action} Not Allowed!`,
      'Your pet is sleeping and cannot be disturbed. Wait until it wakes up!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false, id: `pet-${action.toLowerCase()}-alert` }
    );
  };

  const [background, setBackground] = useState(kitchenBackground);

  /**
   * Sets the current background based off of the user's choice
   * @param bkgd One the background constants from `SettingsManagement`
   */
  function applyBackground(bkgd) {
    switch (bkgd) {
      case KITCHEN_BACKGROUND:
        setBackground(kitchenBackground);
        break;
      case LIVING_ROOM_BACKGROUND:
        setBackground(livingRoomBackground);
        break;
      case YARD_BACKGROUND:
        setBackground(yardBackground);
        break;
    }
  }

  // Applies the saved background in initial render
  getBackground().then(applyBackground);
  // Applies the chosen background from `Settings` page
  callbacks.push(applyBackground);
  
  const handleGoodbye = (newValue) => {
    setGoodbye(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image source={background} style={styles.backgroundImage} resizeMode="cover" />
      </View>

      {!isdead && (
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => (playSound('button'), navigation.navigate('Mypets'))} style={styles.iconButton}><Ionicons name="paw" size={30} color="#517fa4" /></TouchableOpacity>
        <TouchableOpacity onPress={() => (playSound('button'), navigation.navigate('Stats'))} style={styles.iconButton}><Ionicons name="stats-chart" size={30} color="#517fa4" /></TouchableOpacity>
        <TouchableOpacity onPress={() => (playSound('button'), navigation.navigate('Flashcards'))} style={styles.iconButton}><Ionicons name="book" size={30} color="#517fa4" /></TouchableOpacity>
        <TouchableOpacity onPress={() => (playSound('button'), navigation.navigate('Settings'))} style={styles.iconButton}><Ionicons name="settings" size={30} color="#517fa4" /></TouchableOpacity>
      </View>)}

      {isdead && (<View style={styles.topButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Mypets')} style={styles.iconButton}><Ionicons name="paw" size={30} color="#517fa4" /></TouchableOpacity>
      </View>)}

      {goodbye ? <PetGoodbye /> : <Pet onChange={handleGoodbye} />}

      {!isdead && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity id='pet-bath-button' onPress={() => isAsleep ? showSleepAlert('Bath') : (playSound('bath'), navigation.navigate('Bath', {isAsleep}))} style={styles.iconButton}><FontAwesome6 name="soap" size={30} color="#cdb4db" /></TouchableOpacity>
          <TouchableOpacity id='pet-eat-button' onPress={() => isAsleep ? showSleepAlert('Eat') : (playSound('eat'), navigation.navigate('Eat', {isAsleep}))} style={styles.iconButton}><MaterialCommunityIcons name="cupcake" size={30} color="#ffafcc" /></TouchableOpacity>
          <TouchableOpacity id='pet-play-button' onPress={() => isAsleep ? showSleepAlert('Play') : (playSound('game'), navigation.navigate('Game', {isAsleep}))} style={styles.iconButton}><Ionicons name="game-controller" size={30} color="#a2d2ff" /></TouchableOpacity>
          <TouchableOpacity id='pet-stats-button' onPress={() => isAsleep ? showSleepAlert('PlayerStats') : (playSound('button'), navigation.navigate('PlayerStats', {isAsleep}))} style={styles.iconButton}><Ionicons name="person-circle-outline" size={30} color="#87CEEB" /></TouchableOpacity>
          <TouchableOpacity id='pet-shop-button' onPress={() => (playSound('shop'), navigation.navigate('Shop'))} style={styles.iconButton}><Ionicons name="cart" size={30} color="#f7d794" /></TouchableOpacity>
        </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
