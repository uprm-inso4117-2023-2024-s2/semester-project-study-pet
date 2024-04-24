import React from 'react';
import { render, act } from '@testing-library/react-native';
import Pet from '../../components/Pet';

describe('Pet Component Image Loading', () => {
  const testPetTypeImages = (pettype, expectedImages) => {
    it(`loads correct images for ${pettype}`, async () => {
      // Act to wrap any code that changes state or has side effects
      let component;
      act(() => {
        component = render(<Pet />);
      });

      // Manually setting the pet type to simulate receiving props or state changes
      act(() => {
        component.update(<Pet pettype={pettype} />);
      });

      // Manually trigger the updateImages to simulate lifecycle behavior if not automatically handled
      act(() => {
        component.getInstance().state.pettype = pettype;
        component.getInstance().state.images = []; // Clear images to ensure fresh setup
        component.getInstance().updateImages();
      });

      // Now we check that the state has been updated correctly
      expect(component.getInstance().state.images).toEqual(expectedImages);
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

  // Test for 'dog'
  testPetTypeImages('dog', [
    require('../../components/PetImages/DogImages/animatedDog.png'),
    require('../../components/PetImages/DogImages/animatedDog(sad).gif'),
    require('../../components/PetImages/DogImages/animatedDog(happy).gif'),
    require('../../components/PetImages/DogImages/animatedDog(happy)1.gif'),
    require('../../components/PetImages/DogImages/animatedDog(dead).gif'),
  ]);

});

