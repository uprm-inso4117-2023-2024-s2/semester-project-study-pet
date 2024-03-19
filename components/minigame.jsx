import React, { useState, useEffect  } from 'react';
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

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array) => {
  let currentIndex = array.length,  randomIndex;
  
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const MiniGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium'); // The selectedDifficulty has to be changed to the current pet difficulty
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    const filteredQuestions = () => {
      const shuffledQuestions = shuffleArray([...questionsData]); // Assuming shuffleArray is defined elsewhere
      //console.log("difficulty:", selectedDifficulty);

      // Ensure the array does not exceed 9 elements
      const maxQuestions = shuffledQuestions.slice(0, 9);

      let fraction;
      switch (selectedDifficulty) {
        case "easy":
          fraction = 1 / 3;
          break;
        case "medium":
          fraction = 2 / 3;
          break;
        case "hard":
          fraction = 1; // All questions
          break;
        default:
          fraction = 1 / 3;
      }

      // Apply the fraction to the potentially shortened list of up to 9 questions
      const numberToShow = Math.ceil(maxQuestions.length * fraction);
      return maxQuestions.slice(0, numberToShow);
    };

    setQuestions(filteredQuestions());

  }, [selectedDifficulty]);

  // Function to handle answer selection
  const handleAnswerSelection = (selectedAnswerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
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
                You got {score} out of {questions.length} correct!
              </Text>
              <TouchableOpacity style={styles.button} onPress={restartGame}>
                <Text style={styles.buttonText}>Play Again</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (questions.length > 0 && currentQuestionIndex < questions.length) {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          </View>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
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
  }
  else {
    return <View><Text>Loading questions...</Text></View>;
  }
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
