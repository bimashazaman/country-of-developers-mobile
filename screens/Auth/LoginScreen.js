/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';

import {useLogin} from '../../utils/hooks/useLogin';
import {LoginStyles} from '../../styles/LoginScreenStyles';
import {loginSchema} from '../../validation/Auth/LoginScreenValidation';
import {Dimensions} from 'react-native';

const LoginScreen = ({navigation}) => {
  const {handleLogin, loading, errorMessage} = useLogin(navigation);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleForgetPassword = () => {
    const url = 'https://www.pokersocial.net/password/reset';
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={['#0B0D14', '#181F30']}
        style={LoginStyles.container}>
        <View
          style={{
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/ps-logo-full.png')}
            style={LoginStyles.logo}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                marginBottom: 30,
                marginTop: 50,
                fontFamily: 'RussoOne-Regular',
                borderBottomWidth: 2,
                borderBottomColor: 'white',
              }}>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#0C69AA',
                fontSize: 20,
                marginBottom: 30,
                marginTop: 50,
                fontFamily: 'RussoOne-Regular',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          validateOnMount={true}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{width: 400, marginLeft: 70}}>
              {errorMessage ? (
                <Text style={{color: 'red', marginTop: 20}}>
                  {errorMessage}
                </Text>
              ) : null}
              <TextInput
                style={LoginStyles.input}
                placeholder="Email"
                placeholderTextColor="#556080"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={LoginStyles.error}>{errors.email}</Text>
              )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  style={LoginStyles.input}
                  placeholder="Password"
                  placeholderTextColor="#556080"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={passwordVisibility}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={passwordVisibility ? 'eye-slash' : 'eye'}
                    size={20}
                    color="#556080"
                    style={{
                      marginLeft: -30,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={LoginStyles.ForgetPass}> Forgot Password</Text>
              </TouchableOpacity>
              <View style={LoginStyles.buttonContainer}>
                <LinearGradient
                  colors={['#045690', '#16335D']}
                  style={LoginStyles.button}>
                  <TouchableOpacity disabled={loading} onPress={handleSubmit}>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={LoginStyles.buttonText}>SIGN IN</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          )}
        </Formik>
        <Text style={LoginStyles.Or}>OR</Text>
        <View style={LoginStyles.Logos}>
          <TouchableOpacity style={LoginStyles.FacebookLogo}>
            <Icon name="facebook-f" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 10, fontWeight: '900'}}>
              Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={LoginStyles.GoogleLogo}>
            <Icon name="google" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 10, fontWeight: '900'}}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{color: '#FFFFFF', fontWeight: '900', fontSize: 12}}>
            By Creating an Account you Accept our{' '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#3ABEFE',
                textDecorationLine: 'underline',
                fontWeight: '900',
                fontSize: 12,
              }}>
              {' '}
              Term and conditions
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default LoginScreen;
