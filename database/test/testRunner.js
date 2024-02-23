import { initializeTestDatabase } from './databaseTest';

const runTests = async () => {
  try {
    await initializeTestDatabase();

  } catch (error) {
    console.error('Error running tests:', error);
  }
};

runTests();
