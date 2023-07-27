/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OtherSettings from '../../component/Settings/OtherSettings';
import Policy from '../../component/Settings/Policy';
import {SettingsStyles} from '../../styles/SettingStyles';
import {BASE_URL} from '../../utils/constant';
import {UserContext} from '../../utils/UserContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput} from 'react-native-gesture-handler';

// define your validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  user: Yup.string().required('Username is required'),
  birthdate: Yup.string().matches(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must be in YYYY-MM-DD format',
  ),
});

const SettingsScreen = ({isDarkMode, navigation}) => {
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [accessToken, setAccessToken] = useState('');

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

  const updateProfile = async values => {
    try {
      const response = await fetch(`${BASE_URL}/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: values.name,
          username: values.user,
          birthday: values.birthdate,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setUserDetails(prevDetails => ({
          ...prevDetails,
          name: values.name,
          username: values.user,
          birthdate: values.birthdate,
        }));
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{backgroundColor: '#121724'}}>
      <ScrollView>
        <Formik
          initialValues={{
            name: userDetails.name,
            user: userDetails.username,
            birthdate: userDetails.birthdate || '',
          }}
          onSubmit={updateProfile}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={SettingsStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={SettingsStyles.actionText}>
                    <Icon name="arrow-left" size={21} color="#3ABEFE" />
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    SettingsStyles.headerText,
                    {color: '#3ABEFE', fontSize: 26},
                  ]}>
                  Settings
                </Text>
                <TouchableOpacity
                  style={SettingsStyles.saveButton}
                  onPress={handleSubmit}>
                  <Text style={SettingsStyles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View style={SettingsStyles.container}>
                <View style={SettingsStyles.formField}>
                  <Text style={SettingsStyles.label}>Account Information</Text>

                  <View style={SettingsStyles.NameInputdetails}>
                    {/* icon for name */}
                    <Icon name="user" size={20} color="#3ABEFE" />
                    <TextInput
                      style={SettingsStyles.input}
                      placeholder="Enter your name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      placeholderTextColor="white"
                      placeholderStyle={{fontSize: 20}}
                    />
                  </View>
                  {touched.name && errors.name ? (
                    <Text style={{color: 'red', marginLeft: 30}}>
                      {errors.name}
                    </Text>
                  ) : null}
                </View>
                <View style={SettingsStyles.formField}>
                  <View style={SettingsStyles.NameInputdetails}>
                    {/* icon for username user-circle */}
                    <Icon name="user-circle" size={20} color="#3ABEFE" />
                    <TextInput
                      style={SettingsStyles.input}
                      placeholder="Enter your username"
                      value={values.user}
                      onChangeText={handleChange('user')}
                      onBlur={handleBlur('user')}
                      placeholderStyle={{fontSize: 20}}
                      placeholderTextColor="white"
                    />
                  </View>
                  {touched.user && errors.user ? (
                    <Text style={{color: 'red', marginLeft: 30}}>
                      {errors.user}
                    </Text>
                  ) : null}
                </View>
                <View style={SettingsStyles.formField}>
                  <View style={SettingsStyles.NameInputdetails}>
                    {/* icon for birthday */}
                    <Icon name="birthday-cake" size={20} color="#3ABEFE" />

                    <TextInput
                      style={SettingsStyles.input}
                      placeholder="Enter your birthdate"
                      value={values.birthdate}
                      onChangeText={handleChange('birthdate')}
                      onBlur={handleBlur('birthdate')}
                      placeholderStyle={{fontSize: 20}}
                      placeholderTextColor="white"
                    />
                  </View>
                  {touched.birthdate && errors.birthdate ? (
                    <Text style={{color: 'red'}}>{errors.birthdate}</Text>
                  ) : null}
                </View>
                <OtherSettings
                  navigation={navigation}
                  isDarkMode={isDarkMode}
                />
                <Policy isDarkMode={isDarkMode} navigation={navigation} />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
