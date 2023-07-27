// No chat started with new user
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Enctyp from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const NoFriendRequest = () => {
  return (
    <View style={{height: 600, backgroundColor: '#0E121C'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.Number}>Friend Request</Text>
        <Text style={[styles.Number, {color: '#FF0000'}]}>0</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../../../assets/SadEmoji.png')}
          style={styles.Emoji}
        />
      </View>
      <Text
        style={{
          color: '#FFFFFF',
          marginLeft: 90,
          marginTop: 20,
          fontSize: 16,
        }}>
        No any friend requests right now
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#0E121C',
  },
  Number: {
    color: '#FFFFFF',
    fontFamily: 'Poppins - SemiBold',
    fontWeight: '800',
    marginTop: 16,
    marginLeft: 16,
    fontSize: 18,
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 8,
    marginLeft: 120,
  },
  Emoji: {
    marginTop: 80,
  },
});
export default NoFriendRequest;
