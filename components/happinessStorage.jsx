import AsyncStorage from '@react-native-async-storage/async-storage';

const HAPPINESS_KEY = 'happiness';

export const saveHappiness = async (happiness) => {
    try {
        // Limit happiness to 100
        const cappedHappiness = Math.min(happiness, 100);
        console.log("saveHappiness from storage:", cappedHappiness)
        await AsyncStorage.setItem(HAPPINESS_KEY, cappedHappiness.toString());
    } catch (error) {
        console.error('Error saving happiness value:', error);
    }
};


export const loadHappiness = async () => {
    try {
        const happiness = await AsyncStorage.getItem(HAPPINESS_KEY);
        console.log("loadHappiness from storage:", happiness)
        return happiness !== null ? parseInt(happiness) : 0;
    } catch (error) {
        console.error('Error loading happiness value:', error);
        return 0;
    }
};
