// database/PetDB.js
import { db } from './database';

const addPet = (name, courseCode, userId, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO pets (name, courseCode, userId) VALUES (?, ?, ?);', [name, courseCode, userId], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const fetchPets = (userId, callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pets WHERE userId = ?;', [userId], (_, { rows: { _array } }) => callback(true, _array), (_, error) => callback(false, error));
  });
};

const updatePet = (id, name, courseCode, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE pets SET name = ?, courseCode = ? WHERE id = ?;', [name, courseCode, id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const deletePet = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM pets WHERE id = ?;', [id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

export default {
  addPet,
  fetchPets,
  updatePet,
  deletePet,
};
