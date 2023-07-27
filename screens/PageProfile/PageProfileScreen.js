/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import useAuth from '../../utils/hooks/useAuth';
import {PageProfileStyles} from '../../styles/PageProfileStyles';
import ProfileHeader from '../../component/Page/Profile/Header/ProfileHeader';
import {useDeletePost, useFetchPagePosts} from '../../utils/hooks/hooks';
import PostItem from '../../component/Post/PostItem';

const PageProfileScreen = ({route, navigation}) => {
  const {page} = route.params;

  const {accessToken, currentUser} = useAuth();

  const {avatar, cover, name, username, user_id} = page;

  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';
  const {posts, setPosts, refetch} = useFetchPagePosts(accessToken, page.id);
  const {handleDeletePost} = useDeletePost(accessToken);

  /**
   * This function handles the deletion of a post by removing it from state and then calling a function
   * to delete it from the server.
   */
  const handleDelete = postId => {
    // Optimistically remove post from state
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

    handleDeletePost(postId)
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      })
      .catch(() => {
        console.log('Error deleting post');
      });
  };

  const renderItem = ({item}) => {
    if (!item || typeof item.id === 'undefined') {
      return null;
    }
    return (
      <PostItem
        post={item}
        onDelete={handleDelete}
        userId={item.user_id}
        user={item.user}
        navigation={navigation}
        accessToken={accessToken}
      />
    );
  };

  const keyExtractor = item => {
    if (item.id) {
      return item.id.toString();
    } else {
      return Math.random().toString();
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  return (
    <View style={PageProfileStyles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={
          <ProfileHeader
            page={page}
            navigation={navigation}
            avatar={avatar}
            cover={cover}
            name={name}
            username={username}
            user_id={user_id}
            currentUserId={currentUserId}
            accessToken={accessToken}
          />
        }
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={<View style={{height: 100}} />}
      />
    </View>
  );
};

export default PageProfileScreen;
