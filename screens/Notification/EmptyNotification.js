/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';

const EmptyNotification = () => {
  return (
    <View style={{height: 600, backgroundColor: '#0E121C'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.Number}>New</Text>
        <Text style={[styles.Number, {color: '#FF0000'}]}>0</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Number: {
    color: '#FFFFFF',
    fontFamily: 'Poppins - SemiBold',
    fontWeight: '800',
    marginTop: 16,
    marginLeft: 16,
    fontSize: 18,
  },

  dataContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    height: 60,
    marginTop: 16,
  },
  Image: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 16,
  },
  UserName: {
    color: '#3ABEFE',
    width: 60,
    fontSize: 14,
    marginLeft: 16,
    marginTop: 22,
    fontWeight: 800,
  },
  notification: {
    color: '#FFFFFF',
    width: 250,
    fontSize: 14,
    marginLeft: 0,
    marginTop: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  Time: {
    color: '#A5AFCE',
    width: 60,
    fontSize: 10,
    marginTop: 8,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default EmptyNotification;
