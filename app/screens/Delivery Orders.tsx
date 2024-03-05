import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { Firebase_Db } from '../../firebaseConfig'; // Make sure this path is correct
import { ref, onValue, off, update } from 'firebase/database';

export default function DeliverOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userPrefRef = ref(Firebase_Db, 'UserPref');
    const unsubscribe = onValue(userPrefRef, (snapshot) => {
      const rawData = snapshot.val();
      const formattedData = [];
      for (const userId in rawData) {
        for (const docName in rawData[userId]) {
          const item = rawData[userId][docName];
          // Exclude items with DeliveryStatus 'printing'
          const status = item.DeliveryStatus || item.deliveryStatus; // Normalize status to account for potential casing differences
        if (status === 'printed' || status === 'out for delivery' || status === 'Delivered')  {

            const progress = getProgress(item.DeliveryStatus || item.deliveryStatus);
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
  

  
  const handleStatusChange = (id, newStatus) => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return { ...item, DeliveryStatus: newStatus };
        }
        return item;
      })
    );
    const [userId, docName] = id.split('-');
    const itemRef = ref(Firebase_Db, `UserPref/${userId}/${docName}`);
    update(itemRef, { DeliveryStatus: newStatus });
  };
  
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
        <Text style={styles.detail}>Delivery Address: {item.DeliveryAddress}</Text>
        <Text style={styles.detail}>Phone Number: {item.PhoneNumber}</Text>
        <Text style={styles.deliveryStatus}>Delivery Status: {item.DeliveryStatus || item.deliveryStatus}</Text>
      </View>
      <View style={styles.itemContainer}>
    <Bar progress={item.progress} width={null} color='#0d183e' style={styles.progressBar} />
  </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, (item.DeliveryStatus === 'out for delivery' || item.DeliveryStatus === 'Delivered') ? styles.buttonDisabled : {}]}
          onPress={() => handleStatusChange(item.id, 'out for delivery')}
          disabled={item.DeliveryStatus === 'out for delivery' || item.DeliveryStatus === 'Delivered'}
        >
          <Text style={styles.buttonText}>Out for Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, item.DeliveryStatus === 'Delivered' ? styles.buttonDisabled : {}]}
          onPress={() => handleStatusChange(item.id, 'Delivered')}
          disabled={item.DeliveryStatus === 'Delivered'}
        >
          <Text style={styles.buttonText}>Delivered</Text>
        </TouchableOpacity>
      </View>
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
    button: {
      backgroundColor: '#0d183e',
      paddingVertical: 12, // Increased padding for taller buttons
      paddingHorizontal: 25, // Increased padding for wider buttons
      borderRadius: 5,
      elevation: 2,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
      buttonDisabled: {
        backgroundColor: '#CCCCCC', // A gray color to indicate the button is disabled
        elevation: 0, // Optional: remove shadow from disabled buttons
      },
  });

