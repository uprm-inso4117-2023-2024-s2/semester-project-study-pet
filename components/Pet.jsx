import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { saveHappiness, loadHappiness } from './happinessStorage';
import { saveHunger, loadHunger } from './hungerStorage';
import { saveSleep, loadSleepTime, loadSleep } from './sleepScheduleStorage';
import { isPetAsleep } from '../utils/sleepSchedule';

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
      sleepTime: '23:00',
      isAsleep: false,
    };
  }


  componentDidMount() {
    this.loadHappinessFromStorage();
    this.loadHungerFromStorage(); 
    this.loadSleepScheduleFromStorage();

    // Simulate happiness increasing over time
    const interval = setInterval(() => {
      if (this.state.happiness < 100) {
        this.setState((prevState) => ({
          happiness: prevState.happiness + 10,
        }), () => {
          this.saveHappinessToStorage();
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Switch images every 3 seconds
    const imageInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentImageIndex: (prevState.currentImageIndex + 1) % this.state.images.length,
      }));
    }, 3000);

    // Check for care mistakes every 15 minutes
    const careMistakeInterval = setInterval(() => {
      if (this.state.isAsleep) return; // Don't count care mistakes when pet is asleep

      const currentTime = new Date();
      const lastInteractionTime = new Date(this.state.lastInteractionTime);
      const timeDifference = (currentTime - lastInteractionTime) / (1000 * 60); // in minutes

      if (timeDifference >= 15 && (this.state.happiness === 0 || this.state.hunger === 100)) {
        this.setState((prevState) => ({
          careMistakes: prevState.careMistakes + 1,
        }));
      }
    }, 1000 * 60 * 15);

    // Check for sleep time every minute
    const sleepInterval = setInterval(() => {
      const isAsleep = isPetAsleep(this.state.sleepTime);
      this.setState({ isAsleep }, () => this.saveSleepToStorage(isAsleep) );
    }, 1000 * 60);
  }

  loadHappinessFromStorage = async () => {
    try {
      const happiness = await loadHappiness();
      if (happiness !== null) {
        this.setState({ happiness });
      }
    } catch (error) {
      console.error('Error loading happiness value:', error);
    }
  };

  loadHungerFromStorage = async () => {
    try {
      const hunger = await loadHunger();
      if (hunger !== null) {
        this.setState({ hunger });
      }
    }
    catch (error) {
      console.error('Error loading hunger value:', error);
    }
  };

  loadSleepScheduleFromStorage = async () => {
    try {
      const sleepTime = await loadSleepTime();
      const isAsleep = await loadSleep();
      this.setState({ 
        sleepTime,
        isAsleep: isAsleep === 'true',
      });
    } catch (error) {
      console.error('Error loading sleep schedule:', error);
    }
  };

  saveSleepToStorage = async (isAsleep) => {
    try {
      await saveSleep(isAsleep);
    } catch (error) {
      console.error('Error saving sleep value:', error);
    }
  };

  saveHappinessToStorage = async () => {
    const { happiness } = this.state;
    try {
      await saveHappiness(happiness);
    } catch (error) {
      console.error('Error saving happiness value:', error);
    }
  };

  handleInteraction = () => {
    this.setState({
      lastInteractionTime: new Date(),
    });
  };

  render() {
    const { happiness, name, images, currentImageIndex, careMistakes, isAsleep } = this.state;

    return (
      <View>
        {isAsleep ? <Text>Your pet is asleep Zz</Text> : <Image source={images[currentImageIndex]} style={styles.image} />}
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
export { loadHappiness, loadHunger };