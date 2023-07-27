/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import useAuth from '../../utils/hooks/useAuth';
import {BASE_URL, WEB_URL} from '../../utils/constant';

const AllNotifications = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);

  const {accessToken} = useAuth();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(`${BASE_URL}/rest/notifications`, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        })
          .then(response => response.json())
          .then(json => {
            setNotifications(json.notifications || []);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.log('No internet connection');
      }
    });
  }, [accessToken]);

  return (
    <ScrollView
      style={{
        backgroundColor: '#0D121D',
        minHeight: Dimensions.get('window').height,
      }}>
      {notifications.map(notification => (
        <View key={notification.id} style={styles.dataContainer}>
          {notification.data.user_avatar == null ? (
            <TouchableOpacity>
              <Image
                source={require('../../assets/profile.jpg')}
                style={styles.Image}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image
                source={{
                  uri: `${WEB_URL}/avatars/${notification.data.user_avatar}`,
                }}
                style={styles.Image}
              />
            </TouchableOpacity>
          )}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={styles.notification}
              numberOfLines={2}
              ellipsizeMode="tail">
              {notification.type === 'AppNotificationsLikeNotification' ? (
                <View>
                  <Text style={{color: '#F56565'}}>❤️</Text>{' '}
                  {notification.data.message} <Text>By</Text>{' '}
                  <Text style={styles.UserName}>
                    {notification.data.user_name}
                  </Text>
                </View>
              ) : notification.type ===
                'AppNotificationsFriendRequestNotification' ? (
                <Text>👥 {notification.data.message}</Text>
              ) : notification.type ===
                'AppNotificationsCommentNotification' ? (
                <>
                  <Text>💬 {notification.data.message}</Text> <Text>By</Text>{' '}
                  <Text style={styles.UserName}>
                    {notification.data.user_name}
                  </Text>
                </>
              ) : (
                <>
                  <Text>👍 {notification.data.message}</Text> <Text>By</Text>{' '}
                  <Text style={styles.UserName}>
                    {notification.data.user_name}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3748',
    borderRadius: 30,
    padding: 10,
    margin: 10,
  },
  Image: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  UserName: {
    color: '#3ABEFE',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 10,
  },
  notification: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AllNotifications;
