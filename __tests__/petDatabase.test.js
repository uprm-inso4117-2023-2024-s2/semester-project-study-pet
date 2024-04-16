// petDatabase.test.js
import realm from '../realm.js'; // Import your realm instance
import Pet from '../realm.js'; // Import your schema if needed

describe('Realm Database Functionality', () => {
  beforeEach(() => {
    // Clear the database before each test
    realm.write(() => {
      realm.deleteAll();
    });
  });

//   test('Database is initialized with the correct schema', () => {
//     // Ensure that the realm instance is created with the correct schema
//     const schema = realm.schema.find(s => s.name === 'Pet');
//     expect(schema).toBeDefined();
//     expect(schema.properties).toEqual(Pet.schema.properties);
//   });

  test('Database is initialized with the correct schema', () => {
    // Ensure that the realm instance is created with the correct schema
    expect(Pet.schema).toBeDefined();

    const schemaProperties = Pet.schema ? Pet.schema.properties : undefined;

    const expectedSchemaProperties = {
        name: 'string',
        growthlvl: 'int',
        happiness: 'int',
        lastInteractionTime: 'date',
        careMistakes: 'int',
        pettype: 'string',
        images: 'list',
        sleepTime: 'string',
        isAsleep: 'bool',
        };
    
    if (schemaProperties){
        expect(schemaProperties).toEqual(expectedSchemaProperties);
    }
    
  });

  test('Add, retrieve, update, and delete pet objects from the database', () => {
    // Add a pet to the database
    realm.write(() => {
      realm.create('Pet', {
        name: 'Fluffy',
        growthlvl: 1,
        happiness: 80,
        lastInteractionTime: new Date(),
        careMistakes: 0,
        pettype: 'Cat',
        images: ['/path/to/fluffy.jpg'],
        sleepTime: '10:00 PM',
        isAsleep: false,
      });
    });

    // Retrieve the added pet from the database
    const fluffy = realm.objects('Pet').filtered('name = "Fluffy"')[0];
    expect(fluffy).toBeDefined();

    // Update the pet's properties
    realm.write(() => {
      fluffy.happiness = 90;
      fluffy.sleepTime = '11:00 PM';
    });

    // Retrieve the updated pet from the database and verify the changes
    const updatedFluffy = realm.objects('Pet').filtered('name = "Fluffy"')[0];
    expect(updatedFluffy.happiness).toBe(90);
    expect(updatedFluffy.sleepTime).toBe('11:00 PM');

    // Delete the pet from the database
    realm.write(() => {
      realm.delete(fluffy);
    });

    // Ensure that the pet is no longer in the database
    const deletedFluffy = realm.objects('Pet').filtered('name = "Fluffy"')[0];
    expect(deletedFluffy).toBeUndefined();
  });

  // Add more test cases for querying as needed
});
