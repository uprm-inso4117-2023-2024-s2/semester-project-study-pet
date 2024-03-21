import React, { Component } from 'react';
import {Button, View, StyleSheet, Text, Image, TouchableOpacity, } from 'react-native';

class PetGoodbye extends Component {
  constructor(props) {
    super(props);
    // Pet animations, when the new pet stages are drawn, set the index below on the render function

    this.state = {
      images: [
        require('./PetImages/FrogImages/animatedFrog.gif'),
        require('./PetImages/FrogImages/animatedFrog(sad).gif'),
        require('./PetImages/FrogImages/animatedFrog(happy).gif'),
        require('./PetImages/FrogImages/animatedFrog(happy).gif'),
        require('./PetImages/FrogImages/animatedFrog(dead).gif'),
        // require('./babyfrog.jpeg'),
        // require('./youngfrog.jpeg'),
        // require('./animatedFrog(talkin).gif'),
        require('../assets/petGoodbye/goodbyeSuitcase.png'),
        require('../assets/petGoodbye/goodbyeButtonNo.png'),
        require('../assets/petGoodbye/goodbyeButtonYes.png'),
        require('../assets/petGoodbye/empty.png'),
      ],
      goodbyeImages: [
        require('../assets/petGoodbye/goodbyeText1.png'),
        require('../assets/petGoodbye/goodbyeText2.png'), 
        require('../assets/petGoodbye/goodbyeText3.png'),
        require('../assets/petGoodbye/goodbyeText4.png'),
        require('../assets/petGoodbye/empty.png'),
        require('../assets/petGoodbye/goodbyeText5.png'),
        // require('../assets/petGoodbye/goodbyeText6.png'),
      ],
      background: [require('../assets/petGoodbye/goodbye_confetti.png')],
      currentImageIndex: 0,
      name: 'Firulai',
      growthlvl: 0, // growth level in which stages are based on
      goodbye: true,
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
      startDate: new Date("2024-03-16"), //Date the pet was created,  we need to get the info from pet creation
      examDate: new Date("2024-03-18"), // Date the exam is due , we need to get the info from pet creation, please implement this
      textBoxIndex: 0,
    };
  }


  componentDidMount() {

    // Switch images every 3 seconds
    const imageInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentImageIndex: (prevState.currentImageIndex + 1) % this.state.images.length,
      }));
    }, 3000);
    
  }

  handleInteraction = () => {
    this.setState({
      lastInteractionTime: new Date(),
    });
  };

  handleClick = () => {
    const {textBoxIndex} = this.state;
    console.log(textBoxIndex);
    if (textBoxIndex < 5) {
      this.setState((prevState) => ({
        textBoxIndex: (prevState.textBoxIndex + 1)
      }));
    }
  };

  render() {
    const {textBoxIndex, images, background, goodbye, goodbyeImages, currentImageIndex } = this.state;
    let currentImage;
    let bigTextBox
    let currentBackground = background[0];
    // currentImage = images[7];
    let textBox = goodbyeImages[textBoxIndex];
    if (textBoxIndex == 4){
      currentImage = images[8];
    } else{
      currentImage = images[7];
    }
    if (textBoxIndex >= 5){
      currentImage = images[11];
      textBox = goodbyeImages[4];
      bigTextBox = goodbyeImages[textBoxIndex];
    }

    return (
      <View style={{alignItems: 'center', position: 'relative'}}>
        <Image source={currentImage} style={styles.image} />
        <Image source={currentBackground} style={styles.background} />
        <TouchableOpacity onPress={()=>{this.handleClick()}} style={styles.button} >
          <Image source={textBox} style={styles.textBox} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.handleClick()}} style={styles.button} >
          <Image source={bigTextBox} style={styles.bigtextBox} />
        </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  bigtextBox: {
    alignItems: 'center',
    width: 301,
    height: 200,
    marginTop: -100,
    marginBottom: 50,
    // position: 'absolute'
  },
  textBox: {
    alignItems: 'center',
    width: 300,
    height: '100%',
    marginTop: 210,
    marginBottom: 50,
    position: 'absolute'
  },
  background: {
    width: '105%',
    height: '120%',
    marginTop: -25,
    marginBottom: 0,
    position: 'absolute'
  },
  image: {
    width: 210,
    height: 210,
    marginTop: 70,
    marginBottom: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    width: 60,
    height: 60,
    elevation: 3,
  },
});

export default PetGoodbye;
