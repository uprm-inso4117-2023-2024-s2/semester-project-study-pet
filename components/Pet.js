import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('./animatedFrog.gif'),
        require('./animatedFrog(sad).gif'),
        require('./animatedFrog(happy).gif'),
        require('./animatedFrog(happy).gif'),
        require('./animatedFrog(dead).gif'),
      ],
      currentImageIndex: 0,
      name: 'Firulai',
      growthlvl: 0,
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
    };
  }

  componentDidMount() {
    this.loadData();
    // Simulate happiness increasing over time
    this.happinessInterval = setInterval(() => {
      if (this.state.happiness < 100) {
        this.setState((prevState) => ({
          happiness: prevState.happiness + 10,
        }));
      } else {
        clearInterval(this.happinessInterval);
      }
    }, 1000);

    // Switch images every 3 seconds
    this.imageInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentImageIndex: (prevState.currentImageIndex + 1) % this.state.images.length,
      }));
    }, 3000);

    // Check for care mistakes every 15 minutes
    this.careMistakeInterval = setInterval(() => {
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

  componentWillUnmount() {
    this.saveData();
    clearInterval(this.happinessInterval);
    clearInterval(this.imageInterval);
    clearInterval(this.careMistakeInterval);
  }

  async saveData() {
    try {
      await AsyncStorage.setItem('petData', JSON.stringify(this.state));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  async loadData() {
    try {
      const petData = await AsyncStorage.getItem('petData');
      if (petData !== null) {
        this.setState(JSON.parse(petData));
      } else {
        console.error('Error loading data: Retrieved data is undefined');
        // Set default values for state properties
        this.setState({
          images: this.state.images, // Keep existing images array
          currentImageIndex: this.state.currentImageIndex, // Keep existing currentImageIndex
          name: 'Firulai',
          growthlvl: 0,
          hunger: 0,
          happiness: 100,
          lastInteractionTime: new Date(),
          careMistakes: 0,
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
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
        <Image source={images[currentImageIndex]} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        {/* <Text>Care Mistakes: {careMistakes}</Text> */}
        {/* Uncomment line above to show care mistakes on the screen */}
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
