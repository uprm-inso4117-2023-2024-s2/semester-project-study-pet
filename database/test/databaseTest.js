import * as SQLite from 'expo-sqlite';

export const testDb = SQLite.openDatabase('study_pet_test.db');

import { schema, insertDummyData } from './callsDB';

export const initializeTestDatabase = () => {
  return new Promise((resolve, reject) => {
    testDb.transaction((tx) => {
      // Execute schema statements
      tx.executeSql(schema);

      // Insert dummy data
      tx.executeSql(insertDummyData);
    }, (error) => {
      console.error('Failed to initialize test database:', error);
      reject(error);
    }, () => {
      console.log('Test database initialized with dummy data.');
      resolve();
    });
  });
};