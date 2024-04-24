import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useDifficulty = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');

  return { selectedDifficulty, setSelectedDifficulty };
};

export default useDifficulty;