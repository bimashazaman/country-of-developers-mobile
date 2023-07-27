/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AllFriendsProfile from '../../component/Profile/AllFriendsProfile.js';
import {HomeScreenStyles} from '../../styles/HomeScreenStyle.js';
import Comments from '../../component/Comments/Comments.js';
import axios from 'axios';
import {BASE_URL, WEB_URL} from '../../utils/constant.js';
import ChangeProfileModal from '../Profile/ChangeProfileModal.js';
import ChangeBackgroundModal from '../Profile/ChangeBackground.js';

const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData;
  } catch (error) {
    console.error('Error getting access users from storage:', error);
  }
};

const UserProfileScreen = ({isDarkMode, navigation, route}) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestReceived, setIsRequestReceived] = useState(false);

  const userId = route.params.userdata.id;

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback(({nativeEvent: {lines}}) => {
    setLengthMore(lines.length >= 1);
  }, []);

  const handleEditProfileScreen = () => {
    navigation.navigate('EditProfileScreen');
  };

  const {userdata} = route.params;

  const [accessToken, setAccessToken] = useState('');

  // const [user, setUser] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [token, response] = await Promise.all([
          AsyncStorage.getItem('access_token'),
          axios.get(`${BASE_URL}/postsByUserId/${userdata.id}`),
        ]);
        setAccessToken(token);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userdata.id]);

  const likePost = async postId => {
    try {
      const response = await axios.post(
        `${BASE_URL}/likes/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      // Update the UI to reflect the like
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: [...post.likes, response.data.data],
            };
          }
          return post;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
  const unlikePost = async postId => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/likes/unlike/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      // Update the UI to reflect the unlike
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: post.likes.filter(
                like => like.user_id !== response.data.data.user_id,
              ),
            };
          }
          return post;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [currentUser, setCurrentUser] = useState('');

  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';

  useEffect(() => {
    // Call the getAccessToken function when the component mounts
    getUserData().then(item => {
      setCurrentUser(item);
    });
  }, []);

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

  return (
    <ScrollView>
      <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
        <View style={[styles.UserDetails, {backgroundColor: '#1A2235'}]}>
          <View>
            {userdata.cover == null ? (
              <Image
                source={require('../../assets/profile.jpg')}
                style={styles.coverImage}
              />
            ) : (
              <Image
                source={`${WEB_URL}/avatar/${userdata.avatar}`}
                style={styles.coverImage}
              />
            )}
            <View>
              <ChangeBackgroundModal />
            </View>
            <View style={styles.profileImageContainer}>
              {userdata.avatar == null ? (
                <Image
                  source={require('../../assets/profile.jpg')}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={`${WEB_URL}/avatar/${userdata.avatar}`}
                  style={styles.profileImage}
                />
              )}
            </View>
            <ChangeProfileModal />
          </View>

          <Text style={[styles.name, isDarkMode && styles.darkModeName]}>
            {userdata.name}
          </Text>
          <Text style={[styles.bio, isDarkMode && styles.darkModeBio]}>
            {userdata.email}
          </Text>

          <View style={[styles.About, isDarkMode && styles.darkModeAbout]}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 1}
              style={{
                lineHeight: 21,
                width: 320,
                marginLeft: 52,
                color: '#FFFFFF',
                justifyContent: 'center',
              }}>
              {userdata.bio}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  color: '#3ABEFE',
                  marginTop: 20,
                  right: 60,
                }}>
                {textShown ? 'Read less' : 'Read more'}
              </Text>
            ) : null}
          </View>
          <View>
            {currentUserId === userId ? (
              <View>
                <TouchableOpacity
                  style={[
                    styles.editButtonContainer,
                    {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
                  ]}
                  onPress={handleEditProfileScreen}>
                  <Icon name="edit" style={styles.editIcon} />
                  <Text style={styles.editButton}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.actionButtonsContainer}>
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
                        styles.actionButton,
                        {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
                      ]}
                      onPress={() => {
                        cancelFriendRequest(userId, accessToken);
                        setIsRequestSent(false);
                      }}>
                      <Text style={styles.actionButtonText}>
                        Cancel Request
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
                      <Text style={styles.actionButtonText}>Accept</Text>
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
                      <Text style={styles.actionButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={styles.addFriendButton}
                      onPress={() => {
                        addFriend(userId, accessToken);
                        setIsRequestSent(true);
                      }}>
                      <Text>Add Friend</Text>
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
                )}
              </View>
            )}
          </View>
        </View>
        {/* For All friends of user */}
        <AllFriendsProfile userId={userId} user={userdata} />

        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item: post}) => (
              <View
                key={post.id + Math.random() * 100}
                style={HomeScreenStyles.postContainer}>
                <View style={HomeScreenStyles.postHeader}>
                  <Image
                    source={require('../../assets/profile.jpg')}
                    style={HomeScreenStyles.profileImage}
                  />
                  <Text style={HomeScreenStyles.username}>{userdata.name}</Text>
                </View>
                <Text style={HomeScreenStyles.caption}>{post.caption}</Text>
                <View style={HomeScreenStyles.postBody}>
                  {post.media && (
                    <>
                      {post.media.endsWith('.mp4') ||
                      post.media.endsWith('.webm') ||
                      post.media.endsWith('.gif') ||
                      post.media.endsWith('.mov') ||
                      post.media.endsWith('.webp') ? (
                        // <Video
                        //   source={{
                        //     uri: `http://10.0.2.2:8001/uploads/${post.media}`,
                        //   }}
                        //   style={HomeScreenStyles.postVideo}
                        //   resizeMode="cover"
                        //   useNativeControls
                        // />
                        <Image
                          source={{
                            uri: `http://10.0.2.2:8001/uploads/${post.media}`,
                          }}
                          style={HomeScreenStyles.postImage}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `http://10.0.2.2:8001/uploads/${post.media}`,
                          }}
                          style={HomeScreenStyles.postImage}
                        />
                      )}
                    </>
                  )}

                  <View style={HomeScreenStyles.postActions}>
                    <TouchableOpacity
                      style={HomeScreenStyles.likeButton}
                      onPress={() => {
                        if (
                          post.likes.some(
                            like =>
                              like.id === post.likes[post.likes.length - 1].id,
                          )
                        ) {
                          unlikePost(post.id);
                        } else {
                          likePost(post.id);
                        }
                      }}>
                      <Icon
                        name="thumbs-up"
                        size={20}
                        marginTop={5}
                        // color={}
                        style={HomeScreenStyles.bellIcon}
                      />
                      <Text style={HomeScreenStyles.like}>
                        {post.likes ? post.likes.length : 0}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={HomeScreenStyles.likeButton}>
                      <Comments navigation={navigation} postId={post.id} />
                      <Text style={HomeScreenStyles.actionTextShare}>
                        {post.comment ? post.comment.length : 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // Call the share post API
                        fetch(`${BASE_URL}/posts/` + post.id + '/share', {
                          method: 'POST',
                          headers: {
                            Authorization: `Bearer ${accessToken}`,
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            caption: post.caption, // optional
                          }),
                        })
                          .then(response => response.json())
                          .then(data => console.log(data))
                          .catch(error => console.error(error));
                      }}>
                      <Icon name="share-square-o" size={25} color="#444444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121724',
  },
  darkModeContainer: {
    backgroundColor: '#0E121C',
  },
  UserDetails: {
    backgroundColor: '#1A2235',
    paddingBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  likeButton: {
    flexDirection: 'row',
  },
  CameraIcon: {
    marginLeft: '85%',
    bottom: 16,
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    padding: 7,
    justifyContent: 'center',
  },
  ProfileCameraIcon: {
    marginLeft: '65%',
    top: 10,
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    padding: 7,
    justifyContent: 'center',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 150,
    left: '50%',
    marginLeft: -75,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    backgroundColor: '#121724',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 50,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  darkModeName: {
    color: 'white',
  },
  bio: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#3ABEFE',
    fontFamily: 'Poppins-Regular',
  },
  darkModeBio: {
    color: '#3ABEFE',
  },
  About: {
    flexDirection: 'row',
    fontSize: 12,
    // marginTop: 6,
    textAlign: 'center',
    color: 'white',
    width: 150,
    marginTop: 16,
  },
  darkModeAbout: {
    color: 'white',
  },
  actionText: {
    marginTop: 1,
    marginLeft: 4,
    color: '#A5AFCE',

    fontFamily: 'Poppins-Medium',
  },
  editButtonContainer: {
    backgroundColor: '#3ABEFE',

    width: 120,
    height: 30,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '35%',
    marginTop: 20,
  },
  editIcon: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    marginTop: 2,
  },
  editButton: {
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
  postsContainer: {
    flex: 1,
    marginTop: 1,
  },

  addFriendButton: {
    backgroundColor: '#36BBFC',
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },

  actionButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default UserProfileScreen;
