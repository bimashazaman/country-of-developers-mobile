/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Notifications = ({navigation}) => {
  const handleImageClick = () => {
    navigation.navigate('NotificationScreen');
  };

  //navigating to chatScreen
  const handleChatClick = () => {
    navigation.navigate('ChatScreen');
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageClick}>
          <View style={styles.Icon}>
            <Icon name="bell" size={22} color="white" style={styles.image} />
            <Icon
              name="circle"
              size={10}
              color="red"
              style={{position: 'absolute', top: 0, right: 0}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChatClick}>
          <View style={styles.Icon}>
            <Icon
              name="envelope"
              size={22}
              color="white"
              style={styles.image}
            />
            <Icon
              name="circle"
              size={10}
              color="red"
              style={{position: 'absolute', top: 0, right: 0}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Icon: {
    marginLeft: 10,
  },
  image: {
    marginLeft: 20,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Notifications;
