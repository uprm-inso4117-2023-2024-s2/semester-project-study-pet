import AsyncStorage from '@react-native-async-storage/async-storage';

const HAPPINESS_KEY = 'happiness';

export const saveHappiness = async (happiness) => {
    try {
        await AsyncStorage.setItem(HAPPINESS_KEY, happiness.toString());
    } catch (error) {
        console.error('Error saving happiness value:', error);
    }
};

export const loadHappiness = async () => {
    try {
        const happiness = await AsyncStorage.getItem(HAPPINESS_KEY);
        return happiness !== null ? parseInt(happiness) : 0;
    } catch (error) {
        console.error('Error loading happiness value:', error);
        return 0;
    }
};
