import React from 'react';
import {Dimensions} from 'react-native';
import {View, Image, Modal, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const FullscreenModal = ({isVisible, onClose, source, isVideo}) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        {isVideo ? (
          <Video
            source={{uri: source}}
            style={{width: windowWidth, height: windowHeight}}
            resizeMode="contain"
            controls={true}
          />
        ) : (
          <Image
            source={{uri: source}}
            style={{width: windowWidth, height: windowHeight}}
            resizeMode="contain"
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default FullscreenModal;
