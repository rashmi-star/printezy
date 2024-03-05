import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PrintEzy({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start(() => {
      setTimeout(() => {
        navigation.navigate('Welcome');
      }, 1000); // Adjust the delay after animation ends
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('D:/my-app/printezy.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d183e',
  },
  logo: {
    width: windowWidth * 0.6, // Adjust the percentage as needed
    height: windowHeight * 0.6, // Adjust the percentage as needed
    resizeMode: 'contain',
  },
});
