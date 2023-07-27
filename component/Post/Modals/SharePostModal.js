/* eslint-disable react-native/no-inline-styles */
// SharePostModal.js
import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using FontAwesome.
import Share from 'react-native-share'; // Assuming you are using react-native-share library.

const SharePostModal = ({
  shareModalVisible,
  setShareModalVisible,
  handleSharePost,
  post,
  WEB_URL,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={shareModalVisible}
      onRequestClose={() => {
        setShareModalVisible(!shareModalVisible);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#161C2C',
            padding: 30,
            borderRadius: 10,
            borderColor: '#3ABEFE',
            borderWidth: 1,
            width: '80%',
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShareModalVisible(false);
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}>
            <Icon name="times" size={20} color="#3ABEFE" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShareModalVisible(!shareModalVisible);
              handleSharePost(post.id);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 200,
              marginBottom: 20,
              borderBottomColor: '#3ABEFE',
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <Text style={{color: 'white', fontSize: 16}}>
              Share on your timeline
            </Text>
            <Icon name="share" size={16} color="#3ABEFE" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                const shareOptions = {
                  title: 'Share via',
                  message: post.caption,
                  url: `${WEB_URL}/posts/${post.id}`,
                };
                Share.open(shareOptions)
                  .then(res => console.log(res))
                  .catch(err => console.error(err));
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  flexDirection: 'row',
                }}>
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SharePostModal;
