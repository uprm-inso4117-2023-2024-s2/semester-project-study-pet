import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import questionsData from '../assets/data/questions.json'

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

  if (gameOver) {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <View style={styles.gameOverContainer}>
              <Text style={styles.finishedText}>Finished!</Text>
              <Text style={styles.resultText}>
                You got {score} out of {questionsData.length} correct!
              </Text>
              <TouchableOpacity style={styles.button} onPress={restartGame}>
                <Text style={styles.buttonText}>Play Again</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{questionsData[currentQuestionIndex].question}</Text>
        </View>
        {questionsData[currentQuestionIndex].answers.map((answer, index) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'top',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent', 
  },
  gameContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
  answerButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
  },
  answerText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
  answerButtonHover: {
    backgroundColor: '#e1eefb',
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  finishedText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
    color: '#FF69B4', 
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
  button: {
    backgroundColor: '#6C99BB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Jua-Regular',
  },
});

export default MiniGame;
