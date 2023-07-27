import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const AllFriendsHeader = () => {
  // const handleHomeScreen = ({navigation}) => {
  //   navigation.navigate('/screens/Home/HomeScreen.js');
  // };
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.actionText}>
            <Icon name="arrow-left" size={21} color="#3ABEFE" />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: '#3ABEFE', fontSize: 26}]}>
          All Friends
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#1A2134',
  },
  actionText: {
    color: '#3ABEFE',
    fontSize: 24,
    marginLeft: 16,
  },

  headerText: {
    fontSize: 18,
    fontFamily: 'RussoOne-Regular',
    color: '#3ABEFE',
    marginLeft: 100,
  },
});
export default AllFriendsHeader;
