import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { saveHappiness, loadHappiness } from './happinessStorage';
import { saveHunger, loadHunger } from './hungerStorage';

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
      growthlvl: 3, // growth level in which stages are based on
      hunger: 0,
      happiness: 100,
      lastInteractionTime: new Date(),
      careMistakes: 0,
      startDate: new Date("2024-03-16"), //Date the pet was created,  we need to get the info from pet creation
      examDate: new Date("2024-03-18") // Date the exam is due , we need to get the info from pet creation, please implement this
      
    };
  }


  componentDidMount() {
    this.loadHappinessFromStorage();
    this.loadHungerFromStorage(); 

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
      const timeToExam = Math.ceil((examDate - startDate) / (1000 * 60 * 60 * 24));
      const daysUntilExam = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));
     
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
    const { happiness, name, images,growthlvl, currentImageIndex, careMistakes } = this.state;
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
      <View>
        <Image source={currentImage} style={styles.image} />
        
        <Text style={styles.name}>{name}</Text>
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
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },
});

export default Pet;
export { loadHappiness, loadHunger };