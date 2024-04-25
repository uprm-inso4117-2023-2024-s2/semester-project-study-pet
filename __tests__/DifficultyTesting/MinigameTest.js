import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import React from 'react';
import MiniGame from '../../components/minigame';

// Mock the import of questions data
jest.mock('../../assets/data/questions.json', () => [
    { question: "What is the capital of France?", answers: ["London", "Paris", "Berlin", "Rome"], correctAnswerIndex: 1 },
    { question: "What is the largest planet in our solar system?", answers: ["Jupiter", "Mars", "Earth", "Venus"], correctAnswerIndex: 0 },
    { question: "Who wrote \"To Kill a Mockingbird\"?", answers: ["Stephen King", "Harper Lee", "J.K. Rowling", "Charles Dickens"], correctAnswerIndex: 1 },
    { question: "Which element has the chemical symbol \"Fe\"?", answers: ["Iron", "Gold", "Silver", "Copper"], correctAnswerIndex: 0 },
    { question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Cell membrane", "Mitochondria", "Endoplasmic reticulum"], correctAnswerIndex: 2 }
]);

describe('Minigame Difficulty Tests', () => {
  const totalQuestions = 5; // Assume total questions are 5 as per your mocked data

  // Helper function to calculate expected questions
  const calculateExpectedQuestions = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return Math.ceil(totalQuestions * 1 / 3);
      case "medium":
        return Math.ceil(totalQuestions * 2 / 3);
      case "hard":
        return totalQuestions;
      default:
        return Math.ceil(totalQuestions * 1 / 3);
    }
  };

  // Test each difficulty
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    it(`completes and verifies questions for ${difficulty} difficulty`, async () => {
      const expectedQuestions = calculateExpectedQuestions(difficulty);

      const { getByText } = render(<MiniGame />);
      fireEvent.press(getByText(difficulty));

      // Check if any answer buttons are available and interact with them
      await waitFor(async () => {
        let answerButtons = screen.queryAllByTestId('answerButton');
        while (answerButtons.length > 0) {
          answerButtons.forEach(button => fireEvent.press(button));
          answerButtons = screen.queryAllByTestId('answerButton');
        }
      });

      // After all available questions have been answered, check the count
      await waitFor(() => {
        const countText = getByText(new RegExp(`You got\\s+\\d+\\s+out of\\s+${expectedQuestions}\\s+correct!`));
        expect(countText).toBeTruthy();
      });
    });
  });
});
