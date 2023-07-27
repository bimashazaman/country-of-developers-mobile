/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationHeader = ({navigation}) => {
  const handleHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomeScreen}>
          <Text style={styles.actionText}>
            <Icon
              onPress={handleHomeScreen}
              name="arrow-left"
              size={21}
              color="#3ABEFE"
            />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: '#3ABEFE', fontSize: 26}]}>
          Notifications
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#1A2134',
  },
  actionText: {
    color: '#3ABEFE',
    fontSize: 24,
    marginLeft: 24,
  },

  headerText: {
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    color: '#3ABEFE',
    marginLeft: 90,
  },
});
export default NotificationHeader;
