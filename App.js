import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TextInput, Button, Text, View, StyleSheet } from 'react-native';
import User from './components/User'; // Import the User component

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 30 }}>User Component</Text>
        <User 
          name="John Doe"
          pets={[
            { name: 'Fluffy', species: 'Cat' },
            { name: 'Buddy', species: 'Dog' }
          ]}
          exams={[new Date('2024-01-15'), new Date('2024-02-10')]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
