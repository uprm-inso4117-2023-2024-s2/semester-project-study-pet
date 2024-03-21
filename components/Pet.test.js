import React from 'react';
import { render } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pet from './Pet';

// Mock AsyncStorage module
jest.mock('@react-native-async-storage/async-storage');

describe('Pet component', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('handles error loading data', async () => {
    // Mock AsyncStorage.getItem to throw an error
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Data retrieval error'));

    render(<Pet />);

    // Wait for the component to finish loading
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(console.error).toHaveBeenCalledWith(
      'Error loading data:', expect.any(Error)
    );
  });
  
  it('handles undefined data when loading', async () => {
    // Mock AsyncStorage.getItem to return undefined
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    render(<Pet />);

    // Wait for the component to finish loading
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(console.error).toHaveBeenCalledWith(
      "Error loading data: Retrieved data is undefined"
    );
  });
});
