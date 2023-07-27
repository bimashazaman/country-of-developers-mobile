import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import EditProfileScreen from './EditProfile.js';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const CancelRequestComponent = () => {
  return (
    <View>
      <TouchableOpacity style={styles.AddButtonContainer}>
        <Text style={styles.AddButton}>Cancel Request</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  AddButtonContainer: {
    backgroundColor: '#D83742',

    width: 120,
    height: 30,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '35%',
    marginTop: 20,
  },
  AddIcon: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  },
  AddButton: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
    marginTop: 0,
    fontWeight: 800,
    fontFamily: 'Poppins-Medium',
  },
});
export default CancelRequestComponent;
