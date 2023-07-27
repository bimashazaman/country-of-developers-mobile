/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feat from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const MobileOTPScreen = ({isDarkMode, props}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [OTP, setOTP] = useState();

  const handleEmailandMobileScreen = () => {
    navigation.navigate('EmailandMobileScreen');
  };

  return (
    <ScrollView>
      <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.actionBack}>
              <Icon name="arrow-left" size={21} color="#3ABEFE" />
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.HeaderText}>Mobile </Text>
          </View>
        </View>
        <View
          style={[
            styles.UserDetails,
            {backgroundColor: '#0E121C', height: 610},
          ]}>
          <Text style={styles.Heading}>Manage mobile info</Text>

          <View>
            <Text
              style={[
                styles.label,
                {
                  color: '#3ABEFE',
                  marginLeft: 65,
                  marginTop: 30,
                  fontFamily: 'Poppins-Regular',
                },
              ]}>
              Mobile
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text style={styles.Key}>
                <Feat name="phone-call" size={21} color="#3ABEFE" />
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: '#1A2235',
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Regular',
                  },
                ]}
                placeholder="Enter mobile number"
                placeholderTextColor="#707070"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: '#3ABEFE',
                  marginLeft: 65,
                  marginTop: 30,
                  fontFamily: 'Poppins-SemiBold',
                },
              ]}>
              OTP
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 40}}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: '#1A2235',
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-SemiBold',
                  },
                ]}
                placeholder="Enter OTP"
                placeholderTextColor="#707070"
                value={OTP}
                onChangeText={setOTP}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.editButtonContainer,
                {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
              ]}
              onPress={handleEmailandMobileScreen}>
              <Text style={styles.editButton}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E121C',
  },
  darkModeContainer: {
    backgroundColor: '#0E121C',
  },
  UserDetails: {
    backgroundColor: '#0E121C',
    paddingBottom: 20,
  },

  Heading: {
    color: '#3ABEFE',
    marginLeft: 20,
    marginTop: 14,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 700,
  },

  Header: {
    backgroundColor: '#1A2134',
    width: 409,
    height: 55,
    flexDirection: 'row',
  },
  actionBack: {
    marginTop: 16,
    marginLeft: 12,
  },
  HeaderText: {
    color: '#3ABEFE',
    marginLeft: 135,
    marginTop: 14,
    fontSize: 24,
    fontWeight: 600,
    fontFamily: 'RussoOne-Regular',
  },

  label: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 700,
    marginBottom: 5,
  },
  input: {
    height: 35,
    padding: 10,
    borderRadius: 20,
    marginTop: 2,
    width: 300,
    marginLeft: 20,
  },
  NameInputdetails: {
    flexDirection: 'column',
    marginTop: 20,
  },
  formField: {
    marginBottom: 20,
  },
  ConfirmPassword: {
    height: 100,
    width: 350,
    borderRadius: 30,
    marginLeft: 20,
    padding: 8,
  },
  Key: {
    marginTop: 8,
    marginLeft: 10,
  },
  footerText: {
    color: '#3ABEFE',
    marginLeft: 295,
    marginTop: 14,
    fontWeight: 600,
  },
  editButtonContainer: {
    backgroundColor: '#3ABEFE',

    width: 250,
    height: 40,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '20%',
    marginTop: 40,
  },

  editButton: {
    color: 'white',

    fontSize: 16,
    marginLeft: 70,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
    fontWeight: 800,
  },
});

export default MobileOTPScreen;
