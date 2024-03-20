import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ProgressBar extends Component {
  render() {
    const { progress, title } = this.props;
    

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          
        </View>
        <Text style={styles.text}>{progress}%</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 5,
    },
    progressBarContainer: {
      width: '80%',
      height: 30,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#4caf50',
    },
    text: {
      marginTop: 5,
      fontSize: 16,
      color: '#000',
    },
});

export default ProgressBar;
