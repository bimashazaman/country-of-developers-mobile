import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {CHAT_API} from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CurrentChat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const userId = route.params.ActiveUser.to_id;

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await AsyncStorage.getItem('user');
        setCurrentUser(JSON.parse(userData));
        const accessToken = await AsyncStorage.getItem('access_token');
        setAccessToken(accessToken);
      } catch (error) {
        console.error(
          'Error getting access token or user data from storage:',
          error,
        );
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!accessToken || !currentUser) return;

    axios
      .post(
        `${CHAT_API}/fetchMessages`,
        {id: userId},
        {headers: {Authorization: `Bearer ${accessToken}`}},
      )
      .then(response => {
        const fetchedMessages = response.data.messages.map(item => ({
          _id: item.id,
          text: item.body,
          createdAt: new Date(item.created_at),
          user: {
            _id:
              item.from_id === currentUser.id ? currentUser.id : item.from_id,
            name: item.from_id === currentUser.id ? currentUser.name : 'User',
          },
        }));

        setMessages(fetchedMessages);
      })
      .catch(error => console.log(error));
  }, [accessToken, currentUser, userId]);

  const onSend = async (newMessages = []) => {
    try {
      const response = await axios.post(
        `${CHAT_API}/sendMessage`,
        {
          message: newMessages[0].text,
          id: userId,
          type: 'text',
          temporaryMsgId: newMessages[0]._id,
        },
        {headers: {Authorization: `Bearer ${accessToken}`}},
      );

      if (response.data.status === '200') {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
        console.log('Message sent!' + response.data.message);
      } else {
        console.error('Error sending message:', response.data.error.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: currentUser ? currentUser.id : 0,
      }}
    />
  );
};

export default CurrentChat;
