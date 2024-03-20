import React from 'react';
import { render } from '@testing-library/react-native';
import User from './User';

describe('User component', () => {
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
});
