import React, { Component } from 'react';
import { petEventEmitter } from '../pages/EventEmitter';
import { saveHappiness, loadHappiness } from './happinessStorage';
import { loadHunger } from './hungerStorage';
import { View, StyleSheet, Text, Image } from 'react-native';
import { saveSleep, loadSleepTime, loadSleep } from './sleepScheduleStorage';
import { isPetAsleep } from '../utils/sleepSchedule';

class Pet extends Component {
  constructor(props) {
    super(props);
    // Pet animations, when the new pet stages are drawn, set the index below on the render function

    this.state = {
      frogimages: [
        require('./PetImages/FrogImages/animatedFrog.gif'),
        require('./PetImages/FrogImages/animatedFrog(sad).gif'),
        require('./PetImages/FrogImages/animatedFrog(angry).gif'),
        require('./PetImages/FrogImages/animatedFrog(happy).gif'),
        require('./PetImages/FrogImages/animatedFrog(dead).gif'),
        require('./babyfrog.png'),
        require('./youngfrog.png'),
      ],
      // All Dog and Cat related are currently placeholders for new pets
      dogimages: [
        require('./PetImages/DogImages/animatedDog.png'),
        require('./PetImages/DogImages/animatedDog(sad).png'),
        require('./PetImages/DogImages/animatedDog(angry).png'),
        require('./PetImages/DogImages/animatedDog(happy).png'),
        require('./PetImages/DogImages/animatedDog(dead).png'),
      ],
      // Placeholder for new pet
      catimages: [
        require('./PetImages/CatImages/animatedCat.png'),
        require('./PetImages/CatImages/animatedCat(sad).png'),
        require('./PetImages/CatImages/animatedCat(angry).png'),
        require('./PetImages/CatImages/animatedCat(happy).png'),
        require('./PetImages/CatImages/animatedCat(dead).png'),
      ], 
      bunnyimages: [
        require('./PetImages/BunnyImages/animatedBunny.png'),
        require('./PetImages/BunnyImages/animatedBunny(sad).png'), 
        require('./PetImages/BunnyImages/animatedBunny(angry).png'), 
        require('./PetImages/BunnyImages/animatedBunny(happy).png'),
        require('./PetImages/BunnyImages/animatedBunny(dead).png'), 
      ], 
      penguinimages: [
        require('./PetImages/PenguinImages/animatedPenguin.png'), 
        require('./PetImages/PenguinImages/animatedPenguin(sad).png'), 
        require('./PetImages/PenguinImages/animatedPenguin(angry).png'), 
        require('./PetImages/PenguinImages/animatedPenguin(happy).png'), 
        require('./PetImages/PenguinImages/animatedPenguin(dead).png'),
      ], 
      pigimages: [
        require('./PetImages/PigImages/animatedPig.png'), 
        require('./PetImages/PigImages/animatedPig(sad).png'), 
        require('./PetImages/PigImages/animatedPig(angry).png'),
        require('./PetImages/PigImages/animatedPig(happy).png'), 
        require('./PetImages/PigImages/animatedPig(dead).png'), 
      ], 
      bearimages: [
        require('./PetImages/BearImages/animatedBear.png'),
        require('./PetImages/BearImages/animatedBear(sad).png'),
        require('./PetImages/BearImages/animatedBear(angry).png'), 
        require('./PetImages/BearImages/animatedBear(happy).png'), 
        require('./PetImages/BearImages/animatedBear(dead).png'), 
      ], 
        
      // More pets can be added here
      currentImageIndex: 0,
      name: 'Firulai',

      growthlvl: 3, // growth level in which stages are based on
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
      pettype: 'frog',
      images: [],
      startDate: new Date("2024-05-24"), //Date the pet was created,  we need to get the info from pet creation
      examDate: new Date("2024-05-26"), // Date the exam is due , we need to get the info from pet creation, please implement this
      sleepTime: '23:00',
      isAsleep: false,
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
    this.loadHappinessFromStorage();
    this.loadHungerFromStorage();
    this.loadSleepScheduleFromStorage();

    // Simulate happiness increasing over time
    // const interval = setInterval(() => {
    //   if (this.state.happiness < 100) {
    //     this.setState((prevState) => ({
    //       happiness: prevState.happiness + 10,
    //     }), () => {
    //       this.saveHappinessToStorage();
    //     });
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 1000);

    // Receives event from Mypets.js when a new pet is created
    // Eventually this would need to be changed to function with choosing an existent pet data
    // petEventEmitter.on("petType", (type) => {
    //   this.setState({ pettype: type }, () => {
    //     this.updateImages();
    //     console.log("Type of pet received", type);
    //   });
    // });

    // If user hasn't choose a pet type, set images to default (frog)
    if (this.state.images.length <= 0) {
      this.setState((prevState) => ({
        images: this.state.frogimages,
      }));
    }

    this.updateImages();
   
    this.setState((prevState) => {
      // Initialize an object to hold the state update
      let updates = {};

      // Check if careMistakes are >= 10
      if (prevState.careMistakes >= 10) {
        // Emit event petDeath. This is for the "Homepage.js" file to receive it
        petEventEmitter.emit('petDeath', true);

        // Update currentImageIndex to the last image
        updates = { currentImageIndex: prevState.images.length - 1 };
      } else {
        // If careMistakes are less than 10, emit petAlive
        petEventEmitter.emit('petAlive', true);
      }

      // Return the updates to be applied to the state
      return updates;
    });

    // Check for care mistakes every 15 minutes
    const careMistakeInterval = setInterval(() => {
      if (this.state.isAsleep) {
        return;
      } // Don't count care mistakes when pet is asleep

      const currentTime = new Date();
      const lastInteractionTime = new Date(this.state.lastInteractionTime);
      const timeDifference = (currentTime - lastInteractionTime) / (1000 * 60); // in minutes

      if (timeDifference >= 15 && (this.state.happiness === 0 || this.state.hunger === 100)) {
        this.setState((prevState) => ({
          careMistakes: prevState.careMistakes + 1,
        }));
      }
    }, 1000 * 60 * 15);

    const growthInterval = setInterval(() => {
      const { examDate, startDate } = this.state;
      const timeToExam = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));
      const daysUntilExam = Math.ceil((examDate - startDate) / (1000 * 60 * 60 * 24));

      let growthLevel;
      if (daysUntilExam <= timeToExam / 3) {
        growthLevel = 3;
      } else if (daysUntilExam <= (2 * timeToExam) / 3) {
        growthLevel = 2;
      } else {
        growthLevel = 3;
      }

      this.setState({ growthlvl: growthLevel });

      if (growthLevel >= 3) {
        clearInterval(growthInterval);
      } // Stop growth after adult stage
    }, 0);

    // Check for sleep time every half a second
    const sleepInterval = setInterval(() => {
      const isAsleep = isPetAsleep(this.state.sleepTime);
      this.setState({ isAsleep }, () => this.saveSleepToStorage(isAsleep));
    }, 500);
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
    const { examDate, name, images, growthlvl, isAsleep } = this.state;
    let currentImage;

    if (examDate <= new Date()) {
      this.props.onChange(true)
      console.log("AAAAAAA")
    }

    if (this.state.careMistakes < 10) {
      // Select the image based on growth level
      if (growthlvl === 1) {
        currentImage = images[5]; // Baby stage image
      } else if (growthlvl === 2) {
        currentImage = images[6] // Young state iamge
      } else if (growthlvl === 3 && this.state.hunger >= 50) {
        currentImage = images[2]
      } else if (growthlvl === 3 && this.state.happiness >= 80) {
          currentImage = images[3] // Happy Adult Frog                                         
      } else if (growthlvl === 3 && this.state.happiness >= 40){
        currentImage = images[0] // Regular Adult Frog
      } else if (growthlvl === 3 && (this.state.happiness <= 30 || this.state.happiness >= 30)) {
        currentImage = images[1] // Sad Adult Frog
      } else {
        currentImage = images[0]
      }
    }
    else {
      currentImage = images[4]
    }


    //else if (growthlvl === 1) {
    //   currentImage = images[6]; // Young stage image
    // } else {
    //   currentImage = images[0]; // Adult stage image
    // }

    //This piece of code changes the current image of the pet depending on the growth level
    //<Image source={images[currentImageIndex]} style={styles.image} />  this is the original code for the pet photo
    return (

      <View>
        {images && images.length > 0 && (
          <View style={{ alignItems: 'center', position: 'relative' }}>
            {isAsleep ? <Text id='pet-asleep-message'>Your pet is asleep Zz</Text> :
              <Image source={currentImage} style={styles.image} />
            }
          </View>
        )}
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
});

export default Pet;
export { loadHappiness, loadHunger };
