/* eslint-disable react-native/no-inline-styles */
import {Text, View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePost = ({validationSchema, handleCreatePost, navigation}) => {
  return (
    <View style={{backgroundColor: '#0C121E'}}>
      <Formik
        initialValues={{caption: ''}}
        validationSchema={validationSchema}
        onSubmit={handleCreatePost}>
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <View style={{backgroundColor: '#121724'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TextInput
                  style={styles.captionInput}
                  placeholder="What's on your mind?"
                  value={values.caption}
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('caption')}
                />
                <Icon
                  name="send"
                  size={24}
                  color="#3ABEFE"
                  onPress={handleSubmit}
                  style={styles.sendIcon}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="image"
                  size={24}
                  color="#3ABEFE"
                  onPress={() => navigation.navigate('CreatePosts')}
                  style={{marginRight: 10, marginTop: 10}}
                />
              </View>
            </View>
            {errors.caption && touched.caption && (
              <Text style={{color: 'red', marginLeft: 16}}>
                {errors.caption}
              </Text>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  captionInput: {
    padding: 8,
    marginTop: 10,
    marginLeft: 16,
    color: '#fff',
    width: '93%',
    borderBottomWidth: 0.2,
    borderBottomColor: '#3ABEFE',
  },
  sendIcon: {
    position: 'absolute',
    top: '50%',
    right: 20,
    marginTop: -6,
  },
});

export default CreatePost;
