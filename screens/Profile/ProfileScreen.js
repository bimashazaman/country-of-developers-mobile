/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, Image} from 'react-native';
import useAuth from '../../utils/hooks/useAuth.js';
import ProfileHeader from '../../component/Profile/ProfileHeader.js';
import {useDeletePost, useFetchPostsByUserId} from '../../utils/hooks/hooks.js';
import PostItem from '../../component/Post/PostItem.js';
import {Text} from 'react-native-animatable';
import axios from 'axios';
import {BASE_URL, WEB_URL} from '../../utils/constant.js';

const ProfileScreen = ({route, navigation}) => {
  const {accessToken, currentUser} = useAuth();
  const {user, userId} = route.params;

  const userInformation = user ? user : JSON.parse(currentUser);
  const userIdInformation = userId ? userId : userInformation.id;
  const {posts, loading, setPosts, refetch} = useFetchPostsByUserId(
    accessToken,
    userIdInformation,
  );

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [userId]);

  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';
  const {handleDeletePost} = useDeletePost(accessToken);
  const handleDelete = postId => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    handleDeletePost(postId)
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      })
      .catch(() => {
        console.log('Error deleting post');
      });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = ({item}) => {
    if (!item || typeof item.id === 'undefined') {
      return null;
    }
    return (
      <View style={{backgroundColor: '#0F121C'}}>
        <PostItem
          post={item}
          onDelete={handleDelete}
          userId={item.user_id}
          user={item.user}
          navigation={navigation}
          accessToken={accessToken}
        />
      </View>
    );
  };

  const keyExtractor = item => {
    if (item.id) {
      return item.id.toString();
    } else {
      return Math.random().toString();
    }
  };

  //if loading
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#121724',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#121724', flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>No posts yet</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <ProfileHeader
              currentUserId={currentUserId}
              navigation={navigation}
              accessToken={accessToken}
              user={userInformation}
              userId={userIdInformation}
              currentUser={currentUser}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20,
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#3ABEFE',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'RussoOne-Regular',
                }}>
                Friends
              </Text>

              <Text
                style={{
                  color: '#3ABEFE',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'RussoOne-Regular',
                }}>
                {friends.length}
              </Text>
            </View>
            <FlatList
              horizontal
              data={friends}
              renderItem={({item}) => (
                <View
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}>
                  {item.avatar ? (
                    <Image
                      source={{
                        uri: `${WEB_URL}/avatars/${item.avatar}`,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/profile.jpg')}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                      fontFamily: 'RussoOne-Regular',
                      marginTop: 5,
                    }}>
                    {item.name}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </>
        }
      />
    </View>
  );
};

export default ProfileScreen;
