import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const AllFriendsRequest = ({navigation}) => {
  const handleAllFriendsNumbers = () => {
    navigation.navigate('Friends');
  };

  return (
    <View style={styles.allButton}>
      <View>
        <TouchableOpacity onPress={handleAllFriendsNumbers}>
          <Text style={styles.Text}>See your all Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  allButton: {
    backgroundColor: '#0A0E16',
    width: 180,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 120,
    marginTop: 8,
  },
  Text: {
    color: '#3ABEFE',
    marginTop: 3,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 800,
  },
});
export default AllFriendsRequest;
