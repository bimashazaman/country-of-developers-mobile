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
const AddFriendComponent = () => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.AddButtonContainer, {backgroundColor: '#3ABEFE'}]}>
        <Entypo
          name="circle-with-plus"
          size={20}
          color="white"
          style={styles.AddIcon}
        />
        <Text style={styles.AddButton}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  AddButtonContainer: {
    backgroundColor: '#3ABEFE',

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
export default AddFriendComponent;
