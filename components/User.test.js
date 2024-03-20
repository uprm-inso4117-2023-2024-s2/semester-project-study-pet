import React from 'react';
import { render } from '@testing-library/react-native';
import User from './User';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('User component', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });

  it('renders with default props', () => {
    const { getByText } = render(<User />);
    
    expect(getByText('Name: ')).toBeTruthy();
    expect(getByText('Pets:')).toBeTruthy();
    expect(getByText('Exams:')).toBeTruthy();
  });

  it('renders with custom name', () => {
    const { getByText } = render(<User name="John" />);
    
    expect(getByText('Name: John')).toBeTruthy();
  });

  it('renders pets correctly', () => {
    const pets = [{ name: 'Fluffy' }, { name: 'Max' }];
    const { getByText } = render(<User pets={pets} />);
    
    expect(getByText('Pets:')).toBeTruthy();
    expect(getByText('Fluffy')).toBeTruthy();
    expect(getByText('Max')).toBeTruthy();
  });

  it('renders exams correctly', () => {
    const exams = [1, 2, 3];
    const { getByText } = render(<User exams={exams} />);
    
    expect(getByText('Exams:')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('stores data locally', async () => {
    const user = { name: 'John', pets: [{ name: 'Fluffy' }], exams: [1, 2, 3] };

    await AsyncStorage.setItem('user_data', JSON.stringify(user));

    // Render the component
    render(<User />);

    // Retrieve data from AsyncStorage
    const storedData = await AsyncStorage.getItem('user_data');

    // Check if data was stored
    expect(storedData).toBeTruthy();

    // Parse stored data and check if it matches the expected user object
    const parsedData = storedData ? JSON.parse(storedData) : null;
    expect(parsedData).toEqual(user);
  });
});
