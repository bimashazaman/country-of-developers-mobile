/* eslint-disable react-native/no-inline-styles */
// PostBody.js
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Video} from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import FullscreenModal from './Modals/FullscreenModal';
import Comments from '../Comments/Comments';
import * as Animatable from 'react-native-animatable';
import {HomeScreenStyles} from '../../styles/HomeScreenStyle';

const PostBody = ({
  post,
  WEB_URL,
  handleMediaClick,
  isModalVisible,
  setModalVisible,
  mediaSrc,
  isMediaVideo,
  likeButtonRef,
  liked,
  likes,
  handleLikeUnlike,
  navigation,
  accessToken,
  currentUser,
  setShareModalVisible,
}) => {
  return (
    <>
      <Text style={HomeScreenStyles.caption}>{post.caption}</Text>
      <View style={HomeScreenStyles.postBody}>
        {post.media && (
          <>
            {post.media.endsWith('.mp4') || // List all your video formats here
            post.media.endsWith('.webm') ||
            post.media.endsWith('.gif') ||
            post.media.endsWith('.mov') ||
            post.media.endsWith('.webp') ||
            post.media.endsWith('.mkv') ||
            post.media.endsWith('.avi') ||
            post.media.endsWith('.wmv') ||
            post.media.endsWith('.flv') ? (
              <TouchableOpacity
                onPress={() =>
                  handleMediaClick(`${WEB_URL}/uploads/${post.media}`, true)
                }>
                <Video
                  source={{
                    uri: `${WEB_URL}/uploads/${post.media}`,
                  }}
                  style={HomeScreenStyles.postImage}
                  //controls={true}
                  resizeMode="contain"
                  ref={ref => {
                    this.player = ref;
                  }}
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleMediaClick(`${WEB_URL}/uploads/${post.media}`, false)
                }>
                <Image
                  source={{
                    uri: `${WEB_URL}/uploads/${post.media}`,
                  }}
                  style={HomeScreenStyles.postImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </>
        )}

        <FullscreenModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          source={mediaSrc}
          isVideo={isMediaVideo}
        />

        <View style={HomeScreenStyles.postActions}>
          <Animatable.View ref={likeButtonRef} useNativeDriver={true}>
            <TouchableOpacity
              style={[
                HomeScreenStyles.likeButton,
                {
                  flexDirection: 'row',
                  color: liked ? '#3ABEFE' : 'gray',
                  borderRadius: 20,
                  alignItems: 'center',
                },
              ]}
              onPress={handleLikeUnlike}>
              <Icon
                name="thumbs-up"
                size={20}
                color={liked ? '#3ABEFE' : 'white'}
              />
              <Text style={HomeScreenStyles.like}>{likes}</Text>
            </TouchableOpacity>
          </Animatable.View>
          <TouchableOpacity
            style={HomeScreenStyles.likeButton}
            onPress={() => {
              navigation.navigate('CommentScreen', {
                postId: post.id,
                accessToken: accessToken,
                currentUser: currentUser,
              });
            }}>
            <Comments navigation={navigation} postId={post.id} />
            <Text style={HomeScreenStyles.actionTextShare}>
              {post.comment ? post.comment.length : 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShareModalVisible(true)}
            style={{marginLeft: 14, flexDirection: 'row'}}>
            <Icon
              name="share"
              size={20}
              color="#3ABEFE"
              style={{
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PostBody;
