/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CommentHeader from '../../component/Comments/CommentHeader';
import {CommentStyle} from '../../styles/CommentScreenStyles';
import {BASE_URL, WEB_URL} from '../../utils/constant';
import useAuth from '../../utils/hooks/useAuth';
import {Alert} from 'react-native';

const CommentScreen = ({navigation, route}) => {
  const {postId} = route.params;
  const {accessToken} = route.params;
  const {currentUser} = route.params;
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [replies, setReplies] = useState({});

  //showModal
  const [showModal, setShowModal] = useState(false);

  const currentUserId = currentUser ? JSON.parse(currentUser).id : '';

  // fetching the comments
  const fetchComments = () => {
    axios
      .get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setComments(response.data);
        setPost(response.data.post);
        setLoading(false);
        // Fetch replies for each comment
        response.data.forEach(comment => {
          fetchReplies(comment.id);
        });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  const deleteComment = commentId => {
    axios
      .delete(`${BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response.data.message);
        Alert.alert('Comment Deleted', 'Your comment has been deleted', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        fetchComments();
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  //delete reply
  const deleteReply = replyId => {
    axios
      .delete(`${BASE_URL}/replies/${replyId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response.data.message);
        Alert.alert('Reply Deleted', 'Your reply has been deleted', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        fetchComments();
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  // fetching the replies
  const fetchReplies = commentId => {
    axios
      .get(`${BASE_URL}/comments/${commentId}/showReplies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // Update the state with the fetched replies
        setReplies(prevReplies => ({
          ...prevReplies,
          [commentId]: response.data,
        }));
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  //creating comment
  const createComment = () => {
    axios
      .post(
        `${BASE_URL}/posts/${postId}/comments`,
        {
          comment: newCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setNewCommentText('');
        // Refetch the comments list after successfully creating a new comment
        fetchComments();
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigation.navigate('Login');
        }
      });
  };

  //fetching the comments
  useEffect(() => {
    fetchComments();
  }, [postId, accessToken, navigation]);

  //creating comment reply
  const createReply = commentId => {
    axios
      .post(
        `${BASE_URL}/comments/${commentId}/reply`,
        {
          reply: replyTexts[commentId],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setReplyTexts({...replyTexts, [commentId]: ''});
        // Refetch the replies after successfully creating a new reply
        fetchReplies(commentId);
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigation.navigate('LoginScreen');
        }
      });
  };

  //rendering the comments
  const renderItem = ({item}) => {
    // Check if the user object exists before accessing its properties
    const avatar = item.user && item.user.avatar ? item.user.avatar : null;
    const userName = item.user ? item.user.name : 'Unknown User';
    const userId = item.user ? item.user.id : null;

    return (
      <>
        <View style={CommentStyle.mainContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setShowModal(false);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <View
                  style={{
                    backgroundColor: '#161C2C',
                    padding: 30,
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: '#3ABEFE',
                    borderWidth: 1,
                    width: '80%',
                    position: 'relative',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}>
                    <Icon name="times" size={20} color="#3ABEFE" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteComment(item.id);
                      setShowModal(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: 200,
                      marginBottom: 20,
                    }}>
                    <Text style={{color: 'white', fontSize: 16}}>
                      Delete Comment
                    </Text>
                    <Icon name="trash" size={16} color="#3ABEFE" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(!showModal);
                      // navigation.navigate('EditPost', {
                      //   post: post,
                      // });
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: 200,
                      marginBottom: 20,
                    }}>
                    <Text style={{color: 'white', fontSize: 16}}>
                      Edit Comment (soon)
                    </Text>

                    <Icon name="edit" size={16} color="#3ABEFE" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={CommentStyle.commentContainer}>
            <View style={CommentStyle.profileImageContainer}>
              <View style={CommentStyle.replyFlex}>
                {avatar == null ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfileScreen', {
                        userId: userId,
                      })
                    }>
                    <Image
                      source={require('../../assets/profile.jpg')}
                      style={CommentStyle.profileImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfileScreen', {
                        userId: userId,
                      })
                    }>
                    <Image
                      source={{uri: `${WEB_URL}/avatar/${avatar}`}}
                      style={CommentStyle.profileImage}
                    />
                  </TouchableOpacity>
                )}
                <Text style={CommentStyle.commentAuthor}>{userName}</Text>
              </View>

              <View style={CommentStyle.threeDotsContainer}>
                {currentUserId === item.user.id && (
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Icon name="ellipsis-v" size={16} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View>
            <Text style={CommentStyle.commentText}>{item.comment}</Text>
          </View>
          <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
            <Text style={CommentStyle.replyText}>
              <Icon name="reply" size={16} color="#3ABEFE" /> Reply
            </Text>
          </TouchableOpacity>

          {replyingTo === item.id && (
            <View style={CommentStyle.replyContainer}>
              <TextInput
                style={CommentStyle.replyInput}
                placeholder="Write a reply..."
                placeholderTextColor="#fff"
                value={replyTexts[item.id] || ''}
                onChangeText={text =>
                  setReplyTexts({...replyTexts, [item.id]: text})
                }
              />
              <TouchableOpacity
                onPress={() => createReply(item.id)}
                style={CommentStyle.replyButton}>
                <Text>
                  <Icon name="paper-plane" size={24} color="#3ABEFE" />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {replyingTo === item.id && (
          <View style={CommentStyle.ReplyContainer}>
            {replies[item.id] && replies[item.id].length > 0 && (
              <FlatList
                data={replies[item.id]}
                renderItem={renderReply}
                keyExtractor={(item, index) => `${item.id}-${index}`}
              />
            )}
          </View>
        )}
      </>
    );
  };

  //renderReply
  const renderReply = ({item}) => {
    // Check if the user object exists before accessing its properties
    const avatar = item.user && item.user.avatar ? item.user.avatar : null;
    const userName = item.user ? item.user.name : 'Unknown User';
    const userId = item.user ? item.user.id : null;

    return (
      <View style={CommentStyle.commentReplyContainer}>
        <View style={CommentStyle.replyFlex}>
          <View>
            {avatar == null ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfileScreen', {
                    userId: userId,
                  })
                }>
                <Image
                  source={require('../../assets/profile.jpg')}
                  style={CommentStyle.profileImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfileScreen', {
                    userId: userId,
                  })
                }>
                <Image
                  source={{uri: `${WEB_URL}/avatar/${avatar}`}}
                  style={CommentStyle.profileImage}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 260,
              }}>
              <Text style={CommentStyle.commentAuthor}>{userName}</Text>
              {currentUserId === item.user.id && (
                //delete button
                <TouchableOpacity
                  onPress={() => {
                    deleteReply(item.id);
                  }}>
                  <Icon name="trash" size={16} color="#3ABEFE" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={CommentStyle.commentText}>{item.reply}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={CommentStyle.container}>
        <ActivityIndicator size="large" color="#3ABEFE" />
      </View>
    );
  }
  return (
    <View style={CommentStyle.modalContainer}>
      <CommentHeader navigation={navigation} />
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />

      <View style={CommentStyle.inputContainer}>
        <View style={CommentStyle.inputWrapper}>
          <TextInput
            style={CommentStyle.input}
            placeholder="Write a comment..."
            placeholderTextColor="#fff"
            value={newCommentText}
            onChangeText={text => setNewCommentText(text)}
          />

          <TouchableOpacity onPress={createComment}>
            <Text style={CommentStyle.actionText}>
              <Icon name="paper-plane" size={24} color="#3ABEFE" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;
