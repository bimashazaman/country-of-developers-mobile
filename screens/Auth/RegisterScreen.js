/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {RegisterStyles} from '../../styles/RegisterStyles';
import {BASE_URL} from '../../utils/constant';
import {Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import moment from 'moment';
import {enGB, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en-GB', enGB);

const RegisterScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = async values => {
    setLoading(true);
    try {
      let age = undefined;
      if (date) {
        const birthDate = new Date(date);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
      }
      const ageString = age ? age.toString() : undefined;

      const updatedValues = {...values, age: ageString};
      console.log(updatedValues);

      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        try {
          const json = JSON.parse(text);
          throw new Error(json.message);
        } catch {
          throw new Error('Server response was not OK');
        }
      }

      setModalVisible(true);
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={['#0B0D14', '#181F30']}
        style={RegisterStyles.container}>
        <View
          style={{
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/ps-logo-full.png')}
            style={RegisterStyles.logo}
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
                color: '#0C69AA',
                fontSize: 20,
                marginBottom: 30,
                marginTop: 50,
                fontFamily: 'RussoOne-Regular',
              }}>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                marginBottom: 30,
                marginTop: 50,
                fontFamily: 'RussoOne-Regular',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={RegisterStyles.centeredView}>
            <View style={RegisterStyles.modalView}>
              <Text style={RegisterStyles.modalText}>
                Check email for verification and login.
              </Text>

              <TouchableOpacity
                style={RegisterStyles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Login');
                }}>
                <Text style={RegisterStyles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            password: '',
            gender: '',
          }}
          onSubmit={handleRegister}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            gender: Yup.string().required('Required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Required'),
          })}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
          }) => (
            <>
              {errorMessage ? (
                <Text style={{color: 'red', marginTop: 20}}>
                  {errorMessage}
                </Text>
              ) : null}
              <TextInput
                style={{
                  color: '#fff',
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 16,
                  borderColor: '#556080',
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                  width: 315,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  borderBottomColor: '#3ABEFE',
                }}
                placeholder="Name"
                placeholderTextColor="#556080"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                  }}>
                  {errors.name}
                </Text>
              ) : null}

              <TextInput
                style={{
                  color: '#fff',
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 16,
                  borderColor: '#556080',
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                  width: 315,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  borderBottomColor: '#3ABEFE',
                }}
                placeholder="Username"
                placeholderTextColor="#556080"
                value={values.username}
                onChangeText={handleChange('username')}
              />
              {errors.username && touched.username ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                  }}>
                  {errors.username}
                </Text>
              ) : null}
              <TextInput
                style={{
                  color: '#fff',
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 16,
                  borderColor: '#556080',
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                  width: 315,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  borderBottomColor: '#3ABEFE',
                }}
                placeholder="Email"
                placeholderTextColor="#556080"
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
              />

              {errors.email && touched.email ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                  }}>
                  {errors.email}
                </Text>
              ) : null}

              <View
                style={{
                  marginBottom: 10,
                  width: 315,
                }}>
                <Text
                  style={{
                    color: '#55607F',
                    fontFamily: 'Poppins-SemiBold',
                    width: 315,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 20,
                  }}>
                  Gender
                </Text>
                <RadioButton.Group
                  onValueChange={newValue => {
                    setFieldValue('gender', newValue); // directly update Formik form state
                  }}
                  value={values.gender}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                      <RadioButton value="Male" color="#3ABEFE" />
                      <Text style={{color: '#fff', marginRight: 10}}>Male</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                      <RadioButton value="Female" color="#3ABEFE" />
                      <Text style={{color: '#fff', marginRight: 10}}>
                        Female
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                      <RadioButton value="Other" color="#3ABEFE" />
                      <Text style={{color: '#fff'}}>Other</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View
                style={{
                  width: 315,
                }}>
                <Button
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  style={{
                    color: '#fff',
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: 16,
                    borderColor: '#556080',
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#3ABEFE',
                    borderRadius: 0,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      //if selected then color is white else color is #55607F
                      color: date ? '#fff' : '#55607F',
                      fontFamily: 'Poppins-SemiBold',
                      width: 315,
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 10,
                      textAlign: 'left',
                      paddingLeft: 10,
                    }}>
                    {date
                      ? moment(date).format('DD MMMM YYYY')
                      : 'Date of Birth'}
                  </Text>
                </Button>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />
              </View>

              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <TextInput
                  style={{
                    color: '#fff',
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: 16,
                    borderColor: '#556080',
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderBottomColor: '#3ABEFE',
                  }}
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
              {errors.password && touched.password ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: 10,
                    width: 315,
                    fontWeight: 'bold',
                  }}>
                  {errors.password}
                </Text>
              ) : null}

              <View style={RegisterStyles.buttonContainer}>
                <LinearGradient
                  colors={['#045690', '#16335D']}
                  style={RegisterStyles.button}>
                  <TouchableOpacity disabled={loading} onPress={handleSubmit}>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={RegisterStyles.buttonText}>SIGN UP</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </>
          )}
        </Formik>

        <Text style={RegisterStyles.Or}>OR</Text>
        <View style={RegisterStyles.Logos}>
          <TouchableOpacity style={RegisterStyles.FacebookLogo}>
            <Icon name="facebook-f" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 10, fontWeight: '900'}}>
              Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={RegisterStyles.GoogleLogo}>
            <Icon name="google" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 10, fontWeight: '900'}}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 40,
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

export default RegisterScreen;
