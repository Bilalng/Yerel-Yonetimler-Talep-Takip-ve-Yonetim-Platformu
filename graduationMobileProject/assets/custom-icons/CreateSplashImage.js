import * as FileSystem from 'expo-file-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import SplashScreen from './SplashScreen';

export default function CreateSplashImage() {
  const splashRef = React.useRef();
  
  const generateSplashImage = async () => {
    try {
      // Capture the splash screen as PNG
      const uri = await captureRef(splashRef, {
        format: 'png',
        quality: 1,
      });
      
      // Save to app assets
      const splashPath = `${FileSystem.documentDirectory}splash.png`;
      
      await FileSystem.copyAsync({
        from: uri,
        to: splashPath
      });
      
      console.log('Splash image generated successfully!');
      console.log('Splash image saved to:', splashPath);
      
      alert('Splash image generated successfully! Check the console for file path.');
    } catch (error) {
      console.error('Error generating splash image:', error);
      alert('Error generating splash image: ' + error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <View ref={splashRef} style={styles.splashContainer}>
        <SplashScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContainer: {
    width: 1242,
    height: 2688,
  },
}); 