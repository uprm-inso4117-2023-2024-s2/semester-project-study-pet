import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { petEventEmitter } from '../pages/EventEmitter';

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frogimages: [
        require('./PetImages/FrogImages/animatedFrog.gif'),
        require('./PetImages/FrogImages/animatedFrog(sad).gif'),
        require('./PetImages/FrogImages/animatedFrog(happy).gif'),
        require('./PetImages/FrogImages/animatedFrog(happy).gif'),
        require('./PetImages/FrogImages/animatedFrog(dead).gif'),
      ],
      // All Dog and Cat related are currently placeholders for new pets
      dogimages: [
        require('./PetImages/DogImages/animatedDog.png'),
        require('./PetImages/DogImages/animatedDog(sad).gif'),
        require('./PetImages/DogImages/animatedDog(happy).gif'),
        require('./PetImages/DogImages/animatedDog(happy)1.gif'),
        require('./PetImages/DogImages/animatedDog(dead).gif'),
      ],
      // Placeholder for new pet
      catimages: [
        require('./PetImages/CatImages/animatedCat.png'),
        require('./PetImages/CatImages/animatedCat(sad).gif'),
        require('./PetImages/CatImages/animatedCat(happy).gif'),
        require('./PetImages/CatImages/animatedCat(happy)1.gif'),
        require('./PetImages/CatImages/animatedCat(dead).gif'),
      ], 
      bunnyimages: [
        require('./PetImages/BunnyImages/animatedBunny.png'), // Has to be changed to gif
        require('./PetImages/CatImages/animatedCat(sad).gif'), // <--- Have to be changed to bunny images
        require('./PetImages/CatImages/animatedCat(happy).gif'), // <---
        require('./PetImages/CatImages/animatedCat(happy)1.gif'), // <---
        require('./PetImages/CatImages/animatedCat(dead).gif'), // <---
      ], 
      penguinimages: [
        require('./PetImages/PenguinImages/animatedPenguin.png'), // Has to be changed to gif
        require('./PetImages/CatImages/animatedCat(sad).gif'), // <--- Have to be changed to Penguin images
        require('./PetImages/CatImages/animatedCat(happy).gif'), // <---
        require('./PetImages/CatImages/animatedCat(happy)1.gif'), // <---
        require('./PetImages/CatImages/animatedCat(dead).gif'), // <---
      ], 
      pigimages: [
        require('./PetImages/PigImages/animatedPig.png'), // Has to be changed to gif
        require('./PetImages/CatImages/animatedCat(sad).gif'), // <--- Have to be changed to pig images
        require('./PetImages/CatImages/animatedCat(happy).gif'), // <---
        require('./PetImages/CatImages/animatedCat(happy)1.gif'), // <---
        require('./PetImages/CatImages/animatedCat(dead).gif'), // <---
      ], 
      bearimages: [
        require('./PetImages/BearImages/animatedBear.png'), // Has to be changed to gif
        require('./PetImages/CatImages/animatedCat(sad).gif'), // <--- Have to be changed to bear images
        require('./PetImages/CatImages/animatedCat(happy).gif'), // <---
        require('./PetImages/CatImages/animatedCat(happy)1.gif'), // <---
        require('./PetImages/CatImages/animatedCat(dead).gif'), // <---
      ], 
      // More pets can be added here
      currentImageIndex: 0,
      name: 'Firulai',
      growthlvl: 0,
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
      pettype: 'frog',
      images: [],
    };
  }

  // Choose images depending on the pet type
  updateImages = () => {
    console.log(this.state.pettype);
    switch (this.state.pettype) {
      case 'frog':
        images = this.state.frogimages;
        break;
      case 'dog':
        images = this.state.dogimages;
        break;
      case 'cat':
        images = this.state.catimages;
        break;
      case 'bunny':
        images = this.state.bunnyimages;
        break;
      case 'penguin':
        images = this.state.penguinimages;
        break;
      case 'pig':
        images = this.state.pigimages;
        break;
      case 'bear':
        images = this.state.bearimages;
        break;
      // More pets can be added here
    };
  
    this.setState({ images });
  }


  componentDidMount() {
    // Simulate happiness increasing over time
    const interval = setInterval(() => {
      if (this.state.happiness < 100) {
        this.setState((prevState) => ({
          happiness: prevState.happiness + 10,
        }));
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Receives event from Mypets.js when a new pet is created
    // Eventually this would need to be changed to function with choosing an existent pet data
    petEventEmitter.on("petType", (type) => {
      this.setState({ pettype: type }, () => {
        this.updateImages();
        console.log("Type of pet received", type);
      });
    });

    // If user hasn't choose a pet type, set images to default (frog)
    if (this.state.images.length <= 0) {
      this.setState((prevState) => ({
        images: this.state.frogimages,
      }));
    }

    // Switch images every 3 seconds
    const imageInterval = setInterval(() => {
      this.setState((prevState) => {
        // temporary if to set the only avilable images of pets
        if (prevState.pettype != 'frog') {
          return { 
            currentImageIndex: 0,
          };
        } 
        else {
          // Otherwise, continue looping through frog images
          return {
            currentImageIndex: (prevState.currentImageIndex + 1) % this.state.images.length,
          };
        }
      });
    }, 3000);
    // Check for care mistakes every 15 minutes
    const careMistakeInterval = setInterval(() => {
      const currentTime = new Date();
      const lastInteractionTime = new Date(this.state.lastInteractionTime);
      const timeDifference = (currentTime - lastInteractionTime) / (1000 * 60); // in minutes

      if (timeDifference >= 15 && (this.state.happiness === 0 || this.state.hunger === 100)) {
        this.setState((prevState) => ({
          careMistakes: prevState.careMistakes + 1,
        }));
      }
    }, 1000 * 60 * 15);
  }

  handleInteraction = () => {
    this.setState({
      lastInteractionTime: new Date(),
    });
  };

  render() {
    const { happiness, name, images, currentImageIndex, careMistakes } = this.state;

    return (
      <View>
        {images && images.length > 0 &&(
          <Image source={images[currentImageIndex]} style={styles.image} /> 
        )}
        <Text style={styles.name}>{name}</Text>
        {/* <Text>Care Mistakes: {careMistakes}</Text> */} 
        {/*uncomment line above to show care mistakes on the screen*/}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignItems: 'center',
    color: '#288a42',
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },
});

export default Pet;
