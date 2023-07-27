/* eslint-disable react-native/no-inline-styles */
// MyModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using FontAwesome.

const DeletePostModal = ({showModal, setShowModal, handleDeletePost, post}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowModal(false);
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
              alignItems: 'center',
              borderRadius: 10,
              borderColor: '#3ABEFE',
              borderWidth: 1,
              width: '80%',
              position: 'relative',
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
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
                setShowModal(!showModal);
                handleDeletePost(post.id);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 200,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white', fontSize: 16}}>Delete Post</Text>

              <Icon name="trash" size={16} color="#3ABEFE" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
                // navigation.navigate('EditPost', {
                //   post: post,
                // });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 200,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white', fontSize: 16}}>
                Edit Post (soon)
              </Text>

              <Icon name="edit" size={16} color="#3ABEFE" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeletePostModal;
