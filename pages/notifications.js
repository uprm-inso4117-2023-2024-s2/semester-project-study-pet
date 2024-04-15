import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { AppState, Platform, Alert } from 'react-native';

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
        if (Platform.OS === 'web') {
            // Handle permission request for web
            // Example:
            const permission = await Notification.requestPermission();
            status = permission === 'granted' ? 'granted' : 'denied';
        } else if (Platform.OS === 'android') {
            let PermissionsAndroid;
            try {
                PermissionsAndroid = require('react-native').PermissionsAndroid;
            } catch (e) {
                console.log("PermissionsAndroid is not available on this platform");
            }

            if (PermissionsAndroid) {
                status = (await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECEIVE_NOTIFICATIONS
                )).status;
            } else {
                console.log("PermissionsAndroid is not available on this platform");
                // You can handle the absence of PermissionsAndroid as per your application's logic
                // For example, show a message to the user or fallback to a different approach
            }
        }
    }
    if (status !== 'granted') {
        Alert.alert(
            'Permission required',
            'You need to grant permission to receive notifications',
            [{ text: 'OK' }]
        );
    }
};
