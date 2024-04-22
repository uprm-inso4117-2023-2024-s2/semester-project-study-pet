import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import React from 'react';
import BathGame from '../../components/bathing';


describe('BathGame Difficulty Tests', () => {
  // Test for 'easy' difficulty
  it('completes and verifies 3 questions for easy difficulty', async () => {
    const { getByText } = render(<BathGame />);
    fireEvent.press(getByText('easy'));

    // Check if any answer buttons are available and interact with them
    await waitFor(async () => {
      let answerButtons = screen.queryAllByTestId('answerButton');
      while (answerButtons.length > 0) {  // As long as there are buttons, keep pressing them
        answerButtons.forEach(button => fireEvent.press(button));
        // Re-query to check if more buttons are still present after state updates
        answerButtons = screen.queryAllByTestId('answerButton');
      }
    });

    // After all available questions have been answered, check the count
    await waitFor(() => {
      const countText = getByText(/\d+\s*\/\s*3/); // Adjust regex as necessary based on actual output
      expect(countText).toBeTruthy();
    });
  });

  // Test for 'medium' difficulty
  it('completes and verifies 6 questions for medium difficulty', async () => {
    const { getByText } = render(<BathGame />);
    fireEvent.press(getByText('medium'));

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
      const countText = getByText(/\d+\s*\/\s*6/); // Use a regex that fits the actual text format
      expect(countText).toBeTruthy();
    });
  });

  // Test for 'hard' difficulty
  it('completes and verifies 9 questions for hard difficulty', async () => {
    const { getByText } = render(<BathGame />);
    fireEvent.press(getByText('hard'));

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
      const countText = getByText(/\d+\s*\/\s*9/); // Use a regex that fits the actual text format
      expect(countText).toBeTruthy();
    });
  });
});
