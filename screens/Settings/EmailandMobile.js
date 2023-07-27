/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feat from 'react-native-vector-icons/Feather';
import {BASE_URL} from '../../utils/constant';

const EmailandMobileScreen = ({isDarkMode}) => {
  const navigation = useNavigation();

  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');

  const [accessToken, setAccessToken] = useState('');

  const [isFormEdited, setIsFormEdited] = useState(false);

  // validation states
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        setAccessToken(token);
      } catch (error) {
        console.error('Error getting access token from storage:', error);
      }
    };
    getAccessToken();
  }, []);

  // Email validation
  const handleEmailChange = val => {
    setEmail(val);
    setIsFormEdited(true);
    if (val.trim().length === 0 || !validateEmail(val)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // Mobile validation
  const handleMobileChange = val => {
    setMobile(val);
    setIsFormEdited(true);
    if (val.trim().length === 0) {
      setIsValidMobile(false);
    }
    //only numbers
    else if (!/^\d+$/.test(val)) {
      setIsValidMobile(false);
    } else {
      setIsValidMobile(true);
    }
  };

  // Basic email validation
  const validateEmail = email => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSaveChanges = async () => {
    if (!isValidEmail || !isValidMobile) {
      Alert.alert('Invalid input', 'Please check your inputs', [
        {text: 'Okay'},
      ]);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/update-email-and-mobile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: Email,
          phone: Mobile,
        }),
      });
      const json = await response.json();
      console.log(json);
      Alert.alert('Success!', 'Your changes have been saved.', [
        {text: 'Okay'},
      ]);
    } catch (error) {
      console.error(error);
    }
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
            <Text style={styles.HeaderText}>Email & Mobile</Text>
          </View>
          <TouchableOpacity
            title="Save Changes"
            onPress={handleSaveChanges}
            disabled={!isFormEdited}
            style={{
              color: '#3ABEFE',
              backgroundColor: '#3ABEFE',
              textAlign: 'center',
              borderRadius: 20,
              width: 80,
              justifyContent: 'center',
              padding: 4,
              marginLeft: 30,
              height: 30,
              marginTop: 15,
            }}
            textStyle={{color: 'white', fontWeight: 'bold'}}
            activeOpacity={0.5}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.UserDetails,
            {backgroundColor: '#0E121C', height: 680},
          ]}>
          <Text style={styles.Heading}>Manage Contact info</Text>

          <View>
            <Text
              style={[
                styles.label,
                {
                  color: '#3ABEFE',
                  marginLeft: 44,
                  marginTop: 30,
                  fontFamily: 'Poppins-Regular',
                },
              ]}>
              Email
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Text style={styles.Key}>
                <Icon name="envelope" size={21} color="#3ABEFE" />
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
                placeholder="Enter email"
                placeholderTextColor="#707070"
                value={Email}
                onChangeText={handleEmailChange}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: '#3ABEFE',
                  marginLeft: 44,
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
                value={Mobile}
                onChangeText={handleMobileChange}
              />
            </View>
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
    minHeight: Dimensions.get('window').height,
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
    marginLeft: 50,
    marginTop: 14,
    fontSize: 24,
    fontWeight: 600,
    fontFamily: 'RussoOne-Regular',
  },

  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
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
});

export default EmailandMobileScreen;
