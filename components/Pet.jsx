import React, { Component } from 'react';
import { petEventEmitter } from '../pages/EventEmitter';
import { saveHappiness, loadHappiness } from './happinessStorage';
import { saveHunger, loadHunger } from './hungerStorage';
import { View, StyleSheet, Text, Image, TouchableOpacity, } from 'react-native';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { saveSleep, loadSleepTime, loadSleep } from './sleepScheduleStorage';
import { isPetAsleep } from '../utils/sleepSchedule';

class Pet extends Component {
  constructor(props) {
    super(props);
    // Pet animations, when the new pet stages are drawn, set the index below on the render function
    
    this.state = {
      images: [
        require('./animatedFrog.gif'),
        require('./animatedFrog(sad).gif'),
        require('./animatedFrog(happy).gif'),
        require('./animatedFrog(happy).gif'),
        require('./animatedFrog(dead).gif'),
        require('./babyfrog.jpeg'),
        require('./youngfrog.jpeg'),
      ],
      currentImageIndex: 0,
      name: 'Firulai',
      growthlvl: 0, // growth level in which stages are based on
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
      startDate: new Date("2024-03-16"), //Date the pet was created,  we need to get the info from pet creation
      examDate: new Date("2024-03-18"), // Date the exam is due , we need to get the info from pet creation, please implement this
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

    // Switch images every 3 seconds. If careMistakes >= 10 triggers death
    const imageInterval = setInterval(() => {
      this.setState((prevState) => {
        // Check if careMistakes are >= 10
        if (prevState.careMistakes >= 10) {
          // Emit event petDeath. This is for the "Homepage.js" file to receive it
          petEventEmitter.emit('petDeath', true);
          return { 
            currentImageIndex: this.state.images.length - 1,
          };
        } 
        else {
          // Otherwise, continue looping through images
          petEventEmitter.emit('petAlive', true);
          return {
            currentImageIndex: (prevState.currentImageIndex + 1) % this.state.images.length,
          };
        }
      });
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
    
    handleClick = () => {
      this.props.onChange(true);
      console.log("Goodbye Click");
    }

    const goodbyeInterval = setInterval(() => {
      const { examDate, startDate } = this.state;
      if (examDate >= new Date()){
        this.props.onChange(true)
      }
    })

    const growthInterval = setInterval(() => {
      const { examDate, startDate } = this.state;
      const timeToExam = Math.ceil((examDate - startDate) / (1000 * 60 * 60 * 24));
      const daysUntilExam = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));
      console.log(timeToExam)
      console.log(daysUntilExam)

      let growthLevel;
      if (daysUntilExam <= timeToExam / 3) {
        growthLevel = 3;
      } else if (daysUntilExam <= (2 * timeToExam) / 3) {
        growthLevel = 2;
      } else {
        growthLevel = 1;
      }

      this.setState({ growthlvl: growthLevel });

      if (growthLevel >= 3) clearInterval(growthInterval); // Stop growth after adult stage
    }, 0); 
    

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
    const { happiness, name, images, growthlvl, currentImageIndex, careMistakes, isAsleep } = this.state;
    let currentImage;

    // Select the image based on growth level
    if (growthlvl === 0) {
      currentImage = images[5]; // Baby stage image
    } else if (growthlvl === 1) {
      currentImage = images[6]; // Young stage image
    } else {
      currentImage = images[0]; // Adult stage image
    }
    
    //This piece of code changes the current image of the pet depending on the growth level
    //<Image source={images[currentImageIndex]} style={styles.image} />  this is the original code for the pet photo
    return (
      <View style={{alignItems: 'center', position: 'relative'}}>
        {isAsleep ? <Text>Your pet is asleep Zz</Text> : 
          <>
            <TouchableOpacity onPress={()=>{handleClick()}} style={styles.debug} ><Text>< FontAwesome6 name="soap" size={200} color="#cdb4db" /> </Text></TouchableOpacity>
            <Image source={currentImage} style={styles.image} />
          </>
        }
        <Text style={styles.name}>{name}</Text>
        {/* <Text>Care Mistakes: {careMistakes}</Text> */}
        <Text style={styles.growth}>Growth Level: {growthlvl}</Text> 
        
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
    height: 210,
    marginTop: 70,
    marginBottom: 0,
  },
  debug: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    elevation: 3,
  },
});

export default Pet;
export { loadHappiness, loadHunger };