import * as FileSystem from 'expo-file-system';
import React from 'react';
import { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import AppIcon from './AppIcon';

// This component will be used to generate app icon images
// We can render this temporarily and then call generateIcons() 
// from the console or a button

export default function GenerateIcon() {
  const iconRef = React.useRef();
  
  const generateIcons = async () => {
    try {
      // Capture the icon as PNG
      const uri = await captureRef(iconRef, {
        format: 'png',
        quality: 1,
      });
      
      // Save to app assets
      const iconPath = `${FileSystem.documentDirectory}icon.png`;
      const adaptiveIconPath = `${FileSystem.documentDirectory}adaptive-icon.png`;
      const splashIconPath = `${FileSystem.documentDirectory}splash-icon.png`;
      
      await FileSystem.copyAsync({
        from: uri,
        to: iconPath
      });
      
      await FileSystem.copyAsync({
        from: uri,
        to: adaptiveIconPath
      });
      
      await FileSystem.copyAsync({
        from: uri,
        to: splashIconPath
      });
      
      console.log('Icons generated successfully!');
      console.log('Icon saved to:', iconPath);
      console.log('Adaptive Icon saved to:', adaptiveIconPath);
      console.log('Splash Icon saved to:', splashIconPath);
      
      alert('Icons generated successfully! Check the console for file paths.');
    } catch (error) {
      console.error('Error generating icons:', error);
      alert('Error generating icons: ' + error.message);
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View ref={iconRef} style={{ width: 1024, height: 1024 }}>
        <AppIcon size={1024} />
      </View>
      
      {/* Button to generate icons would go here */}
    </View>
  );
} 