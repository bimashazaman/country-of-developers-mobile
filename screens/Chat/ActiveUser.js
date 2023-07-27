/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {View, Text, Image, ScrollView} from 'react-native';

const ActiveUserProfile = () => {
  const [ActiveUser, setActiveuser] = useState([
    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },

    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },
    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },
    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },
    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },
    {
      image: require('../../assets/profile.jpg'),
      UserName: 'User1',
    },
  ]);
  return (
    <View style={{flexDirection: 'row', marginLeft: 10}}>
      <ScrollView horizontal={true}>
        {ActiveUser.map(ActiveUser => (
          <View style={{marginLeft: 20}}>
            <Image
              source={ActiveUser.image}
              style={{
                backgroundColor: '#FFFFFF',
                width: 45,
                height: 45,
                borderRadius: 22.5,
                marginTop: 16,
                borderColor: '#3ABEFE',
                borderWidth: 2,
              }}
            />
            <Text
              style={{
                color: '#A5AFCE',
                width: 40,
                fontSize: 12,
                marginLeft: 8,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {ActiveUser.UserName}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActiveUserProfile;
