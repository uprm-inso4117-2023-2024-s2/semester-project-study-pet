import AsyncStorage from '@react-native-async-storage/async-storage';

const handleError = (action, error) => {
  console.error(`Error ${action}:`, error);
  throw new Error(`Failed to ${action.toLowerCase()}`);
};

export const getStudySets = async () => {
  try {
    const storedStudySets = await AsyncStorage.getItem('studySets');
    return storedStudySets ? JSON.parse(storedStudySets) : [];
  } catch (error) {
    handleError('retrieving study sets', error);
  }
};

export const saveStudySets = async (updatedStudySets) => {
  try {
    await AsyncStorage.setItem('studySets', JSON.stringify(updatedStudySets));
  } catch (error) {
    handleError('saving study sets', error);
  }
};

export const createOrUpdateFlashcard = async (studySets, { studySet, question, answer }) => {
  const existingStudySet = studySets.find(set => set.title === studySet);

  const updatedStudySets = existingStudySet
    ? studySets.map(set =>
        set.title === studySet ? { ...set, flashcards: [...set.flashcards, { question, answer }] } : set
      )
    : [...studySets, { title: studySet, flashcards: [{ question, answer }] }];

  await saveStudySets(updatedStudySets);
};

export const removeFlashcard = async ({ studySet, question }) => {
  try {
    let studySets = await getStudySets();

    if (!studySet.trim() && !question.trim()) {
      studySets = [];
    } else if (!question.trim()) {
      studySets = studySets.filter(set => set.title !== studySet);
    } else {
      studySets = studySets.map(set => {
        if (set.title === studySet) {
          const updatedFlashcards = set.flashcards.filter(flashcard => flashcard.question !== question);
          return updatedFlashcards.length === 0 ? null : { ...set, flashcards: updatedFlashcards };
        }
        return set;
      }).filter(Boolean);
    }

    await saveStudySets(studySets);
    return true;
  } catch (error) {
    handleError('removing flashcard', error);
  }
};
