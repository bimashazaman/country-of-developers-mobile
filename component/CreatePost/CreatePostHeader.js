/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePostHeader = () => {
  return (
    <TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.actionText}>
            <Icon name="arrow-left" size={21} color="#3ABEFE" />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: '#3ABEFE', fontSize: 26}]}>
          Create Post
        </Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A2134',
  },
  actionText: {
    color: '#3ABEFE',
    fontSize: 24,
    marginLeft: 16,
  },
  saveButton: {
    color: '#3ABEFE',
    backgroundColor: '#3ABEFE',
    textAlign: 'center',
    borderRadius: 20,
    width: 80,
    justifyContent: 'center',
    padding: 4,
    marginRight: 16,
  },
  saveButtonText: {
    marginLeft: 20,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '800',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    color: '#3ABEFE',
  },
});
export default CreatePostHeader;
