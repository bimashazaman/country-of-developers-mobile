/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import PostItem from '../../component/Post/PostItem';
import {
  useFetchPosts,
  useDeletePost,
  useCreatePost,
} from '../../utils/hooks/hooks';
import useAuth from '../../utils/hooks/useAuth';
import {useFocusEffect} from '@react-navigation/native';
import SearchUsers from '../../component/Search/SearchUsers';

const HomeScreen = ({navigation}) => {
  const {accessToken, currentUser} = useAuth();
  const {posts, loading, setPosts, refetch} = useFetchPosts(accessToken);

  const fetchPosts = useCallback(async () => {
    // Refetch posts
    await refetch();
  }, [refetch]);

  // Call fetchPosts every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts]),
  );

  const {handleDeletePost} = useDeletePost(accessToken);

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
        onPost={handleCreatePost}
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

  const {loading: createPost} = useCreatePost(accessToken, setPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  const handleCreatePost = async (values, {resetForm}) => {
    const formData = new FormData();
    formData.append('caption', values.caption);

    await createPost(formData, resetForm);

    const newPost = {
      id: Math.random(),
      caption: values.caption,
      user: {
        id: JSON.parse(currentUser).id,
        username: JSON.parse(currentUser).username,
        name: JSON.parse(currentUser).name,
        avatar: JSON.parse(currentUser).avatar,
      },
      created_at: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <View
      style={{
        backgroundColor: '#0d121d',
      }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0d121d',
            minHeight: '100%',
            flexDirection: 'row',
          }}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{color: '#fff', marginLeft: 10}}>Loading posts...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={posts}
            ListHeaderComponent={
              <>
                <SearchUsers navigation={navigation} />
              </>
            }
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={<View style={{height: 200}} />}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
