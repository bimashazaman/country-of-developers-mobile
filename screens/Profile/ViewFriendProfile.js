/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
//import SearchBar from '../Components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import EditProfileScreen from './EditProfile.js';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import AllFriendsProfile from '../../component/Profile/AllFriendsProfile.js';
import NoFriends from '../../component/NoFriends.js';
import AppHeader from '../../navigate/AppHeader.js';
import AppTabNavigator from '../../navigate/AppTabNavigator.js';
import AddFriendComponent from './AddFriendComponent.js';
import CancelRequestComponent from './CancelRequestComponent.js';
import AddandRemoveButton from './AddandRemoveButton.js';

const ViewFriendProfile = () => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 1); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'John Doe',
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 12,
    },
    {
      id: 2,
      username: 'Alice Lee',
      caption:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      likes: 5,
      comments: [
        {
          id: 1,
          username: 'Mike Brown',
          comment: 'Amazing!',
        },
        {
          id: 2,
          username: 'Rachel Green',
          comment: 'Love it!',
        },
      ],
    },
  ]);

  const handleLike = postId => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex(p => p.id === postId);
    updatedPosts[postIndex].likes += 1;
    setPosts(updatedPosts);
  };

  return (
    <ScrollView>
      <View>
        <AppHeader />
        <ScrollView>
          <View style={[styles.container]}>
            <View style={[styles.UserDetails, {backgroundColor: '#1A2235'}]}>
              <View>
                <Image
                  style={styles.coverImage}
                  source={{
                    uri: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                  }}
                />

                <View style={styles.profileImageContainer}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 70}}>
                <Text style={[styles.name]}>Bimasha Zaman</Text>
                <Text style={[styles.bio]}>Front-end Developer</Text>

                <View style={[styles.About]}>
                  <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 1}
                    style={{
                      lineHeight: 21,
                      width: 320,
                      marginLeft: 52,
                      color: '#FFFFFF',
                      justifyContent: 'center',
                    }}>
                    {
                      'Set the source to your icon image file. Set the source to your icon image file.'
                    }
                  </Text>

                  {lengthMore ? (
                    <Text
                      onPress={toggleNumberOfLines}
                      style={{
                        lineHeight: 16,
                        fontSize: 12,
                        color: '#3ABEFE',
                        marginTop: 20,
                        right: 60,
                      }}>
                      {textShown ? 'Read less' : 'Read more'}
                    </Text>
                  ) : null}
                </View>
                {/* for add friend button */}
                <AddFriendComponent />

                {/* <CancelRequestComponent /> */}

                {/* For add remove friendrequest */}
                {/* <AddandRemoveButton /> */}
              </View>
            </View>
            {/* For All friends of user */}
            <AllFriendsProfile />

            {/* when there is no friends */}
            {/* <NoFriends /> */}

            <View style={styles.postsContainer}>
              {posts.map(post => (
                <View
                  key={post.id}
                  style={{
                    backgroundColor: '#1A2235',
                    margin: 1,
                    marginTop: 8,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 2,
                    shadowRadius: 2,
                    elevation: 1,
                  }}>
                  <View style={styles.postHeader}>
                    <Image
                      source={require('../../assets/profile.jpg')}
                      style={{width: 40, height: 40, borderRadius: 20}}
                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#3ABEFE',
                          flexDirection: 'row',
                          alignItems: 'center',
                          fontFamily: 'Poppins-Medium',
                          padding: 10,
                          fontWeight: 800,
                        }}>
                        {post.username}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.postBody}>
                    <Image
                      source={require('../../assets/profile.jpg')}
                      style={styles.postImage}
                    />
                    <View style={styles.postActions}>
                      <TouchableOpacity
                        onPress={() => handleLike(post.id)}
                        style={styles.likeButton}>
                        <Icon
                          name="thumbs-up"
                          size={20}
                          color="#3ABEFE"
                          style={styles.bellIcon}
                        />
                        <Text
                          style={{
                            color: '#A5AFCE',
                            marginTop: 1,
                            marginLeft: 4,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {post.likes}{' '}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.likeButton}>
                        <Icon
                          name="comment"
                          size={20}
                          color="#3ABEFE"
                          style={styles.bellIcon}
                        />
                        <Text style={styles.actionText}>5</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.likeButton}>
                        <Icon
                          name="share"
                          size={20}
                          color="#3ABEFE"
                          marginTop={2}
                          style={styles.bellIcon}
                        />
                        <Text style={styles.actionText}>share</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <AppTabNavigator />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121724',
  },
  darkModeContainer: {
    backgroundColor: '#0E121C',
  },
  UserDetails: {
    backgroundColor: '#1A2235',
    paddingBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  likeButton: {
    flexDirection: 'row',
  },

  AddIcon: {
    width: 20,
    height: 20,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 150,
    left: '50%',
    marginLeft: -75,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    backgroundColor: '#121724',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 50,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  darkModeName: {
    color: 'white',
  },
  bio: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#3ABEFE',
    fontFamily: 'Poppins-Regular',
  },
  darkModeBio: {
    color: '#3ABEFE',
  },
  About: {
    flexDirection: 'row',
    fontSize: 12,
    // marginTop: 6,
    textAlign: 'center',
    color: 'white',
    width: 150,
    marginTop: 16,
  },
  darkModeAbout: {
    color: 'white',
  },
  actionText: {
    marginTop: 1,
    marginLeft: 4,
    color: '#A5AFCE',

    fontFamily: 'Poppins-Medium',
  },
  AddButtonContainer: {
    backgroundColor: '#3ABEFE',

    width: 120,
    height: 30,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: '35%',
    marginTop: 20,
  },
  AddIcon: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  },
  AddButton: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
    marginTop: 0,
    fontWeight: 800,
    fontFamily: 'Poppins-Medium',
  },
  postsContainer: {
    flex: 1,
    marginTop: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  postBody: {
    padding: 10,
  },

  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 8,
    justifyContent: 'space-between',
  },
});

export default ViewFriendProfile;
