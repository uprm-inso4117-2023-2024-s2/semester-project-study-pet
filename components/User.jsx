import React, { Component } from 'react';
import { View, Text } from 'react-native';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      pets: props.pets || [],
      exams: props.exams || []
    };
  }

  componentDidMount() {
    this.loadData();
  }

// loading user data

  loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('user_data');
      if (storedData !== null) {
        const { name, pets, exams } = JSON.parse(storedData);
        this.setState({ name, pets, exams });
      }
    } catch (error) {
      console.log('Error loading data', error);
    }
  }

  // saving user data

  saveData = async () => {
    try{
      const {name, pets, exams} = this.state;
      const data = JSON.stringify({name, pets, exams});
      await AsyncStorage.setItem('user_data', data);
    }
    catch (error) {
      console.log('Error saving data', error);
    }
  }

  render() {
    const { name, pets, exams } = this.state;

    return (
      <View>
        <Text>Name: {name}</Text>
        <Text>Pets:</Text>
        <View>
          {pets.map((pet, index) => (
            <Text key={index}>{pet.name}</Text>
          ))}
        </View>
        <Text>Exams:</Text>
        <View>
          {exams.map((exam, index) => (
            <Text key={index}>{exam.toString()}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default User;
