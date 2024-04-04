import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert, Vibration, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cards } from './components/cards';  
import { Link } from 'expo-router';
import { Audio } from 'expo-av';
import FlipCard from 'react-native-flip-card';

import GameButton from './components/gameButton';

const GameScreen = () => {
  const [gridData, setGridData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(0); 
  const [difficulty, setDifficulty] = useState(null);
  const [key, setKey] = useState(0); 
  const [flippedCount, setFlippedCount] = useState(0); 

  const [gameOverSound, setGameOverSound] = useState(null);
  const [successSound, setSuccessSound] = useState(null);
  const [winSound, setWinSound] = useState(null);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
 
    // Function to load sounds
    const loadSounds = async () => {
        const sfx1 = require('./sfx/sfx-gameover.mp3');
        const sfx2 = require('./sfx/sfx-success.mp3');
        const sfx3 = require('./sfx/sfx-won.mp3');
      
        try {
          const loadedGameOverSound = new Audio.Sound();
          await loadedGameOverSound.loadAsync(sfx1);
          setGameOverSound(loadedGameOverSound);
    
          const loadedSuccessSound = new Audio.Sound();
          await loadedSuccessSound.loadAsync(sfx2);
          setSuccessSound(loadedSuccessSound);
    
          const loadedWinSound = new Audio.Sound();
          await loadedWinSound.loadAsync(sfx3);
          setWinSound(loadedWinSound);
    
          setSoundsLoaded(true); // Set soundsLoaded to true when sounds are loaded successfully
        } catch (error) {
          console.log('Error loading sounds:', error);
        }
      };

  // Function to play sounds
  const playSound = async (sound) => {
    try {
      if (soundsLoaded && sound) {
        await sound.replayAsync();
      } else {
        console.error('Sounds are not loaded yet');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
    
    
  // Function to generate grid data based on difficulty
  const generateGridData = (difficulty) => {
    let cardImages = [];
    let totalCards = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 12;
    let imageCount = totalCards / 2;
    for (let i = 1; i <= imageCount; i++) {
      cardImages.push({ id: i, image: `card${i}.png` });
      cardImages.push({ id: i + imageCount, image: `card${i}.png` });
    }
    cardImages.sort(() => Math.random() - 0.5); // Shuffle the array
    return cardImages.map((item) => ({ ...item, isFlipped: false }));
  };

  const giveUp = () => {
    // Trigger game over manually when user gives up
    setLives(0);
  };

  const handleGameOver = async () => {
   
    // Save high score
    try {
        const highScore = await AsyncStorage.getItem('highScore');
        if (!highScore || score > parseInt(highScore)) {
        await AsyncStorage.setItem('highScore', JSON.stringify(score));
        }
    } catch (error) {
        console.error('Error saving high score:', error);
    }
     
    setGridData([]);
    setSelectedCard(null);
    setScore(0);
    setLives(getInitialLives(difficulty));  
    setKey(0);
  
    // Regenerate grid data based on difficulty
    const newGridData = generateGridData(difficulty);
    setGridData(newGridData);
    
  };

   // Function to restart the game
   const restartGame = () => {
    handleGameOver(); // Reset game state
  };
  

  // Function to get initial number of lives based on difficulty
  const getInitialLives = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'difficult':
        return 3;
      default:
        return 1;
    }
  };

  // Function to handle card selection
const handleCardPress = (item) => {
    if (selectedCard && selectedCard.id === item.id) {
      return; // Prevent selecting the same card again
    }
  
    if (selectedCard) {
      // Check if selected card matches previous card
      if (selectedCard.image === item.image) {
        playSound(successSound);
        setScore(score + 10); // Increase score
        setSelectedCard(null);
        setGridData((prevState) =>
          prevState.map((prevItem) =>
            prevItem.id === selectedCard.id || prevItem.id === item.id ? { ...prevItem, isFlipped: true } : prevItem
          )
        );

        setFlippedCount(flippedCount + 2); // Increment flipped count
      } else {
        Vibration.vibrate(500);

        // Decrease life
        setLives((prevLives) => prevLives - 1);
        // Keep the previously selected card flipped
        setGridData((prevState) =>
          prevState.map((prevItem) =>
            prevItem.id === selectedCard.id ? { ...prevItem, isFlipped: true } : prevItem
          )
        );
        // Flip the newly selected card
        setSelectedCard(item);
        setGridData((prevState) =>
          prevState.map((prevItem) =>
            prevItem.id === item.id ? { ...prevItem, isFlipped: true } : prevItem
          )
        );
        // Revert cards after 1 second
        setTimeout(() => {
          setGridData((prevState) =>
            prevState.map((prevItem) =>
              prevItem.id === selectedCard.id || prevItem.id === item.id ? { ...prevItem, isFlipped: false } : prevItem
            )
          );
          setSelectedCard(null);
        }, 1000);
      }
    } else {
      // No card selected, flip the current one
      setSelectedCard(item);
      setGridData((prevState) =>
        prevState.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, isFlipped: true } : prevItem))
      );
    }
  };
  

  useEffect(() => {
    const fetchDifficulty = async () => {
      try {
        const fetchedDifficulty = await AsyncStorage.getItem('difficulty');
        if (fetchedDifficulty) {
          setDifficulty(fetchedDifficulty);
          const initialLives = getInitialLives(fetchedDifficulty);  
          setLives(initialLives);  
        } else { 
          setDifficulty('easy');
          const initialLives = getInitialLives('easy');
          setLives(initialLives);
        }
      } catch (error) {
        console.error('Error fetching difficulty:', error);
      }
    };
  
    fetchDifficulty();
  }, []);
  

  useEffect(() => {
    if (difficulty) {
      setGridData(generateGridData(difficulty));
    }
  }, [difficulty]);

  useEffect(() => {
    if (lives === 0 && difficulty) {  
      playSound(gameOverSound);
      AsyncStorage.setItem('score', JSON.stringify(score));
      setFlippedCount(0);
      Alert.alert('Game Over', `Your final score: ${score}`, [{ text: 'OK', onPress: handleGameOver }]);
    }
  }, [lives]);

  useEffect(() => {
    if (flippedCount === gridData.length && difficulty) { 
      playSound(winSound);
      Alert.alert('Congratulations!', 'You have successfully matched all cards.', [
        { text: 'OK', onPress: handleGameOver }
      ]);
    }
  }, [flippedCount]);
  

  useEffect(() => { 
    loadSounds();

    // Cleanup function to unload sounds when component unmounts
    return () => {
      gameOverSound && gameOverSound.unloadAsync();
      successSound && successSound.unloadAsync();
      winSound && winSound.unloadAsync();
    };
  }, []);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Update key to force re-render of FlatList
  }, [difficulty]);

  if (!difficulty) {
    return null; // Render nothing until difficulty is fetched
  }
  
  

  return (

    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
    <View style={styles.container}>

    <View style={styles.headerView}>
        <View style={{ alignItems: 'center' }}>
            <Image
            source={require('../assets/title.png')}
            style={{ height: 150, width: 300, marginTop: 0 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={[styles.titleText, { marginRight: 100 }]}>Score: {score}</Text>
            <Text style={[styles.titleText]}>Lives: {lives}</Text>
            </View>
        </View>
    </View>


        <View style={styles.bodyView}>
        <FlatList
            style={styles.flatContainer}
            data={gridData}
            renderItem={({ item }) => (


            <FlipCard // Use FlipCard component here
            style={styles.cardContainer}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={item.isFlipped} // Pass isFlipped as flip prop to FlipCard
            clickable={false} // Disable click events during flip animation
            >
            {/* Front Side */}
            <TouchableOpacity onPress={() => { handleCardPress(item); }} style={[styles.card, styles.cardFront]}> 
            <Image source={cards.card0} style={styles.cardImage} />
            </TouchableOpacity>

            {/* Back Side */}
            <TouchableOpacity onPress={() => { handleCardPress(item); }} style={[styles.card, styles.cardBack]}> 
            <Image source={cards[`${item.image.replace('.png', '')}`]} style={styles.cardImage} />
            </TouchableOpacity>
            </FlipCard>



            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4}
            key={key} // Set key to force re-render of FlatList 
        />
 

           
        </View>


        <View style={styles.footerView}>

            <GameButton
                title="Give Up"
                onPress={giveUp} 
            />
            <GameButton
                title="Restart"
                onPress={restartGame} 
            />
 
            <Link href="/" style={[styles.button, { marginLeft: 'auto' }]}>Home</Link>
        </View>
 
        
    </View>
    </ImageBackground> 
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    headerView: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 0,
        alignItems: 'center',
        justifyContent: 'space-between', // Align items in a single line with space between them
        flexDirection: 'row', // Arrange items horizontally
        paddingHorizontal: 20, // Add padding horizontally
      },
      bodyView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 230, // Adjust according to header height
      },
      footerView: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row', // Arrange children horizontally
        justifyContent: 'space-around', // Evenly space children horizontally
        alignItems: 'center', // Center items vertically
      },

    flatContainer: {
      width: '100%',
    },
    cardContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      
      width: 100, // Set the width of the card
      height: 126, // Set the height of the card 
      margin: '5%', // Adjust margin to create space between cards
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardFront: {
      
    },
    cardBack: {
       
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    titleText: {
      fontSize: 20,
      textAlign: 'center', 
      fontFamily: 'ChalkboardSE-Regular',
      color: '#54499e',
    },
    
    button: {
        color: '#7cdbcd',
        textAlign: 'center',
        fontFamily: 'ChalkboardSE-Regular',  
        backgroundColor: '#006d80', 
        fontSize: 20,
        width: 150,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderColor: '#dde4d8',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
  });
  

export default GameScreen;
