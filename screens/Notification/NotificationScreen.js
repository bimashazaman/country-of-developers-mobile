import React from 'react';
import {View, StyleSheet} from 'react-native';
import NotificationHeader from './NotificationHeader';
import AllNotifications from './AllNotifications';

const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.ModalContainer}>
      <NotificationHeader navigation={navigation} />
      <AllNotifications />
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexFlow: 'rowWrap',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    width: '60%',
    height: 30,
  },
  bellIcon: {},
});

export default NotificationScreen;
