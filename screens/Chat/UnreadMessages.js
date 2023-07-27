//All the chats along with read and unread messages

import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Enctyp from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ActiveUserProfile from './ActiveUser';
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
import SearchBar from '../../component/searchBar';
import AllMessages from './AllMessages';
const UnreadMessages = () => {
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
        <TouchableOpacity>
          <Enctyp
            name="dots-three-horizontal"
            size={22}
            color="#A5AFCE"
            marginTop={16}
            marginLeft={130}
          />
        </TouchableOpacity>
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

      <ActiveUserProfile />
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginTop: 10,
          fontFamily: 'Poppins-SemiBold',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 600,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Unread Messages
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'red',
            marginLeft: 10,
            fontWeight: 600,
          }}>
          3
        </Text>
      </View>
      <AllMessages />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#090C13',
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
});
export default UnreadMessages;
