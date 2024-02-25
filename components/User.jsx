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
