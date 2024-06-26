import { React, useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { loadHappiness, saveHappiness } from './happinessStorage';
import questionsData from '../assets/data/questions.json'

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
export const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

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
//exported for ease of testing
export const filteredQuestions = (questions, selectedDifficulty) => {
  const shuffledQuestions = shuffleArray([...questions]); // Assuming shuffleArray is defined elsewhere
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


const MiniGame = ({ isAsleep }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium'); // The selectedDifficulty has to be changed to the current pet difficulty
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(filteredQuestions(questionsData, selectedDifficulty));
  }, [selectedDifficulty]);

  // Function to handle answer selection  const [happiness, setHappiness] = useState(0);


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


  // Update happiness only when the game is over and ensure they don't exceed their maximum values
  useEffect(() => {
    if (gameOver) {
      let happinessIncrement = 0;

      // Determine increments based on difficulty
      switch (selectedDifficulty) {
        case "easy":
          happinessIncrement = score * 10;
          break;
        case "medium":
          happinessIncrement = score * 5;
          break;
        case "hard":
          happinessIncrement = score * 2;
          break;
        default:
          happinessIncrement = score * 5;
      }

      // Update happiness
      const newHappiness = happiness + happinessIncrement;
      const cappedHappiness = Math.min(newHappiness, 100); // Cap happiness at 100
      setHappiness(cappedHappiness);
      saveHappiness(cappedHappiness);
    }
  }, [gameOver, score, selectedDifficulty]);

  if (gameOver) {
    return (
      <View style={styles.container} data-testid="gameContainer">
        <View style={styles.gameContainer}>
          <View style={styles.gameOverContainer}>
            <Text style={styles.finishedText}>Finished!</Text>
            <Text style={styles.resultText}>
              You got {score} out of {questions.length} correct!
            </Text>
            <Image
              style={styles.frogStyle}
              source={require('../assets/pets/frog/Frog.jpg')}>
            </Image>



            <View style={styles.hrow}>
              <Text style={styles.statText} data-testid="happinessText">
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
      </View>
    );
  }

  if (questions.length > 0 && currentQuestionIndex < questions.length) {
    return (
      <View style={styles.container}>
        {/* This are 3 temporary buttons to test the difficulty */}
        <TouchableOpacity onPress={() => setSelectedDifficulty('easy')}>
          <Text style={styles.buttonText}>easy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedDifficulty('medium')}>
          <Text style={styles.buttonText}>medium</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedDifficulty('hard')}>
          <Text style={styles.buttonText}>hard</Text>
        </TouchableOpacity>

        <Text>Selected Value: {selectedDifficulty}</Text>
        {/* End of temporary code */}

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
              testID='answerButton'
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
  titleContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Jua-Regular',
    textAlign: 'center',
    textAlignVertical: 'top',
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
    marginRight: 10,
    fontFamily: 'Jua-Regular',
  },
  hrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frogStyle: {
    width: 200,
    height: 200,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 20,
    resizeMode: 'contain',
  },
  statText: {
    fontSize: 26,
    marginRight: 5,
    fontFamily: 'Jua-Regular',
  },
});

export default MiniGame;
