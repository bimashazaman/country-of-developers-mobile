/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {PageProfileStyles} from '../../../../styles/PageProfileStyles';

const ProfileHeader = ({
  cover,
  avatar,
  name,
  username,
  user_id,
  currentUserId,
  navigation,
  page,
}) => {
  return (
    <View>
      {cover ? (
        <Image source={{uri: cover}} style={PageProfileStyles.coverImage} />
      ) : (
        <Image
          source={require('../../../../assets/profile.jpg')}
          style={PageProfileStyles.coverImage}
        />
      )}
      {avatar ? (
        <Image source={{uri: avatar}} style={PageProfileStyles.avatar} />
      ) : (
        <Image
          source={require('../../../../assets/profile.jpg')}
          style={PageProfileStyles.avatar}
        />
      )}
      <Text style={PageProfileStyles.name}>{name}</Text>
      <Text style={PageProfileStyles.username}>{username}</Text>
      {currentUserId === user_id ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#3ABEFE',
              padding: 10,
              borderRadius: 10,
              width: 100,
              marginLeft: 40,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('EditPage', {page})}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#3ABEFE',
              padding: 10,
              borderRadius: 10,
              width: 100,
              marginLeft: 20,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('CreatePostProfile', {page})}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileHeader;
