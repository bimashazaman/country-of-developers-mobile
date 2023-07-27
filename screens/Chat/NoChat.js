/* eslint-disable react-native/no-inline-styles */
// No chat started with new user
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const NoChat = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity>
          <Text style={styles.actionBack}>
            <Icon name="arrow-left" size={21} color="#3ABEFE" />
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#3ABEFE',
              marginLeft: 125,
              marginTop: 10,
              fontSize: 28,
              fontWeight: 600,
              fontFamily: 'RussoOne-Regular',
            }}>
            Chats
          </Text>
        </View>
      </View>
      <View
        style={{
          fontWeight: '800',
          backgroundColor: '#090C13',
          borderColor: '#FFFFFF',
          borderWidth: 1,
          borderRadius: 20,
          width: 350,
          height: 28,
          marginLeft: 24,
          marginTop: 10,
          fontSize: 20,
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            fontWeight: '800',
            backgroundColor: '#090C13',
            // borderColor: '#FFFFFF',
            // borderWidth: 1,
            borderRadius: 20,
            width: 280,
            height: 20,
            marginLeft: 1,
            marginTop: 0,
            fontSize: 20,
            color: 'white',
            fontFamily: 'Russo One',
          }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder="Search..."
          placeholderTextColor="#fff"
        />

        <Text style={{marginLeft: 30, marginTop: 2}}>
          <Feather name="search" size={20} color="#fff" />
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/SadEmoji.png')}
          style={styles.Emoji}
        />
      </View>
      <Text
        style={{
          color: '#FFFFFF',
          marginLeft: 110,
          marginTop: 20,
          fontSize: 18,
        }}>
        No any chats right now
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#0e101c',
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
export default NoChat;
