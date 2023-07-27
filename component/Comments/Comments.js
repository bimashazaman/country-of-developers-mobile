import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Comments = ({navigation, postId}) => {
  const handleImageClick = () => {
    navigation.navigate('CommentScreen', {postId: postId});
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleImageClick}>
          <View>
            <Icon
              name="comment-o"
              size={20}
              color="#3ABEFE"
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    marginLeft: 12,
    marginTop: 4,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Comments;
