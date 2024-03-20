import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import StudySet from './StudySet';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

describe('StudySet component', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to avoid async issues
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run only pending timers after each test
    jest.useRealTimers(); // Restore real timers
  });

  it('renders the title correctly', () => {
    const title = 'Test Study Set';
    act(() => {
      const { getByText } = render(<StudySet title={title} />);
      expect(getByText(title)).toBeTruthy();
    });
  });

  it('renders the children components correctly', () => {
    const childComponentText = 'Child Component';
    act(() => {
      const { getByText } = render(
        <StudySet title="Test Study Set">
          <Text>{childComponentText}</Text>
        </StudySet>
      );
      expect(getByText(childComponentText)).toBeTruthy();
    });
  });

  it('renders with default props', () => {
    act(() => {
      const { getByText } = render(<StudySet />);
      expect(getByText('Default Title')).toBeTruthy();
    });
  });

  it('stores data locally', async () => {
    const testData = { title: 'Test Title' };
    const testDataString = JSON.stringify(testData);

    await act(async () => {
      await AsyncStorage.setItem('test_data', testDataString);
    });

    await act(async () => {
      const storedData = await AsyncStorage.getItem('test_data');
      const parsedData = storedData ? JSON.parse(storedData) : null;
      expect(parsedData).toEqual(testData);
    });
  });
});
