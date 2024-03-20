import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuestionSelector from '../components/questionSelector';

const SelectQuestions = ({ navigation }) => {
  const handleStart = (numQuestions) => {
    navigation.navigate('Eat', { numQuestions });
  };

  return (
    <View style={styles.container}>
      <QuestionSelector onStart={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#8FECA9',
  },
});

export default SelectQuestions;
