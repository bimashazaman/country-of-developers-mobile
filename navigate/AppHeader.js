import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Notifications from '../screens/Notification/Notifications';

const AppHeader = ({navigation}) => {
  return (
    <LinearGradient colors={['#0C0F16', '#192033']} style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={require('../assets/ps-logo-full.png')}
          style={styles.logo}
        />
        <Notifications navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 65,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexFlow: 'rowWrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    width: '60%',
    height: 30,
  },
  bellIcon: {},
});

export default AppHeader;
