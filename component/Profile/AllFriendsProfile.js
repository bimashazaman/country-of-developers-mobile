/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {BASE_URL, WEB_URL} from '../../utils/constant';
import NoFriends from '../NoFriends';

const AllFriendsProfile = ({isDarkMode, userId, user}) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriends();
  }, [userId]);

  const numFriends = friends.length;

  return (
    <View>
      {numFriends > 0 && (
        <>
          <View style={styles.container}>
            <View style={styles.FriendsLabel}>
              <Text
                style={[
                  styles.FriendsText,
                  ,
                  {color: isDarkMode ? '' : '#A5AFCE'},
                ]}>
                Friends {numFriends}
              </Text>
              <Text style={styles.FriendsNumber}>
                {numFriends ? 0 : <NoFriends />}
              </Text>
            </View>
            {friends.map(friend => (
              <View key={friend.id}>
                <Image
                  source={`${WEB_URL}/avatar/${user.avatar}`}
                  style={styles.Image}
                />
                <Text
                  style={[
                    styles.UserName,
                    {color: isDarkMode ? '' : '#A5AFCE'},
                  ]}>
                  {friend.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.ViewAllButton}>
            <TouchableOpacity>
              <Text style={styles.ViewAllText}> View All frineds</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 14,
    marginTop: 10,
    padding: 1,
    paddingTop: 20,
    paddingBottom: 20,
    height: 'auto',
    width: 400,
  },

  Image: {
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    borderRadius: 20,
    marginTop: 16,
    marginLeft: 6,
  },
  UserName: {
    color: '#FFFFFF',
    marginTop: 8,
    marginLeft: 16,
  },

  FriendsLabel: {
    flexDirection: 'row',
    marginLeft: 20,
    width: 400,
    marginBottom: 10,
  },
  FriendsText: {
    color: '#FFFFFF',
  },
  FriendsNumber: {
    color: '#3ABEFE',
    marginLeft: 10,
    fontWeight: 500,
    fontFamily: 'Poppins-Medium',
  },
  ViewAllButton: {
    backgroundColor: '#36BBFC',
    width: 120,
    alignItems: 'center',
    borderRadius: 15,
    height: 22,
    marginLeft: 150,
    marginBottom: 20,
  },
  ViewAllText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontWeight: 800,
    marginTop: 1,
  },
});
export default AllFriendsProfile;
