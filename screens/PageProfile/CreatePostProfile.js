import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useCreatePagePost} from '../../utils/hooks/hooks';
import useAuth from '../../utils/hooks/useAuth';

const CreatePostProfile = ({route, navigation}) => {
  const {page} = route.params;
  const {id} = page;

  const {accessToken} = useAuth();
  const {loading, handleCreatePagePost} = useCreatePagePost(id, accessToken);

  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);

  const createPost = async () => {
    try {
      const response = await handleCreatePagePost(caption, media);
      navigation.navigate('PageProfileScreen', {page: page});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>CreatePostProfile</Text>
      <TextInput
        placeholder="Enter caption"
        value={caption}
        onChangeText={text => setCaption(text)}
      />
      {/* Add file input or image picker component to select media */}
      <Button title="Create Post" onPress={createPost} disabled={loading} />
    </View>
  );
};

export default CreatePostProfile;
