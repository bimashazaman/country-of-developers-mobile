/* eslint-disable react-native/no-inline-styles */
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

const OtherSettings = ({navigation}) => {
  const handleChangePasswordandSecurityScreen = () => {
    navigation.navigate('ChangePasswordandSecurityScreen');
  };
  const handleEmailandMobileScreen = () => {
    navigation.navigate('EmailandMobileScreen');
  };
  return (
    <View>
      <View style={[styles.EmailMobile]}>
        <Text
          style={[
            styles.label,
            {
              marginRight: 80,
              marginTop: 10,
              color: '#3ABEFE',
              fontFamily: 'Poppins-SemiBold',
            },
          ]}>
          Email & Mobile
        </Text>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
          }}>
          <TouchableOpacity onPress={handleEmailandMobileScreen}>
            <Icon name="chevron-right" size={21} color="#3ABEFE" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.EmailMobile, {marginTop: 20}]}>
        <Text
          style={[
            styles.label,

            {
              marginRight: 40,
              marginTop: 10,
              color: '#3ABEFE',
              fontFamily: 'Poppins-SemiBold',
            },
          ]}>
          Password & Security
        </Text>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
          }}>
          <TouchableOpacity onPress={handleChangePasswordandSecurityScreen}>
            <Icon name="chevron-right" size={21} color="#3ABEFE" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EmailMobile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    width: 325,
    padding: 1,
    marginRight: 10,
  },

  saveButtonText: {
    marginLeft: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '800',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    color: '#3ABEFE',
  },
  container: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 800,
    marginBottom: 5,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    width: 280,
    marginLeft: 16,
  },
  NameInputdetails: {
    flexDirection: 'row',
  },
});

export default OtherSettings;
