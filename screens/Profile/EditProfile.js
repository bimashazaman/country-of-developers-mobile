import React, {useState, useCallback, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../utils/UserContext';
import {BASE_URL} from '../../utils/constant';
import useAuth from '../../utils/hooks/useAuth';

const EditProfileScreen = ({isDarkMode, props}) => {
  const navigation = useNavigation();

  const {userDetails, setUserDetails} = useContext(UserContext);

  const [name, setName] = useState(userDetails.name);
  const [username, setUsername] = useState(userDetails.username);
  const [bio, setBio] = useState(userDetails.bio);
  const {accessToken} = useAuth();

  const updateProfile = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/update-name-and-username`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: name,
        username: username,
        bio: bio,
      }),
    });
    const data = await response.json();

    if (data.user) {
      setUserDetails(data.user); // update user details in the context after successful update
      alert(data.message);
    } else {
      alert('Error updating profile.');
    }
  }, [accessToken, name, username, bio, setUserDetails]);

  return (
    <ScrollView>
      <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.actionBack}>
              <Icon name="arrow-left" size={21} color="#3ABEFE" />
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.HeaderText}>Edit Profile</Text>
          </View>
        </View>
        <View
          style={[
            styles.UserDetails,
            {backgroundColor: '#0E121C', height: 680},
          ]}>
          <View>
            <View style={styles.NameInputdetails}>
              <Text
                style={[
                  styles.label,
                  {
                    color: '#3ABEFE',
                    marginLeft: 44,
                    marginTop: 10,
                    fontFamily: 'Poppins-Regular',
                  },
                ]}>
                Name
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: '#1A2235',
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Regular',
                  },
                ]}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Text
                style={[
                  styles.label,
                  {
                    color: '#3ABEFE',
                    marginLeft: 44,
                    marginTop: 16,
                    fontFamily: 'Poppins-Regular',
                  },
                ]}>
                Username
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: '#1A2235',
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Regular',
                  },
                ]}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.BioInputdetails}>
              <Text
                style={[
                  styles.label,
                  {
                    color: '#3ABEFE',
                    marginLeft: 44,
                    marginTop: 16,
                    fontFamily: 'Poppins-Regular',
                  },
                ]}>
                Bio
              </Text>

              <TextInput
                style={[
                  styles.Bio,
                  {
                    backgroundColor: '#1A2235',
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Regular',
                  },
                ]}
                placeholder="Enter your bio"
                value={bio}
                onChangeText={setBio}
              />
            </View>
            <Text style={{color: '#556080', fontSize: 12, marginLeft: 250}}>
              Maximum 50 Words
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.editButtonContainer,
                {backgroundColor: isDarkMode ? '#36BBFC' : '#3ABEFE'},
              ]}
              onPress={updateProfile}>
              <Text style={styles.editButton}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E121C',
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
  HeaderText: {
    color: '#3ABEFE',
    marginLeft: 110,
    marginTop: 12,
    fontSize: 28,
    fontWeight: 600,
    fontFamily: 'RussoOne-Regular',
  },
  editButtonContainer: {
    backgroundColor: '#3ABEFE',

    width: 250,
    height: 40,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '22%',
    marginTop: 8,
  },

  editButton: {
    color: 'white',

    fontSize: 16,
    marginLeft: 70,
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
    fontWeight: 800,
  },

  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 800,
    marginBottom: 5,
  },
  input: {
    height: 35,
    padding: 10,
    borderRadius: 20,
    marginTop: 2,
    width: 348,
    marginLeft: 30,
  },
  NameInputdetails: {
    flexDirection: 'column',
    marginTop: 30,
  },
  formField: {
    marginBottom: 20,
  },
  Bio: {
    height: 100,
    width: 350,
    borderRadius: 30,
    marginLeft: 35,
    padding: 8,
  },
});

export default EditProfileScreen;
