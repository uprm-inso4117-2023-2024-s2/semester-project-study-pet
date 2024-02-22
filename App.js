import React from 'react';
import { View, StyleSheet } from 'react-native';
import MiniGame from './components/minigame';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <MiniGame />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7CAC9', // Rose color
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
