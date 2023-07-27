/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AllFriendsRequest from './AllFriendsRequest/AllFriendsRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL} from '../../utils/constant';

const FriendRequestScreen = ({isDarkMode, navigation}) => {
  const [friends, setFriends] = useState([]);

  const [accessToken, setAccessToken] = useState('');

  const isFocused = useIsFocused();

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
    if (isFocused) {
      // Fetch friend requests from API endpoint
      fetch(`${BASE_URL}/friend-requests`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setFriends(data.data);
        })
        .catch(error => console.error(error));
    }
  }, [accessToken, isFocused]);

  const handleAcceptRequest = friendId => {
    fetch(`${BASE_URL}/friends/${friendId}/accept`, {
      method: 'POST',
      headers: {
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
          console.error('Failed to accept friend request:', response.status);
        }
      })
      .catch(error => console.error(error));
  };

  const handleRemoveRequest = friendId => {
    fetch(`${BASE_URL}/friends/${friendId}/remove`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Update the friends list to remove the friend who was removed
          const updatedFriends = friends.filter(
            friend => friend.id !== friendId,
          );
          setFriends(updatedFriends);
        } else {
          console.error('Failed to remove friend:', response.status);
        }
      })
      .catch(error => console.error(error));
  };

  const containerStyle = [styles.container];
  const friendStyle = [styles.friend];
  const friendNameStyle = [styles.friendName];
  const RequestButtonStyle = [styles.Request];
  const unfriendButtonStyle = [styles.unfriendButton];
  const friendIDStyle = [styles.friendIDStyle];

  if (isDarkMode) {
    containerStyle.push(styles.containerDark);
    friendStyle.push(styles.friendDark);
    friendNameStyle.push(styles.friendNameDark);
    RequestButtonStyle.push(styles.RequestDark);
    unfriendButtonStyle.push(styles.unfriendButtonDark);
    friendIDStyle.push(styles.friendIDStyleDark);
  }

  return (
    <View style={containerStyle}>
      <View style={{backgroundColor: '#1A2235', height: 50, marginBottom: 20}}>
        <AllFriendsRequest navigation={navigation} />
      </View>
      <View style={{flexDirection: 'row', height: 40, marginLeft: 10}}>
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: 800,
            fontSize: 18,
          }}>
          Friend Requests
        </Text>
        <Text
          style={{
            color: '#FF4343',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: 800,
            fontSize: 18,
            marginLeft: 16,
          }}>
          {friends.length}
        </Text>
      </View>
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

              <Text
                style={[
                  friendNameStyle,
                  {
                    marginBottom: 20,
                    color: 'white',
                    fontFamily: 'Poppins-SemiBold',
                    alignSelf: 'center',
                  },
                ]}>
                {friend.name}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => handleAcceptRequest(friend.id)}>
                  <Text style={RequestButtonStyle}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRemoveRequest(friend.id)}>
                  <Text style={unfriendButtonStyle}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#0F121D',
  },
  containerDark: {
    backgroundColor: '#0F121D',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    marginBottom: 4,
  },

  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  friendDark: {
    backgroundColor: '#1A2235',
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendNameDark: {
    color: '#3ABEFE',
  },
  Request: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#3BBDFD',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    justifyContent: 'center',
    marginLeft: 60,
    padding: 4,
  },
  RequestDark: {
    color: '#FFFFFF',
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
    backgroundColor: '#192235',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    justifyContent: 'center',
    marginLeft: 10,
    padding: 4,
  },
  unfriendButtonDark: {
    color: '#3ABEFE',
    backgroundColor: '#0E111B',
    textAlign: 'center',
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    marginLeft: 10,
    padding: 4,
  },
});

export default FriendRequestScreen;
