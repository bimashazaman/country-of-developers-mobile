/* eslint-disable react-native/no-inline-styles */
// PostHeader.js
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {HomeScreenStyles} from '../../styles/HomeScreenStyle';
import DeletePostModal from './Modals/DeletePostModal';
import SharePostModal from './Modals/SharePostModal';

const PostHeader = ({
  post,
  navigation,
  WEB_URL,
  currentUserId,
  currentUserEmail,
  showModal,
  setShowModal,
  shareModalVisible,
  setShareModalVisible,
  handleDeletePost,
  handleSharePost,
  getTimeDifference,
  user,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={HomeScreenStyles.postHeader}>
        {post.user.avatar == null ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                userId: post.user.id,
                user: post.user,
              })
            }>
            <Image
              source={require('../../assets/profile.jpg')} // adjust the path as per your directory structure.
              style={HomeScreenStyles.profileImage}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                userId: user.id,
                user: user,
              })
            }>
            <Image
              source={{uri: `${WEB_URL}/avatars/${post.user.avatar}`}}
              style={HomeScreenStyles.profileImage}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              userId: post.user.id,
              user: post.user,
            })
          }>
          <View style={HomeScreenStyles.usernameContainer}>
            <Text style={HomeScreenStyles.username}>
              {post.user.name ? post.user.name : post.user.email}
              {/* <Text style={HomeScreenStyles.breakUsername}>
                ({post.user?.username ? post.user.username : ''})
              </Text> */}
            </Text>
          </View>
          <Text style={HomeScreenStyles.date}>
            {getTimeDifference(new Date(), new Date(post.created_at))}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={HomeScreenStyles.username}>
        {currentUserId === post.user.id ||
        currentUserEmail === post.user.email ? (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}>
            <Entypo
              name="dots-three-horizontal"
              marginRight={20}
              color="#fff"
              style={{fontSize: 20}}
            />
          </TouchableOpacity>
        ) : null}

        <DeletePostModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleDeletePost={handleDeletePost}
          post={post}
        />
        <SharePostModal
          shareModalVisible={shareModalVisible}
          setShareModalVisible={setShareModalVisible}
          handleSharePost={handleSharePost}
          post={post}
          WEB_URL={WEB_URL}
        />
      </View>
    </View>
  );
};

export default PostHeader;
