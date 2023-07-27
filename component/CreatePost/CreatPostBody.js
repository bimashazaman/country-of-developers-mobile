import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';

const CreatPostBody = () => {
  return (
    <View style={{minHeight: '100%', backgroundColor: '#0E121C'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/profile.jpg')}
          style={{
            backgroundColor: '#0E121C',
            width: 45,
            height: 45,
            borderRadius: 22.5,
            marginTop: 16,
            marginLeft: 10,
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            color: '#3ABEFE',
            fontFamily: 'Poppins - SemiBold',
            fontWeight: '800',
            marginTop: 26,
            marginLeft: 12,
          }}>
          {' '}
          AB Villiers
        </Text>
      </View>
      <View>
        <TextInput
          style={{
            backgroundColor: '#0E121C',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Regular',
            marginLeft: 14,
            borderBottomColor: '#556080',
          }}
          placeholder="Say Something about this post"
          placeholderTextColor="#556080"
        />
      </View>
    </View>
  );
};

export default CreatPostBody;
