import {shuffleArray, filteredQuestions} from '../components/minigame.jsx';
import questionsData from '../assets/data/questions.json';
import fc from 'fast-check';
import { loadHappiness, saveHappiness } from '../components/happinessStorage.jsx';
import { render, fireEvent, screen } from '@testing-library/react';
import MiniGame from '../components/minigame.jsx';

jest.mock('../assets/pets/frog/Frog.jpg', () => 'test-image-mock');
jest.mock('../components/happiness.jpg', () => 'test-happiness-image');
jest.mock('react-native', () => ({
  Image: jest.fn(({ source, style, ...props }) => <img src={source} style={style} {...props} alt="MockedImage" />),
  View: jest.fn(({ children, style, ...props }) => <div style={style} {...props}>{children}</div>),
  Text: jest.fn(({ children, style, ...props }) => <span style={style} {...props}>{children}</span>),
  TouchableOpacity: jest.fn(({ children, onPress, style, ...props }) => 
    <button onClick={onPress} style={style} {...props}>{children}</button>
  ),
  StyleSheet: {
    create: jest.fn((styles) => styles)
  },
}));


jest.mock('../assets/data/questions.json', () => [{
  question: "Sample question?",
  answers: ["Answer 1", "Answer 2", "Answer 3"],
  correctAnswerIndex: 1,
}], { virtual: true });


describe('MiniGame component property-based tests', () => {
  test('shuffleArray should keep array elements and length', () => {
    fc.assert(fc.property(fc.array(fc.anything()), () => {
      const originalArray = [...questionsData];
      const shuffledArray = shuffleArray(originalArray);
      expect(shuffledArray).toHaveLength(originalArray.length);
      expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
    }));
  });
});

test('Filtered questions should not exceed expected fraction', () => {
  fc.assert(
    fc.property(fc.record({
      difficulty: fc.constantFrom("easy", "medium", "hard"),
      questionsData: fc.array(fc.object())
    }), (data) => {
      const { difficulty, questionsData } = data;
      const expectedFractions = { easy: 1/3, medium: 2/3, hard: 1 };
      const filtered = filteredQuestions(questionsData, difficulty);
      const expectedMax = Math.ceil(9 * expectedFractions[difficulty]);

      // Log the details
      console.log(`Testing with difficulty: ${difficulty}`);
      console.log(`Total questions provided: ${questionsData.length}`);
      console.log(`Fraction expected: ${expectedFractions[difficulty]}`);
      console.log(`Max questions expected after filtering: ${expectedMax}`);
      console.log(`Questions received after filtering: ${filtered.length}`);

      expect(filtered.length).toBeLessThanOrEqual(expectedMax);
    })
  );
});

jest.mock('../components/happinessStorage.jsx', () => ({
  loadHappiness: jest.fn(),
  saveHappiness: jest.fn(),
}));



describe('MiniGame component tests', () => {
  test('Happiness should not exceed 100', () => {
   fc.assert(
    fc.property(fc.integer(101, 200), initialHappiness => {
          // Mock loadHappiness to resolve with any initial valid happiness
          loadHappiness.mockResolvedValue(initialHappiness);
          saveHappiness.mockResolvedValue(initialHappiness);

          render(<MiniGame />);

          
          // Simulate answering all questions correctly
          const answers2 = screen.getByRole('button', { name: /Answer 2/i });
          fireEvent.click(answers2);
          fireEvent.click(answers2);
          fireEvent.click(answers2);
          fireEvent.click(answers2);
          screen.debug()

          // Ensure the game over logic is triggered

          // Check if happiness is not greater than 100
          const happinessElement = screen.getByTestId('happinessText');
          const happinessText = happinessElement.textContent;
          const happinessValue = parseInt(happinessText.match(/\d+/)[0], 10);

          // Now use an expect statement to check if the happiness value is 100 or less
          expect(happinessValue).toBeLessThanOrEqual(100);
        }
      ),
      { numRuns: 1 }
    );
  });
});