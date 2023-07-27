import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Enctyp from 'react-native-vector-icons/Entypo';

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import ChatMoreOptionModal from './ChatMoreOptionModal';
import AllMessages from './AllMessages';

const NoConversation = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const navigation = useNavigation();
  const handleSendMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
  };
  const handleAllMessages = () => {
    navigation.navigate('AllMessages');
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity>
          <Text style={styles.actionBack} onPress={handleAllMessages}>
            <Icon name="arrow-left" size={21} color="#3ABEFE" />
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
          />
          <Text
            style={{
              color: '#FFFFFF',
              marginLeft: 6,
              marginTop: 16,
              fontSize: 18,
              fontWeight: 600,
            }}>
            {' '}
            User 1
          </Text>
        </View>
        <TouchableOpacity>
          <Enctyp
            name="dots-three-horizontal"
            size={22}
            color="#A5AFCE"
            marginTop={16}
            marginLeft={100}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 440,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          <Image
            source={require('../../assets/SadEmoji.png')}
            style={styles.Emoji}
          />
          <Text
            style={{
              color: '#FFFFFF',
              marginLeft: 110,
              marginTop: 40,
              fontSize: 18,
            }}>
            No conversation right now
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <Text>
              <Enctyp name="circle-with-plus" size={28} color="#3ABEFE" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{marginLeft: 10}}>
              <Icon
                name="microphone"
                size={28}
                color="#3ABEFE"
                marginLeft={10}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: '#fff',
            borderWidth: 1,
            marginLeft: 20,
            height: 35,
            marginTop: 8,
            width: 300,
            borderRadius: 40,
          }}>
          <View
            style={{
              color: '#556080',
              fontWeight: '800',
              width: 250,
              marginHorizontal: 20,
              height: 26,
              marginTop: 3,
              flexDirection: 'row',
            }}>
            <Icon name="smile" size={24} color="#ffff00" />
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a Message..."
              placeholderTextColor="#fff"
            />
            <TouchableOpacity>
              <Text style={styles.actionText}>
                <Icon
                  name="paper-plane"
                  size={24}
                  color="#3ABEFE"
                  onPress={handleSendMessage}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#0e101c',
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 45,
    backgroundColor: '#1A2134',
    width: 409,
    height: 55,
  },
  input: {
    flex: 1,
    caretColor: 'green',
    padding: 6,
    marginLeft: 4,
    backgroundColor: '#1A2134',
    color: '#fff',
  },
  messageContainer: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#3ABEFE',
    borderRadius: 15,
    width: 100,
    marginLeft: 10,
    marginTop: 18,
    borderTopLeftRadius: 0,
  },
  actionText: {
    marginLeft: 40,
    marginTop: 2,
  },
  Emoji: {
    marginLeft: 100,
  },
});

export default NoConversation;
