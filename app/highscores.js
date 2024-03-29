import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Link } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ImageBackground } from 'react-native';

export default function HighscoresScreen() {
    const [highScore, setHighScore] = useState(null);

    useEffect(() => {
        const fetchHighScore = async () => {
            try {
                const highScore = await AsyncStorage.getItem('highScore');
                if (highScore !== null) {
                    setHighScore(parseInt(highScore));
                }
            } catch (error) {
                console.error('Error fetching high score:', error);
            }
        };

        fetchHighScore();
    }, []);

    return (
        <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
 
            <View style={styles.page}>

                <View style={styles.headerView}>
                    <Image
                        source={require('../assets/title.png')}
                        style={{  height: 150, width: 300, marginTop: 0 }}
                    />
                </View>

            <Text style={[styles.titleText, { marginTop: 20 }]}>Highscore</Text>
            <Text style={[styles.scoreText, { marginTop: 0 }]}>{highScore !== null ? highScore : 'N/A'}</Text>

            <Link style={[styles.button, { marginTop: 70 }]} href="/">Home</Link> 

            </View>
          </ImageBackground>  
    )
}

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

    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'ChalkboardSE-Regular',  
        marginLeft: 10,
    },

  });

