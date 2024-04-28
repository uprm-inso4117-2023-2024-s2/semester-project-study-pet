import React from 'react';
import '@testing-library/jest-native/extend-expect'; // if you use @testing-library/react-native
import { render } from '@testing-library/react-native';
import Shop from '../pages/Shop.js'; // Adjust the path as necessary

// Mocks for specific libraries
jest.mock('expo-font', () => ({
    useFonts: jest.fn().mockReturnValue([true]), // Simulate fonts are loaded
}));

describe('Shop Component UI', () => {
    it('renders correctly and matches snapshot', () => {
        const { toJSON } = render(<Shop studyPoints={100} setStudyPoints={() => { }} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
