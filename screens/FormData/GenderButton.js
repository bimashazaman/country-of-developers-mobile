/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const GenderButton = () => {
  const [selectedIndex, setIndex] = useState();

  const formik = useFormik({
    initialValues: {
      gender: '',
    },
    validationSchema: Yup.object({
      gender: Yup.string().required('Please select a gender'),
    }),
    onSubmit: values => {
      // submit logic here
    },
  });

  return (
    <View>
      <Text
        style={{
          marginTop: 16,
          color: '#556080',
          fontWeight: '800',
          marginLeft: 4,
          fontFamily: 'Poppins-SemiBold',
        }}>
        Gender
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
          marginRight: 10,
        }}>
        <Text
          style={{
            marginRight: 10,
            color: '#FFFFFF',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Male
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIndex(0);
            formik.setFieldValue('gender', 'Male');
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {selectedIndex === 0 ? (
            <Icon name="dot-circle-o" size={16} color="#3ABEFE" />
          ) : (
            <Icon name="circle-o" size={16} color="#556080" />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 28,
            color: '#FFFFFF',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Female
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIndex(1);
            formik.setFieldValue('gender', 'Female');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 10,
          }}>
          {selectedIndex === 1 ? (
            <Icon name="dot-circle-o" size={16} color="#3ABEFE" />
          ) : (
            <Icon name="circle-o" size={16} color="#556080" />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 28,
            color: '#FFFFFF',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Other
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIndex(2);
            formik.setFieldValue('gender', 'Other');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 10,
          }}>
          {selectedIndex === 2 ? (
            <Icon name="dot-circle-o" size={16} color="#3ABEFE" />
          ) : (
            <Icon name="circle-o" size={16} color="#556080" />
          )}
        </TouchableOpacity>
      </View>
      {formik.touched.gender && formik.errors.gender ? (
        <Text style={{color: 'red'}}>{formik.errors.gender}</Text>
      ) : null}
    </View>
  );
};

export default GenderButton;
