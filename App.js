import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Overview Screen"
        onPress={() => navigation.navigate('Overview')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function OverviewScreen({ navigation }) {
  return (
    <View style={styles.overviewContainer}>
      <View style={styles.hStack}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Flashcards Overview</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.plusButton}
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Overview" component={OverviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'left',
    marginTop: 20,
  },
  overviewContainer: {
    flex: 1,
    backgroundColor: '#FFBBE0',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Arial',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
  },
  plusButtonText: {
    fontSize: 40,
    color: '#E14D9D',
  },
});
