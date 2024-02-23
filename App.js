import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { TextInput,Button, Text, View, StyleSheet } from 'react-native';
import Pet from './components/Pet'

class App extends Component{
  render(){
    return(
        <View>
          <Text style={{color: 'red',fontSize:30}}>Pet Component</Text>
          <View> 
            <Pet />
          </View>     

        </View>
    )
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