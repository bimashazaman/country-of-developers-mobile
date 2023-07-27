import React, {useEffect, useRef, useState} from 'react';
import {View, Alert} from 'react-native';
import {HomeScreenStyles} from '../../styles/HomeScreenStyle';
import {WEB_URL} from '../../utils/constant';
import {
  useLikePost,
  useSharePost,
  useUnlikePost,
} from '../../utils/hooks/hooks';
import useAuth from '../../utils/hooks/useAuth';
import {getTimeDifference} from '../../utils/helper';
import PostHeader from './PostHeader';
import PostBody from './PostBody';

const PostItem = ({navigation, post, onDelete, userId, user, accessToken}) => {
  const [handleLikePost, likeError] = useLikePost(post.id, accessToken);
  const [handleUnlikePost, unlikeError] = useUnlikePost(post.id, accessToken);

  const [isModalVisible, setModalVisible] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [isMediaVideo, setIsMediaVideo] = useState(false);

  const [shareModalVisible, setShareModalVisible] = useState(false);

  // Function to handle media click
  const handleMediaClick = (src, isVideo) => {
    setMediaSrc(src);
    setIsMediaVideo(isVideo);
    setModalVisible(true);
  };

  const {currentUser} = useAuth();

  //showModal
  const [showModal, setShowModal] = useState(false);

  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';

  const currentUserEmail = currentUser ? JSON.parse(currentUser).email : '';

  const userHasLiked = post.likes.some(like => like.user_id === userId);
  const [liked, setLiked] = useState(userHasLiked);
  const [likes, setLikes] = useState(post.likes.length);

  const [handleSharePost] = useSharePost(post.id, accessToken, post.caption);

  const likeButtonRef = useRef(null);

  const handleLikeUnlike = async () => {
    if (likeButtonRef.current) {
      likeButtonRef.current.bounceIn();
    }
    if (liked) {
      setLiked(false);
      setLikes(prevLikes => prevLikes - 1);
      await handleUnlikePost();
    } else {
      setLiked(true);
      setLikes(prevLikes => prevLikes + 1);
      await handleLikePost();
    }
  };

  const handleDeletePost = id => {
    Alert.alert('Delete Post', 'Are you sure?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => onDelete(id),
      },
    ]);
  };

  /*This is useful for debugging and identifying any errors that may occur during the like or unlike process. */
  useEffect(() => {
    if (likeError || unlikeError) {
      console.error(likeError || unlikeError);
    }
  }, [likeError, unlikeError]);

  return (
    <View
      key={post.id + Math.random() * 100}
      style={HomeScreenStyles.postContainer}>
      <PostHeader
        post={post}
        navigation={navigation}
        WEB_URL={WEB_URL}
        currentUserId={currentUserId}
        currentUserEmail={currentUserEmail}
        showModal={showModal}
        setShowModal={setShowModal}
        shareModalVisible={shareModalVisible}
        setShareModalVisible={setShareModalVisible}
        handleDeletePost={handleDeletePost}
        handleSharePost={handleSharePost}
        getTimeDifference={getTimeDifference}
        user={user}
      />

      <PostBody
        post={post}
        WEB_URL={WEB_URL}
        handleMediaClick={handleMediaClick}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        mediaSrc={mediaSrc}
        isMediaVideo={isMediaVideo}
        likeButtonRef={likeButtonRef}
        liked={liked}
        likes={likes}
        handleLikeUnlike={handleLikeUnlike}
        navigation={navigation}
        accessToken={accessToken}
        currentUser={currentUser}
        setShareModalVisible={setShareModalVisible}
      />
    </View>
  );
};

export default PostItem;
