import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const HeaderHomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.notificationContainer}>
        <Ionicons name="notifications" size={24} color="white" />
        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>5</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 4,
    backgroundColor: '#F5F5F5',
    shadowColor: '#C6C719',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  notificationContainer: {
    position: 'relative', // Ensures that the badge is positioned relative to this container
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
});

export default HeaderHomePage;
