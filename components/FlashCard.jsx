import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';

export default function FlashCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  function flipCard() { setIsFlipped(!isFlipped); }

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
        <Text>[Question placeholder]</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.cardBack]} onPress={flipCard}>
        <Text>[Answer placeholder]</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    margin: 10,
    padding: 15,
    width: 135,
  },
  cardFront: {
    backgroundColor: 'beige',
  },
  cardBack: {
    backgroundColor: 'lightsalmon',
  },
});
