
import { Link } from 'expo-router';  
import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ImageBackground } from 'react-native'; 
import SplashScreen from './splash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() { 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if the app has been initialized before
      const checkInitialization = async () => {
          try {
              const initializedBefore = await AsyncStorage.getItem('initializedBefore');
              if (initializedBefore) { 
                  setLoading(false);
              } else { 
                  const timer = setTimeout(() => {
                      setLoading(false); 
                      AsyncStorage.setItem('initializedBefore', 'true');
                  }, 3000);
                  return () => clearTimeout(timer);
              }
          } catch (error) {
              console.error('Error checking initialization:', error);
          }
      };

      checkInitialization();
  }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
 
            <View style={styles.page}>

                <View style={styles.headerView}>
                    <Image
                        source={require('../assets/title.png')}
                        style={{  height: 150, width: 300, marginTop: 0 }}
                    />
                </View>

                <Text style={[styles.welcomeText, { marginTop: 20 }]}>
                To play the game, tap on two cards to reveal their images. Match pairs of identical images to score points. Aim to match all cards to win!
                </Text>


                <Link href="/game"  style={[styles.button]}>New Game</Link>
                <Link href="/highscores"  style={[styles.button]}>Highscores</Link>
                <Link href="/settings"  style={[styles.button]}>Settings</Link>

            </View>
          </ImageBackground>


     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

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
    welcomeText: {
      fontSize: 18,
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
    pressedButton: {
        backgroundColor: '#ff9900',  
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: 'orange',  
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

  });

