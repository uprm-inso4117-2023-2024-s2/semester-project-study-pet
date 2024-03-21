import AsyncStorage from '@react-native-async-storage/async-storage';

const SLEEP_TIME_KEY = 'sleepTime';
const SLEEP_KEY = 'sleep';

export const saveSleepTime = async (sleepTime) => {
    try {
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
    } catch (error) {
        console.error('Error loading sleep time:', error);
        return '23:00';
    }
}

export const saveSleep = async (sleep) => {
    try {
        await AsyncStorage.setItem(SLEEP_KEY, sleep.toString());
    } catch (error) {
        console.error('Error saving sleep value:', error);
    }
};

export const loadSleep = async () => {
    try {
        const sleep = await AsyncStorage.getItem(SLEEP_KEY);
        return sleep !== null ? sleep : 'false';
    } catch (error) {
        console.error('Error loading sleep value:', error);
        return 'false';
    }
};
