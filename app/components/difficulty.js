import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the default difficulty settings
const defaultDifficulty = {
  difficulty: 'easy', // Default difficulty level
  levels: {
    easy: {
      cards: 4, // Total number of cards
      rows: 2, // Number of rows
      cols: 2, // Number of columns
      lives: 1, // Number of lives
    },
    medium: {
      cards: 6,
      rows: 2,
      cols: 3,
      lives: 2,
    },
    difficult: {
      cards: 12,
      rows: 4,
      cols: 3,
      lives: 3,
    },
  },
};

// Function to get difficulty settings from AsyncStorage
export const getDifficulty = async () => {
  try {
    const difficulty = await AsyncStorage.getItem('difficulty');
    return difficulty ? JSON.parse(difficulty) : defaultDifficulty;
  } catch (error) {
    console.error('Error getting difficulty:', error);
    return defaultDifficulty;
  }
};

// Function to save difficulty settings to AsyncStorage
export const saveDifficulty = async (difficulty) => {
  try {
    await AsyncStorage.setItem('difficulty', JSON.stringify(difficulty));
  } catch (error) {
    console.error('Error saving difficulty:', error);
  }
};
