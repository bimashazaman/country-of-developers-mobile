/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../utils/hooks/useAuth';

const MenuScreen = ({navigation}) => {
  const [Menu, setMenu] = useState([
    {
      id: 5,
      image: require('../../assets/image5.jpeg'),
      Status: 'Pages',
      navTo: 'PageScreen',
    },
  ]);

  const {currentUser} = useAuth();
  let currentUserId = '';
  let userDetails = {};

  if (currentUser && currentUser !== '') {
    userDetails = JSON.parse(currentUser);
    currentUserId = userDetails.id;
  }

  const logout = async () => {
    Alert.alert(
      // Title of the alert
      'Log Out',
      // Body of the alert
      'Are you sure you want to log out?',
      [
        // Array of buttons for the alert
        {
          text: 'Cancel',
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('access_token');
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('user_id');
              navigation.navigate('Login');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{minHeight: '100%', backgroundColor: '#0E121C'}}>
      {/* PROFILE NAVIGATION */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginLeft: 18,
          marginTop: 20,
          alignItems: 'center',
          backgroundColor: '#090C13',
          width: 380,
          height: 50,
          borderRadius: 10,
          padding: 10,
        }}>
        <Icon
          name="user"
          size={20}
          color="#3ABEFE"
          style={{marginTop: 3, marginLeft: 10}}
        />
        <Text
          style={{
            color: '#3ABEFE',
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 800,
          }}
          onPress={() => {
            navigation.navigate('Profile', {
              user: userDetails,
              userId: currentUserId,
            });
          }}>
          Profile
        </Text>
      </TouchableOpacity>

      <View
        style={{
          height: 600,
          backgroundColor: '#0E121C',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {Menu.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate(item.navTo)}>
            <View style={styles.dataContainer}>
              <Image source={item.image} style={styles.Image} />
              <View
                style={{
                  borderRadius: 40,
                  height: 40,
                  width: 90,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 8,
                    marginLeft: 8,
                    fontSize: 12,
                  }}>
                  {item.Status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 18,
            marginTop: 60,
            alignItems: 'center',
            backgroundColor: '#090C13',
            width: 380,
            height: 50,
            borderRadius: 10,
          }}>
          <Icon
            name="gear"
            size={20}
            color="#3ABEFE"
            style={{marginTop: 3, marginLeft: 140}}
          />
          <Text
            style={{
              color: '#3ABEFE',
              marginLeft: 10,
              fontSize: 18,
              fontWeight: 800,
            }}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 18,
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: '#3ABEFE',
            width: 380,
            height: 50,
            borderRadius: 10,
          }}
          onPress={logout}>
          <Entypo
            name="fingerprint"
            size={20}
            color="#FFFFFF"
            style={{marginTop: 3, marginLeft: 140}}
          />
          <Text
            style={{
              color: '#FFFFFF',
              marginLeft: 10,
              fontSize: 18,
              fontWeight: 800,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Number: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '800',
    marginTop: 16,
    marginLeft: 16,
    fontSize: 18,
  },

  dataContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    height: 80,
    marginTop: 20,
    borderColor: '#556080',
    borderWidth: 2,
    borderRadius: 40,
    width: 180,
  },
  Image: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 8,
    marginLeft: 16,
  },
  UserName: {
    color: '#3ABEFE',
    width: 60,
    fontSize: 14,
    marginLeft: 16,
    marginTop: 22,
    fontWeight: 800,
  },
  notification: {
    color: '#FFFFFF',
    width: 250,
    fontSize: 14,
    marginLeft: 0,
    marginTop: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  Time: {
    color: '#A5AFCE',
    width: 60,
    fontSize: 10,
    marginTop: 8,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MenuScreen;
