import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StoreOwnerHomePage({ navigation }) {
  const handleStoreOwnerPress = () => {
    navigation.navigate('Current Orders');

    // Navigation logic for store owner
  };

  const handleDriverPress = () => {
    navigation.navigate('Past Orders');
    // Navigation logic for driver
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleStoreOwnerPress}>
        <Text style={styles.buttonText}>Current Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDriverPress}>
        <Text style={styles.buttonText}>Past Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
