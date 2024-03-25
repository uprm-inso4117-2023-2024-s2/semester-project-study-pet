import { PermissionsAndroid } from 'react-native';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';


export const handleButtonPress = async () => {
    await scheduleNotification();
};  

export async function scheduleNotification() {
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your Pet misses you",
        body: "Lets Study!",
      },
      trigger: null,
    });
  }


// Handle incoming notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

export const handlePermissionRequest = async () => {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status;
    }
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'You need to grant permission to receive notifications',
        [{ text: 'OK' }]
      );
    }
  };
  


