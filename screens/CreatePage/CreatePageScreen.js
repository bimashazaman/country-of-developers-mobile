import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup'; // import Yup
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../utils/constant';

// define your validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, {
      message: 'Must be only digits',
      excludeEmptyString: false,
    }),

  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Description is required'),
});

const CreatePageScreen = ({navigation}) => {
  const submitForm = async values => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('username', values.username);
      formData.append('phone', values.phone);
      formData.append('address', values.address);
      formData.append('description', values.description);

      const response = await axios.post(`${BASE_URL}/pages`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigation.navigate('PageScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Page</Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          username: '',
          phone: '',
          address: '',
          description: '',
        }}
        onSubmit={submitForm}
        validationSchema={validationSchema} // assign your validation schema to Formik
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.textStyle}
              errorMessage={touched.name && errors.name} // add this line to display the error message
            />
            <Input
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              style={styles.textStyle}
              errorMessage={touched.username && errors.username} // add this line to display the error message
            />
            {/* TODO: Implement file picker for avatar and cover */}
            <Input
              placeholder="Phone"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              style={styles.textStyle}
              errorMessage={touched.phone && errors.phone} // add this line to display the error message
            />
            <Input
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              style={styles.textStyle}
              errorMessage={touched.address && errors.address} // add this line to display the error message
            />
            <Input
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              style={styles.textStyle}
              errorMessage={touched.description && errors.description} // add this line to display the error message
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E121C',
    height: 800,
  },
  textStyle: {
    color: 'white',
  },
  formContainer: {
    backgroundColor: '#131928',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#0D8ABC',
    shadowColor: '#0D8ABC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 20,
  },

  innerContainer: {
    backgroundColor: '#0E121C',
  },
  title: {
    color: '#3ABEFE',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'RussoOne-Regular',
    textAlign: 'center',
  },
});

export default CreatePageScreen;
