import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PetGoodbye from '../../components/PetGoodbye';

describe('PetGoodbye Component', () => {
  test('initial state', () => {
    const { getByTestId } = render(<PetGoodbye />);
    const textBox = getByTestId('textBox');
    expect(textBox.props.source).toEqual(require('../../assets/petGoodbye/goodbyeText1.png'));
  });

  test('handleClick method', () => {
    const { getByTestId } = render(<PetGoodbye />);
    const button = getByTestId('button');
    fireEvent.press(button);
    const textBox = getByTestId('textBox');
    expect(textBox.props.source).toEqual(require('../../assets/petGoodbye/goodbyeText2.png'));
  });

  test('rendering different images and text boxes based on state', () => {
    const { getByTestId, rerender } = render(<PetGoodbye />);
    const button = getByTestId('button');
    fireEvent.press(button);
    rerender(<PetGoodbye />);
    const textBox = getByTestId('textBox');
    expect(textBox.props.source).toEqual(require('../../assets/petGoodbye/goodbyeText2.png'));
  });
});
