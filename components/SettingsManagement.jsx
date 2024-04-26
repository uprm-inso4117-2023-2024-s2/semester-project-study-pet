import AsyncStorage from '@react-native-async-storage/async-storage';

// Background constants
export const KITCHEN_BACKGROUND = "0";
export const LIVING_ROOM_BACKGROUND = "1";
export const YARD_BACKGROUND = "2";

// This list is to register functions/callbacks that depend on or use the user selected background
export const callbacks = [];

export const saveBackground = async (background) => {
    try {
        await AsyncStorage.setItem('background', background);
        // Calls all the registered callbacks with the selected background
        for (const callback of callbacks) {
            callback(background);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getBackground = async () => {
    try {
        return await AsyncStorage.getItem('background');
    } catch (error) {
        console.error(error);
    }
};