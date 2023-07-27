/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ent from 'react-native-vector-icons/Entypo';
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {BASE_URL} from '../../utils/constant';

// Validation schema
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Confirm Password must match New Password',
    ),
});

const ChangePasswordandSecurityScreen = ({isDarkMode}) => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');

  // Fetch access token when the component is mounted
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

  const handleSaveChanges = async values => {
    try {
      const response = await fetch(`${BASE_URL}/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          current_password: values.currentPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        }),
      });
      const json = await response.json();

      if (json.success) {
        Alert.alert('Success', 'Password updated successfully', [
          {text: 'OK', onPress: () => autoLogout()}, // Call autoLogout function on OK press
        ]);
      } else {
        Alert.alert('Error', json.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Auto logout function
  const autoLogout = async () => {
    // Remove access_token from AsyncStorage
    await AsyncStorage.removeItem('access_token');
    // Navigate to Login screen
    navigation.goBack();
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
            <Text style={styles.HeaderText}>Password & Security</Text>
          </View>
        </View>
        <View
          style={[
            styles.UserDetails,
            {backgroundColor: '#0E121C', height: 680},
          ]}>
          <Text style={styles.Heading}>Change Password</Text>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.NameInputdetails}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: '#3ABEFE',
                        marginLeft: 44,
                        marginTop: 10,
                        fontFamily: 'Poppins-Regular',
                      },
                    ]}>
                    Current Password
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: '#1A2235',
                        color: '#FFFFFF',
                        marginLeft: 45,
                        fontFamily: 'Poppins-Regular',
                      },
                    ]}
                    placeholder="Enter current password"
                    placeholderTextColor="#707070"
                    onChangeText={handleChange('currentPassword')}
                    onBlur={handleBlur('currentPassword')}
                    value={values.currentPassword}
                    secureTextEntry
                  />
                  {touched.currentPassword && errors.currentPassword ? (
                    <Text style={{color: 'red', marginLeft: 45}}>
                      {errors.currentPassword}
                    </Text>
                  ) : null}
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
                    New Password
                  </Text>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.Key}>
                        <Ent name="key" size={21} color="#3ABEFE" />
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
                        placeholder="Enter new password"
                        placeholderTextColor="#707070"
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        value={values.newPassword}
                        secureTextEntry
                      />
                    </View>
                    {touched.newPassword && errors.newPassword ? (
                      <Text style={{color: 'red', marginLeft: 45}}>
                        {errors.newPassword}
                      </Text>
                    ) : null}
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
                    Confirm Password
                  </Text>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.Key}>
                        <Ent name="key" size={21} color="#3ABEFE" />
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
                        placeholder="Confirm Password"
                        placeholderTextColor="#707070"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                      />
                    </View>
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <Text style={{color: 'red', marginLeft: 45}}>
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.editButtonContainer,
                    {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
                  ]}
                  onPress={handleSubmit}>
                  <Text style={styles.editButton}>Save Changes</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E121C',
    //set the min height to 100% of screen height
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
    fontWeight: 800,
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
    marginLeft: 45,
    marginTop: 12,
    fontSize: 26,
    fontWeight: 600,
    fontFamily: 'RussoOne-Regular',
  },
  editButtonContainer: {
    backgroundColor: '#3ABEFE',

    width: 250,
    height: 40,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '20%',
    marginTop: 80,
  },

  editButton: {
    color: 'white',

    fontSize: 16,
    marginLeft: 70,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
    fontWeight: 800,
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
    width: 330,
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

export default ChangePasswordandSecurityScreen;
