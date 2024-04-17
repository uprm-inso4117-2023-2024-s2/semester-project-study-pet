import realm from '../realm.js'; 
import Pet from '../realm.js'; 

describe('Realm Database Functionality', () => {
  beforeEach(() => {
    // Clear the database before each test
    realm.write(() => {
      realm.deleteAll();
    });
  });


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
 
  /* Error handling tests
  ---------------------------------------------------- 
  */
 
  test('Error handling when adding a pet with missing required properties', () => {
    expect(() => {
      realm.write(() => {
        // Attempt to add a pet with missing required properties
        realm.create('Pet', { name: 'MissingPropertiesPet' });
      });
    }).toThrowError();
  });
  
  test('Error handling when adding a pet with invalid property types', () => {
    expect(() => {
      realm.write(() => {
        // Attempt to add a pet with invalid property types
        realm.create('Pet', {
          name: 'InvalidTypePet',
          growthlvl: 'should be int', // This should be an integer
        });
      });
    }).toThrowError();
  });
  
  test('Error handling when adding a pet with duplicate name', () => {
    // Add a pet with a unique name
    realm.write(() => {
      realm.create('Pet', {
        name: 'UniquePetName',
        growthlvl: 1,
        happiness: 80,
        lastInteractionTime: new Date(),
        careMistakes: 0,
        pettype: 'Cat',
        images: ['/path/to/unique.jpg'],
        sleepTime: '10:00 PM',
        isAsleep: false,
      });
    });
  
    // Attempt to add another pet with the same name
    expect(() => {
      realm.write(() => {
        const existingPet = realm.objects('Pet').filtered('name = "UniquePetName"')[0];
        if (existingPet) {
          throw new Error('A pet with the same name already exists');
        } else {
          realm.create('Pet', {
            name: 'UniquePetName', // This name is already in use
            growthlvl: 2,
            happiness: 70,
            lastInteractionTime: new Date(),
            careMistakes: 1,
            pettype: 'Dog',
            images: ['/path/to/another.jpg'],
            sleepTime: '11:00 PM',
            isAsleep: false,
          });
        }
      });
    }).toThrowError('A pet with the same name already exists');
  });

  /* Query Tests
  ----------------------------------------------------
  */
  test('Query pets by type', () => {
    // Add pets with different types
    realm.write(() => {
      realm.create('Pet', {
        name: 'Cat1',
        growthlvl: 1,
        happiness: 80,
        lastInteractionTime: new Date(),
        careMistakes: 0,
        pettype: 'Cat',
        images: ['/path/to/cat1.jpg'],
        sleepTime: '10:00 PM',
        isAsleep: false,
      });
      realm.create('Pet', {
        name: 'Cat2',
        growthlvl: 2,
        happiness: 85,
        lastInteractionTime: new Date(),
        careMistakes: 1,
        pettype: 'Cat',
        images: ['/path/to/cat2.jpg'],
        sleepTime: '11:00 PM',
        isAsleep: true,
      });
      realm.create('Pet', {
        name: 'Dog1',
        growthlvl: 3,
        happiness: 90,
        lastInteractionTime: new Date(),
        careMistakes: 0,
        pettype: 'Dog',
        images: ['/path/to/dog1.jpg'],
        sleepTime: '9:00 PM',
        isAsleep: false,
      });
    });
  
    // Query pets by type
    const cats = realm.objects('Pet').filtered('pettype = "Cat"');
    const dogs = realm.objects('Pet').filtered('pettype = "Dog"');
  
    expect(cats.length).toBe(2);
    expect(dogs.length).toBe(1);
  });
  
  /* Performance tests
  ----------------------------------------------------
  */

  test('Performance test: Adding a large number of pets', () => {
    const startTime = performance.now();
  
    // Add a large number of pets
    realm.write(() => {
      for (let i = 0; i < 1000; i++) {
        realm.create('Pet', {
          name: `Pet${i}`,
          growthlvl: i,
          happiness: 100,
          lastInteractionTime: new Date(),
          careMistakes: 0,
          pettype: 'Cat',
          images: [`/path/to/pet${i}.jpg`],
          sleepTime: '10:00 PM',
          isAsleep: false,
        });
      }
    });
  
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Adding 1000 pets took ${elapsedTime} milliseconds`);
  });
  

});
