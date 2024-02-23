import React, { Component } from 'react';
import { View,StyleSheet,Text, Image } from 'react-native';
import ProgressBar from './Progressbar'; // Import the ProgressBar component

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Img: 'pet.png',
      name: 'firulai',
      growthlvl: 0,
      hunger: 0,
      happiness: 0, // Initially happiness is 0%
    };
  }

  componentDidMount() {
    // Simulate happiness increasing over time
    const interval = setInterval(() => {
      if (this.state.happiness < 100) {
        this.setState((prevState) => ({
          happiness: prevState.happiness + 10, // Increase happiness by 10% every 1 second
        }));
      } else {
        clearInterval(interval); // Stop the interval when happiness reaches 100%
      }
    }, 1000);
  }

  render() {
    const { happiness, name } = this.state;

    return (
      <View >
        <Image source={require('./adultfrog.png')} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        {/* <ProgressBar title={'growth'} progress={this.state.growthlvl} />
        <ProgressBar title={'hunger'} progress={this.state.hunger} /> 
        <ProgressBar title={'happiness'} progress={happiness} /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressbarcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  name: {
    alignItems: 'center',
    color: '#288a42',
    fontSize: 30
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50,

  }
});


export default Pet;
