import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePostIcon = ({navigation}) => {
  const handleImageClick = () => {
    navigation.navigate('CreatePosts');
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleImageClick}>
          <View>
            <Icon name="image" size={24} color="#3ABEFE" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#121724',
  },
});
export default CreatePostIcon;
