import { React, useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { loadHappiness, saveHappiness } from './happinessStorage';

const questionsData = [
    {
        question: 'What is the chemical symbol for oxygen?',
        answers: ['H2O', 'O2', 'CO2', 'N2'],
        correctAnswerIndex: 1,
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        correctAnswerIndex: 0,
    },
    {
        question: 'What is the process of converting light energy into chemical energy in plants?',
        answers: ['Respiration', 'Transpiration', 'Photosynthesis', 'Fermentation'],
        correctAnswerIndex: 2,
    },
    {
        question: 'What gas do humans exhale during respiration?',
        answers: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswerIndex: 1,
    },
    {
        question: 'What is the largest mammal on Earth?',
        answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswerIndex: 1,
    },
];

const MiniGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [happiness, setHappiness] = useState(0);

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



    // Update happiness only when the game is over
    useEffect(() => {
        if (gameOver) {
            const newHappiness = happiness + score;
            setHappiness(newHappiness);
            saveHappiness(newHappiness);
        }
    }, [gameOver, score]);

    if (gameOver) {
        return (
            <View style={styles.container}>
                <View style={styles.gameContainer}>
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.finishedText}>Finished!</Text>
                        <Text style={styles.resultText}>
                            You got {score} out of {questionsData.length} correct!
                        </Text>
                        <Image
                            style={styles.frogStyle}
                            source={require('../assets/pets/frog/Frog.jpg')}>
                        </Image>

                        <View style={styles.hrow}>
                            <Text style={styles.statText}>
                                Hunger: {score * 10}
                            </Text>
                            <Image
                                style={styles.image}
                                source={require('../components/cookie.jpg')}
                            >
                            </Image>
                        </View>

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
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Choose all correct. Good Luck!</Text>
            </View>
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
        color: '#8FECA9',
    },
    resultText: {
        fontSize: 26,
        marginBottom: 25,
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