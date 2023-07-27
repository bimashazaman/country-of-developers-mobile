import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import EditProfileScreen from './EditProfile.js';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
const AddandRemoveButton = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity style={[styles.Button, {backgroundColor: '#058B24'}]}>
        <Text style={styles.Text}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Button, {backgroundColor: '#D83742', marginLeft: 30}]}>
        <Text style={styles.Text}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
    marginTop: 10,
    fontWeight: 800,
    fontFamily: 'Poppins-Medium',
    width: 100,
    height: 26,
    borderRadius: 20,
  },
  Text: {
    marginLeft: 26,
    marginTop: 3,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontWeight: 800,
  },
});
export default AddandRemoveButton;
