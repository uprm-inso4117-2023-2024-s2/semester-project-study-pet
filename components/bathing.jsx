import {React,  useState, useEffect } from 'react';
import { Image,View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { loadHappiness, saveHappiness } from './happinessStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BathGame = ({ isAsleep }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [userHand, setUserHand] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    const loadDifficulty = async () => {
      try {
        const difficulty = await AsyncStorage.getItem('selectedDifficulty');
        if (difficulty) {
          setSelectedDifficulty(difficulty);
        }
      } catch (error) {
        console.error('Error loading difficulty:', error);
      }
    };
    loadDifficulty();
  }, []);

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

    const shuffledFlashcards = shuffleArray(mockFlashcards).slice(0, 9);

    const filteredQuestions = () => {
      //const shuffledQuestions = shuffleArray([...questionsData]); // Assuming shuffleArray is defined elsewhere
      //console.log("difficulty:", selectedDifficulty);

      // Ensure the array does not exceed 9 elements
      //const maxQuestions = shuffledQuestions.slice(0, 9);

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
      const numberToShow = Math.ceil(shuffledFlashcards.length * fraction);
      return shuffledFlashcards.slice(0, numberToShow);
    };

    //const shuffledFlashcards = shuffleArray(mockFlashcards);
    //setFlashcards(shuffledFlashcards);
    setFlashcards(filteredQuestions());

    
    const randomUserHand = shuffledFlashcards.map(card => card.answer);
    setUserHand(shuffleArray(randomUserHand));
  }, [selectedDifficulty]);

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

  useEffect(() => {
    const loadHappinessData = async () => {
        try {
            const loadedHappiness = await loadHappiness();
            setHappiness(loadedHappiness);
        } catch (error) {
            console.error('Error loading happiness data:', error);
        }
    };

    loadHappinessData();
}, []);

useEffect(() => {
  if (gameOver && !isAsleep) {
      const newHappiness = score  + happiness;
      const cappedHappiness = Math.min(newHappiness, 100); // Cap happiness at 100
      setHappiness(cappedHappiness);
      saveHappiness(cappedHappiness);
  }
}, [gameOver, score, happiness]);

  if (gameOver) {
    return (
      <View style={styles.container}>
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.scoreText}>Your Score: {score}/{flashcards.length}</Text>
          <View style={styles.hrow}>
                            <Text style={styles.statText}>
                                Happiness: {happiness}
                            </Text>
                            <Image
                                style={styles.image}
                                source={require('../components/happiness.jpg')}
                            >
                            </Image>
                        </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.difficultyContainer}>Difficulty level: {selectedDifficulty}</Text>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{flashcards[currentQuestionIndex]?.question}</Text>
        </View>
        <View style={styles.userHand}>
          {userHand.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleAnswer(answer)}
              testID='answerButton'
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
  difficultyContainer: {
    fontSize: '24px',
    fontFamily: 'Jua-Regular',
    marginTop: 30,
    paddingTop: 40,
    alignItems: 'center',
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
    padding: 15, 
    margin: 10,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: '#ccc',
    elevation: 5,
    maxWidth: '90%',
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
