// database/UserDB.js
import { db } from './database';

const addUser = (username, email, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO users (username, email) VALUES (?, ?);', [username, email], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const fetchUsers = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM users;', [], (_, { rows: { _array } }) => callback(true, _array), (_, error) => callback(false, error));
  });
};

const updateUser = (id, username, email, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE users SET username = ?, email = ? WHERE id = ?;', [username, email, id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

const deleteUser = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM users WHERE id = ?;', [id], (_, result) => callback(true, result), (_, error) => callback(false, error));
  });
};

export default {
  addUser,
  fetchUsers,
  updateUser,
  deleteUser,
};
