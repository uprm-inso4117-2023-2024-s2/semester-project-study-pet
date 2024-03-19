import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const BathGame = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [userHand, setUserHand] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const mockFlashcards = [
      { question: 'What is the capital of France?', answer: 'Paris' },
      { question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
      { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
      { question: 'What is the chemical symbol for water?', answer: 'H2O' },
      { question: 'What is the tallest mammal?', answer: 'Giraffe' },
      { question: 'Which country is famous for its pyramids?', answer: 'Egypt' },
      { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
      { question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean' },
      { question: 'What is the chemical symbol for gold?', answer: 'Au' },
      { question: 'Which bird can fly backwards?', answer: 'Hummingbird' },
    ];

    
    const shuffledFlashcards = shuffleArray(mockFlashcards);
    setFlashcards(shuffledFlashcards);

    
    const randomUserHand = shuffledFlashcards.map(card => card.answer);
    setUserHand(shuffleArray(randomUserHand));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (selectedAnswer) => {
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return; 
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    if (selectedAnswer === flashcards[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    
    setUserHand(userHand.filter(answer => answer !== selectedAnswer));

    if (answeredQuestions.length === flashcards.length - 1) {
      setGameOver(true);
      return;
    }

    const nextQuestionIndex = answeredQuestions.length + 1;
    setCurrentQuestionIndex(nextQuestionIndex);
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.scoreText}>Your Score: {score}/{flashcards.length}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{flashcards[currentQuestionIndex]?.question}</Text>
        </View>
        <View style={styles.userHand}>
          {userHand.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleAnswer(answer)}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  scrollContainer: {
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 80,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5, 
  },
  question: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
    color: '#008080',
  },
  userHand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5, 
  },
  answerText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  gameOverContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Jua-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Jua-Regular',
  },
});

export default BathGame;
