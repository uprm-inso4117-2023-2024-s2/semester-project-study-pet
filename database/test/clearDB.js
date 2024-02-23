import { testDb } from './databaseTest';

export const tearDownTestDatabase = () => {
  return new Promise((resolve, reject) => {
    testDb.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS flashcards;');
      tx.executeSql('DROP TABLE IF EXISTS pets;');
      tx.executeSql('DROP TABLE IF EXISTS users;');
    }, (error) => {
      console.error('Failed to tear down test database:', error);
      reject(error);
    }, () => {
      console.log('Test database torn down successfully.');
      resolve();
    });
  });
};
