import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { useFonts } from "expo-font";

export default function FlashCard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);
  function flipCard() { setIsFlipped(!isFlipped); }
  const [dummy] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });

  return (
    <FlipCard
      friction={10}
      perspective={1000}
      flip={isFlipped}
      flipHorizontal={true}
      flipVertical={false}
      clickable={true}
    >
      <TouchableOpacity style={[styles.card, styles.cardFront]} onPress={flipCard}>
        <Text style={{ fontFamily: 'Jua-Regular' }}>{question}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.cardBack]} onPress={flipCard}>
        <Text style={{ fontFamily: 'Jua-Regular' }}>{answer}</Text>
      </TouchableOpacity>
    </FlipCard>
  );
}

const styles = StyleSheet.create({
  card: {
    fontSize: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    margin: 10,
    padding: 15,
    width: 135,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 1.80,
    elevation: 3,
  },
  cardFront: {
    backgroundColor: '#e1eefb',
  },
  cardBack: {
    backgroundColor: '#fbf36c',
  },
});

const myflshcardQ = ['supermaket price of milk','how meny poptart are in a box?', 'where can i find gatorade?','whick is hotter red or green salsa','can i have some more free samples'];  
const myListq = myflshcardQ.map((item) => <p>{item}</p>) 
const myflshcardA = [ '$3.49','ther are 4', 'there in the back','green','yes'];  
const myLista = myflshcardA.map((item) => <p>{item}</p>)
