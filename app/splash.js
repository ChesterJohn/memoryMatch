import React from 'react';
import { View, Image, StatusBar, StyleSheet } from 'react-native';

const SplashScreen = () => {
  // Hide the status bar
  StatusBar.setHidden(true);

  return (
    <View style={styles.container}> 
      <Image
        source={require('../assets/splash.png')}
        style={styles.image}
        resizeMode="cover"  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
