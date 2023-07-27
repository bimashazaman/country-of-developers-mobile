import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

const NoFriends = ({navigation}) => {
  return (
    <View>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Image
          source={require('../assets/SadEmoji.png')}
          style={styles.Emoji}
        />
        <Text style={styles.EmojiText}>No any friend request right now</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Emoji: {
    marginTop: 10,
    marginLeft: 110,
  },
  EmojiText: {
    color: '#FFFFFF',
    marginLeft: 110,
    marginTop: 20,
    fontSize: 16,
  },
});
export default NoFriends;
