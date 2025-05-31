import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIcon from './AppIcon';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon size={150} />
      </View>
      <Text style={styles.title}>Talep Yönetim</Text>
      <Text style={styles.subtitle}>Belediye Talep Sistemi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6750A4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6750A4',
    opacity: 0.8,
  },
}); 