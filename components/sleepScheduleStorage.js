import AsyncStorage from '@react-native-async-storage/async-storage';

const SLEEP_TIME_KEY = 'sleepTime';
const SLEEP_KEY = 'sleep';

export const saveSleepTime = async (sleepTime) => {
    try {
        if (typeof sleepTime !== 'string') {
            throw new Error('Invalid sleep time type, expected string');
        }
        // Save the time in 24-hour format (e.g. 22:30)
        await AsyncStorage.setItem(SLEEP_TIME_KEY, sleepTime.toString());
    } catch (error) {
        console.error('Error saving sleep time:', error);
    }
};

export const loadSleepTime = async () => {
    try {
        const sleepTime = await AsyncStorage.getItem(SLEEP_TIME_KEY);
        return sleepTime !== null ? sleepTime : '23:00';
        // return '04:00'; // uncomment and comment above lines to simulate trigger of pet sleep. Adjust the hour here for a past time based on your current time.
    } catch (error) {
        console.error('Error loading sleep time:', error);
        return '23:00';
    }
};

export const saveSleep = async (sleep) => {
    try {
        if (typeof sleep !== 'boolean') {
            throw new Error('Invalid sleep value type, expected boolean');
        }
        await AsyncStorage.setItem(SLEEP_KEY, sleep.toString());
    } catch (error) {
        console.error('Error saving sleep value:', error);
    }
};

export const loadSleep = async () => {
    try {
        const sleep = await AsyncStorage.getItem(SLEEP_KEY);
        return sleep !== null ? sleep : 'false';
        // return 'true'; // uncomment and comment above lines to simulate trigger of pet sleep.
    } catch (error) {
        console.error('Error loading sleep value:', error);
        return 'false';
    }
};

export const loadIsAsleepFromStorage = async (setter) => {
    try {
        const sleepFlag = await loadSleep();
        setter(sleepFlag === 'true');
    } catch (error) {
        console.error('Error loading sleep schedule:', error);
    }
};
