import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { Firebase_Db } from '../../firebaseConfig'; // Make sure this path is correct
import { ref, onValue, off, update } from 'firebase/database';

export default function PastOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userPrefRef = ref(Firebase_Db, 'UserPref');
    const unsubscribe = onValue(userPrefRef, (snapshot) => {
      const rawData = snapshot.val();
      const formattedData = [];
      for (const userId in rawData) {
        for (const docName in rawData[userId]) {
          const item = rawData[userId][docName];
          // Exclude items with DeliveryStatus 'printing' or 'none'
          const status = item.DeliveryStatus || item.deliveryStatus; // Normalize status
          const progress = getProgress(item.DeliveryStatus || item.deliveryStatus);
          if (status !== 'printing' && status !== 'none') {
            formattedData.push({
              id: userId + '-' + docName,
              user: userId,
              documentName: docName,
              progress, // Include calculated progress
              ...item,
            });
          }
        }
      }
      setData(formattedData);
    });
  
    return () => off(userPrefRef, 'value', unsubscribe);
  }, []);
  
  


  const getProgress = (status) => {
    switch (status) {
      case 'printing': return 0.25;
      case 'printed': return 0.5;
      case 'out for delivery': return 0.75;
      case 'Delivered': return 1;
      default: return 0;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.user} - {item.documentName}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Color Print: {item.ColorPrint}</Text>
        <Text style={styles.detail}>Delivery Address: {item.DeliveryAddress}</Text>
        <Text style={styles.detail}>Phone Number: {item.PhoneNumber}</Text>
        <Text style={styles.detail}>No. of Copies: {item.no_copies}</Text>
        <Text style={styles.detail}>No. of Pages: {item.no_pages}</Text>
        <Text style={styles.deliveryStatus}>Delivery Status: {item.DeliveryStatus || item.deliveryStatus}</Text>
      </View>
    <Bar progress={item.progress} width={null} color='#0d183e' style={styles.progressBar} />
  </View>
      
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
const styles = StyleSheet.create({

    itemContainer: {
      backgroundColor: '#FFFFFF',
      padding: 20, // Increased padding for more space
      marginVertical: 12, // Added vertical margin for space between items
      marginHorizontal: 10, // Added horizontal margin for space from screen edges
      borderBottomWidth: 1,
      borderBottomColor: '#EEEEEE',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 15, // Increased margin for more space
      color: '#333',
    },
    detailsContainer: {
      marginBottom: 15, // Increased margin for more space
    },
    detail: {
      fontSize: 14,
      marginBottom: 5, // Adjust as needed
      color: '#666',
    },
    deliveryStatus: {
      fontSize: 16, // Larger font size for delivery status
      fontWeight: 'bold', // Optional: make it bold
      marginBottom: 15, // Increased margin for more space
      textAlign: 'center', // Center align the text
      color: '#0d183e', // Optional: a different color to highlight
    },
    progressBar: {
      marginBottom: 15, // Increased margin for more space
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10, // Added padding top for space above the buttons
    },
    
  });

