import { AsyncStorage } from 'react-native';

// Handle errors with logging and throwing custom errors

const handleError = (action, error) => {
  console.error(`Error ${action}:`, error);
  throw new Error(`Failed to ${action.toLowerCase()}`);
};

// Get study sets from AsyncStorage
export const getStudySets = async () => {
  try {
    // Retrieve stored study sets from AsyncStorage
    const storedStudySets = await AsyncStorage.getItem('studySets');
    // Return parsed study sets or empty array if none found
    return storedStudySets ? JSON.parse(storedStudySets) : [];
  } catch (error) {
    // Handle errors if retrieval fails
    handleError('retrieving study sets', error);
  }
};

// Save study sets to AsyncStorage
export const saveStudySets = async (updatedStudySets) => {
  try {
    // Save updated study sets to AsyncStorage as JSON string
    await AsyncStorage.setItem('studySets', JSON.stringify(updatedStudySets));
  } catch (error) {
    // Handle errors if saving fails
    handleError('saving study sets', error);
  }
};

// Create or update flashcards in study sets
export const createOrUpdateFlashcard = async (studySets, { studySet, question, answer }) => {
  // Find existing study set with same title
  const existingStudySet = studySets.find(set => set.title === studySet);

  // Updating study sets based on existence of the study set
  const updatedStudySets = existingStudySet
    // If study set exists, updating its flashcards
    ? studySets.map(set =>
        set.title === studySet ? { ...set, flashcards: [...set.flashcards, { question, answer }] } : set
      )
    // If study set does not exist, create new study set
    : [...studySets, { title: studySet, flashcards: [{ question, answer }] }];

  // Save updated study sets to AsyncStorage
  await saveStudySets(updatedStudySets);
};

// Remove flashcard from study sets
export const removeFlashcard = async ({ studySet, question }) => {
  try {
    // Retrieve study sets from AsyncStorage
    let studySets = await getStudySets();

    // Remove all study sets if both study set and question are empty
    if (!studySet.trim() && !question.trim()) {
      studySets = [];
    } else if (!question.trim()) {
      // Remove study set if only study set is provided
      studySets = studySets.filter(set => set.title !== studySet);
    } else {
      // Remove specific flashcard from a study set
      studySets = studySets.map(set => {
        if (set.title === studySet) {
          // Filter specific flashcard to be removed
          const updatedFlashcards = set.flashcards.filter(flashcard => flashcard.question !== question);
          // Return null if no flashcards are left, otherwise update the flashcards
          return updatedFlashcards.length === 0 ? null : { ...set, flashcards: updatedFlashcards };
        }
        return set;
      }).filter(Boolean);
    }

    // Save updated study sets to AsyncStorage after removal
    await saveStudySets(studySets);
    // Indicate successful removal
    return true;
  } catch (error) {
    // Handle errors if removal fails
    handleError('removing flashcard', error);
  }
};
