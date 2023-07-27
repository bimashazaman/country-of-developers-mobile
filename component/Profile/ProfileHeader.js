/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ProfileStyles} from '../../styles/ProfileStyles';
import {BASE_URL, WEB_URL} from '../../utils/constant';
import ChangeBackgroundModal from '../../screens/Profile/ChangeBackground';
import ChangeProfileModal from '../../screens/Profile/ChangeProfileModal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../utils/UserContext';
import AppHeader from '../../navigate/AppHeader';
import SearchUsers from '../Search/SearchUsers';

const ProfileHeader = ({
  isDarkMode,
  navigation,
  user,
  userId,
  currentUserId,
  accessToken,
  currentUser,
}) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestReceived, setIsRequestReceived] = useState(false);

  const {userDetails, setUserDetails} = useContext(UserContext);
  const [name, setName] = useState(userDetails.name);
  const [username, setUsername] = useState(userDetails.username);
  const [bio, setBio] = useState(userDetails.bio);
  const [avatar, setAvatar] = useState(userDetails.avatar);
  const [cover, setCover] = useState(userDetails.cover);

  //if the cover and avatar is null preload those from user
  useEffect(() => {
    if (userDetails.cover === null) {
      setCover(user?.cover);
    }
    if (userDetails.avatar === null) {
      setAvatar(user?.avatar);
    }
  }, [userDetails.cover, userDetails.avatar, user?.cover, user?.avatar]);

  const addFriend = async (userId, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/friends/${userId}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const acceptFriend = async (userId, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/friends/${userId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeFriend = async (userId, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/friends/${userId}/remove`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const cancelFriendRequest = async (userId, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/friends/${userId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async (userId, accessToken) => {
    try {
      await axios.post(
        `${BASE_URL}/friends/${userId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfileScreen = () => {
    navigation.navigate('EditProfileScreen');
  };

  useEffect(() => {
    // Call the API to check if they are friends
    axios
      .get(`${BASE_URL}/friends/${userId}/checkFriendship`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setIsFriend(response.data.data);
      });

    // Call the API to check if a friend request has been sent
    axios
      .get(`${BASE_URL}/friends/${userId}/checkFriendRequest`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setIsRequestSent(response.data.data);
      });

    // Call the API to check if a friend request has been received
    axios
      .get(`${BASE_URL}/friends/${userId}/checkFriendRequestReceived`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setIsRequestReceived(response.data.data);
      });
  }, [accessToken, userId]);

  return (
    <View>
      <AppHeader navigation={navigation} />
      <SearchUsers navigation={navigation} />
      <View style={[ProfileStyles.UserDetails, {backgroundColor: '#0F121C'}]}>
        <View>
          {user?.cover == null ? (
            <View style={ProfileStyles.BlankCover}>
              <Text style={ProfileStyles.BlankCoverText}>
                No cover photo yet
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: `${WEB_URL}/covers/${user?.cover}`}}
              style={ProfileStyles.coverImage}
            />
          )}
          <View>
            <ChangeBackgroundModal
              accessToken={accessToken}
              currentUser={currentUser}
              userId={userId}
            />
          </View>
          <View style={ProfileStyles.profileImageContainer}>
            {user?.avatar == null ? (
              <Image
                source={require('../../assets/profile.jpg')}
                style={ProfileStyles.profileImage}
              />
            ) : (
              <Image
                source={{uri: `${WEB_URL}/avatars/${user?.avatar}`}}
                style={ProfileStyles.profileImage}
              />
            )}
          </View>
          <ChangeProfileModal
            accessToken={accessToken}
            currentUser={currentUser}
            userId={userId}
          />
        </View>
        <Text
          style={[
            ProfileStyles.name,
            isDarkMode && ProfileStyles.darkModeName,
          ]}>
          {user?.name}
        </Text>
        <Text
          style={[ProfileStyles.bio, isDarkMode && ProfileStyles.darkModeBio]}>
          {user?.username}
        </Text>

        <View
          style={[
            ProfileStyles.About,
            isDarkMode && ProfileStyles.darkModeAbout,
          ]}>
          <Text
            style={{
              lineHeight: 21,
              width: 320,
              marginLeft: 52,
              color: '#FFFFFF',
              justifyContent: 'center',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            {currentUserId === userId ? bio : user?.bio}
          </Text>
        </View>
        {currentUserId === userId ? (
          <View>
            <TouchableOpacity
              style={[
                ProfileStyles.editButtonContainer,
                {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
              ]}
              onPress={handleEditProfileScreen}>
              <Icon name="edit" style={ProfileStyles.editIcon} />
              <Text style={ProfileStyles.editButton}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={ProfileStyles.actionButtonsContainer}>
            {isFriend ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    color: '#FFFFFF',
                  }}
                  onPress={() => {
                    removeFriend(userId, accessToken);
                    setIsFriend(false);
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Remove Friend
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    color: '#FFFFFF',
                  }}
                  onPress={() => {
                    navigation.navigate('CurrentChat', {
                      ActiveUser: {to_id: userId},
                    });
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            ) : isRequestSent ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={[
                    ProfileStyles.actionButton,
                    {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
                  ]}
                  onPress={() => {
                    cancelFriendRequest(userId, accessToken);
                    setIsRequestSent(false);
                  }}>
                  <Text style={ProfileStyles.actionButtonText}>
                    Cancel Request
                  </Text>
                </TouchableOpacity>
              </View>
            ) : isRequestReceived ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#3ABEFE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                  onPress={() => {
                    acceptFriend(userId, accessToken);
                    setIsRequestReceived(false);
                    setIsFriend(true);
                  }}>
                  <Text style={ProfileStyles.actionButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    rejectFriendRequest(userId, accessToken);
                    setIsRequestReceived(false);
                  }}>
                  <Text style={ProfileStyles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  addFriend(userId, accessToken);
                  setIsRequestSent(true);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Add Friend
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
