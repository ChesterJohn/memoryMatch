import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Link } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import CustomButton from './components/customButton';

const SettingsScreen = () => {
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    const fetchDifficulty = async () => {
      try {
        const fetchedDifficulty = await AsyncStorage.getItem('difficulty');
        if (fetchedDifficulty !== null) {
          setDifficulty(fetchedDifficulty);
        } else { 
          setDifficulty('easy');
        }
      } catch (error) {
        console.error('Error fetching difficulty:', error);
      }
    };

    fetchDifficulty();
  }, []);

  const handleDifficultyChange = async (newDifficulty) => {
    try {
      await AsyncStorage.setItem('difficulty', newDifficulty);
      setDifficulty(newDifficulty);
    } catch (error) {
      console.error('Error setting difficulty:', error);
    }
  };


  return (

    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
 
    <View style={styles.page}>

        <View style={styles.headerView}>
            <Image
                source={require('../assets/title.png')}
                style={{  height: 150, width: 300, marginTop: 0 }}
            />
        </View>

    <Text style={[styles.titleText, { marginTop: 20, marginBottom: 20 }]}>Difficulty Settings</Text>
    
    <View style={styles.buttonContainer}>
        <CustomButton
          title="Easy"
          onPress={() => handleDifficultyChange('easy')}
          selected={difficulty === 'easy'}
        />
        <CustomButton  
          title="Medium"
          onPress={() => handleDifficultyChange('medium')}
          selected={difficulty === 'medium'}
        />
        <CustomButton 
          title="Difficult"
          onPress={() => handleDifficultyChange('difficult')}
          selected={difficulty === 'difficult'}
        />
      </View>


    <Link style={[styles.button, { marginTop: 70 }]} href="/">Home</Link> 

    </View>
  </ImageBackground>  

 
  );
};


const styles = StyleSheet.create({
    page: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    headerView: {
      position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 40,
      textAlign: 'center', 
      fontFamily: 'ChalkboardSE-Regular',
      color: '#006d80',
    },
    scoreText: {
        fontSize: 78,
        textAlign: 'center',
        marginBottom: 50,
        fontFamily: 'ChalkboardSE-Regular',
        color: '#54499e',
      },
    
    input: {
        width: '80%',
        flex: 0.08,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        margin: 15,
        fontSize: 16,
        fontFamily: 'ChalkboardSE-Regular',  
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
    buttonSelect: {
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


export default SettingsScreen;





