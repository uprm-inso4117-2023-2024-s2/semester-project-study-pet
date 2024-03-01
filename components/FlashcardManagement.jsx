import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStudySets = async () => {
  try {
    const storedStudySets = await AsyncStorage.getItem('studySets');
    if (storedStudySets) {
      return JSON.parse(storedStudySets);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving study sets:', error);
    throw new Error('Failed to retrieve study sets');
  }
};

export const saveStudySets = async (updatedStudySets) => {
  try {
    await AsyncStorage.setItem('studySets', JSON.stringify(updatedStudySets));
  } catch (error) {
    console.error('Error saving study sets:', error);
    throw new Error('Failed to save study sets');
  }
};

export const createOrUpdateFlashcard = async (studySets, { studySet, question, answer }) => {
  const existingStudySet = studySets.find(set => set.title === studySet);

  if (existingStudySet) {
    const updatedStudySets = studySets.map(set =>
      set.title === studySet
        ? { ...set, flashcards: [...set.flashcards, { question, answer }] }
        : set
    );
    await saveStudySets(updatedStudySets);
  } else {
    const newStudySet = {
      title: studySet,
      flashcards: [{ question, answer }],
    };
    const updatedStudySets = [...studySets, newStudySet];
    await saveStudySets(updatedStudySets);
  }
};
