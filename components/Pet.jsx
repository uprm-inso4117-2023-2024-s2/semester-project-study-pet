import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('./animatedFrog.gif'),
        require('./animatedFrog(sad).gif'),
        require('./animatedFrog(happy).gif'),
        require('./animatedFrog(angry).gif'),
        require('./animatedFrog(dead).gif'),
      ],
      currentImageIndex: 0,
      name: 'Firulai',
      growthlvl: 0,
      hunger: 0,
      happiness: 80,
      lastInteractionTime: new Date(),
      careMistakes: 0,
    };
  }


  componentDidMount() {
    // Simulate happiness increasing over time
    // const interval = setInterval(() => {
    //   if (this.state.happiness < 100) {
    //     this.setState((prevState) => ({
    //       happiness: prevState.happiness + 10,
    //     }));
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 2000);

    // Switch images every 2 seconds
    const imageInterval = setInterval(() => {
      let nextIndex;

      if(this.state.hunger >= 50){
        nextIndex = this.state.images.findIndex(image => image === require('./animatedFrog(angry).gif'));
      } else if (this.state.happiness >= 80) {
        nextIndex = this.state.images.findIndex(image => image === require('./animatedFrog(happy).gif'));
      } else if (this.state.happiness >= 40) {
        nextIndex = this.state.images.findIndex(image => image === require('./animatedFrog.gif'));

      } else if (this.state.happiness >= 30 || this.state.happiness <= 30) {
        nextIndex = this.state.images.findIndex(image => image === require('./animatedFrog(sad).gif')); 
      } 
  // Update the currentImageIndex state with the index of the selected image
    this.setState((prevState) => ({
    currentImageIndex: nextIndex,}));}, 2000);

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
        <Image source={images[currentImageIndex]} style={styles.image} />
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
