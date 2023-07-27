/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePostFooter = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#1A2134',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Icon name="camera" size={20} color="white" marginTop={8} />
        <Text
          style={{
            color: 'white',
            marginTop: 5,
            marginLeft: 12,
            fontFamily: 'Poppins-Bold',
            fontWeight: '800',
            fontSize: 16,
          }}>
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#1A2134',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Icon name="image" size={20} color="white" marginTop={2} />
        <Text
          style={{
            color: 'white',
            marginTop: 1,
            marginLeft: 12,
            fontFamily: 'Poppins-Bold',
            fontWeight: '800',
            fontSize: 16,
          }}>
          Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostFooter;
