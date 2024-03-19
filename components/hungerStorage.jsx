import AsyncStorage from '@react-native-async-storage/async-storage';

const HUNGER_KEY = 'hunger';

export const saveHunger = async (hunger) => {
    try {
        await AsyncStorage.setItem(HUNGER_KEY, hunger.toString());
    } catch (error) {
        console.error('Error saving happiness value:', error);
    }
};

export const loadHunger = async () => {
    try {
        const hunger = await AsyncStorage.getItem(HUNGER_KEY);
        return hunger !== null ? parseInt(hunger) : 0;
    } catch (error) {
        console.error('Error loading happiness value:', error);
        return 0;
    }
};
