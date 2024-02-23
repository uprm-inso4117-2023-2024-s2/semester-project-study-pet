import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('study_pet.db');

export const initDB = () => {
  db.transaction(tx => {
    // Users table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL
      );`
    );
    // Pets table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        courseCode TEXT NOT NULL,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users (id)
      );`
    );
    // Flashcards table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studySet TEXT NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        petId INTEGER,
        FOREIGN KEY (petId) REFERENCES pets (id)
      );`
    );
  }, (error) => {
    console.log("Error initializing the database: ", error);
  }, () => {
    console.log("Database initialized successfully");
  });
};
