import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import AppIcon from './AppIcon';
import SplashScreen from './SplashScreen';

export default function GenerateAssets() {
  const iconRef = React.useRef();
  const splashRef = React.useRef();
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };
  
  const generateAppIcon = async () => {
    try {
      addLog('Generating app icon...');
      
      // Capture the icon as PNG
      const uri = await captureRef(iconRef, {
        format: 'png',
        quality: 1,
      });
      
      // In a real app, you would save this to the correct location
      // For now we log it so user can manually save
      addLog('App icon generated successfully!');
      addLog(`App icon URI: ${uri}`);
      
      return uri;
    } catch (error) {
      addLog(`Error generating app icon: ${error.message}`);
      return null;
    }
  };
  
  const generateSplashImage = async () => {
    try {
      addLog('Generating splash screen...');
      
      // Capture the splash screen as PNG
      const uri = await captureRef(splashRef, {
        format: 'png',
        quality: 1,
      });
      
      // In a real app, you would save this to the correct location
      addLog('Splash screen generated successfully!');
      addLog(`Splash screen URI: ${uri}`);
      
      return uri;
    } catch (error) {
      addLog(`Error generating splash screen: ${error.message}`);
      return null;
    }
  };
  
  const generateAllAssets = async () => {
    addLog('Starting asset generation...');
    
    const iconUri = await generateAppIcon();
    const splashUri = await generateSplashImage();
    
    addLog('');
    addLog('All assets generated!');
    addLog('');
    addLog('----------------------------');
    addLog('NEXT STEPS:');
    addLog('1. Save these images to assets/images/');
    addLog('2. Name them according to app.json:');
    addLog('   - icon.png (1024x1024)');
    addLog('   - adaptive-icon.png (1024x1024)');
    addLog('   - splash-icon.png (200x200)');
    addLog('   - splash.png (1242x2688)');
    addLog('----------------------------');
  };
  
  return (
    <View style={styles.container}>
      {/* Hidden views for capturing */}
      <View style={styles.hiddenContainer}>
        <View ref={iconRef} style={styles.iconContainer}>
          <AppIcon size={1024} />
        </View>
        
        <View ref={splashRef} style={styles.splashContainer}>
          <SplashScreen />
        </View>
      </View>
      
      <Text style={styles.title}>App Asset Generator</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={generateAllAssets}
      >
        <Text style={styles.buttonText}>Generate All Assets</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  hiddenContainer: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  iconContainer: {
    width: 1024,
    height: 1024,
  },
  splashContainer: {
    width: 1242,
    height: 2688,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#6750A4',
  },
  button: {
    backgroundColor: '#6750A4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  logText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
}); 