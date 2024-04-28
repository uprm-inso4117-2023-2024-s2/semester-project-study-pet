import Pet from '../../components/Pet';

// Utility function to wait for state updates in React components
const waitForComponentToUpdate = (component) => {
  return new Promise(resolve => {
    setImmediate(() => {
      component.forceUpdate();
      resolve();
    });
  });
};

describe('Pet Component Image Loading', () => {
  const testPetTypeImages = (pettype, expectedImages) => {
    it(`loads correct images for ${pettype}`, async () => {
      // Create a new instance of the component
      const pet = new Pet({name: "testname",
        examDate: 11/11/2001,
        difficulty: 'medium',
        happiness: 100,
        hunger: 100,
        type: 'frog',
        images: [
            require('../../components/PetImages/FrogImages/animatedFrog.gif'),
            require('../../components/PetImages/FrogImages/animatedFrog(sad).gif'),
            require('../../components/PetImages/FrogImages/animatedFrog(angry).gif'),
            require('../../components/PetImages/FrogImages/animatedFrog(happy).gif'),
            require('../../components/PetImages/FrogImages/animatedFrog(dead).gif'),
            require('../../components/babyfrog.png'),
            require('../../components/youngfrog.png'),
          ]});

      // Manually call the method that updates the images
      pet.updateImages(); 
      jest.runAllTimers();

      await pet.updateImages();

      // Wait for the component to process the state update
      await waitForComponentToUpdate(pet);

      // Check that the state now includes the correct images
      expect(pet.state.frogimages).toEqual(expectedImages);
    });
  };

  // Test for 'frog' type
  testPetTypeImages('frog', [
    require('../../components/PetImages/FrogImages/animatedFrog.gif'),
    require('../../components/PetImages/FrogImages/animatedFrog(sad).gif'),
    require('../../components/PetImages/FrogImages/animatedFrog(angry).gif'),
    require('../../components/PetImages/FrogImages/animatedFrog(happy).gif'),
    require('../../components/PetImages/FrogImages/animatedFrog(dead).gif'),
    require('../../components/babyfrog.png'),
    require('../../components/youngfrog.png'),
  ]);
});
