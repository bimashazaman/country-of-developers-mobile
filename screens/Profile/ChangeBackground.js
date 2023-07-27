/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Button,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BASE_URL} from '../../utils/constant';
import {UserContext} from '../../utils/UserContext';

function ChangeBackgroundModal({accessToken, currentUser, userId}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);

  const {userDetails, setUserDetails} = useContext(UserContext);
  const [cover, setCover] = useState(userDetails.cover);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';

  const togglePostModal = () => {
    setPostModalVisible(!postModalVisible);
  };

  const createPost = () => {
    const formData = new FormData();
    formData.append('cover', {
      name: cover.fileName,
      type: cover.type,
      uri: Platform.OS === 'android' ? `file://${cover.uri}` : cover.uri,
    });

    axios
      .post(`${BASE_URL}/update-cover`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json, text/plain',
        },
      })
      .then(res => {
        setUserDetails({...userDetails, cover: res.data.cover});
        togglePostModal();
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
        console.log(err.config);
      });
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('FilePicker Error: ', response.error);
      } else {
        setCover(response.assets[0]);
        togglePostModal();
      }

      toggleModal(); // Move this line here
    });
  };
  return (
    <View style={{flex: 1}}>
      {userId === currentUserId ? (
        <TouchableOpacity onPress={toggleModal}>
          <Icon
            name="camera"
            size={21}
            color="white"
            style={styles.ProfileCameraIcon}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginLeft: '90%',
            marginTop: -8,
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            height: 35,
            width: 35,
            borderRadius: 17.5,
            padding: 7,
            justifyContent: 'center',
          }}
        />
      )}

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <View
              style={{
                backgroundColor: '#3ABEFE',
                alignItems: 'center',
                height: 40,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', marginRight: 12}}
                onPress={chooseFile}>
                <Icon
                  name="camera"
                  size={18}
                  color="white"
                  style={{marginTop: 9}}
                />
                <Text
                  style={{
                    color: 'white',
                    marginTop: 9,
                    marginLeft: 12,
                    fontWeight: 700,
                  }}>
                  {' '}
                  New Cover profile
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#1A2134', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={toggleModal}>
                <Icon
                  name="trash"
                  size={21}
                  color="red"
                  style={{marginTop: 16}}
                />
                <Text
                  style={{
                    color: 'red',
                    marginTop: 16,
                    marginLeft: 12,
                    fontWeight: 700,
                  }}>
                  Remove Cover profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal isVisible={postModalVisible}>
        <View style={{flex: 1}}>
          {cover && cover.uri && (
            <Image
              source={{uri: cover.uri}}
              style={{width: 200, height: 200}}
            />
          )}
          <Button title="Post" onPress={createPost} />
          <Button title="Cancel" onPress={togglePostModal} />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -20,
    left: -15,
    right: -15,
    backgroundColor: '#1A2134',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 80,
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
    marginLeft: '90%',
    marginTop: -8,
    color: '#FFFFFF',
    backgroundColor: '#3ABEFE',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    padding: 7,
    justifyContent: 'center',
  },
});
export default ChangeBackgroundModal;
