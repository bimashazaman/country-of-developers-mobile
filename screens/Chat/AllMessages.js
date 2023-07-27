/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {CHAT_API, WEB_SOCKET_URL} from '../../utils/constant';

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return accessToken;
  } catch (error) {
    console.error('Error getting access token from storage:', error);
  }
};

const AllMessages = ({navigation}) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getAccessToken().then(token => {
      if (token) {
        setAccessToken(token);
      }
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${CHAT_API}/getContacts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          if (response.data.contacts) {
            setActiveUsers(response.data.contacts);
          }

          console.log(response.data.contacts);
        })
        .catch(error => console.log(error));
    }
  }, [accessToken]);

  useEffect(() => {
    if (!socket) {
      const ws = new WebSocket(WEB_SOCKET_URL);

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        setSocket(ws);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setSocket(null);
      };

      ws.onerror = error => {
        console.log('WebSocket error:', error);
      };

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'message') {
            const newActiveUsers = [...activeUsers];
            const userIndex = newActiveUsers.findIndex(
              user => user.id === data.sender_id,
            );
            if (userIndex > -1) {
              newActiveUsers[userIndex].max_created_at = data.created_at;
            } else {
              newActiveUsers.push({
                id: data.sender_id,
                name: data.sender_name,
                image: data.sender_image,
                max_created_at: data.created_at,
              });
            }
            setActiveUsers(newActiveUsers);
          }
        } catch (error) {
          console.log('Error parsing WebSocket message:', error);
        }
      };
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [activeUsers, socket]);

  return (
    <View style={{flexDirection: 'column', marginLeft: 10}}>
      <ScrollView>
        {activeUsers.map(ActiveUser => (
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              marginTop: 10,
            }}
            key={ActiveUser.id}>
            <Image
              source={
                ActiveUser.image
                  ? {uri: ActiveUser.image}
                  : require('../../assets/profile.jpg')
              }
              style={{
                backgroundColor: '#FFFFFF',
                width: 60,
                height: 60,
                borderRadius: 30,
                marginTop: 16,
                borderColor: '#3ABEFE',
                borderWidth: 2,
              }}
            />
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CurrentChat', {ActiveUser})
                }>
                <Text
                  style={{
                    color: '#3ABEFE',
                    width: 60,
                    fontSize: 14,
                    marginLeft: 16,
                    marginTop: 22,
                    fontWeight: 800,
                  }}>
                  {ActiveUser.name}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 300,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    width: 'auto',
                    fontSize: 12,
                    marginLeft: 16,
                    marginTop: 8,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Sent you a message
                </Text>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 10,
                    marginTop: 8,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {new Date(ActiveUser.max_created_at).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllMessages;
