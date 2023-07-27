import React from 'react';
import {View, StyleSheet} from 'react-native';
import AllMessages from './AllMessages';

const ChatScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AllMessages navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#090C13',
  },

  Header: {
    backgroundColor: '#1A2134',
    width: 409,
    height: 55,
    flexDirection: 'row',
  },
  actionBack: {
    marginTop: 16,
    marginLeft: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 8,
    marginLeft: 120,
  },
});
export default ChatScreen;
