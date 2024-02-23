// database/FlashcardDB.js
import { db } from './database';

const addFlashcard = (studySet, question, answer, petId, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO flashcards (studySet, question, answer, petId) VALUES (?, ?, ?, ?);', [studySet, question, answer, petId], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const fetchFlashcards = (petId, callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM flashcards WHERE petId = ?;', [petId], (_, { rows: { _array } }) => callback(true, _array), (_, error) => callback(false, error));
  });
};

const updateFlashcard = (id, studySet, question, answer, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE flashcards SET studySet = ?, question = ?, answer = ? WHERE id = ?;', [studySet, question, answer, id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const deleteFlashcard = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM flashcards WHERE id = ?;', [id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

export default {
  addFlashcard,
  fetchFlashcards,
  updateFlashcard,
  deleteFlashcard,
};
