export const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    courseCode TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users (id)
  );
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studySet TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    petId INTEGER,
    FOREIGN KEY (petId) REFERENCES pets (id)
  );
`;

export const insertDummyData = `
  INSERT INTO users (username, email) VALUES ('testUser', 'test@example.com');
  INSERT INTO pets (name, courseCode, userId) VALUES ('testPet', '101', 1);
  INSERT INTO flashcards (studySet, question, answer, petId) VALUES ('Biology', 'What is life?', 'Life is...', 1);
`;
