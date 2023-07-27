import React, {useState} from 'react';
import {
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {useCreatePost, useFetchPosts} from '../../utils/hooks/hooks';
import useAuth from '../../utils/hooks/useAuth';

const CreatePost = ({navigation}) => {
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState('active');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {posts, setPosts, refetch} = useFetchPosts(accessToken);

  const {loading: createPostLoading, createPost} = useCreatePost(
    accessToken,
    setPosts,
  );

  const {accessToken, currentUser} = useAuth();

  const isVideo = mediaType => {
    return mediaType.includes('video');
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'mixed',
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('FilePicker Error: ', response.error);
      } else {
        setMedia(response);
      }
    });
  };

  const createPostSubmit = async () => {
    if (caption.trim() === '') {
      setError('Caption is required.');
      return;
    } else {
      setError('');
    }

    setLoading(true);
    const data = new FormData();
    data.append('caption', caption);
    data.append('status', status);
    if (media) {
      const currentMedia = media.assets[0]; // Adjusted this line
      const fileType =
        currentMedia.type || 'image/jpeg' || 'video/mp4' || 'image/png'; // or video/mp4
      const fileName =
        currentMedia.fileName ||
        `image-${Date.now()}.jpg` ||
        `video-${Date.now()}.mp4` ||
        `image-${Date.now()}.png`;

      data.append('media[]', {
        uri:
          Platform.OS === 'ios'
            ? currentMedia.uri.replace('file://', '')
            : currentMedia.uri, // Adjusted this line
        type: fileType,
        name: fileName,
      });
    }

    try {
      await createPost(data, () => {
        // Reset form values
        setCaption('');
        setStatus('active');
        setMedia(null);
      });
      const newPost = {
        id: Math.random(),
        caption: caption,
        user: {
          id: JSON.parse(currentUser).id,
          username: JSON.parse(currentUser).username,
          name: JSON.parse(currentUser).name,
          avatar: JSON.parse(currentUser).avatar,
        },
        created_at: new Date().toISOString(),
        likes: [],
        comments: [],
      };

      // Update the posts state in HomeScreen
      setPosts([newPost, ...posts]);
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Write your caption..."
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
        placeholderTextColor="#fff"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.selectImageButton} onPress={chooseFile}>
        <Text style={styles.selectImageButtonText}>images/files</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={createPostSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      )}
      {media && (
        <>
          {isVideo(media.assets[0].type) ? (
            <Video
              source={{uri: media.assets[0].uri}}
              style={styles.preview}
              resizeMode="contain"
            />
          ) : (
            <Image source={{uri: media.assets[0].uri}} style={styles.preview} />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setMedia(null)}>
            <Text style={styles.buttonText}>Remove File</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121724',
    padding: 20,
  },
  input: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#3ABEFE',
    padding: 10,
    marginVertical: 10,
    color: '#fff',
  },
  error: {
    color: '#f00',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3FB9F5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  activityIndicator: {
    marginTop: 20,
  },
  selectImageButton: {
    borderWidth: 1,
    borderColor: '#3ABEFE',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },

  selectImageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CreatePost;
