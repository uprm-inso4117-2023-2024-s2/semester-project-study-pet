import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questionsData = [
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Paris', 'Berlin', 'Rome'],
    correctAnswerIndex: 1,
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: ['Jupiter', 'Mars', 'Earth', 'Venus'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: ['Stephen King', 'Harper Lee', 'J.K. Rowling', 'Charles Dickens'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which element has the chemical symbol "Fe"?',
    answers: ['Iron', 'Gold', 'Silver', 'Copper'],
    correctAnswerIndex: 0,
  },
  {
    question: 'What is the powerhouse of the cell?',
    answers: ['Nucleus', 'Cell membrane', 'Mitochondria', 'Endoplasmic reticulum'],
    correctAnswerIndex: 2,
  },
];

const MiniGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelection = (selectedAnswerIndex) => {
    const currentQuestion = questionsData[currentQuestionIndex];
    if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }

    // Move to the next question or finish the game
    if (currentQuestionIndex === questionsData.length - 1) {
      setGameOver(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
  };

  const currentQuestion = questionsData[currentQuestionIndex];

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>
          Game Over! You got {score} out of {questionsData.length} correct!
        </Text>
        <TouchableOpacity style={styles.button} onPress={restartGame}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
      </View>
      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.answerButton, index === hoveredIndex && styles.answerButtonHover]}
          activeOpacity={0.7}
          onPress={() => handleAnswerSelection(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
    height: 200,
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '60%',
    borderColor: 'black',
    borderWidth: 2,
  },
  answerText: {
    fontSize: 18,
    textAlign: 'center',
  },
  answerButtonHover: {
    backgroundColor: '#6C99BB',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6C99BB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MiniGame;
