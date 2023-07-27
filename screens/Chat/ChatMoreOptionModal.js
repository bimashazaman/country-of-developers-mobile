import React, {useState} from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';

const ChatMoreOptionModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <Text>Modal Content Goes Here</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChatMoreOptionModal;
