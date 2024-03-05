import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';
import { Firebase_Db } from '../../firebaseConfig'; // Make sure this path is correct
import { ref, onValue, off, update } from 'firebase/database';

export default function CurrentOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userPrefRef = ref(Firebase_Db, 'UserPref');
    const unsubscribe = onValue(userPrefRef, (snapshot) => {
      const rawData = snapshot.val();
      const formattedData = [];
      for (const userId in rawData) {
        for (const docName in rawData[userId]) {
          const item = rawData[userId][docName];
          // Normalize the status check to consistently use 'DeliveryStatus'
          const status = item.DeliveryStatus || item.deliveryStatus; // Fallback for data inconsistency
          // Include only items with DeliveryStatus 'printing' or 'none'
          if (status === 'printing' || status === 'none') {
            formattedData.push({
              id: `${userId}-${docName}`,
              user: userId,
              documentName: docName,
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
      case 'out_for_delivery': return 0.75;
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
      <Bar progress={getProgress(item.DeliveryStatus || item.deliveryStatus)} width={null} color='#0d183e' style={styles.progressBar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, item.DeliveryStatus === 'printing' || item.DeliveryStatus === 'printed' ? styles.buttonDisabled : {}]}
          onPress={() => handleStatusChange(item.id, 'printing')}
          disabled={item.DeliveryStatus === 'printing' || item.DeliveryStatus === 'printed'}
        >
          <Text style={styles.buttonText}>Start Printing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, item.DeliveryStatus === 'printed' ? styles.buttonDisabled : {}]}
          onPress={() => handleStatusChange(item.id, 'printed')}
          disabled={item.DeliveryStatus === 'printed'}
        >
          <Text style={styles.buttonText}>Mark as Printed</Text>
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

