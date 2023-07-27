/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../utils/constant';
import AllFriendsHeader from './AllFriendsRequest/AllFriendsHeader';

const FriendsScreen = ({isDarkMode}) => {
  const [friends, setFriends] = useState([]);

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Call the getAccessToken function when the component mounts
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        setAccessToken(token);
      } catch (error) {
        console.error('Error getting access token from storage:', error);
      }
    };
    getAccessToken();
  }, []);

  useEffect(() => {
    // Fetch friend requests from API endpoint
    fetch(`${BASE_URL}/friends`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        //Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setFriends(data.data);
      })
      .catch(error => console.error(error));
  }, [accessToken]);

  const handleUnfriend = friendId => {
    fetch(`${BASE_URL}/friends/${friendId}/remove`, {
      method: 'POST',
      headers: {
        //Authorization: 'Bearer 4|wNOEwGZ2DwjjV84j7Z9OZIAz76vYgMcXgYCcEk5p',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Update the friends list to remove the friend who was accepted
          const updatedFriends = friends.filter(
            friend => friend.id !== friendId,
          );
          setFriends(updatedFriends);
        } else {
          console.error('Failed to unfriend:', response.status);
        }
      })
      .catch(error => console.error(error));
  };

  const containerStyle = [styles.container];
  const friendStyle = [styles.friend];
  const friendNameStyle = [styles.friendName];
  const friendIDStyle = [styles.friendIDStyle];
  const unfriendButtonStyle = [styles.unfriendButton];

  if (isDarkMode) {
    containerStyle.push(styles.containerDark);
    friendStyle.push(styles.friendDark);
    friendNameStyle.push(styles.friendNameDark);
    unfriendButtonStyle.push(styles.unfriendButtonDark);
    friendIDStyle.push(styles.friendIDStyleDark);
  }

  return (
    <View style={{flex: 1, backgroundColor: '#0F121D'}}>
      <AllFriendsHeader />
      <View style={containerStyle}>
        {friends.map(friend => (
          <View
            key={friend.id}
            style={[friendStyle, {backgroundColor: '#0F121D'}]}>
            <View>
              <View style={styles.postHeader}>
                <Image
                  source={require('../../assets/profile.jpg')}
                  style={styles.profileImage}
                />
                <View style={{}}>
                  <Text style={friendNameStyle}> {friend.name} </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleUnfriend(friend.id)}>
                    <Text style={unfriendButtonStyle}>Unfriend</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121724',
  },
  containerDark: {
    backgroundColor: '#0F121D',
  },
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 24,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  friendDark: {
    backgroundColor: '#1A2235',
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3ABEFE',
    fontFamily: 'Poppins-SemiBold',
  },

  friendNameDark: {
    color: '#3ABEFE',
  },

  friendIDStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A5AFCE',
  },

  friendIDStyleDark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unfriendButton: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'red',
    textAlign: 'center',
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    marginLeft: 100,
    padding: 4,
  },
  unfriendButtonDark: {
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    justifyContent: 'center',
    marginLeft: 100,
    padding: 4,
  },
});

export default FriendsScreen;
