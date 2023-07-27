/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL, WEB_URL} from '../../utils/constant';

const SearchScreen = ({route, navigation}) => {
  const [users, setUsers] = useState([]);

  const {searchQuery} = route.params;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/search-users`, {
        search: searchQuery,
      })
      .then(response => {
        if (response.data && response.data.users) {
          setUsers(response.data.users);
          // console.log(response.data.users);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchQuery]);

  const renderUserItem = ({item}) => {
    return (
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        {users.avatar == null ? (
          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('Profile', {
          //     userId: users.id,
          //     user: users,
          //   })
          // }
          >
            <Image
              source={require('../../assets/profile.jpg')} // adjust the path as per your directory structure.
              style={{width: 40, height: 40, borderRadius: 20}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('Profile', {
          //     userId: users.id,
          //     user: users,
          //   })
          // }
          >
            <Image
              source={{uri: `${WEB_URL}/avatars/${users.avatar}`}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#0F121D',
        minHeight: Dimensions.get('window').height,
      }}>
      {/* //search results header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#3CBCF6',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'RussoOne-Regular',
            textAlign: 'center',
          }}>
          Search Results
        </Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;
